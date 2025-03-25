import express from 'express';
import mongoose from 'mongoose';
import CriticalAlertsSchema from '../../models/userManagement/CriticalAltertsSchema.js';

const CriticalAlerts = async (req, res) => {
    try {
        const alerts = await CriticalAlertsSchema.find().sort({ date: -1 });

        if (alerts.length === 0) {
            return res.status(200).json({ message: "No critical alerts" });
        }

        res.status(200).json({ alerts });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export default CriticalAlerts;
