import React from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function ShopOwnerOrders() {
   return (
      <div className="p-[20px] w-full text-gray-500 flex flex-col gap-5">
         <div className="py-3 px-5 bg-white w-full flex items-center justify-between shadow-sm border border-gray-200 rounded-sm">
            <div>Active Orders - 0 (0$)</div>
            <div className="border border-gray-200 py-2 px-5 text-sm">
               <p>All Orders</p>
            </div>
         </div>

         <div className="w-full mx-auto bg-white shadow-sm rounded-sm border border-gray-200">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className=" border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Order ID
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Customer
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
                     </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                     <tr className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                           <div className="text-sm font-medium text-sec-green">
                              #ORD12345
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <div className="flex items-center">
                              <div className="h-10 w-10 ">
                                 <img
                                    src={Profile}
                                    className="h-10 w-10 rounded-full object-cover "
                                    alt="buyer"
                                 />
                              </div>
                              <div className="ml-4">
                                 <div className="text-sm font-medium text-gray-900">
                                    Akindu Nayanajith
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    akindu@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm text-gray-900">
                              Organic Tomatoes
                           </div>
                           <div className="text-xs text-gray-500">2kg package</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm font-semibold text-gray-900">
                              LKR 6,000
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <span className="px-3 py-1 inline-flex  text-xs  font-semibold rounded-full bg-green-100 text-green-800">
                              <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5 mt-1"></span>
                              Delivered
                           </span>
                        </td>
                     </tr>

                     <tr className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 ">
                           <div className="text-sm font-medium text-sec-green">
                              #ORD12346
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center">
                              <div className="h-10 w-10 ">
                                 <img
                                    src={Profile}
                                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                    alt="buyer"
                                 />
                              </div>
                              <div className="ml-4">
                                 <div className="text-sm font-medium text-gray-900">
                                    Kasun Perera
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    kasun@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm text-gray-900">
                              Fresh Carrots
                           </div>
                           <div className="text-xs text-gray-500">
                              1.5kg package
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <div className="text-sm font-semibold text-gray-900">
                              LKR 3,600
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <span className="px-3 py-1 inline-flex text-xs  font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <span className="h-2 w-2 rounded-full bg-yellow-600 mr-1.5 mt-1"></span>
                              On Delivery
                           </span>
                        </td>
                     </tr>

                     <tr className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4">
                           <div className="text-sm font-medium text-sec-green">
                              #ORD12347
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <div className="flex items-center">
                              <div className="h-10 w-10 ">
                                 <img
                                    src={Profile}
                                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                    alt="buyer"
                                 />
                              </div>
                              <div className="ml-4">
                                 <div className="text-sm font-medium text-gray-900">
                                    Nuwan Bandara
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    nuwan@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm text-gray-900">Green Beans</div>
                           <div className="text-xs text-gray-500">1kg package</div>
                        </td>
                        <td className="px-6 py-4 ">
                           <div className="text-sm font-semibold text-gray-900">
                              LKR 2,750
                           </div>
                        </td>
                        <td className="px-6 py-4 ">
                           <span className="px-3 py-1 inline-flex text-xs  font-semibold rounded-full bg-red-100 text-red-800">
                              <span className="h-2 w-2 rounded-full bg-red-600 mr-1.5 mt-1"></span>
                              Cancelled
                           </span>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerOrders;
