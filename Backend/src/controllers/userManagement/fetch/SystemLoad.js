import SystemLoadSchema from '../../../models/userManagement/SystemLoadSchema.js';

export const trackRequest = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        await SystemLoadSchema.findOneAndUpdate(
            { date: today },
            { $inc: { requestCount: 1 } },
            { upsert: true, new: true }
        );
    } catch (e) {
        console.error("Error updating request count:", e.message);
    }
    next();
};

export const getSystemLoad = async (req, res) => {
    try {
        const last7DaysLoad = await SystemLoadSchema.find()
            .sort({ date: -1 })
            .limit(7);

        res.status(200).json(last7DaysLoad);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

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

setInterval(() => {
    const now = new Date();
    if (now.getUTCHours() === 0 && now.getUTCMinutes() === 1) {
        setupNextDayEntry();
    }
}, 60000);
