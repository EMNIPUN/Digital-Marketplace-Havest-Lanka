import React, { useEffect, useState } from "react";
import axios from "axios";
import Token from "@/components/userManagement/logins/Token";
import { Link, useNavigate } from "react-router-dom";
import Payform from "@/components/financeManagement/Payform";
import md5 from "crypto-js/md5";
import SOLoading from "@/components/shopOwnerManagement/SOLoading";
import OrderDetails from "@/components/shopOwnerManagement/OrderDetails";

function ShopOwnerOrders() {
   // Shop owner details
   const token = Token();
   const sid = token.userId;

   // Get all bids
   const [allBids, setAllBids] = useState([]);

   // LOADING
   const [isLoading, setIsLoading] = useState(false);

   // get order details
   const getAllBids = async () => {
      setIsLoading(true);
      await axios
         .get(`http://localhost:8005/api/bid/getAllbids/${sid}`)
         .then((response) => {
            setAllBids(response.data);
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => setIsLoading(false));
   };

   useEffect(() => {
      getAllBids();
   }, []);

   // set details
   const orderCount = allBids.length;
   const orderAmount = allBids.reduce(
      (x, y) => x + Number(y.price * y.quantity),
      0
   );

   // return to payment page
   const navigate = useNavigate();
   const goToPayment = (id, item, amount) => {
      createHash(id, amount);
      navigate("/payform", {
         state: {
            orderid: id,
            items: item,
            amount: amount,
            hash: createHash(id, amount),
         },
      });
   };

   // careate hash
   const createHash = (id, total) => {
      let merchantSecret =
         "MTMxMjc1MzI4ODMyMTI2MjkzNDgzODAwNTc1MzM3Nzc4NDI1NTE4";
      let merchantId = "1229892";
      let orderId = id;
      let amount = total;
      let hashedSecret = md5(merchantSecret).toString().toUpperCase();
      let amountFormated = parseFloat(amount)
         .toLocaleString("en-us", { minimumFractionDigits: 2 })
         .replaceAll(",", "");
      let currency = "LKR";
      let hash = md5(
         merchantId + orderId + amountFormated + currency + hashedSecret
      );

      return hash.toString().toUpperCase();
   };

   return (
      <div className="p-[20px] w-full text-gray-500 flex flex-col gap-5">
         <div className="py-3 px-5 bg-white w-full flex items-center justify-between shadow-sm border border-gray-200 rounded-sm">
            <div>
               Active Orders - {orderCount} ({orderAmount} LKR)
            </div>
            <div className="border border-gray-200 py-2 px-5 text-sm">
               <p>All Orders</p>
            </div>
         </div>

         <div className="w-full mx-auto bg-white shadow-sm rounded-sm border border-gray-200">
            <div className="overflow-x-auto min-h-52 flex items-center justify-center">
               {isLoading ? (
                  <SOLoading />
               ) : (
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className=" border-b border-gray-200 bg-gray-50">
                           <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Farmer
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
                           <th className="pr-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Inbox
                           </th>
                           <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Operations
                           </th>
                        </tr>
                     </thead>

                     <tbody className="divide-y divide-gray-200 ">
                        {allBids.map((bid) => (
                           <OrderDetails
                              key={bid._id}
                              orderId={bid._id}
                              farmer={bid.farmer}
                              product={bid.product}
                              quantity={bid.quantity}
                              farmerId={bid.farmerId}
                              status={bid.status}
                              price={bid.price}
                              postId={bid.postId}
                              goToPayment={goToPayment}
                           />
                        ))}
                     </tbody>
                  </table>
               )}
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerOrders;
