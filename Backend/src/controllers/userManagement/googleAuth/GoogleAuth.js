import axios from "axios";
import User from "../../../models/userManagement/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const googleAuth = async (req, res) => {
    const redirect_uri = 'http://localhost:8005/login/google/callback'
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent('profile email')
    const state = encodeURIComponent(jwt.verify(req.cookies.token, process.env.JWT_SECRET).userId);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;

    res.redirect(authUrl)
}

export const googleCallback = async (req, res) => {
    console.log("Google Callback Request Came")
    const code = req.query.code
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

    try {
        const state = req.query.state;
        const userId = decodeURIComponent(state)

        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code: code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:8005/login/google/callback',
            grant_type: 'authorization_code'
        })

        const { access_token } = tokenResponse.data

        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { id: googleId, email, name, picture } = profileResponse.data;

        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        user.googleId = googleId; // You must add this to your User model (see below)
        user.googleEmail = email;
        await user.save();

        return res.redirect(`http://localhost:5173/profile/${userId}?linked=success`);

    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed', message: error.message });
    }
}