import { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   ArcElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

import FinanceNavBar from "./FinanceNavBar";
import FinanceSidebar from "./FinanceSidebar";
import FinanceFooter from "./FinanceFooter";

// Register required elements for Chart.js
ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   ArcElement,
   Title,
   Tooltip,
   Legend
);

export default function FinanceOverview() {
   const topSellingProducts = {
      labels: ["Apples", "Tomatoes", "Potatoes", "Oranges", "Carrots"],
      datasets: [
         {
            label: "Units Sold",
            data: [500, 450, 400, 350, 300],
            backgroundColor: [
               "rgba(255, 99, 132, 0.5)",
               "rgba(54, 162, 235, 0.5)",
               "rgba(255, 206, 86, 0.5)",
               "rgba(75, 192, 192, 0.5)",
               "rgba(153, 102, 255, 0.5)",
            ],
         },
      ],
   };

   const profitDistribution = {
      labels: ["Fruits", "Vegetables", "Herbs"],
      datasets: [
         {
            data: [45, 40, 15],
            backgroundColor: [
               "rgba(255, 99, 132, 0.5)",
               "rgba(75, 192, 192, 0.5)",
               "rgba(255, 206, 86, 0.5)",
            ],
         },
      ],
   };

   const salesData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
         {
            label: "Sales (USD)",
            data: [12500, 15000, 18000, 16500, 21000, 22000, 20000],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
         },
      ],
   };

   const [selectedDateRange, setSelectedDateRange] = useState("week");

   const metrics = [
      { title: "Total Revenue", value: "$125,000", change: "+12.5%" },
      { title: "Average Order Value", value: "$750", change: "+5.2%" },
      { title: "Total Orders", value: "167", change: "+8.1%" },
      { title: "Active Customers", value: "45", change: "+15.3%" },
   ];

   return (
      <>
         {/* Ensure Navbar, Sidebar, and Footer don’t have empty img src */}
         <FinanceNavBar />
         <FinanceSidebar />

         {/* Top Stats */}
         <div className="bg-gray-100 p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
               {metrics.map((metric, index) => (
                  <div
                     key={index}
                     className="bg-white p-4 rounded-lg shadow-sm"
                  >
                     <h3 className="text-gray-500 text-sm font-medium">
                        {metric.title}
                     </h3>
                     <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold text-gray-900">
                           {metric.value}
                        </span>
                        <span
                           className={`ml-2 text-sm ${
                              metric.change.startsWith("+")
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {metric.change}
                        </span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
               <select
                  className="px-4 py-2 border rounded-md bg-white"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
               >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
               </select>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
               {/* Sales Trend */}
               <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
                  <div className="h-[300px]">
                     <Line data={salesData} options={{ responsive: true }} />
                  </div>
               </div>

               {/* Top Selling Products */}
               <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                  <h2 className="text-lg font-semibold mb-4">
                     Top Selling Products
                  </h2>
                  <div className="h-[300px]">
                     <Bar
                        data={topSellingProducts}
                        options={{ responsive: true }}
                     />
                  </div>
               </div>

               {/* Profit Distribution */}
               <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                  <h2 className="text-lg font-semibold mb-4">
                     Profit Distribution
                  </h2>
                  <div className="h-[300px]">
                     <Pie
                        data={profitDistribution}
                        options={{ responsive: true }}
                     />
                  </div>
               </div>
            </div>
         </div>

         <FinanceFooter />
      </>
   );
}
