import express from 'express';
import BroadcastSchema from '../../models/userManagement/BroadcastSchema.js';
import cron from 'node-cron';

const deleteOldBroadcasts = async () => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        await BroadcastSchema.deleteMany({
            createdAt: { $lt: twoDaysAgo }
        });

        console.log('Old broadcasts deleted successfully.');
    } catch (e) {
        console.error('Error deleting old broadcasts:', e.message);
    }
};

// Schedule the delete function to run every day at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily cleanup task...');
    await deleteOldBroadcasts();
}, {
    scheduled: true,
    timezone: "Asia/Colombo" // Adjust according to your timezone
});

const AddBroadcast = async (req, res) => {
    try {
        const { title, message } = req.body;
        const newBroadcast = new BroadcastSchema({
            title,
            message,
            createdAt: new Date()
        });

        await newBroadcast.save();

        await deleteOldBroadcasts(); // Run cleanup when adding a new broadcast

        res.status(200).json({ message: 'Success' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default AddBroadcast;
