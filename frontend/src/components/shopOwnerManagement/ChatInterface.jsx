import React, { useEffect, useRef, useState } from "react";
import { Send, MoreVertical, Smile } from "lucide-react";
import User from "../../assets/shopOwnerManagement/profile.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SOLoading from "./SOLoading";

function ChatInterface(props) {
   const navigate = useNavigate();
   const location = useLocation();
   const { farmer, farmerId, shopOwnerId, orderId, setIsShowInbox } = props;

   const [inputMessage, setInputMessage] = useState("");
   const [messages, setMessages] = useState([]);
   const [loading, setLoading] = useState(false);

   const scrollableRef = useRef(null);

   const getMessageData = async () => {
      setLoading(true);
      try {
         const response = await axios.get(
            `http://localhost:8005/api/message/messages/${orderId}`
         );
         setMessages(response.data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;

      const newMessage = {
         content: inputMessage,
         orderId: orderId,
         sender: "me",
      };

      try {
         await axios.post(
            "http://localhost:8005/api/message/sendMessage",
            newMessage
         );
         setInputMessage("");
         getMessageData();
      } catch (error) {
         console.error("Failed to send message:", error);
      }
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleSendMessage();
      }
   };

   useEffect(() => {
      getMessageData();
   }, []);

   useEffect(() => {
      if (scrollableRef.current) {
         scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
      }
   }, [messages]);

   // close section
   const closeSection = (e) => {
      if (e.target === e.currentTarget) {
         setIsShowInbox(false);
      }
   };

   return (
      <div className=" fixed top-0 left-0 z-[10000] flex  w-full h-screen">
         <div
            onClick={closeSection}
            className="w-4/6 h-screen bg-black/70"
            id="close-inbox"
         ></div>
         <div className="w-2/6 h-screen bg-white  shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-main-green  text-white px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <button className="text-white hover:text-gray-300 transition-colors">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-left"
                     >
                        <path d="m15 18-6-6 6-6" />
                     </svg>
                  </button>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                     <img
                        src={User}
                        alt="User avatar"
                        className="rounded-full"
                     />
                  </div>
                  <div>
                     <h2 className="font-semibold">{farmer}</h2>
                     <p className="text-xs text-gray-200">Online</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <button className="text-white hover:text-gray-300 transition-colors">
                     <MoreVertical size={18} />
                  </button>
               </div>
            </div>

            {loading ? (
               <SOLoading />
            ) : (
               <div
                  ref={scrollableRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
               >
                  {messages.map((msg) => (
                     <div
                        key={msg._id}
                        className={`flex ${
                           msg.sender === "me" ? "justify-end" : "justify-start"
                        }`}
                     >
                        <div className="flex flex-col max-w-[70%]">
                           <div
                              className={`px-4 py-2 rounded-2xl ${
                                 msg.sender === "me"
                                    ? "bg-gray-100 text-gray-700 rounded-br-none"
                                    : "bg-white text-gray-800 shadow-sm rounded-bl-none"
                              }`}
                           >
                              <p className="text-sm">{msg.content}</p>
                           </div>
                        </div>
                        {msg.sender === "me" && (
                           <div className="w-8 h-8 rounded-full bg-sec-green ml-2 flex-shrink-0 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                 ME
                              </span>
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            )}

            {/* Input */}
            <div className="bg-white px-4 py-3 flex items-center gap-2 border-t border-gray-200">
               <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-gray-700 text-sm border border-gray-300"
               />
               <button
                  onClick={handleSendMessage}
                  className="p-3 bg-sec-green text-white rounded-full hover:bg-sec-green transition-colors flex items-center justify-center"
               >
                  <Send size={18} />
               </button>
            </div>
         </div>
      </div>
   );
}

export default ChatInterface;
