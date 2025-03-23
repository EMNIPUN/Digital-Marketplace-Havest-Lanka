import express from 'express'
import User from '../../../models/userManagement/User.js'

const GetAllAccounts = async (req, res) => {
    try {
        const accounts = await User.find()
        if (accounts.length === 0) {
            res.status(200).json({ message: "No accounts found" })
        }
        res.status(200).json({ accounts: accounts })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default GetAllAccounts