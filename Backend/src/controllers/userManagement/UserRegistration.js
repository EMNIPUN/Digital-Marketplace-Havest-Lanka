import User from "../../models/userManagement/User.js"
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        let { email, name, number, password, role = "farmer" } = req.body;

        //Check duplicate emails
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Format the phone number by removing any 0 after +94
        if (number.startsWith('+94')) {
            if (number[3] === '0') {
                number = '+94' + number.slice(4);
            }
        }

        //Check duplicate phone numbers
        const existingNumber = await User.findOne({ number })
        if (existingNumber) {
            return res.status(400).json({ message: "Number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, name, number, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (e) {
        res.status(500).json({ message: "Operation unsuccessful.", error: e.message });
    }
};
