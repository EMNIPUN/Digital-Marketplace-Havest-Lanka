import mongoose from "mongoose"

const otpBufferSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    validated: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
})

export default mongoose.model("OTPBuffer", otpBufferSchema)