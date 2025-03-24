import express from 'express'

const Logout = (req, res) => {
    res.cookie("token", null, { httpOnly: true, expires: new Date(0) })
    res.status(200).json({ message: "Logged out successfully" })
}

export default Logout