import React from "react";
import User from "../../assets/shopOwnerManagement/user-ico.ico";

function ShopOwnerOrders() {
   return (
      <div className="p-[20px] w-full text-gray-500 flex flex-col gap-5">
         <div className="py-3 px-5 bg-white w-full flex items-center justify-between shadow-sm border border-gray-200 rounded-sm">
            <div>Active Orders - 0 (0$)</div>
            <div className="border border-gray-200 py-2 px-5 text-sm">
               <p>All Orders</p>
            </div>
         </div>

         <div class="w-full mx-auto bg-white shadow-sm rounded-sm border border-gray-200">
            <div class="overflow-x-auto">
               <table class="w-full text-left border-collapse">
                  <thead>
                     <tr class=" border-b border-gray-200">
                        <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Order ID
                        </th>
                        <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Customer
                        </th>
                        <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Product
                        </th>
                        <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Price
                        </th>
                        <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                           Status
                        </th>
                       
                     </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200">
                     <tr class="hover:bg-blue-50 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-medium text-sec-green">
                              #ORD12345
                           </div>
                           
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="flex items-center">
                              <div class="h-10 w-10 flex-shrink-0">
                                 <img
                                    src={User}
                                    class="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                    alt="buyer"
                                 />
                              </div>
                              <div class="ml-4">
                                 <div class="text-sm font-medium text-gray-900">
                                    Akindu Nayanajith
                                 </div>
                                 <div class="text-xs text-gray-500">
                                    akindu@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td class="px-6 py-4">
                           <div class="text-sm text-gray-900">
                              Organic Tomatoes
                           </div>
                           <div class="text-xs text-gray-500">2kg package</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-semibold text-gray-900">
                              LKR 6,000
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <span class="h-2 w-2 rounded-full bg-green-600 mr-1.5 mt-1"></span>
                              Delivered
                           </span>
                        </td>
                       
                     </tr>

                     <tr class="hover:bg-blue-50 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-medium text-sec-green">
                              #ORD12346
                           </div>
                           
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="flex items-center">
                              <div class="h-10 w-10 flex-shrink-0">
                                 <img
                                    src={User}
                                    class="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                    alt="buyer"
                                 />
                              </div>
                              <div class="ml-4">
                                 <div class="text-sm font-medium text-gray-900">
                                    Kasun Perera
                                 </div>
                                 <div class="text-xs text-gray-500">
                                    kasun@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td class="px-6 py-4">
                           <div class="text-sm text-gray-900">
                              Fresh Carrots
                           </div>
                           <div class="text-xs text-gray-500">
                              1.5kg package
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-semibold text-gray-900">
                              LKR 3,600
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <span class="h-2 w-2 rounded-full bg-yellow-600 mr-1.5 mt-1"></span>
                              On Delivery
                           </span>
                        </td>
                       
                     </tr>

                     <tr class="hover:bg-blue-50 transition duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-medium text-sec-green">
                              #ORD12347
                           </div>
                           
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="flex items-center">
                              <div class="h-10 w-10 flex-shrink-0">
                                 <img
                                    src={User}
                                    class="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                    alt="buyer"
                                 />
                              </div>
                              <div class="ml-4">
                                 <div class="text-sm font-medium text-gray-900">
                                    Nuwan Bandara
                                 </div>
                                 <div class="text-xs text-gray-500">
                                    nuwan@example.com
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td class="px-6 py-4">
                           <div class="text-sm text-gray-900">Green Beans</div>
                           <div class="text-xs text-gray-500">1kg package</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <div class="text-sm font-semibold text-gray-900">
                              LKR 2,750
                           </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                           <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              <span class="h-2 w-2 rounded-full bg-red-600 mr-1.5 mt-1"></span>
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
