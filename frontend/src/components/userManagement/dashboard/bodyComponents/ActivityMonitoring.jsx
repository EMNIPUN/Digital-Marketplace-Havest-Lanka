import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, Hammer, Truck, BarChart, ShieldAlert } from "lucide-react";

const activityTypes = {
    login: { icon: <LogIn />, color: "bg-[#b9fff0] text-[#18a889]" },
    logout: { icon: <LogOut />, color: "bg-gray-100 text-gray-600" },
    bidding: { icon: <Hammer />, color: "bg-[#d5e3f8] text-[#0062ff]" },
    transport: { icon: <Truck />, color: "bg-green-100 text-green-600" },
    report: { icon: <BarChart />, color: "bg-purple-100 text-purple-600" },
    security: { icon: <ShieldAlert />, color: "bg-red-100 text-red-600" },
};

const activities = [
    { id: 8, user: "Bob", action: "created a bid post", target: "Auction Item Z", time: "1:00 PM", date: "2025-03-22", type: "bidding" },
    { id: 7, user: "Alice", action: "placed a bid", target: "Auction Item Y", time: "12:45 PM", date: "2025-03-22", type: "bidding" },
    { id: 6, user: "Unknown", action: "failed login attempt", time: "12:30 PM", date: "2025-03-22", type: "security" },
    { id: 5, user: "Market Analysis", action: "generated a report", time: "12:00 PM", date: "2025-03-22", type: "report" },
    { id: 4, user: "Farmer B", action: "requested transport", time: "11:45 AM", date: "2025-03-22", type: "transport" },
    { id: 3, user: "Shop A", action: "placed a bid", target: "Auction Item X", time: "11:15 AM", date: "2025-03-22", type: "bidding" },
    { id: 2, user: "Jane Smith", action: "logged out", time: "11:00 AM", date: "2025-03-22", type: "logout" },
    { id: 1, user: "John Doe", action: "logged in", time: "10:30 AM", date: "2025-03-22", type: "login" },
];

const filters = ["All", "Login", "Bidding", "Transport", "Reports", "Security"];

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
            ease: "easeOut",
        },
    }),
};

function ActivityMonitoring() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    const filteredActivities = activities.filter((activity) => {
        const matchesFilter =
            filter === "All" ||
            (filter === "Login" && (activity.type === "login" || activity.type === "logout")) ||
            (filter === "Bidding" && activity.type === "bidding") ||
            (filter === "Transport" && activity.type === "transport") ||
            (filter === "Reports" && activity.type === "report") ||
            (filter === "Security" && activity.type === "security");

        const matchesSearch = search === "" || activity.user.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <motion.div initial="hidden" animate="visible" className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Activity Monitoring</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by user"
                        className="px-4 py-2 border rounded-lg text-gray-700 focus:ring"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border rounded-lg text-gray-700 focus:ring"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        {filters.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredActivities.slice(0, visibleCount).map(({ id, user, action, target, time, date, type }, index) => (
                    <motion.div
                        key={id}
                        variants={cardVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center p-4 rounded-lg shadow-md ${activityTypes[type]?.color}`}
                    >
                        <div className="text-2xl mr-4">{activityTypes[type]?.icon}</div>
                        <div>
                            <p className="font-semibold">
                                {user}: <span className="text-gray-700">{action}</span>{" "}
                                {target && <span className="font-semibold text-gray-600">{target}</span>}
                            </p>
                            <p className="text-sm text-gray-500">
                                {date} at {time}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {visibleCount < filteredActivities.length && (
                <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                >
                    Load More
                </button>
            )}
        </motion.div>
    );
}

export default ActivityMonitoring;
