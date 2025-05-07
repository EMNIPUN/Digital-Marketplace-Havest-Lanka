import React, { useState } from 'react';
import {
    FileCog,
    RefreshCcw,
    ServerCrash,
    Settings2,
    ShieldAlert,
    XCircle,
    ChevronRight,
    Download,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

const tools = [
    {
        name: 'Backup & Restore',
        icon: FileCog,
        description: 'Create or restore system backups.',
        color: 'bg-emerald-100 text-emerald-700'
    },
    {
        name: 'Cache Management',
        icon: RefreshCcw,
        description: 'Clear or warm up system cache.',
        color: 'bg-blue-100 text-blue-700'
    },
    {
        name: 'Maintenance Mode',
        icon: ServerCrash,
        description: 'Enable or disable maintenance mode.',
        color: 'bg-amber-100 text-amber-700'
    },
    {
        name: 'Health Check',
        icon: Settings2,
        description: 'View system health and diagnostics.',
        color: 'bg-indigo-100 text-indigo-700'
    },
    {
        name: 'ENV Editor',
        icon: Settings2,
        description: 'Edit environment variables safely.',
        color: 'bg-teal-100 text-teal-700'
    },
    {
        name: 'Security Breach',
        icon: ShieldAlert,
        description: 'Force logout all users from the system.',
        color: 'bg-rose-100 text-rose-700'
    },
];

export default function AdministrationToolsPage() {
    const [activeTool, setActiveTool] = useState(null);
    const [backups, setBackups] = useState([
        { name: "backup_2025-05-01.zip", size: "1.2 GB", date: "May 1, 2025" },
        { name: "backup_2025-04-20.zip", size: "1.1 GB", date: "April 20, 2025" }
    ]);
    const [envVars, setEnvVars] = useState({ APP_ENV: "production", DEBUG: "false", API_TIMEOUT: "30000", CACHE_TTL: "3600" });
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleCreateBackup = () => {
        const newBackup = {
            name: `backup_${new Date().toISOString().slice(0, 10)}.zip`,
            size: "1.3 GB",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setBackups([newBackup, ...backups]);
        showToast("Backup created successfully");
    };

    const handleRestoreBackup = (file) => {
        showToast(`Restoring from ${file.name}...`, 'info');
    };

    const handleClearCache = () => {
        showToast("Cache cleared successfully");
    };

    const handleToggleMaintenance = () => {
        setMaintenanceMode(!maintenanceMode);
        showToast(`Maintenance mode ${!maintenanceMode ? 'enabled' : 'disabled'}`);
    };

    const handleHealthCheck = () => {
        showToast("System health check completed. All systems operational.");
    };

    const handleEnvChange = (key, value) => {
        setEnvVars({ ...envVars, [key]: value });
    };

    const handleSaveEnv = () => {
        showToast("Environment variables updated successfully");
    };

    const handleSecurityBreach = () => {
        showToast("All users have been logged out", "warning");
    };

    const renderToolUI = () => {
        const currentTool = activeTool;

        switch (activeTool) {
            case 'Backup & Restore':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                            <AlertTriangle size={20} />
                            <p className="text-sm">Backups contain sensitive data. Ensure proper authorization before restoration.</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Create New Backup</h3>
                            <button
                                onClick={handleCreateBackup}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 text-sm font-medium"
                            >
                                <FileCog size={16} />
                                Create Backup
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3">Available Backups</h3>
                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {backups.map((file, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleRestoreBackup(file)}
                                                        className="text-emerald-600 hover:text-emerald-900 font-medium flex items-center gap-1 ml-auto"
                                                    >
                                                        <Download size={16} />
                                                        Restore
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'Cache Management':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                            <AlertTriangle size={20} />
                            <p className="text-sm">Clearing cache may temporarily slow down the system as it rebuilds.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium mb-2">Cache Statistics</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Memory Usage</p>
                                    <p className="text-xl font-semibold">248 MB</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Items Cached</p>
                                    <p className="text-xl font-semibold">1,435</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Hit Ratio</p>
                                    <p className="text-xl font-semibold">94.2%</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleClearCache}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium"
                            >
                                <RefreshCcw size={16} />
                                Clear All Cache
                            </button>

                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 text-sm font-medium">
                                Warm Cache
                            </button>
                        </div>
                    </div>
                );

            case 'Maintenance Mode':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                            <AlertTriangle size={20} />
                            <p className="text-sm">Enabling maintenance mode will disconnect all users.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium">Maintenance Mode</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {maintenanceMode
                                        ? "Your site is currently in maintenance mode. Only administrators can access it."
                                        : "Your site is currently live and accessible to all users."}
                                </p>
                            </div>

                            <div className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${maintenanceMode ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                                <span className="font-medium">{maintenanceMode ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleToggleMaintenance}
                            className={`px-4 py-2 ${maintenanceMode ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'} text-white rounded-lg transition flex items-center gap-2 text-sm font-medium`}
                        >
                            <ServerCrash size={16} />
                            {maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
                        </button>
                    </div>
                );

            case 'Health Check':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium mb-3">System Overview</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>Database</span>
                                    </div>
                                    <span className="text-sm text-green-600 font-medium">Operational</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>API Services</span>
                                    </div>
                                    <span className="text-sm text-green-600 font-medium">Operational</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>File Storage</span>
                                    </div>
                                    <span className="text-sm text-green-600 font-medium">Operational</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>Authentication</span>
                                    </div>
                                    <span className="text-sm text-green-600 font-medium">Operational</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleHealthCheck}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm font-medium"
                            >
                                <RefreshCcw size={16} />
                                Run Health Check
                            </button>

                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 text-sm font-medium">
                                View Detailed Report
                            </button>
                        </div>
                    </div>
                );

            case 'ENV Editor':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-teal-600 bg-teal-50 p-3 rounded-lg">
                            <AlertTriangle size={20} />
                            <p className="text-sm">Changing environment variables may require a system restart.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium mb-3">Environment Variables</h3>
                            <div className="space-y-3">
                                {Object.entries(envVars).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-3">
                                        <div className="w-1/3">
                                            <label className="text-sm font-medium text-gray-700">{key}</label>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                value={value}
                                                onChange={(e) => handleEnvChange(key, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveEnv}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center gap-2 text-sm font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                );

            case 'Security Breach':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-3 rounded-lg">
                            <AlertTriangle size={20} />
                            <p className="text-sm font-medium">WARNING: This action is irreversible and will affect all users.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-rose-700 mb-2">Force Logout All Users</h3>
                            <p className="text-gray-600 mb-4">
                                Use this option only in case of a security breach. All users will be immediately logged out and required to re-authenticate.
                                All active sessions will be terminated. This cannot be undone.
                            </p>

                            <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
                                <p className="text-sm text-rose-700">
                                    To confirm this action, type "FORCE LOGOUT" in the field below.
                                </p>
                                <input
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    placeholder="Type FORCE LOGOUT to confirm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSecurityBreach}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition flex items-center gap-2 text-sm font-medium"
                            >
                                <ShieldAlert size={16} />
                                Force Logout All Users
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Removed the unused getToolById function

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Administration Tools</h1>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div
                            key={tool.name}
                            onClick={() => setActiveTool(tool.name)}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 cursor-pointer transition-all border border-gray-100 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${tool.color}`}>
                                    <tool.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">{tool.name}</h3>
                                    <p className="text-sm text-gray-500">{tool.description}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {activeTool && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-5 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                {tools.find(tool => tool.name === activeTool) && (
                                    <div className={`p-2 rounded-lg ${tools.find(tool => tool.name === activeTool).color}`}>
                                        {React.createElement(tools.find(tool => tool.name === activeTool).icon, { className: "w-5 h-5" })}
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold">{activeTool}</h2>
                            </div>
                            <button
                                onClick={() => setActiveTool(null)}
                                className="p-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>

                        <div className="p-6">
                            {renderToolUI()}
                        </div>

                        <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={() => setActiveTool(null)}
                                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg 
            ${toast.type === 'success' ? 'bg-green-600' :
                            toast.type === 'warning' ? 'bg-amber-600' :
                                toast.type === 'info' ? 'bg-blue-600' : 'bg-gray-800'} 
            text-white`}>
                        {toast.type === 'success' && <CheckCircle size={18} />}
                        {toast.type === 'warning' && <AlertTriangle size={18} />}
                        {toast.type === 'info' && <AlertTriangle size={18} />}
                        <p>{toast.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}