import React from "react";
import { motion } from "framer-motion";
import { Download, Users, Activity, BarChart, Truck, AlertCircle } from "lucide-react";
import axios from "axios";

const reports = [
  { id: 1, icon: <Users className="w-14 h-14 text-blue-600" />, title: "User Registration Report", description: "Tracks the number of new users joining the system.", color: "border-blue-300 bg-blue-400 bg-opacity-20", textColor: "text-blue-700" },
  { id: 2, icon: <Activity className="w-14 h-14 text-green-600" />, title: "System Login Activity Report", description: "Monitors login frequency and peak usage times.", color: "border-green-300 bg-green-400 bg-opacity-20", textColor: "text-green-700", colSpan: 2 },
  { id: 3, icon: <BarChart className="w-14 h-14 text-purple-600" />, title: "Market Trends Report", description: "Analyzes demand and supply trends in the market.", color: "border-purple-300 bg-purple-400 bg-opacity-20", textColor: "text-purple-700", rowSpan: 2 },
  { id: 4, icon: <Truck className="w-14 h-14 text-orange-600" />, title: "Transport Requests Report", description: "Logs all transportation requests made by farmers.", color: "border-orange-300 bg-orange-400 bg-opacity-20", textColor: "text-orange-700", colSpan: 2 },
  { id: 5, icon: <AlertCircle className="w-14 h-14 text-red-600" />, title: "User Complaints Report", description: "Lists reported complaints and their resolution status.", color: "border-red-300 bg-red-400 bg-opacity-20", textColor: "text-red-700" },
  { id: 6, icon: <BarChart className="w-14 h-14 text-indigo-600" />, title: "Bidding Success Rate Report", description: "Shows how many bids were successfully completed.", color: "border-indigo-300 bg-indigo-400 bg-opacity-20", textColor: "text-indigo-700", colSpan: 4 },
];

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

function ReportsGrid() {

  const userRegistrationReportDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8005/api/admin/report/user-registration`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user_registration_report.pdf'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log("Error downloading user registration report: " + e.message);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" className="grid grid-cols-4 grid-rows-3 w-full h-full gap-6 p-6">
      {reports.map(({ id, icon, title, description, color, textColor, colSpan, rowSpan }, index) => (
        <motion.div
          key={id}
          variants={cardVariants}
          custom={index}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          className={`shadow-md rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 ${color} ${colSpan ? `col-span-${colSpan}` : ""} ${rowSpan ? `row-span-${rowSpan}` : ""}`}
        >
          {icon}
          <h3 className="font-bold text-md mt-3">{title}</h3>
          <p className="text-[12px] text-gray-700">{description}</p>
          <button
            onClick={title === "User Registration Report" ? userRegistrationReportDownload : null}
            className={`mt-3 ${textColor} font-semibold hover:underline flex items-center gap-2`}
          >
            <Download className="w-6 h-6" /> Download
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ReportsGrid;
