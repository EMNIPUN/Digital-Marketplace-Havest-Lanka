import OTPBuffer from "../../models/userManagement/OTPBuffer.js";
import User from "../../models/userManagement/User.js";
import sendMail from "./smtp/Mail.js";

export const SendOTP = async (req, res) => {
    try {
        const { mail } = req.body;

        const user = await User.findOne({ email: mail });

        if (!user) {
            return res.status(404).json({ message: "Email not found." });
        }

        const otpResult = await generateOTP(mail);

        if (!otpResult.success) {
            // User must wait
            return res.status(429).json({
                message: `Please wait ${otpResult.remainingTime} seconds before requesting a new OTP.`
            });
        }

        const { otp } = otpResult;

        // Beautiful HTML email
        const message = `
        <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #4CAF50;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>You have requested to reset your password for your <strong>HarvestLanka</strong> account.</p>
                <p>Please use the following One-Time Password (OTP) to complete your password reset:</p>
                <div style="font-size: 28px; font-weight: bold; text-align: center; margin: 20px 0; color: #333;">
                    ${otp}
                </div>
                <p style="text-align: center; color: #555;">This OTP is valid for <strong>5 minutes</strong>.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <p>Thank you,<br><strong>HarvestLanka Team</strong></p>
                <hr style="margin: 30px 0;">
                <p style="font-size: 12px; text-align: center; color: #888;">&copy; 2025 HarvestLanka. All rights reserved.</p>
            </div>
        </div>
        `;

        await sendMail(mail, "Password Reset OTP - HarvestLanka", message);

        res.status(200).json({ message: `Email sent to ${mail}` });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export const validateOTP = async (req, res) => {
    const { mail, otp } = req.body;

    try {
        const otpBuffer = await OTPBuffer.findOne({ email: mail });
        if (!otpBuffer) {
            return res.status(404).json({ message: "OTP expired." });
        }
        if (otpBuffer.otp === otp) {
            otpBuffer.validated = true
            await otpBuffer.save()
            return res.status(200).json({ message: "OTP validated successfully" });
        }
        else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (e) {
        res.status(500).json({ message: "Error validating OTP" });
    }
}

const generateOTP = async (mail) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Always generate a new OTP

    try {
        const existingOTP = await OTPBuffer.findOne({ email: mail });

        if (existingOTP) {
            const timeDifference = Date.now() - existingOTP.createdAt.getTime();

            if (timeDifference >= 30 * 1000) {
                // More than 30 seconds passed ➔ update OTP
                await OTPBuffer.updateOne(
                    { email: mail },
                    { otp: otp, createdAt: new Date() }
                );
                return { success: true, otp };
            } else {
                // Less than 30 seconds ➔ do NOT update, just respond with remaining time
                const remainingTimeMs = 30 * 1000 - timeDifference;
                const remainingTimeSec = Math.ceil(remainingTimeMs / 1000);
                return { success: false, remainingTime: remainingTimeSec };
            }
        } else {
            // No previous OTP ➔ Create new
            const otpBuffer = new OTPBuffer({
                email: mail,
                otp: otp,
                createdAt: new Date()
            });
            await otpBuffer.save();
            return { success: true, otp };
        }
    } catch (e) {
        console.error("Error saving OTP to buffer:", e);
        throw new Error("Error saving OTP to buffer");
    }
};
