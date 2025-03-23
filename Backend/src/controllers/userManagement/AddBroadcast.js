import express from 'express';
import BroadcastSchema from '../../models/userManagement/BroadcastSchema.js';

// Function to delete broadcasts older than 2 days
const deleteOldBroadcasts = async () => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // 2 days ago

        await BroadcastSchema.deleteMany({
            createdAt: { $lt: twoDaysAgo } // Deleting records older than 2 days
        });

        console.log('Old broadcasts deleted successfully.');
    } catch (e) {
        console.error('Error deleting old broadcasts:', e.message);
    }
};

// Add new broadcast
const AddBroadcast = async (req, res) => {
    try {
        const { title, message } = req.body;
        const newBroadcast = new BroadcastSchema({
            title,
            message,
            createdAt: new Date() // Add creation date
        });

        await newBroadcast.save();

        await deleteOldBroadcasts();

        res.status(200).json({ message: 'Success' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default AddBroadcast;
