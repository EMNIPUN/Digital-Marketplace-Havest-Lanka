import mongoose from 'mongoose';

const SystemLoadSchema = new mongoose.Schema({
    date: {
        type: String, // Store date as "YYYY-MM-DD"
        required: true,
        unique: true
    },
    requestCount: {
        type: Number,
        required: true
    }
});

// Create and export the model
export default mongoose.model('SystemLoad', SystemLoadSchema);
