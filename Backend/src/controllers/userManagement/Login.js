import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/userManagement/User.js'
import { IncreseActiveSessions } from './ActiveTokens.js'
import logActivity from './LogActivity.js'

export const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Email not found" })

        // Check if the account is deactivated
        if (user.status === false) {
            return res.status(403).json({ message: "Your account is deactivated. Please contact support." })
        }

        const roleMatch = role === user.role
        if (!roleMatch) return res.status(401).json({ message: `Please use ${user.role} login` })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(402).json({ message: "Invalid credentials" })

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name, role: user.role, number: user.number, displayPicture: user.displayPicture },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.cookie("token", token, {
            secure: false,
            sameSite: "Strict",
            maxAge: 60 * 60 * 24 * 1000
        })

        IncreseActiveSessions()
        await logActivity({ user, action: "logged in", type: "login" });
        res.status(200).json({ message: "Login successful" })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
