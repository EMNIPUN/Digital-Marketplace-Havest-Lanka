import React, { useEffect, useState } from "react";
import axios from "axios";
import FinanceFooter from "./FinanceFooter";
import FinanceNavBar from "./FinanceNavBar";
import FinanceSidebar from "./FinanceSidebar";

export default function () {
   const [transactions, setTransactions] = useState([]);

   useEffect(() => {
      
      axios
         .get("http://localhost:8005/api/all-payments")
         .then((response) => {
            
            setTransactions(response.data);
         })
         .catch((error) => {
            console.error("Error fetching transactions", error);
         });
   }, []);

   return (
      <>
         <div className="bg-gray-100 p-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
               Payment Transactions
            </h2>

            

            {/* Transaction Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
               <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">
                     Total Transactions
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                     {transactions.length}
                  </p>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">
                     Total Amount
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                     {transactions
                        .reduce(
                           (total, txn) =>
                              total + parseFloat(txn.payhere_amount),
                           0
                        )
                        .toFixed(2)}
                  </p>
               </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Payment Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                           Status
                        </th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {transactions.map((transaction, index) => (
                        <tr key={index}>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.payment_id}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                 transaction.createdAt
                              ).toLocaleDateString()}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.card_holder_name}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`LKR ${transaction.payhere_amount}`}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.method}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                         transaction.status_code === "2"
                            ? "bg-green-100 text-green-800"
                            : transaction.status_code === "1"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                              >
                                 {transaction.status_message}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
}
