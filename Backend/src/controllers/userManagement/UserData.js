import express from 'express'
import mongoose from 'mongoose'
import User from '../../models/userManagement/User.js'
import multer from 'multer';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FindUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const userDataToSend = {
            userId: user._id,
            email: user.email,
            name: user.name,
            number: user.number,
            role: user.role,
            displayPicture: user.displayPicture,
            status: user.status,
            NIC: user.NIC
        }

        res.status(200).json({ user: userDataToSend })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

export const UpdateUserById = async (req, res) => {
    try {
        const { userId, name, number } = req.body;
        const displayPicture = req.file ? `/uploads/${req.file.filename}` : null;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.number = number || user.number;
        user.displayPicture = displayPicture || user.displayPicture

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const uploadUpdateMiddleware = upload.single("displayPicture");


export const DeleteUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const filterUsers = async (req, res) => {
    try {
        const { search, role, status } = req.query;
        let query = {};

        if (role && role !== 'all') {
            query.role = role;
        }

        if (status && status.toLowerCase() !== 'all') {
            query.status = status.toLowerCase() === 'active';
        }

        if (search && search.trim() !== "") {
            const searchRegex = new RegExp(search, 'i');
            // Build an array for the $or conditions.
            const orConditions = [
                { name: { $regex: searchRegex } },
                { NIC: { $regex: searchRegex } },
                { number: { $regex: searchRegex } }
            ];
            // Only include _id if the search is a valid ObjectId.
            if (mongoose.Types.ObjectId.isValid(search)) {
                orConditions.push({ _id: search });
            }
            query.$or = orConditions;
        }

        const users = await User.find(query);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error filtering users' });
    }
};


export const ChangePassword = async (req, res) => {
    try {
        const { userId, currentPassword, password } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: "Current password is wrong" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
