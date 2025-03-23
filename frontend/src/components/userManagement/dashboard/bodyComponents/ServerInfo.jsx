import { motion } from "framer-motion";
import { Server, Cpu, MemoryStick, HardDrive, Network, Database, Thermometer, BatteryCharging, Activity, MonitorCheck, Layers, RefreshCw, HardDriveDownload, Globe, Code, Settings } from "lucide-react";

const ServerInfo = () => {
    const serverData = {
        os: "Ubuntu 22.04",
        processor: "Intel Xeon E5-2670 (16 cores)",
        ram: "32GB / 64GB Used",
        disk: "500GB / 1TB Used",
        ip: { public: "192.168.1.1", private: "10.0.0.1" },
        database: "MySQL 8.0",
        temperature: "45°C",
        powerStatus: "Running on UPS",
        hostname: "server-001.local",
        cpuLoad: "35%",
        totalProcesses: "152",
        swapMemory: "8GB / 16GB Used",
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto p-8 text-slate-900"
        >
            <h2 className="text-3xl font-bold text-center mb-6">Server Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: <Server className="text-blue-400" size={28} />, label: "Operating System", value: serverData.os },
                    { icon: <Cpu className="text-yellow-400" size={28} />, label: "Processor", value: serverData.processor },
                    { icon: <MemoryStick className="text-green-400" size={28} />, label: "RAM Usage", value: serverData.ram },
                    { icon: <HardDrive className="text-purple-400" size={28} />, label: "Disk Space", value: serverData.disk },
                    { icon: <Network className="text-orange-400" size={28} />, label: "IP Address", value: `Public: ${serverData.ip.public}, Private: ${serverData.ip.private}` },
                    { icon: <Database className="text-red-400" size={28} />, label: "Database Server", value: serverData.database },
                    { icon: <Thermometer className="text-pink-400" size={28} />, label: "System Temperature", value: serverData.temperature },
                    { icon: <BatteryCharging className="text-teal-400" size={28} />, label: "Power Status", value: serverData.powerStatus },
                    { icon: <Globe className="text-indigo-400" size={28} />, label: "Hostname", value: serverData.hostname },
                    { icon: <Activity className="text-yellow-500" size={28} />, label: "CPU Load", value: serverData.cpuLoad },
                    { icon: <Layers className="text-cyan-400" size={28} />, label: "Total Processes", value: serverData.totalProcesses },
                    { icon: <HardDriveDownload className="text-purple-500" size={28} />, label: "Swap Memory", value: serverData.swapMemory },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 p-4 bg-[#334155] rounded-lg shadow-md"
                    >
                        {item.icon}
                        <div>
                            <p className="text-sm text-gray-300">{item.label}</p>
                            <p className="font-semibold text-white">{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ServerInfo;
