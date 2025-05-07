import React, { useEffect, useState } from "react";
import Token from "../userManagement/logins/Token";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatInterface from "./ChatInterface";
import { ToastContainer, toast } from "react-toastify";

function OrderDetails(props) {
   const {
      orderId,
      farmer,
      farmerId,
      product,
      quantity,
      status,
      price,
      goToPayment,
      postId,
      getAllBids,
   } = props;

   const token = Token();
   const sid = token.userId;

   const [paymentData, setPaymentData] = useState([]);
   const [currentStatus, setCurrentStatus] = useState(status);

   const getPaymentDetails = async () => {
      try {
         const response = await axios.get(
            `http://localhost:8005/api/getPaymentByOrderId/${orderId}`
         );
         setPaymentData(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getPaymentDetails();
   }, [orderId]);

   const notifyComplete = () => {
      toast("Congratulations! You successfully Completed the order", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: "#108a01",
            color: "#fff",
         },
      });
   };

   const updateBidStatus = async () => {
      try {
         await axios.put(`http://localhost:8005/api/bid/updateBid/${orderId}`, {
            status: "Payment Approved",
         });
         await axios.put(`http://localhost:8005/api/BidPost/${postId}`, {
            status: "Payment Approved",
         });
         setCurrentStatus("Payment Approved");
         getAllBids();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (paymentData.length > 0 && currentStatus === "Accepted") {
         updateBidStatus();
      }
   }, [paymentData]);

   const [isShowInbox, setIsShowInbox] = useState(false);

   const completeBid = async () => {
      try {
         await axios.put(`http://localhost:8005/api/bid/updateBid/${orderId}`, {
            status: "complete",
         });
         await axios.put(`http://localhost:8005/api/BidPost/${postId}`, {
            status: "complete",
         });
         setCurrentStatus("complete");
         notifyComplete();
         getAllBids();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <tr className="hover:bg-gray-50 transition duration-150">
            <td className="px-6 py-4 ">
               <div className="flex items-center">
                  <div className="">
                     <div className="text-sm font-medium text-gray-900">
                        {farmer}
                     </div>
                  </div>
               </div>
            </td>
            <td className="px-6 py-4">
               <div className="text-sm text-gray-900">{product}</div>
               <div className="text-xs text-gray-500">{quantity}kg package</div>
            </td>
            <td className="px-6 py-4 ">
               <div className="text-sm font-semibold text-gray-900">
                  LKR {price * quantity}
               </div>
            </td>
            <td className="px-6 py-4 ">
               {currentStatus === "Accepted" ? (
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                     <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5 mt-1"></span>
                     Bid Accepted
                  </span>
               ) : currentStatus === "Payment Approved" ? (
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-800/90 text-gray-100">
                     <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5 mt-1"></span>
                     Payment done
                  </span>
               ) : currentStatus === "On Delivery" ? (
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-main-green text-gray-100">
                     <span className="h-2 w-2 rounded-full bg-light-green mr-1.5 mt-1"></span>
                     On Delivery
                  </span>
               ) : currentStatus === "complete" ? (
                  <span className="text-green-700 font-semibold text-sm">
                     🎉 Successfully Completed the Order
                  </span>
               ) : (
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                     <span className="h-2 w-2 rounded-full bg-gray-600 mr-1.5 mt-1"></span>
                     Pending Bid
                  </span>
               )}
            </td>
            {currentStatus !== "complete" && (
               <>
                  {currentStatus !== "pending" ? (
                     <td
                        className="py-6 px-4 cursor-pointer hover:text-gray-800"
                        onClick={() => setIsShowInbox(true)}
                     >
                        <i className="bi bi-envelope"></i>
                     </td>
                  ) : (
                     <td className="py-6 px-4 cursor-pointer hover:text-gray-800">
                        <i className="bi bi-envelope text-gray-300"></i>
                     </td>
                  )}

                  {isShowInbox && (
                     <td>
                        <ChatInterface
                           farmer={farmer}
                           orderId={orderId}
                           shopOwnerId={sid}
                           farmerId={farmerId}
                           setIsShowInbox={setIsShowInbox}
                        />
                     </td>
                  )}

                  <td className="px-6 py-4 ">
                     {currentStatus === "Accepted" ? (
                        <button
                           onClick={() =>
                              goToPayment(
                                 orderId,
                                 product,
                                 price * quantity,
                                 () => {
                                    getPaymentDetails();
                                 }
                              )
                           }
                           className="text-xs bg-sec-green text-white py-2 px-4 rounded-sm w-24"
                        >
                           Pay Now
                        </button>
                     ) : currentStatus === "Payment Approved" ? (
                        <button
                           disabled
                           className="text-xs bg-gray-400 text-white py-2 px-4 rounded-sm w-24"
                        >
                           Waiting
                        </button>
                     ) : currentStatus === "On Delivery" ? (
                        <button
                           onClick={completeBid}
                           className="text-xs bg-main-green text-white py-2 px-4 rounded-sm w-24"
                        >
                           Complete
                        </button>
                     ) : (
                        <button
                           disabled
                           className="text-xs bg-gray-400 text-white py-2 px-4 rounded-sm w-24"
                        >
                           Pay Now
                        </button>
                     )}
                  </td>
               </>
            )}
         </tr>
         <ToastContainer />
      </>
   );
}

export default OrderDetails;
