import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LogIn, LogOut, Hammer, Truck, BarChart, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const activityTypes = {
    login: { icon: <LogIn />, color: "bg-[#e0f7f4] text-[#18a889]" },
    logout: { icon: <LogOut />, color: "bg-gray-100 text-gray-600" },
    bidding: { icon: <Hammer />, color: "bg-[#dbe9fd] text-[#0062ff]" },
    transport: { icon: <Truck />, color: "bg-green-100 text-green-600" },
    report: { icon: <BarChart />, color: "bg-purple-100 text-purple-600" },
    security: { icon: <ShieldAlert />, color: "bg-red-100 text-red-600" },
};

const filters = ["All", "Login", "Bidding", "Transport", "Reports", "Security"];

const cardVariants = {
    hidden: { opacity: 0, y: 10 },
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

function ActivityMonitoring() {
    const [activities, setActivities] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(true); // <-- new loading state

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axios.get("http://localhost:8005/api/admin/activity");
                setActivities(res.data);
                console.log(res.data);

            } catch (error) {
                console.error("Failed to fetch activities:", error);
            } finally {
                setLoading(false); // <-- turn off loading after fetch
            }
        };
        fetchActivities();
    }, []);

    const filteredActivities = activities.filter((activity) => {
        const matchesFilter =
            filter === "All" ||
            (filter === "Login" && (activity.type === "login" || activity.type === "logout")) ||
            (filter === "Bidding" && activity.type === "bidding") ||
            (filter === "Transport" && activity.type === "transport") ||
            (filter === "Reports" && activity.type === "report") ||
            (filter === "Security" && activity.type === "security");

        const matchesSearch = search === "" || (activity.user?.name || "").toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <motion.div initial="hidden" animate="visible" className="p-4 bg-gray-50 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Activity Monitoring</h2>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by user"
                        className="px-3 py-2 border rounded-md text-gray-700 focus:ring w-full sm:w-auto"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="px-3 py-2 border rounded-md text-gray-700 focus:ring w-full sm:w-auto"
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

            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <div className="text-blue-600 text-lg font-semibold animate-pulse">Loading activities...</div>
                </div>
            ) : filteredActivities.length === 0 ? (
                <div className="flex justify-center items-center h-60">
                    <div className="text-gray-500 text-lg font-medium">No activities found.</div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredActivities.slice(0, visibleCount).map(({ _id, user, action, target, time, date, type }, index) => (
                            <motion.div
                                key={_id}
                                variants={cardVariants}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-start p-3 rounded-md shadow ${activityTypes[type]?.color}`}
                            >
                                <div className="text-2xl mr-3 mt-1">{activityTypes[type]?.icon}</div>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-sm mb-1">
                                        {user ? (
                                            <Link to={`/profile/${user._id}`} className="text-blue-600 hover:underline">
                                                {user.name}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400 italic">Deleted Account</span>
                                        )}{" "}
                                        <span className="text-gray-700">{action}</span>{" "}
                                        {target && <span className="font-semibold text-gray-600">{target}</span>}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {date} at {time}
                                    </p>

                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {visibleCount < filteredActivities.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                onClick={() => setVisibleCount((prev) => prev + 10)}
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </motion.div>
    );
}

export default ActivityMonitoring;
