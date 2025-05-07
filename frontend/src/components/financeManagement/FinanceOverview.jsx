import { useEffect, useState } from "react";
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
import SalesChart from "./SalesChart";
import axios from "axios";


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

   const [totalAmount, setTotalAmount] = useState(0);
   const [totalCount, setTotalCount] = useState(0);

   useEffect(() => {
   axios.get('http://localhost:8005/api/all-payments')
      .then((response) => {
         const successfulPayments = response.data.filter(p => p.status_code === '2');
         
         let tot = 0
         let count = successfulPayments.length
         setTotalCount(count)
        

         successfulPayments.forEach(payment => {
            tot += parseFloat(payment.payhere_amount); // convert string to float
          });

         setTotalAmount(tot);
      })
      .catch(err => console.error('Error fetching data:', err));
   }, [])

   
   console.log(totalAmount)
   console.log(totalCount)

   const [selectedDateRange, setSelectedDateRange] = useState("week");

   const metrics = [
      { title: "Total Revenue", value: `Rs.${totalAmount}`},
      { title: "Average Order Value", value: `Rs.${(totalAmount/totalCount).toFixed(2)}`},
      { title: "Total Orders", value: totalCount}
     
   ];

   return (
      <>
         
         <FinanceNavBar />
         <FinanceSidebar />

         {/* Top Stats */}
         <div className="bg-gray-100 p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
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
                        
                     </div>
                  </div>
               ))}
            </div>
           
         </div>

         <SalesChart/>
         
         <FinanceFooter />
      </>
   );
}
