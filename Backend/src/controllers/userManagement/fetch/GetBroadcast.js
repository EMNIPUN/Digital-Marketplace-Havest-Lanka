import express from 'express';
import mongoose from 'mongoose';
import BroadcastSchema from '../../../models/userManagement/BroadcastSchema.js';

const GetBroadcast = async (req, res) => {
    try {
        const broadcasts = await BroadcastSchema.find().sort({ date: -1 });

        if (broadcasts.length === 0) {
            return res.status(200).json({ message: "No broadcast messages" });
        }

        return res.status(200).json({ broadcasts: broadcasts });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default GetBroadcast;
