import React, { useEffect, useState } from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";
import axios from "axios";
import Token from "../userManagement/logins/Token";

function CropDetails(props) {
   const {
      setIsClickViewCropDetails,
      title,
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

   const getBids = () => {
      axios
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
   });

   // set bid data
   const [bidFormData, setBidFormData] = useState({
      farmerId: farmerId,
      postId: postId,
      shopOwnerId: shopOwnerId,
      quantity: "",
      price: "",
      status: "pending",
   });

   const addBids = (data) => {
      const payload = {
         farmerId: data.farmerId,
         shopOwnerId: data.shopOwnerId,
         postId: data.postId,
         quantity: data.quantity,
         price: data.price,
         status: data.status,
      };

      axios
         .post("http://localhost:8005/api/bid/addbids", payload)
         .then(() => {
            setBidFormData({
               farmerId: farmerId,
               postId: postId,
               shopOwnerId: shopOwnerId,
               quantity: "",
               price: "",
               status: "pending",
            });

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
                     {title} - {quantity} Kgs Available
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
                        className="w-full flex flex-col md:flex-row items-center gap-4 justify-between"
                        onSubmit={(e) => {
                           e.preventDefault();
                           addBids(bidFormData);
                        }}
                     >
                        <div className="relative w-full">
                           <input
                              type="text"
                              placeholder="Enter quantity you want"
                              className="w-full h-12 px-4 py-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-700 text-sm shadow-sm focus:outline-none"
                              required
                              name="quantity"
                              value={bidFormData.quantity}
                              onChange={handleChnage}
                           />
                        </div>
                        <div className="relative w-full">
                           <input
                              type="text"
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
                           className="w-full  h-12 px-6 py-3 bg-sec-green hover:bg-green-700 text-white font-medium rounded text-sm shadow-md transition-all duration-200 flex items-center justify-center whitespace-nowrap"
                        >
                           Place Bid
                        </button>
                     </form>
                  ) : (
                     <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-center">
                        <span className="flex items-center justify-center gap-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500"
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
               {/* Other bids showing area */}
               <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">
                     Other placed bids
                  </h2>
                  {bidsData.length > 0 ? (
                     <div className="rounded-lg border border-gray-200 overflow-hidden">
                        {/* Header row with titles */}
                        <div className="flex justify-between items-center bg-gray-50 p-3 border-b border-gray-200">
                           <div className="w-1/3 font-semibold text-gray-700">
                              Bidder
                           </div>
                           <div className="w-1/3 text-center font-semibold text-gray-700">
                              Needed Quantity
                           </div>
                           <div className="w-1/3 text-right font-semibold text-gray-700">
                              Price Per kg
                           </div>
                        </div>

                        {/* Scrollable bids container */}
                        <div className="max-h-64 overflow-y-auto">
                           {bidsData.map((bid) => (
                              <div
                                 key={bid._id}
                                 className="flex justify-between items-center p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                              >
                                 <div className="w-1/3 flex items-center">
                                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                                       <svg
                                          className="w-4 h-4 text-blue-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                          ></path>
                                       </svg>
                                    </div>
                                    <span className="font-medium text-gray-800">
                                       Anonymous
                                    </span>
                                 </div>

                                 <div className="w-1/3 text-center">
                                    <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
                                       {bid.quantity} kg
                                    </span>
                                 </div>

                                 <div className="w-1/3 text-right">
                                    <span className="bg-green-50 text-green-600 py-1 px-3 rounded-full font-bold">
                                       {bid.price} Rs
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                        <svg
                           className="w-12 h-12 text-gray-300 mx-auto mb-3"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                           ></path>
                        </svg>
                        <p className="text-gray-500 font-medium">
                           No bids have been placed yet.
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                           Bids will appear here once they are received.
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default CropDetails;
