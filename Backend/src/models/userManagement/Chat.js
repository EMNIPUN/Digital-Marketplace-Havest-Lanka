import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sessionId: String,
    role: String,
    userMessage: String,
    botResponse: String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
