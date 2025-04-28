import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    target: { type: String },
    time: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
