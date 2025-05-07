import mongoose from "mongoose"

const adminConversationSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    }
}, { timestamps: true })

const AdminConversation = mongoose.model('AdminConversation', adminConversationSchema)
export default AdminConversation