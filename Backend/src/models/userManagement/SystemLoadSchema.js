import mongoose from 'mongoose';

const SystemLoadSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    requestCount: {
        type: Number,
        required: true
    }
});

export default mongoose.model('SystemLoad', SystemLoadSchema);
