import ActivityScema from "../../models/userManagement/ActivityScema.js";

const logActivity = async ({ user, action, target = null, type }) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toISOString().split('T')[0];

    const newActivity = new ActivityScema({
        user: user._id,
        action,
        target,
        time,
        date,
        type,
    });

    await newActivity.save();
};

export const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivityScema.find()
            .populate('user', 'name _id')
            .sort({ createdAt: -1 });

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activities" });
    }
};


export default logActivity;
