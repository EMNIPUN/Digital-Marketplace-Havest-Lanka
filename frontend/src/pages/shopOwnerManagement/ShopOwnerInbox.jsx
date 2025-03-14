import React from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function ShopOwnerInbox() {
   const inboxMessages = [
      {
         id: 1,
         name: "Akindu Nayanajith",
         message: "Hey, I'm interested in your services. Can we discuss more?",
         time: "2h ago",
         avatar: Profile,
         unread: true,
      },
      {
         id: 2,
         name: "Kasun Perera",
         message: "I have a project requirement. Let's talk.",
         time: "30m ago",
         avatar: Profile,
         unread: true,
      },
      {
         id: 3,
         name: "Nuwan Bandara",
         message: "Thank you for completing my order! Great work.",
         time: "Yesterday",
         avatar: Profile,
         unread: false,
      },
      {
         id: 4,
         name: "Dilshan Silva",
         message: "I would like to get an update on the progress.",
         time: "2 days ago",
         avatar: Profile,
         unread: false,
      },
   ];

   return (
      <div className="p-[20px]">
         <div class="w-full p-5 bg-white shadow-sm border border-gray-200 rounded-sm">
            <div class="px-5 py-4 border-b">
               <h2 class="text-xl font-semibold text-gray-700">Inbox</h2>
            </div>

            <div class="divide-y">
               {inboxMessages.map((chat) => (
                  <div
                     class="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer"
                     key={chat.id}
                  >
                     <img
                        src={Profile}
                        class="w-10 h-10 rounded-full"
                        alt="User"
                     />
                     <div class="ml-4 flex-1">
                        <div class="flex justify-between items-center">
                           <h3 class="font-semibold text-sm text-gray-800">
                              {chat.name}
                           </h3>
                           <div className="flex items-center justify-center gap-2">
                              {chat.unread && (
                                 <span class="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                              )}

                              <span class="text-xs text-gray-500">
                                 {chat.time}
                              </span>
                           </div>
                        </div>
                        <p class="text-sm tracking-wide text-gray-500 w-4/5">
                           {chat.message}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerInbox;
