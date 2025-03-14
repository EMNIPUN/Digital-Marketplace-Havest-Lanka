import React from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function ShopOwnerInbox() {
   return (
      <div className="p-[20px]">
         <div class="w-full p-5 bg-white shadow-sm border border-gray-200 rounded-sm">
            <div class="px-5 py-4 border-b">
               <h2 class="text-xl font-semibold text-gray-700">Inbox</h2>
            </div>

            <div class="divide-y">
               <div class="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer">
                  <img
                     src={Profile}
                     class="w-10 h-10 rounded-full"
                     alt="User"
                  />
                  <div class="ml-4 flex-1">
                     <div class="flex justify-between items-center">
                        <h3 class="font-medium text-gray-800">
                           Akindu Nayanajith
                        </h3>
                        <div className="flex items-center justify-center gap-2">
                           <span class="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                           <span class="text-xs text-gray-500">2h ago</span>
                        </div>
                     </div>
                     <p class="text-sm text-gray-600 truncate w-4/5">
                        Hey, I'm interested in your services. Can we discuss
                        more?
                     </p>
                  </div>
               </div>

               <div class="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer ">
                  <img
                     src={Profile}
                     class="w-10 h-10 rounded-full"
                     alt="User"
                  />
                  <div class="ml-4 flex-1">
                     <div class="flex justify-between items-center">
                        <h3 class="font-medium text-gray-800">Kasun Perera</h3>
                        <div className="flex items-center justify-center gap-2">
                           <span class="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                           <span class="text-xs text-gray-500">30m ago</span>
                        </div>
                     </div>
                     <p class="text-sm text-gray-600 truncate w-4/5">
                        I have a project requirement. Let's talk.
                     </p>
                  </div>
               </div>

               <div class="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer">
                  <img
                     src={Profile}
                     class="w-10 h-10 rounded-full"
                     alt="User"
                  />
                  <div class="ml-4 flex-1">
                     <div class="flex justify-between items-center">
                        <h3 class="font-medium text-gray-800">Nuwan Bandara</h3>
                        <span class="text-xs text-gray-500">Yesterday</span>
                     </div>
                     <p class="text-sm text-gray-600 truncate w-4/5">
                        Thank you for completing my order! Great work.
                     </p>
                  </div>
               </div>

               <div class="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer">
                  <img
                     src={Profile}
                     class="w-10 h-10 rounded-full"
                     alt="User"
                  />
                  <div class="ml-4 flex-1">
                     <div class="flex justify-between items-center">
                        <h3 class="font-medium text-gray-800">Dilshan Silva</h3>
                        <span class="text-xs text-gray-500">2 days ago</span>
                     </div>
                     <p class="text-sm text-gray-600 truncate w-4/5">
                        I would like to get an update on the progress.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerInbox;
