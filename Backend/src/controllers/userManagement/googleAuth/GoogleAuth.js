import crypto from "crypto";
import User from "../../../models/userManagement/User.js";
import jwt from "jsonwebtoken";
import {
    generatePkcePair,
    signOAuthState,
    verifyOAuthState,
    exchangeCodeForProfile,
    OAUTH_COOKIE_NAME,
    oauthCookieOptions,
} from "./oauthHelpers.js";

const LINK_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI_LINK || 'http://localhost:8005/login/google/callback';

export const googleAuth = async (req, res) => {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent('openid profile email')
    const userId = jwt.verify(req.cookies.token, process.env.JWT_SECRET).userId;

    const { codeVerifier, codeChallenge } = generatePkcePair();
    const csrf = crypto.randomBytes(16).toString("hex");
    const cookieValue = signOAuthState({ csrf, codeVerifier, purpose: "link", userId });
    res.cookie(OAUTH_COOKIE_NAME, cookieValue, oauthCookieOptions);

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${LINK_REDIRECT_URI}&response_type=code&scope=${scope}&state=${csrf}&code_challenge=${codeChallenge}&code_challenge_method=S256&access_type=offline&prompt=consent`;

    res.redirect(authUrl)
}

export const googleCallback = async (req, res) => {
    const code = req.query.code

    let statePayload;
    try {
        statePayload = verifyOAuthState(req.cookies[OAUTH_COOKIE_NAME]);
    } catch (error) {
        return res.status(400).send('Authentication session expired or invalid, please try again.');
    }
    res.clearCookie(OAUTH_COOKIE_NAME, { httpOnly: true, secure: false, sameSite: "Lax", path: "/" });

    if (statePayload.purpose !== "link" || statePayload.csrf !== req.query.state) {
        return res.status(403).send('Invalid authentication state.');
    }

    try {
        const { userId, codeVerifier } = statePayload;

        const { sub: googleId, email, email_verified } = await exchangeCodeForProfile({
            code,
            codeVerifier,
            redirect_uri: LINK_REDIRECT_URI,
        });

        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        user.googleId = googleId;
        if (email_verified) user.googleEmail = email;
        await user.save();

        return res.redirect(`http://localhost:5173/profile/${userId}?linked=success`);

    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed', message: error.message });
    }
}
