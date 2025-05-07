import User from "../../models/userManagement/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import sendMail from "./smtp/Mail.js";

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

export const registerUser = async (req, res) => {
    try {
        let { email, name, number, password, NIC, role = "farmer", status } = req.body;
        const displayPicture = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Format phone number if necessary
        if (number.startsWith('+94') && number[3] === '0') {
            number = '+94' + number.slice(4);
        }

        const existingNumber = await User.findOne({ number });
        if (existingNumber) {
            return res.status(401).json({ message: "Number already exists" });
        }

        if (NIC) {
            const existingNIC = await User.findOne({ NIC });
            if (existingNIC) {
                return res.status(402).json({ message: "NIC already exists" });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email, name, number, password: hashedPassword, role, displayPicture, status, NIC });
        await newUser.save();

        // Send email after successful registration
        await sendRegistrationEmail(email, name, password);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Operation unsuccessful.", error: e.message });
    }
};

export const uploadMiddleware = upload.single("displayPicture");

// Helper function to send beautiful email
const sendRegistrationEmail = async (email, name, password) => {
    const subject = "Welcome to Harvest Lanka 🌾 | Your Account Details";

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="background-color: #4CAF50; padding: 20px; color: white; text-align: center;">
                    <h1>Welcome, ${name}!</h1>
                </div>
                <div style="padding: 30px;">
                    <p>Thank you for registering with <strong>Harvest Lanka</strong>! We're excited to have you with us.</p>
                    <p><strong>Here are your login details:</strong></p>
                    <table style="width: 100%; margin-top: 20px;">
                        <tr>
                            <td style="padding: 8px 0;">📧 <strong>Email:</strong></td>
                            <td style="padding: 8px 0;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;">🔒 <strong>Password:</strong></td>
                            <td style="padding: 8px 0;">${password}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 30px;">For your security, please change your password after your first login.</p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:5173/" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Login Now</a>
                    </div>
                </div>
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                    © 2025 Harvest Lanka. All rights reserved.
                </div>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlContent);
};
