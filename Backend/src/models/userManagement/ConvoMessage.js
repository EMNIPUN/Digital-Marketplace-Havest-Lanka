import mongoose from "mongoose"

const convoMessage = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const ConvoMessage = mongoose.model('ConvoMessage', convoMessage)
export default ConvoMessage