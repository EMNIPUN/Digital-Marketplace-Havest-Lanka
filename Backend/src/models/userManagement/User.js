import express from 'express'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    "email": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "number": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        default: "farmer"
    },
    "displayPicture": {
        type: String
    },
    "status": {
        type: Boolean,
        default: true
    },
    "NIC": {
        type: String,
        required: false
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema);
export default User;