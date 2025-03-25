import React, { useEffect, useState } from "react";
import axios from "axios";
import Token from "@/components/userManagement/logins/Token";

function ShopOwnerOrders() {
   // Shop owner details
   const token = Token();
   const sid = token.userId;

   // Get all bids
   const [allBids, setAllBids] = useState([]);

   // get order details
   const getAllBids = () => {
      axios
         .get(`http://localhost:8005/api/bid/getAllbids/${sid}`)
         .then((response) => {
            setAllBids(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      getAllBids();
   }, []);

   // set details
   const orderCount = allBids.length;
   const orderAmount = allBids.reduce((x, y) => x + Number(y.price), 0);

   return (
      <div className="p-[20px] w-full text-gray-500 flex flex-col gap-5">
         <div className="py-3 px-5 bg-white w-full flex items-center justify-between shadow-sm border border-gray-200 rounded-sm">
            <div>
               Active Orders - {orderCount} ({orderAmount} LKR)
            </div>
            <div className="border border-gray-200 py-2 px-5 text-sm">
               <p>All Orders</p>
            </div>
         </div>

         <div className="w-full mx-auto bg-white shadow-sm rounded-sm border border-gray-200">
            <div className="overflow-x-auto min-h-36">
               <table className="w-full text-left border-collapse ">
                  <thead>
                     <tr className=" border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Farmer
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Product
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Price
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Status
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Operations
                        </th>
                     </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 ">
                     {allBids.map((bid) => (
                        <tr
                           className="hover:bg-gray-50 transition duration-150"
                           key={bid._id}
                        >
                           <td className="px-6 py-4 ">
                              <div className="flex items-center">
                                 <div className="">
                                    <div className="text-sm font-medium text-gray-900">
                                       Akindu Nayanajith
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                 {bid.product}
                              </div>
                              <div className="text-xs text-gray-500">
                                 {bid.quantity}kg package
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-sm font-semibold text-gray-900">
                                 LKR {bid.price * bid.quantity}
                              </div>
                           </td>
                           <td className="px-6 py-4 ">
                              {bid.status === "Accepted" ? (
                                 <span className="px-3 py-1 inline-flex  text-xs  font-semibold rounded-full bg-green-100 text-green-800">
                                    <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5 mt-1"></span>
                                    Waiting for Payment
                                 </span>
                              ) : (
                                 <span className="px-3 py-1 inline-flex  text-xs  font-semibold rounded-full bg-gray-100 text-gray-600">
                                    <span className="h-2 w-2 rounded-full bg-gray-600 mr-1.5 mt-1"></span>
                                    Pending Bid
                                 </span>
                              )}
                           </td>
                           <td className="px-6 py-4 ">
                              {bid.status === "Accepted" ? (
                                 <button className="text-xs bg-sec-green text-white py-2 px-4 rounded-sm">
                                    Pay Now
                                 </button>
                              ) : (
                                 <button
                                    disabled
                                    className="text-xs bg-gray-400 text-white py-2 px-4 rounded-sm"
                                 >
                                    Pay Now
                                 </button>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerOrders;
