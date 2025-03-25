import express from 'express'
import os from 'os'
import si from 'systeminformation'

const ServerInfo = async (req, res) => {
    try {
        const cpuUsage = await getCpuUsage()
        const memUsage = await getRamUsage()
        const diskUsage = await getDiskUsage()
        const powerStatus = await getPowerStatus()
        const domain = await getDomainName()
        const totalProcessos = await getTotalProcesses()
        const swapMemory = await getSwapUsage()

        let data = {
            upTime: getUpTime(),
            cpuUsage: cpuUsage,
            ramUsage: memUsage,
            diskUsage: diskUsage,
            osType: getOsType(),
            processor: getProcessor(),
            powerStatus: powerStatus,
            domain: domain,
            totalProcessos: totalProcessos,
            swapMemory: swapMemory
        };

        res.status(200).json({ data: data })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};

const getUpTime = () => {
    let totalSeconds = process.uptime()
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds % 3600) / 60)
    let seconds = Math.floor(totalSeconds % 60)

    return `${hours}h ${minutes}m`
};

const getCpuUsage = async () => {
    const cpuLoad = await si.currentLoad()
    return cpuLoad.currentLoad.toFixed(2)
};

const getRamUsage = async () => {
    const ram = await si.mem()
    return ((ram.used / ram.total) * 100).toFixed(2)
}

const getDiskUsage = async () => {
    const disk = await si.fsSize()
    return (((disk[0].used / disk[0].size) * 100).toFixed(2))
}

const getOsType = () => {
    return os.type()
}

const getProcessor = () => {
    const cpus = os.cpus()
    return cpus[0].model
}

const getPowerStatus = async () => {
    try {
        const battery = await si.battery()

        if (!battery.hasBattery) return "No Battery"
        return battery.isCharging ? "On Charging" : "On Battery Power"
    } catch (error) {
        console.error('Error fetching power status:', error)
        return "Unknown Power Status"
    }
}

const getDomainName = async () => {
    return await si.osInfo().then(data => `Domain Name: ${data.domain || 'localhost'}`)
}
const getTotalProcesses = async () => {
    try {
        const processData = await si.processes()
        return processData.all
    } catch (error) {
        console.error('Error fetching process count:', error)
    }
}

const getSwapUsage = async () => {
    try {
        const mem = await si.mem()
        if (mem.swaptotal === 0) return "No Swap Memory Available"

        const swapUsage = ((mem.swapused / mem.swaptotal) * 100).toFixed(2)
        return swapUsage
    } catch (error) {
        return "Error retrieving swap data";
    }
}

export default ServerInfo
