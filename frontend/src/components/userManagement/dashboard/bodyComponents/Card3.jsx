import React, { useEffect, useState } from "react";
import axios from "axios";
import CriticalAlert from "./CriticalAlert";
import { BASE_URL } from "../../BaseUrl";

function Card3() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchCriticalAlerts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/admin/critical-alerts`);
                setAlerts(response.data.alerts);
            } catch (error) {
                console.error("Error fetching critical alerts:", error);
            }
        };

        fetchCriticalAlerts();
    }, []);

    return (
        <div className="bg-white shadow-md col-span-8 h-[320px] rounded-lg p-2 overflow-hidden">
            <div className="w-full pb-2">
                <p className="text-[#464255] ml-2 mt-3 text-lg font-semibold">Critical Alerts</p>
            </div>
            <div className="h-full flex flex-col items-center justify-start px-2 relative overflow-y-auto scrollbar-thin scrollbar-thumb-[#0895665b] scrollbar-track-[#ffffff]">
                <div className="before:content-[''] before:block before:h-4"></div>

                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <CriticalAlert key={alert._id} alertData={alert} />
                    ))
                ) : (
                    <p className="text-gray-500">No critical alerts</p>
                )}

                <div className="after:content-[''] after:block after:h-4 mb-4"></div>
            </div>
        </div>
    );
}

export default Card3;
