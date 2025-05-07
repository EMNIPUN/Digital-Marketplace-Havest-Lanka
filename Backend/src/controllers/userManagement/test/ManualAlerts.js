import express from 'express';
import CriticalAlertsSchema from '../../../models/userManagement/CriticalAltertsSchema.js';

export const addMultipleAlertsByUrl = async (req, res) => {
    try {
        const alerts = [
            {
                date: new Date().toISOString(),
                title: "High CPU Usage",
                message: "CPU usage exceeded 90%. Immediate action needed!",
                type: "CPU",
                seen: false
            },
            {
                date: new Date().toISOString(),
                title: "Low Disk Space",
                message: "Available disk space is below 10GB.",
                type: "Disk",
                seen: false
            },
            {
                date: new Date().toISOString(),
                title: "High RAM Usage",
                message: "RAM usage exceeded 90%. System may slow down.",
                type: "Memory",
                seen: false
            },
            {
                date: new Date().toISOString(),
                title: "High System Load",
                message: "System load average is too high. Performance may be affected.",
                type: "System",
                seen: false
            },
            {
                date: new Date().toISOString(),
                title: "Manual Test Alert",
                message: "This is a manually triggered alert for testing.",
                type: "Manual",
                seen: false
            }
        ];

        await CriticalAlertsSchema.insertMany(alerts);

        res.status(201).json({ message: "5 Critical alerts added successfully!", alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default addMultipleAlertsByUrl