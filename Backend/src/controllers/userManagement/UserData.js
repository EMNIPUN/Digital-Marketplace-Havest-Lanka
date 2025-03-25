import express from 'express'
import mongoose from 'mongoose'
import User from '../../models/userManagement/User.js'
import multer from 'multer';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FindUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const userDataToSend = {
            userId: user._id,
            email: user.email,
            name: user.name,
            number: user.number,
            role: user.role,
            displayPicture: user.displayPicture,
            status: user.status,
            NIC: user.NIC
        }

        res.status(200).json({ user: userDataToSend })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const UpdateUserById = async (req, res) => {
    try {
        const { userId, name, number } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Handle file upload
        if (req.file) {
            const newFilePath = `/uploads/${req.file.filename}`;

            // Delete old profile picture if it exists and is not the default one
            if (user.displayPicture && user.displayPicture !== "/uploads/default.png") {
                const oldFilePath = path.join(__dirname, "../../..", user.displayPicture);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Update profile picture
            user.displayPicture = newFilePath;
        }

        // Update other fields
        user.name = name || user.name;
        user.number = number || user.number;

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


export const DeleteUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const filterUsers = async (req, res) => {
    try {
        const { search, role, status } = req.query;
        let query = {};

        if (role && role !== 'all') {
            query.role = role;
        }

        if (status && status.toLowerCase() !== 'all') {
            if (status.toLowerCase() === 'active') {
                query.status = true;
            } else if (status.toLowerCase() === 'deactivated') {
                query.status = false;
            }
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: { $regex: searchRegex } },
                { NIC: { $regex: searchRegex } },
                { _id: search },
                { number: { $regex: searchRegex } }
            ];
        }

        const users = await User.find(query);
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error filtering users:', error);
        res.status(500).json({ error: 'Error filtering users' });
    }
};

export const ChangePassword = async (req, res) => {
    try {
        const { userId, currentPassword, password } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: "Current password is wrong" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
