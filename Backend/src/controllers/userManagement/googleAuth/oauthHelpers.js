import crypto from "crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

export const exchangeCodeForProfile = async ({ code, codeVerifier, redirect_uri }) => {
    const { tokens } = await oauth2Client.getToken({ code, codeVerifier, redirect_uri });

    const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket.getPayload();
};

export const generatePkcePair = () => {
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
    return { codeVerifier, codeChallenge };
};

export const signOAuthState = (payload) => {
    return jwt.sign(payload, process.env.GOOGLE_OAUTH_STATE_SECRET, { expiresIn: "5m" });
};

export const verifyOAuthState = (token) => {
    return jwt.verify(token, process.env.GOOGLE_OAUTH_STATE_SECRET);
};

export const OAUTH_COOKIE_NAME = "g_oauth_txn";

export const oauthCookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 5 * 60 * 1000,
};
