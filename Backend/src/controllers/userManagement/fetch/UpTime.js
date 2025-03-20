import os from 'os'

export const Uptime = () => {
    const uptime = os.uptime()
    return uptime
}