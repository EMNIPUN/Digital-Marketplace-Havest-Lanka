import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', conversationSchema)
export default Conversation