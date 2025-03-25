import mongoose from "mongoose"

const BroadcastSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Broadcast", BroadcastSchema)