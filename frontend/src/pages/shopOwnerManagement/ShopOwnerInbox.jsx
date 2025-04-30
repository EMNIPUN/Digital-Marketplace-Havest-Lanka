import React, { useEffect, useState } from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopOwnerInbox() {
   const navigate = useNavigate();

   // get inbpx details
   const [inboxData, setInboxData] = useState([]);

   const getInboxData = async () => {
      await axios
         .get("http://localhost:8005/api/chat/getInboxDetails")
         .then((response) => {
            setInboxData(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      getInboxData();
   }, []);

   return (
      <div className="p-[20px]">
         <div className="w-full p-5 bg-white shadow-sm border border-gray-200 rounded-sm">
            <div className="px-5 py-4 border-b">
               <h2 className="text-xl font-semibold text-gray-700">Inbox</h2>
            </div>

            <div className="divide-y">
               {inboxData.map((chat) => (
                  <div
                     className="flex items-center px-5 py-4 hover:bg-gray-50 cursor-pointer"
                     key={chat.id}
                     onClick={() =>
                        navigate("/shopOwner/inbox/chat", {
                           state: {
                              chatName: chat.chatName,
                           },
                        })
                     }
                  >
                     <img
                        src={Profile}
                        className="w-10 h-10 rounded-full"
                        alt="User"
                     />
                     <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                           <h3 className="font-semibold text-sm text-gray-800">
                              {chat.chatName}
                           </h3>
                           <div className="flex items-center justify-center gap-2">
                              {chat.unread && (
                                 <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                              )}

                              <span className="text-xs text-gray-500">
                                 {chat.time}
                              </span>
                           </div>
                        </div>
                        <p className="text-sm tracking-wide text-gray-500 w-4/5">
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
