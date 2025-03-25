import { motion } from "framer-motion";
import ServerInfoProvider from "./ServerInfoProvider";
import { Server, Cpu, MemoryStick, HardDrive, Network, Database, Thermometer, BatteryCharging, Activity, Globe, Layers, HardDriveDownload } from "lucide-react";

const ServerInfo = () => {
    return (
        <ServerInfoProvider>
            {(serverData) => {
                const formattedData = {
                    os: serverData.osType || "Unknown OS",
                    processor: serverData.processor || "Unknown Processor",
                    ram: `${serverData.ramUsage || 0}% Used`,
                    disk: `${serverData.diskUsage || 0}% Used`,
                    ip: { public: "192.168.1.1", private: "10.0.0.1" }, // IP remains unchanged
                    database: "MongoDB", // Updated to MongoDB
                    temperature: `${serverData.swapMemory || "N/A"} GB`,
                    powerStatus: serverData.powerStatus || "Unknown Power Status",
                    hostname: "localhost", // Updated hostname
                    cpuLoad: `${serverData.cpuUsage || 0}%`,
                    totalProcesses: serverData.totalProcessos || "N/A",
                    swapMemory: `${serverData.swapMemory || "N/A"} GB Used`,
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
                                { icon: <Server className="text-blue-400" size={28} />, label: "Operating System", value: formattedData.os },
                                { icon: <Cpu className="text-yellow-400" size={28} />, label: "Processor", value: formattedData.processor },
                                { icon: <MemoryStick className="text-green-400" size={28} />, label: "RAM Usage", value: formattedData.ram },
                                { icon: <HardDrive className="text-purple-400" size={28} />, label: "Disk Space", value: formattedData.disk },
                                { icon: <Network className="text-orange-400" size={28} />, label: "IP Address", value: `Public: ${formattedData.ip.public}, Private: ${formattedData.ip.private}` },
                                { icon: <Database className="text-red-400" size={28} />, label: "Database Server", value: formattedData.database },
                                { icon: <Thermometer className="text-pink-400" size={28} />, label: "System Temperature", value: formattedData.temperature },
                                { icon: <BatteryCharging className="text-teal-400" size={28} />, label: "Power Status", value: formattedData.powerStatus },
                                { icon: <Globe className="text-indigo-400" size={28} />, label: "Hostname", value: formattedData.hostname },
                                { icon: <Activity className="text-yellow-500" size={28} />, label: "CPU Load", value: formattedData.cpuLoad },
                                { icon: <Layers className="text-cyan-400" size={28} />, label: "Total Processes", value: formattedData.totalProcesses },
                                { icon: <HardDriveDownload className="text-purple-500" size={28} />, label: "Swap Memory", value: formattedData.swapMemory },
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
            }}
        </ServerInfoProvider>
    );
};

export default ServerInfo;
