import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BASE_URL } from "../../BaseUrl";

function LineChartX() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/admin/sysload`);

                // Create a full week template with all days set to 0 requests
                const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const fullWeekData = weekDays.map(day => ({ name: day, requests: 0 }));

                // Transform backend data
                const backendData = response.data.map(entry => ({
                    name: new Date(entry.date).toLocaleDateString("en-US", { weekday: "long" }),
                    requests: entry.requestCount,
                }));

                // Merge backend data with full week data
                const mergedData = fullWeekData.map(day => {
                    const existingData = backendData.find(d => d.name === day.name);
                    return existingData ? existingData : day;
                });

                setChartData(mergedData);
            } catch (error) {
                console.error("Error fetching system load:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData} margin={{ left: 25, right: 25, top: 5 }}>
                <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: "12px" }} interval={0} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineChartX;
