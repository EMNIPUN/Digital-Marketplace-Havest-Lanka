import SystemLoadSchema from '../../../models/userManagement/SystemLoadSchema.js';

// Middleware function to track and save requests instantly
export const trackRequest = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        await SystemLoadSchema.findOneAndUpdate(
            { date: today },
            { $inc: { requestCount: 1 } }, // Increment request count by 1
            { upsert: true, new: true }
        );
    } catch (e) {
        console.error("Error updating request count:", e.message);
    }
    next();
};

// Function to get the last 7 days' system load
export const getSystemLoad = async (req, res) => {
    try {
        const last7DaysLoad = await SystemLoadSchema.find()
            .sort({ date: -1 }) // Get latest first
            .limit(7);

        res.status(200).json(last7DaysLoad);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Function to ensure a new entry for the next day is created at midnight
const setupNextDayEntry = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = tomorrow.toISOString().split('T')[0];

        const existingEntry = await SystemLoadSchema.findOne({ date: nextDay });
        if (!existingEntry) {
            console.log("Creating new system load entry for:", nextDay);
            await SystemLoadSchema.create({ date: nextDay, requestCount: 0 });
        }
    } catch (e) {
        console.error("Error setting up next day entry:", e.message);
    }
};

// Schedule to run just after midnight (00:01 UTC)
setInterval(() => {
    const now = new Date();
    if (now.getUTCHours() === 0 && now.getUTCMinutes() === 1) {
        setupNextDayEntry();
    }
}, 60000); // Check every 60 seconds
