import User from "../../../models/userManagement/User.js"
import jwt from "jsonwebtoken";

const CheckGoogleAuth = async (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) return res.status(401).json({ error: 'Unauthorized' })
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId
        const user = await User.findById(userId)
        if (!user) return res.status(402).json({ error: 'User not found' })
        if (user.googleId == "undefined" || user.googleId == undefined) {
            return res.status(201).json({ message: false })
        }
        return res.status(202).json({ message: true })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const disconnectGoogleAccount = async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token) return res.status(401).json({ error: 'Unauthorized' })
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId
        const user = await User.findById(userId)
        if (!user) return res.status(402).json({ error: 'User not found' })
        user.googleId = undefined
        user.googleEmail = undefined
        await user.save()
        return res.redirect(`http://localhost:5173/profile/${userId}`)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default CheckGoogleAuth