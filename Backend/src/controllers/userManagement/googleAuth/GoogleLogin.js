import crypto from "crypto";
import User from "../../../models/userManagement/User.js";
import jwt from "jsonwebtoken";
import { IncreseActiveSessions } from "../ActiveTokens.js";
import logActivity from "../LogActivity.js";
import {
    generatePkcePair,
    signOAuthState,
    verifyOAuthState,
    exchangeCodeForProfile,
    OAUTH_COOKIE_NAME,
    oauthCookieOptions,
} from "./oauthHelpers.js";

const LOGIN_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI_LOGIN || 'http://localhost:8005/login/google/callback/login';

export const googleAuthLogin = async (req, res) => {
    const { role } = req.params
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent('openid profile email')

    const { codeVerifier, codeChallenge } = generatePkcePair();
    const csrf = crypto.randomBytes(16).toString("hex");
    const cookieValue = signOAuthState({ csrf, codeVerifier, purpose: "login", role });
    res.cookie(OAUTH_COOKIE_NAME, cookieValue, oauthCookieOptions);

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${LOGIN_REDIRECT_URI}&response_type=code&scope=${scope}&state=${csrf}&code_challenge=${codeChallenge}&code_challenge_method=S256&access_type=offline&prompt=select_account`;

    res.redirect(authUrl)
}

export const googleCallbackLogin = async (req, res) => {
    let statePayload;
    try {
        statePayload = verifyOAuthState(req.cookies[OAUTH_COOKIE_NAME]);
    } catch (error) {
        return res.status(400).send('Authentication session expired or invalid, please try again.');
    }
    res.clearCookie(OAUTH_COOKIE_NAME, { httpOnly: true, secure: false, sameSite: "Lax", path: "/" });

    if (statePayload.purpose !== "login") {
        return res.status(403).send('Invalid authentication state.');
    }
    if (req.query.state !== statePayload.csrf) {
        return res.status(403).send('Invalid authentication state.');
    }

    try {
        const code = req.query.code
        const { role, codeVerifier } = statePayload;

        const { sub: googleId } = await exchangeCodeForProfile({
            code,
            codeVerifier,
            redirect_uri: LOGIN_REDIRECT_URI,
        });

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
            case "shopowner":
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
        case "shopowner":
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
