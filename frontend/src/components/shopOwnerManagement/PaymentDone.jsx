import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function PaymentDone() {
   // Add useEffect to handle animations on component mount
   useEffect(() => {
      const timer = setTimeout(() => {
         const successIcon = document.getElementById("success-icon");
         const confirmationText = document.getElementById("confirmation-text");

         if (successIcon) successIcon.classList.add("scale-100");
         if (confirmationText) confirmationText.classList.add("opacity-100");
      }, 300);

      return () => clearTimeout(timer);
   }, []);

   return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
         <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            {/* Success icon with animation */}
            <div
               id="success-icon"
               className="mb-6 transform scale-0 transition-transform duration-500 ease-out"
            >
               <CheckCircle
                  size={80}
                  className="text-sec-green"
                  strokeWidth={1.5}
               />
            </div>

            {/* Confirmation text with animation */}
            <div
               id="confirmation-text"
               className="text-center space-y-4 opacity-0 transition-opacity duration-500 ease-out"
            >
               <h1 className="text-2xl font-bold text-gray-800">
                  Payment Successful!
               </h1>
               <p className="text-gray-600">
                  Thank you for your payment. Your transaction has been
                  completed successfully.
               </p>
               <div className="border-t border-gray-200 my-6 pt-6 w-full">
                  <p className="text-sm text-gray-500">
                     Your order will be processed shortly.
                  </p>
               </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 w-full space-y-4 flex flex-col gap-0">
               <Link to="/shopowner/orders" className="w-full">
                  <button className="w-full flex items-center justify-center bg-main-green hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition duration-200">
                     View My Orders
                  </button>
               </Link>
               <Link to="/shopowner/" className="w-full">
                  <button className="w-full flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md font-medium transition duration-200">
                     Return to Dashboard
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
}

export default PaymentDone;
