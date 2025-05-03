import axios from "axios";
import User from "../../../models/userManagement/User.js";
import jwt from "jsonwebtoken";
import { IncreseActiveSessions } from "../ActiveTokens.js";
import logActivity from "../LogActivity.js";

export const googleAuthLogin = async (req, res) => {
    const { role } = req.params
    const redirect_uri = 'http://localhost:8005/login/google/callback/login'
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent('profile email')
    const roleEn = encodeURIComponent(role)
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${roleEn}&access_type=offline&prompt=select_account`;

    res.redirect(authUrl)
}

export const googleCallbackLogin = async (req, res) => {
    try {
        const code = req.query.code
        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
        const role = decodeURIComponent(req.query.state);

        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code: code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:8005/login/google/callback/login',
            grant_type: 'authorization_code'
        })

        const { access_token } = tokenResponse.data

        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { id: googleId } = profileResponse.data;

        const user = await User.findOne({ googleId });
        if (!user) return res.redirect(`http://localhost:5173/login/${getRole(role)}?e=User not found`);

        if (user.status === false) {
            return res.redirect(`http://localhost:5173/login/${getRole(role)}?e=Your account is disabled`);

        }

        const roleMatch = role === user.role
        if (!roleMatch) return res.redirect(`http://localhost:5173/login/${getRole(role)}?e=Use ${getRole(user.role)} login`);

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name, role: user.role, number: user.number, displayPicture: user.displayPicture },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.cookie("token", token, {
            secure: false,
            sameSite: "Strict",
            maxAge: 60 * 60 * 24 * 1000
        })

        IncreseActiveSessions()
        await logActivity({ user, action: "logged in", type: "login" });

        switch (user.role) {
            case "marketmanager":
                return res.redirect(`http://localhost:5173/admin`);
            case "farmer":
                return res.redirect(`http://localhost:5173/farmer`);
            case "shop Owner":
                return res.redirect(`http://localhost:5173/shopowner`);
            case "driver":
                return res.redirect(`http://localhost:5173/driver`);
            case "financemanager":
                return res.redirect(`http://localhost:5173/financemanager`);
            case "transportmanager":
                return res.redirect(`http://localhost:5173/transport`);
            default:
                return res.redirect(`http://localhost:5173/login/${getRole(user.role)}?e=Try ${getRole(user.role)} login`);
        }

    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed', message: error.message });
    }
}

const getRole = (role) => {
    switch (role) {
        case "marketmanager":
            return "admin-login"
        case "farmer":
            return "farmer-login"
        case "shop Owner":
            return "shopowner-login"
        case "driver":
            return "driver-login"
        case "financemanager":
            return "financemanager-login"
        case "transportmanager":
            return "transport-login"
        default:
            return null
    }
}