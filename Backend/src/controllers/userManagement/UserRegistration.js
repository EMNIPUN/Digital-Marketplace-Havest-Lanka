import User from "../../models/userManagement/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

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

        // Only check NIC if it's provided in the request body
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

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (e) {
        res.status(500).json({ message: "Operation unsuccessful.", error: e.message });
    }
};


export const uploadMiddleware = upload.single("displayPicture");
