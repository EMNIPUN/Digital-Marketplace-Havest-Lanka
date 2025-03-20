import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const PieChartX = ({ percentage, name, color1, color2 }) => {
    const data = [
        { name: "Filled", value: percentage },
        { name: "Remaining", value: 100 - percentage },
    ];

    return (
        <div className="text-center">
            {/* Pie Chart */}
            <div className="relative inline-block">
                <PieChart width={100} height={100}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        <Cell key="cell-1" fill={color1} />
                        <Cell key="cell-2" fill={color2} />
                    </Pie>
                </PieChart>

                {/* Center Percentage */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-900">
                    {percentage}%
                </div>
            </div>

            {/* Chart Name */}
            <p className="mt-2 text-[12px] font-semibold text-gray-700">{name}</p>
        </div>
    );
};

export default PieChartX;
