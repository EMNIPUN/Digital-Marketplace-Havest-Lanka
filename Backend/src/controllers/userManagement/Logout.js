import express from 'express'
import { DecreaseActiveSessions } from './ActiveTokens.js'
import logActivity from './LogActivity.js'
import User from '../../models/userManagement/User.js'

const Logout = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findById(userId)

        if (!user) return res.status(400).json({ message: "User not found" })

        DecreaseActiveSessions()

        res.cookie("token", null, { httpOnly: true, expires: new Date(0) })

        await logActivity({ user, action: "logged out", type: "login" });

        res.status(200).json({ message: "Logged out successfully" })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default Logout