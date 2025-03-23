import express from 'express'
import { DecreaseActiveSessions } from './ActiveTokens.js'

const Logout = (req, res) => {
    DecreaseActiveSessions()
    res.cookie("token", null, { httpOnly: true, expires: new Date(0) })
    res.status(200).json({ message: "Logged out successfully" })
}

export default Logout