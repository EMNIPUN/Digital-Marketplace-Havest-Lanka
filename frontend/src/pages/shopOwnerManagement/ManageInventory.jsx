import React from "react";

function ManageInventory(props) {
   const { setIsClickAddItem } = props;

   return (
      <div className="p-[20px]">
         <div class=" bg-white p-5 shadow-sm rounded-sm border border-gray-200 ">
            <div class="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
               <h2 class="text-xl font-semibold text-gray-800">
                  Manage Inventory
               </h2>
               <button
                  onClick={() => setIsClickAddItem(true)}
                  class="bg-main-green text-white px-4 py-2 rounded-sm hover:bg-green-600"
               >
                  + Add Item
               </button>
            </div>

            <div class="overflow-x-auto">
               <table class="w-full border-collapse bg-white rounded-sm shadow-sm text-left">
                  <thead>
                     <tr class=" text-gray-700 border-b border-gray-200">
                        <th class="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Item Name
                        </th>
                        <th class="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Category
                        </th>
                        <th class="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Quantity
                        </th>
                        <th class="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Price
                        </th>
                        <th class="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="text-gray-500 text-sm divide-y">
                     <tr class="border-b">
                        <td class="px-3 py-2">Fresh Apples</td>
                        <td class="px-3 py-2">Fruits</td>
                        <td class="px-3 py-2">50 kg</td>
                        <td class="px-3 py-2">$40</td>
                        <td class="px-3 py-2 flex justify-start gap-1">
                           <button class="bg-sec-green text-white px-3 py-2 rounded ">
                              <i class="bi bi-pencil-fill"></i>
                           </button>
                           <button class="bg-gray-500 text-white px-3 py-2 rounded ">
                              <i class="bi bi-trash-fill"></i>
                           </button>
                        </td>
                     </tr>
                     <tr class="border-b">
                        <td class="px-3 py-2">Pumkings</td>
                        <td class="px-3 py-2">Vegitables</td>
                        <td class="px-3 py-2">120 kg</td>
                        <td class="px-3 py-2">$40</td>
                        <td class="px-3 py-2 flex justify-start gap-1">
                           <button class="bg-sec-green text-white px-3 py-2 rounded ">
                              <i class="bi bi-pencil-fill"></i>
                           </button>
                           <button class="bg-gray-500 text-white px-3 py-2 rounded ">
                              <i class="bi bi-trash-fill"></i>
                           </button>
                        </td>
                     </tr>
                     <tr class="border-b">
                        <td class="px-3 py-2">Organic Carrots</td>
                        <td class="px-3 py-2">Vegitables</td>
                        <td class="px-3 py-2">35 kg</td>
                        <td class="px-3 py-2">$23</td>
                        <td class="px-3 py-2 flex justify-start gap-1">
                           <button class="bg-sec-green text-white px-3 py-2 rounded ">
                              <i class="bi bi-pencil-fill"></i>
                           </button>
                           <button class="bg-gray-500 text-white px-3 py-2 rounded ">
                              <i class="bi bi-trash-fill"></i>
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default ManageInventory;
