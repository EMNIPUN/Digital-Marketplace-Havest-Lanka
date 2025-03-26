import React, { useEffect, useState } from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";
import axios from "axios";
import Token from "../userManagement/logins/Token";
import { ToastContainer, toast } from "react-toastify";

function CropDetails(props) {
   const {
      setIsClickViewCropDetails,

      product,
      quantity,
      price,
      location,
      description,
      bids,
      farmerId,
      postId,
   } = props;

   // Shop-owner Id
   const token = Token();
   const shopOwnerId = token.userId;

   // close crop details section
   const close = (e) => {
      if (e.target.id === "cropDetailsBg") {
         setIsClickViewCropDetails(false);
      }
   };

   // display bids
   const [bidsData, setBidsData] = useState([]);

   const getBids = async () => {
      await axios
         .get(`http://localhost:8005/api/bid/getbids/${postId}`)
         .then((response) => {
            setBidsData(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      getBids();
   }, []);

   // Notification
   const notifyAdd = () => {
      toast("Bid Placed Successfull!", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: " #108a01",
            color: "#fff",
         },
      });
   };

   // set bid data
   const [bidFormData, setBidFormData] = useState({
      farmerId: farmerId,
      postId: postId,
      shopOwnerId: shopOwnerId,
      product: product,
      quantity: "",
      price: "",
      status: "pending",
   });

   const addBids = async (data) => {
      const payload = {
         farmerId: data.farmerId,
         shopOwnerId: data.shopOwnerId,
         postId: data.postId,
         product: data.product,
         quantity: data.quantity,
         price: data.price,
         status: data.status,
      };

      await axios
         .post("http://localhost:8005/api/bid/addbids", payload)
         .then(() => {
            setBidFormData({
               farmerId: farmerId,
               postId: postId,
               shopOwnerId: shopOwnerId,
               product: product,
               quantity: "",
               price: "",
               status: "pending",
            });
            notifyAdd();
            getBids();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const handleChnage = (e) => {
      setBidFormData({ ...bidFormData, [e.target.name]: e.target.value });
   };

   // check if already placed a bid
   const [isPlacedBid, setIsPlacedBid] = useState(false);

   const checkIfBidPosted = () => {
      const hasPlacedBid = bidsData.some(
         (bid) => bid.shopOwnerId === shopOwnerId
      );
      setIsPlacedBid(hasPlacedBid);
   };

   useEffect(() => {
      checkIfBidPosted();
   }, [bidsData]);

   return (
      <div
         className="w-full h-screen bg-black/70 fixed top-0 left-0 z-[100] flex justify-end"
         id="cropDetailsBg"
         onClick={close}
      >
         <div className="w-3/5 h-screen bg-white px-[70px] py-[40px] overflow-y-scroll">
            <div className="flex w-full flex-col gap-6 ">
               {/* Details header */}
               <div className="flex w-full items-center justify-between">
                  <div className="profile flex gap-2 items-center">
                     <img src={Profile} className="w-10 h-10" alt="" />
                     <p>Akindu Nayanagith</p>
                     <p>|</p>
                     <p>4.9</p>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                     12 bids posted
                  </div>
               </div>
               <div className="line w-full h-px bg-gray-200"></div>
               {/* Post details */}
               <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                     {product} - {quantity} Kgs Available
                  </h2>
                  <div className="flex flex-wrap gap-x-10 gap-y-2">
                     <div className="flex items-center gap-2">
                        <i className="bi bi-currency-exchange text-sm text-yellow-500"></i>
                        <h4 className="text-gray-600 font-medium">
                           Price per Kg:
                        </h4>
                        <span className=" font-medium">{price} LKR</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <i className="bi bi-geo-fill text-sm text-rose-500"></i>
                        <h4 className="text-gray-600 font-medium">Location:</h4>
                        <span className="font-medium">{location}</span>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 tracking-wide">
                     {description}
                  </p>
                  <div className="images flex gap-2">
                     <div className="w-1/3 h-44 bg-gray-200 rounded-sm"></div>
                     <div className="w-1/3 h-44 bg-gray-200 rounded-sm"></div>
                     <div className="w-1/3 h-44 bg-gray-200 rounded-sm"></div>
                  </div>
               </div>
               <div className="line w-full h-px bg-gray-200"></div>
               {/* Add bid section */}
               <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">
                     Bid to this crops
                  </h2>
                  {!isPlacedBid ? (
                     <form
                        action=""
                        className="w-full flex flex-col md:flex-row items-center gap-2 justify-between"
                        onSubmit={(e) => {
                           e.preventDefault();
                           addBids(bidFormData);
                        }}
                     >
                        <div className="relative w-full">
                           <input
                              type="number"
                              placeholder={`Enter quantity (Max : ${quantity} Kg)`}
                              className="w-full h-12 px-4 py-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-700 text-sm shadow-sm focus:outline-none"
                              required
                              name="quantity"
                              value={bidFormData.quantity}
                              onChange={handleChnage}
                              min="1"
                              max={quantity}
                              onInvalid={(e) => {
                                 if (e.target.value < 1) {
                                    e.target.setCustomValidity(
                                       `Quantity must be between 1 Kg & ${quantity} Kg.`
                                    );
                                 } else if (e.target.value > quantity) {
                                    e.target.setCustomValidity(
                                       `Maximum allowed quantity is ${quantity} Kg.`
                                    );
                                 }
                              }}
                              onInput={(e) => e.target.setCustomValidity("")}
                           />
                        </div>
                        <div className="relative w-full">
                           <input
                              type="number"
                              placeholder="Enter your Price per Kg"
                              className="w-full h-12 px-4 py-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-700 text-sm shadow-sm focus:outline-none"
                              required
                              name="price"
                              value={bidFormData.price}
                              onChange={handleChnage}
                           />
                        </div>
                        <button
                           type="submit"
                           className="w-1/2cd backend  h-12 px-6 py-3 bg-sec-green hover:bg-green-700 text-white font-medium rounded text-sm shadow-md transition-all duration-200 flex items-center justify-center whitespace-nowrap"
                        >
                           Place Bid
                        </button>
                     </form>
                  ) : (
                     <div className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-center">
                        <span className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                 clipRule="evenodd"
                              />
                           </svg>
                           You have already placed a bid
                        </span>
                     </div>
                  )}
               </div>
               <div className="line w-full h-px bg-gray-200"></div>
            </div>
         </div>
         <ToastContainer />
      </div>
   );
}

export default CropDetails;
