import AdminConversation from "../../../models/userManagement/AdminConversation.js"
import Conversation from "../../../models/userManagement/Conversation.js"
import User from "../../../models/userManagement/User.js"
import ConvoMessage from "../../../models/userManagement/ConvoMessage.js"
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

export const getConversations = async (req, res) => {
    try {
        // Step 1: Get all assigned conversation IDs
        const adminConversations = await AdminConversation.find({}, 'conversation')
        const assignedConversationIds = adminConversations.map(ac => ac.conversation.toString())

        // Step 2: Find unassigned conversations and populate user and lastMessage
        const freeConversations = await Conversation.find({
            _id: { $nin: assignedConversationIds }
        })
            .populate('user', 'name displayPicture') // Only fetch name and displayPicture
            .populate('lastMessage', 'message createdAt') // Only fetch message and createdAt

        // Step 3: Format response
        const response = freeConversations.map(conv => ({
            conversationId: conv._id,
            userName: conv.user?.name || 'Unknown',
            userDisplayPicture: conv.user?.displayPicture || '',
            lastMessage: conv.lastMessage?.message || '',
            lastMessageTime: conv.lastMessage?.createdAt || null
        }))

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAdminConversations = async (req, res) => {
    try {
        // Step 1: Extract token from cookies
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Unauthorized: No token found" })

        // Step 2: Verify and decode the token to get admin ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const adminId = decoded.id

        // Step 3: Find all AdminConversations for this admin
        const adminConversations = await AdminConversation.find({ admin: adminId })
            .populate({
                path: 'conversation',
                populate: [
                    { path: 'user', select: 'name displayPicture' },
                    { path: 'lastMessage', select: 'message createdAt' }
                ]
            })

        // Step 4: Format response
        const response = adminConversations.map(ac => ({
            conversationId: ac.conversation._id,
            userName: ac.conversation.user?.name || 'Unknown',
            userDisplayPicture: ac.conversation.user?.displayPicture || '',
            lastMessage: ac.conversation.lastMessage?.message || '',
            lastMessageTime: ac.conversation.lastMessage?.createdAt || null
        }))

        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const joinConversation = async (req, res) => {
    try {
        // Step 1: Extract token from cookies
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" })

        // Step 2: Decode token to get admin ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const adminId = decoded.userId

        // Step 3: Get conversationId from request body
        const { conversationId } = req.body
        if (!conversationId) return res.status(400).json({ message: "conversationId is required" })

        // Step 4: Check if already joined
        const existing = await AdminConversation.findOne({ admin: adminId, conversation: conversationId })
        if (existing) {
            return res.status(400).json({ message: "You have already joined this conversation" })
        }

        // Step 5: Create new AdminConversation
        const newEntry = new AdminConversation({
            admin: adminId,
            conversation: conversationId
        })
        await newEntry.save()

        res.status(200).json({ message: "Successfully joined the conversation" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params

        if (!conversationId) {
            return res.status(400).json({ message: "conversationId is required" })
        }

        // Step 1: Fetch messages sorted by time
        const messages = await ConvoMessage.find({ conversation: conversationId })
            .sort({ createdAt: 1 }) // ascending order
            .populate('sender', 'role') // get sender's role to determine if it's admin or user

        // Step 2: Format messages
        const formattedMessages = messages.map(msg => {
            const isAdmin = msg.sender?.role === 'admin'
            return {
                senderRole: isAdmin ? 'admin' : 'user',
                message: msg.message,
                time: msg.createdAt,
                delivered: msg.delivered,
                read: msg.read
            }
        })

        res.status(200).json(formattedMessages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const closeConversation = async (req, res) => {
    try {
        // Step 1: Get token from cookies
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" })

        // Step 2: Verify token and get admin ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const adminId = decoded.id

        // Step 3: Fetch admin user and validate role
        const admin = await User.findById(adminId)
        if (!admin || admin.role !== "marketmanager") {
            return res.status(403).json({ message: "Forbidden: Only market managers can close conversations" })
        }

        // Step 4: Get conversationId from body
        const { conversationId } = req.body
        if (!conversationId) {
            return res.status(400).json({ message: "conversationId is required" })
        }

        // Step 5: Update conversation status to false
        await Conversation.findByIdAndUpdate(conversationId, { status: false })

        res.status(200).json({ message: "Conversation closed successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { sender, conversation, message } = req.body

        // Validate input
        if (!sender || !conversation || !message) {
            return res.status(400).json({ message: "sender, conversation, and message are required" })
        }

        // Step 1: Create a new message
        const newMessage = new ConvoMessage({
            sender,
            conversation,
            message
        })

        const savedMessage = await newMessage.save()

        // Step 2: Update lastMessage in Conversation
        await Conversation.findByIdAndUpdate(conversation, {
            lastMessage: savedMessage._id
        })

        res.status(201).json({ message: "Message sent", data: savedMessage })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sendUserMessage = async (req, res) => {
    try {
        const { sender, message } = req.body;

        if (!mongoose.Types.ObjectId.isValid(sender)) {
            return res.status(400).json({ error: "Invalid sender ID" });
        }

        if (!message) {
            return res.status(400).json({ error: "Sender and message are required." });
        }

        // 1. Find active conversation
        let conversation = await Conversation.findOne({ user: sender, status: true });

        // 2. If not found, create new one
        if (!conversation) {
            conversation = new Conversation({
                user: sender,
                status: true,
                lastMessage: null, // temporary, will update after message is created
            });
            await conversation.save();

            // Optional: you can also create an AdminConversation here if needed
            // await AdminConversation.create({
            //   admin: someAdminId,
            //   conversation: conversation._id,
            // });
        }

        // 3. Create and save message
        const newMessage = new ConvoMessage({
            sender,
            message,
            conversation: conversation._id,
        });
        await newMessage.save();

        // 4. Update lastMessage in conversation
        conversation.lastMessage = newMessage._id;
        await conversation.save();

        res.status(201).json({
            message: "Message sent successfully.",
            data: newMessage,
            conversationId: conversation._id,
        });
    } catch (error) {
        console.error("sendUserMessage error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};