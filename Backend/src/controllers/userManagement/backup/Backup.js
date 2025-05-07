import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import moment from 'moment';
import mongoose from 'mongoose';

// Get current module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure backup directory exists
const ensureBackupDir = () => {
    const backupDir = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    return backupDir;
};

/**
 * Backs up MongoDB using mongodump
 * @returns {Promise<{success: boolean, path: string, error: string|null}>}
 */
const backupMongoDB = async () => {
    try {
        const backupDir = path.join(ensureBackupDir(), 'mongodb');
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const backupPath = path.join(backupDir, `mongodb_${timestamp}`);

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const command = `mongodump --uri="${process.env.MONGODB_URI}" --out="${backupPath}"`;

        return new Promise((resolve) => {
            exec(command, (error) => {
                if (error) {
                    resolve({
                        success: false,
                        path: null,
                        error: `MongoDB backup failed: ${error.message}`
                    });
                } else {
                    resolve({
                        success: true,
                        path: backupPath,
                        error: null
                    });
                }
            });
        });
    } catch (error) {
        return {
            success: false,
            path: null,
            error: `MongoDB backup error: ${error.message}`
        };
    }
};

/**
 * Backs up important application files
 * @returns {Promise<{success: boolean, path: string, error: string|null}>}
 */
const backupAppFiles = async () => {
    try {
        const backupDir = ensureBackupDir();
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const outputPath = path.join(backupDir, `app_files_${timestamp}.zip`);

        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        return new Promise((resolve, reject) => {
            output.on('close', () => {
                resolve({
                    success: true,
                    path: outputPath,
                    error: null
                });
            });

            archive.on('error', (error) => {
                reject({
                    success: false,
                    path: null,
                    error: `App files backup failed: ${error.message}`
                });
            });

            archive.pipe(output);

            // Add directories to backup
            archive.directory(path.join(__dirname, '../../models'), 'models');
            archive.directory(path.join(__dirname, '../../routes'), 'routes');
            archive.directory(path.join(__dirname, '../../config'), 'config');
            archive.directory(path.join(__dirname, '../../controllers'), 'controllers');

            // Add important files
            archive.file(path.join(__dirname, '../../package.json'), { name: 'package.json' });
            archive.file(path.join(__dirname, '../../package-lock.json'), { name: 'package-lock.json' });
            archive.file(path.join(__dirname, '../../server.js'), { name: 'server.js' });

            archive.finalize();
        });
    } catch (error) {
        return {
            success: false,
            path: null,
            error: `App files backup error: ${error.message}`
        };
    }
};

/**
 * Main backup controller function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createSystemBackup = async (req, res) => {
    try {
        // Verify admin privileges (customize based on your auth system)
        // if (!req.user?.isAdmin) {
        //     return res.status(403).json({
        //         success: false,
        //         error: 'Unauthorized: Only admins can create backups'
        //     });
        // }

        // Create backup directory structure
        ensureBackupDir();

        // Execute backups in parallel
        const [dbBackup, appBackup] = await Promise.all([
            backupMongoDB(),
            backupAppFiles()
        ]);

        if (!dbBackup.success || !appBackup.success) {
            const errors = [
                dbBackup.error,
                appBackup.error
            ].filter(Boolean).join('; ');

            return res.status(500).json({
                success: false,
                error: `Backup partially failed: ${errors}`,
                details: {
                    database: dbBackup,
                    appFiles: appBackup
                }
            });
        }

        // Create a manifest file
        const manifest = {
            timestamp: new Date().toISOString(),
            system: 'MERN Stack Backup',
            version: process.env.npm_package_version,
            components: {
                database: {
                    path: path.relative(__dirname, dbBackup.path),
                    type: 'mongodump'
                },
                application: {
                    path: path.relative(__dirname, appBackup.path),
                    type: 'zip'
                }
            }
        };

        const manifestPath = path.join(
            ensureBackupDir(),
            `backup_manifest_${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`
        );

        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

        res.json({
            success: true,
            message: 'System backup completed successfully',
            backup: {
                database: dbBackup.path,
                appFiles: appBackup.path,
                manifest: manifestPath
            }
        });

    } catch (error) {
        console.error('Backup controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Backup failed',
            details: error.message
        });
    }
};

/**
 * Get list of available backups
 */
export const listBackups = async (req, res) => {
    try {
        const backupDir = ensureBackupDir();
        const items = fs.readdirSync(backupDir)
            .map(item => {
                const fullPath = path.join(backupDir, item);
                return {
                    name: item,
                    path: fullPath,
                    type: fs.statSync(fullPath).isDirectory() ? 'directory' : 'file',
                    size: fs.statSync(fullPath).size,
                    modified: fs.statSync(fullPath).mtime
                };
            });

        res.json({
            success: true,
            backups: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Could not list backups',
            details: error.message
        });
    }
};