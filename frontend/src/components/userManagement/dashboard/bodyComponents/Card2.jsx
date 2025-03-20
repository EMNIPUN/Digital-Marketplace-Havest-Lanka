import React from "react";
import ThreeDots from "../../../../assets/userManagement/threeDots.svg";
import PieChartX from "./PieChartX";
import LineChartX from "./LineChartX"; // Import Line Chart Component
import { ArrowDownToLine } from "lucide-react";

function Card2({ cardName, chartType }) {
    return (
        <div className="col-span-6 p-5 bg-white rounded-lg shadow-md relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-md font-semibold text-gray-800">{cardName}</p>
                <img src={ThreeDots} alt="Menu" className="cursor-pointer w-[30px] h-[30px]" />
            </div>

            {/* Charts */}
            <div className="mt-4">
                {chartType === "pie" ? (
                    <div className="flex justify-around">
                        <PieChartX percentage={81} name="Farmer vs. Shop Owner Accounts" color1="#FF6B6B" color2="#FEECEC" />
                        <PieChartX percentage={22} name="Active vs. Inactive Accounts" color1="#17C964" color2="#DFF5E9" />
                        <PieChartX percentage={62} name="Enable vs. Suspended Accounts" color1="#2D9CDB" color2="#D6EBFA" />
                    </div>
                ) : (
                    <div className="flex justify-around">
                        <LineChartX />
                    </div>
                )}
            </div>

            {/* Save Report Button (Only for System Load Chart) */}
            {chartType === "line" && (
                <div className="flex justify-end mt-4 absolute top-0 right-5">
                    <button className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                        <ArrowDownToLine />
                        Save Report
                    </button>
                </div>
            )}
        </div>
    );
}

export default Card2;
