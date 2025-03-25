import React, { useEffect, useState } from "react";
import ThreeDots from "../../../../assets/userManagement/threeDots.svg";
import PieChartX from "./PieChartX";
import LineChartX from "./LineChartX"; // Import Line Chart Component
import { ArrowDownToLine } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";

function Card2({ cardName, chartType }) {

    const [farmerPercentage, setFarmerPercentage] = useState({})
    const [shopPercentage, setShopPercentage] = useState({})
    const [driverPercentage, setDriverPercentage] = useState({})

    useEffect(() => {
        const fetchPercentages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/admin/piechartdata`);
                setFarmerPercentage(response.data.farmerPercentage || 0);
                setShopPercentage(response.data.shopOwnerPercentage || 0);
                setDriverPercentage(response.data.driverPercentage || 0);
            } catch (e) {
                console.log(`Error fetching pie chart data: ${e.message}`);
            }
        };

        fetchPercentages();
    }, []);


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
                    <div className="flex flex-col items-center justify-between">
                        <div className="flex justify-around w-full">
                            <PieChartX percentage={farmerPercentage} name="Farmer Accounts" color1="#FF6B6B" color2="#FEECEC" />
                            <PieChartX percentage={shopPercentage} name="Shop Owner Accounts" color1="#17C964" color2="#DFF5E9" />
                            <PieChartX percentage={driverPercentage} name="Driver Accounts" color1="#2D9CDB" color2="#D6EBFA" />
                        </div>
                        <div>
                            <p className="mt-6 text-xs ">Compared with all accounts</p>
                        </div>
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
