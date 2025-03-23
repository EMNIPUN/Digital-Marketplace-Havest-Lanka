var sessions = 0

export const IncreseActiveSessions = () => {
    if (sessions >= 0) {
        sessions++
    }
}

export const DecreaseActiveSessions = () => {
    if (sessions > 0) {
        sessions--
    }
}

export const ReturnActiveSessions = () => {
    return sessions
}