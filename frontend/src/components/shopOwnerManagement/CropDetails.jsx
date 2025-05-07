import React, { useEffect, useState } from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";
import axios from "axios";
import Token from "../userManagement/logins/Token";
import { ToastContainer, toast } from "react-toastify";

function CropDetails(props) {
   const {
      setIsClickViewCropDetails,
      bidCount,
      product,
      quantity,
      price,
      location,
      description,
      bids,
      farmer,
      farmerId,
      postId,
      status,
      profileImage,
      getCropPostDetails,
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
            background: " #fff",
            color: "#108a01",
         },
      });
   };

   // set bid data
   const [bidFormData, setBidFormData] = useState({
      farmerId: farmerId,
      farmer: farmer,
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
         farmer: data.farmer,
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
               farmer: farmer,
               postId: postId,
               shopOwnerId: shopOwnerId,
               product: product,
               quantity: "",
               price: "",
               status: "pending",
            });
            notifyAdd();
            getBids();
            getCropPostDetails();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // validation bidding form
   const [error, setError] = useState(false);

   const handleChnage = (e) => {
      // validations
      if (e.target.name === "quantity") {
         if (e.target.value < 1 || e.target.value > quantity) {
            if (e.target.value !== null) {
               setError(true);
            } else {
               setError(false);
            }
         } else {
            setError(false);
         }
      }

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
         <div className="w-1/2 h-screen bg-white overflow-y-scroll">
            <div className="flex w-full flex-col gap-5  ">
               {/* Details header */}
               <div className="flex w-full items-center justify-between  px-[50px] py-[20px] bg-main-green">
                  <div className="profile flex gap-2 items-center text-white">
                     <img
                        src={profileImage}
                        className="w-10 h-10 rounded-full object-cover border border-white"
                        alt=""
                     />
                     <p>{farmer}</p>
                     <p>|</p>
                     <p>4.9</p>
                  </div>
                  <div className="text-sm font-medium text-gray-100">
                     {bidCount} Bids posted
                  </div>
               </div>

               {/* Post details */}
               <div className="flex flex-col gap-4 px-[50px] py-[40px]">
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
               {status === "Active" ? (
                  <div className="flex flex-col gap-3 px-[50px] pb-[40px]">
                     <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        Bid to this crops
                     </h2>
                     {error && (
                        <div className="text-xs w-full py-2 bg-red-100 text-center rounded-sm text-gray-600">
                           <i className="bi bi-exclamation-circle text-red-700 pr-3"></i>
                           Qunatity must between 1 and {quantity} Kg
                        </div>
                     )}

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
                                 className="w-full h-12 px-4 py-3 rounded border border-gray-300 focus:border-gray-500  transition-all duration-200 text-gray-700 text-sm shadow-sm focus:outline-none"
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
                           {error ? (
                              <button
                                 disabled
                                 type="submit"
                                 className="w-1/2cd backend  h-12 px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded text-sm  transition-all duration-200 flex items-center justify-center whitespace-nowrap"
                              >
                                 Place Bid
                              </button>
                           ) : (
                              <button
                                 type="submit"
                                 className="w-1/2cd backend  h-12 px-6 py-3 bg-sec-green hover:bg-green-700 text-white font-semibold rounded text-sm  transition-all duration-200 flex items-center justify-center whitespace-nowrap"
                              >
                                 Place Bid
                              </button>
                           )}
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
               ) : (
                  <div className="w-full h-20 flex items-center justify-center px-[50px] pb-20px gap-2">
                     <i class="bi bi-lock-fill mb-0"></i> <p>Bidding Closed</p>
                  </div>
               )}
            </div>
         </div>
         <ToastContainer />
      </div>
   );
}

export default CropDetails;
