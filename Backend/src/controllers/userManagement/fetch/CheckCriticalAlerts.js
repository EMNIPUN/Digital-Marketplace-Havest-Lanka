import CriticalAlerts from '../../../models/userManagement/CriticalAltertsSchema.js';
import si from 'systeminformation';

export const CheckCriticalAlerts = async () => {
    try {
        const cpu = await si.currentLoad();
        const memory = await si.mem();
        const disk = await si.fsSize();
        const loadAvg = await si.currentLoad();

        let alerts = [];

        if (cpu.currentLoad > 90) {
            alerts.push({
                title: "High CPU Usage",
                message: `CPU usage has exceeded 90%. Current: ${cpu.currentLoad.toFixed(2)}%`,
                type: "CPU",
                seen: false
            });
        }

        const ramUsage = (memory.used / memory.total) * 100;
        if (ramUsage > 90) {
            alerts.push({
                title: "High RAM Usage",
                message: `RAM usage has exceeded 90%. Current: ${ramUsage.toFixed(2)}%`,
                type: "Memory",
                seen: false
            });
        }

        if (disk.length > 0 && disk[0].available < 10 * 1024 * 1024 * 1024) { // Less than 10GB free
            alerts.push({
                title: "Low Disk Space",
                message: `Disk space is critically low. Available: ${(disk[0].available / (1024 * 1024 * 1024)).toFixed(2)} GB`,
                type: "Disk",
                seen: false
            });
        }

        if (loadAvg.avgLoad > 5) {
            alerts.push({
                title: "High System Load",
                message: `System load average is too high. Current: ${loadAvg.avgLoad.toFixed(2)}`,
                type: "System",
                seen: false
            });
        }

        if (alerts.length > 0) {
            const alertDocs = alerts.map(alert => ({
                ...alert,
                date: new Date().toISOString()
            }));
            await CriticalAlerts.insertMany(alertDocs);
            console.log(`🔴 ${alerts.length} critical alerts logged.`);
        }

    } catch (error) {
        console.error("Error checking system alerts:", error.message);
    }
};

export const getCriticalAlerts = async (req, res) => {
    try {
        const alerts = await CriticalAlerts.find().sort({ date: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAlertAsSeen = async (req, res) => {
    try {
        const { id } = req.body;
        await CriticalAlerts.findByIdAndUpdate(id, { seen: true });
        res.status(200).json({ message: "Alert marked as seen." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

setInterval(CheckCriticalAlerts, 60000);
export default CheckCriticalAlerts