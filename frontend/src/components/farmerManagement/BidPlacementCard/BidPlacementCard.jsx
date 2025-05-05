import React, { useEffect, useState } from "react";
import { MailPlus, PhoneOutgoing, Package, CheckCircle } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ChatInterfaceFarmer from "@/components/shopOwnerManagement/ChatInterfaceFarmer";

function BidPlacementCard({ bidplacementDetails }) {
   const navigate = useNavigate();

   const [status, setStatus] = useState({});

   const notifyAdd = () => {
      toast("Bid Accepted Successfully!", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: " #108a01",
            color: "#fff",
         },
      });
   };

   const getBidDetails = async () => {
      await axios
         .get(`http://localhost:8005/api/BidPost/${bidplacementDetails.postId}`)
         .then((response) => {
            setStatus(response.data);
         })
         .catch((error) => {
            console.error("Error fetching bid status:", error);
         });
   };

   useEffect(() => {
      getBidDetails();
   }, []);

   const handleAcceptBid = async (e) => {
      e.preventDefault();

      try {
         await axios.put(
            `http://localhost:8005/api/bid/updateBid/${bidplacementDetails._id}`,
            { status: "Accepted" }
         );

         await axios
            .put(
               `http://localhost:8005/api/BidPost/${bidplacementDetails.postId}`,
               { status: "Payment Pending" }
            )
            .then((response) => console.log("Update response:", response.data))
            .catch((error) => console.error("Update error:", error));
         notifyAdd();
         getBidDetails();

         console.log("Bid Accepted Successfully");
      } catch (error) {
         console.error("Error updating bid status:", error);
      }
   };

   const [viewInbox, setViewInbox] = useState(false);

   return (
      <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
         <div className="flex justify-between items-center gap-4">
            <div className="mb-3 flex-col items-center gap-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                     Saman Kumara
                  </h3>
                  <span className="ml-2 text-xs text-gray-500">
                     ( 3 hours ago )
                  </span>
               </div>
               <div className="flex items-center gap-2 mt-6">
                  <MailPlus className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-500">samankumara@email.com</p>
               </div>
               <div className="flex items-center gap-2 mt-4">
                  <PhoneOutgoing className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-500">+94 712 33 4012</p>
               </div>
               {viewInbox && (
                  <ChatInterfaceFarmer
                     farmerId={bidplacementDetails.farmerId}
                     orderId={bidplacementDetails._id}
                     shopOwnerId={bidplacementDetails.shopOwnerId}
                  />
               )}

               <button
                  className="px-2 py-1 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium rounded-md "
                  onClick={() => setViewInbox(true)}
               >
                  Inbox
               </button>
            </div>

            <div className="w-[1px] h-[100px] bg-gray-300 mt-4"></div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                     <div className="p-2 bg-blue-50 rounded-md">
                        <Package className="text-blue-600 h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                           Quantity
                        </p>
                        <p className="font-semibold text-gray-900">
                           {bidplacementDetails.quantity}kg
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start space-x-3">
                     <div className="p-2 bg-green-50 rounded-md"></div>
                     <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                           Price per kg
                        </p>
                        <p className="font-semibold text-green-600">
                           Rs.{bidplacementDetails.price}.00/kg
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="w-[1px] h-[100px] bg-gray-300 mt-4"></div>

            {status.status === "Active" && (
               <div className="flex items-center justify-center gap-2 mr-20">
                  <button
                     className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md "
                     type="submit"
                     onClick={handleAcceptBid}
                  >
                     Accept Bid
                  </button>
                  <button className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                     Reject Bid
                  </button>
               </div>
            )}
            <ToastContainer />
            {status.status == "Payment Pending" && (
               <div className="flex items-center justify-center  bg-gray-100">
                  <div className="bg-white p-3 text-center max-w-md w-full">
                     <div className="flex justify-center items-center gap-3">
                        <div className="flex justify-center mb-4">
                           <CheckCircle className="text-green-500 w-5 h-5" />
                        </div>
                        <h2 className="text-md font-bold text-gray-800 mb-4">
                           Bid Accepted Successfully
                        </h2>
                     </div>
                     <p className="text-gray-600 mb-6 text-xs">
                        Congratulations! Your bid has been accepted. You can now
                        proceed with the next steps.
                     </p>
                     <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md">
                        <Link to="/farmer/mybids">Continue</Link>
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default BidPlacementCard;
