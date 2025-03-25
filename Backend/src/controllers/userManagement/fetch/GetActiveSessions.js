import { ReturnActiveSessions } from "../ActiveTokens.js"

const GetActiveSessions = async (req, res) => {
    try {
        res.status(200).json({ activeSessions: ReturnActiveSessions() })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export default GetActiveSessions