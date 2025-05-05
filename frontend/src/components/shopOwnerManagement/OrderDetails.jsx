import React, { useEffect, useState } from "react";
import Token from "../userManagement/logins/Token";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
   } = props;

   const token = Token();
   const sid = token.userId;

   const navigate = useNavigate();

   // get payment details by order id
   const [paymentData, setPaymentData] = useState([]);

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

   // update payment status
   const updateBidStatus = async () => {
      try {
         await axios.put(`http://localhost:8005/api/bid/updateBid/${orderId}`, {
            status: "Payment Approved",
         });
         await axios.put(`http://localhost:8005/api/BidPost/${postId}`, {
            status: "Payment Approved",
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (paymentData.length > 0 && status !== "paid") {
         updateBidStatus();
      }
   }, [paymentData]);

   return (
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
         <td className="px-6 py-4">
            <div className="text-sm font-semibold text-gray-900">
               LKR {price * quantity}
            </div>
         </td>
         <td className="px-6 py-4 ">
            {status === "Accepted" ? (
               <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5 mt-1"></span>
                  Bid Accepted
               </span>
            ) : status === "Payment Approved" ? (
               <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-800 text-gray-100">
                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5 mt-1"></span>
                  Payment done
               </span>
            ) : (
               <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-gray-600 mr-1.5 mt-1"></span>
                  Pending Bid
               </span>
            )}
         </td>
         <td
            className="py-6 px-4 cursor-pointer hover:text-gray-800"
            onClick={() =>
               navigate("/shopOwner/inbox/chat", {
                  state: {
                     farmer: farmer,
                     orderId: orderId,
                     shopOwnerId: sid,
                     farmerId: farmerId,
                  },
               })
            }
         >
            <i className="bi bi-envelope"></i>
         </td>
         <td className="px-6 py-4 ">
            {status === "Accepted" ? (
               <button
                  onClick={() =>
                     goToPayment(orderId, product, price * quantity)
                  }
                  className="text-xs bg-sec-green text-white py-2 px-4 rounded-sm"
               >
                  Pay Now
               </button>
            ) : status === "Payment Approved" ? (
               <button
                  disabled
                  className="text-xs bg-gray-400 text-white py-2 px-4 rounded-sm"
               >
                  Waiting
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
   );
}

export default OrderDetails;
