import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Payform() {
   const location = useLocation();
   const hash = location.state.hash;

   // State for inputs
   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      phone: "",
   });

   // State for errors
   const [errors, setErrors] = useState({
      first_name: "",
      last_name: "",
      phone: "",
   });

   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

   // Check if any errors exist in the form
   const checkErrors = () => {
      if (errors.first_name || errors.last_name || errors.phone) {
         setIsButtonDisabled(true); // Disable button if there's any error
      } else {
         setIsButtonDisabled(false); // Enable button if no errors
      }
   };

   // Function to handle input changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      // Validation logic
      let error = "";
      if (name === "first_name" || name === "last_name") {
         if (!value.trim()) {
            error = "This field is required.";
         } else if (!/^[A-Za-z]+$/.test(value)) {
            error = "Only letters are allowed.";
         }
      } else if (name === "phone") {
         if (!value.trim()) {
            error = "This field is required.";
         } else if (!/^(070|071|072|076|078|074)\d{7}$/.test(value)) {
            error =
               "Must start with 070, 071, 072, 076, 078, 074 and be 10 digits.";
         }
      }

      const newErrors = { ...errors, [name]: error };
      setErrors(newErrors);

      // Check if there are any errors or empty fields
      const hasErrors = Object.values(newErrors).some((error) => error !== "");
      const hasEmptyFields = Object.values(formData).some(
         (value) => !value.trim()
      );
      setIsButtonDisabled(hasErrors || hasEmptyFields);
   };

   return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
         <h1>Hash is: {hash}</h1>

         <form
            method="post"
            action="https://sandbox.payhere.lk/pay/checkout"
            className="flex flex-col gap-6"
         >
            {/* Hidden inputs */}
            <input type="hidden" name="merchant_id" value="1229892" />
            <input
               type="hidden"
               name="return_url"
               value="http://localhost:5173/shopowner"
            />
            <input
               type="hidden"
               name="cancel_url"
               value="http://localhost:5173/shopowner"
            />
            <input
               type="hidden"
               name="notify_url"
               value="https://019c-124-43-209-182.ngrok-free.app/api/payment"
            />
            <input type="hidden" name="country" value="Sri Lanka" />
            <input type="hidden" name="hash" value={hash} />

            {/* Item Details Section */}
            <div>
               <h3 className="text-green-700 mb-4 text-lg font-semibold">
                  Item Details
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        Order ID
                     </label>
                     <input
                        type="text"
                        name="order_id"
                        className="p-2 border border-green-300 rounded-md"
                        value={location.state.orderid}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">Items</label>
                     <input
                        type="text"
                        name="items"
                        className="p-2 border border-green-300 rounded-md "
                        value={location.state.items}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        Currency
                     </label>
                     <input
                        type="text"
                        name="currency"
                        defaultValue="LKR"
                        className="p-2 border border-green-300 rounded-md"
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        Amount (Rs.)
                     </label>
                     <input
                        type="text"
                        name="amount"
                        className="p-2 border border-green-300 rounded-md"
                        value={location.state.amount}
                     />
                  </div>
               </div>
            </div>

            {/* Customer Details Section */}
            <div>
               <input name="custom_1" value="customer1" hidden />
               <h3 className="text-green-700 mb-4 text-lg font-semibold">
                  Customer Details
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        First Name
                     </label>
                     <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-200"
                     />
                     {errors.first_name && (
                        <p className="text-red-500 text-sm">
                           {errors.first_name}
                        </p>
                     )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        Last Name
                     </label>
                     <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-200"
                     />
                     {errors.last_name && (
                        <p className="text-red-500 text-sm">
                           {errors.last_name}
                        </p>
                     )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">Email</label>
                     <input
                        type="email"
                        name="email"
                        required
                        className="p-2 border border-green-300 rounded-md"
                     />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">Phone</label>
                     <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        required
                        className="p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-200"
                     />
                     {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                     )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">
                        Address
                     </label>
                     <input
                        type="text"
                        name="address"
                        required
                        className="p-2 border border-green-300 rounded-md"
                     />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-2">
                     <label className="text-green-500 font-medium">City</label>
                     <input
                        type="text"
                        name="city"
                        required
                        className="p-2 border border-green-300 rounded-md"
                     />
                  </div>
               </div>
            </div>

            <button
               type="submit"
               disabled={isButtonDisabled}
               className={`py-3 px-6 rounded-md text-lg font-medium transition-colors ${
                  isButtonDisabled
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-green-700 hover:bg-green-500 text-white"
               }`}
            >
               Pay Now
            </button>
         </form>
      </div>
   );
}
