import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Sunday", requests: 200 },
    { name: "Monday", requests: 450 },
    { name: "Tuesday", requests: 650 },
    { name: "Wednesday", requests: 350 },
    { name: "Thursday", requests: 500 },
    { name: "Friday", requests: 400 },
    { name: "Saturday", requests: 600 },
];

function LineChartX() {
    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data} margin={{ left: 25, right: 25 }}>
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
