import React, { useEffect, useState } from "react";
import CropPost from "../../components/shopOwnerManagement/CropPost";
import Profile from "../../assets/shopOwnerManagement/profile.png";
import axios from "axios";

function FindCrops(props) {
  
   // showing products listing
   const [cropsPostData, setCropPostData] = useState([]);

   const getCropPostDetails = () => {
      axios
         .get("http://localhost:8005/api/BidPost")
         .then((resposnse) => {
            setCropPostData(resposnse.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      getCropPostDetails();
   });

   return (
      <section className="w-full p-[20px] flex flex-col gap-5">
         {/* Search bar */}
         <div className="flex w-full items-center gap-5">
            <input
               type="text"
               className="h-12 w-full border border-gray-300 px-[15px] tracking-wide text-sm font-light  bg-white rounded-sm"
               placeholder="Search Crops or Farmers"
            />
            <button className="w-32 h-12 bg-main-green text-white border border-gray-100 rounded-sm">
               Search
            </button>
         </div>

         {/* Filter tabs */}
         <div className="w-full flex gap-2 text-sm text-gray-600">
            <div className="px-5 py-2 rounded-full border bg-sec-green text-white border-gray-300">
               All Crops
            </div>
            <div className="px-5 py-2 rounded-full border bg-white border-gray-300">
               Organic Only
            </div>
            <div className="px-5 py-2 rounded-full border bg-white border-gray-300">
               Seasonal
            </div>
            <div className="px-5 py-2 rounded-full border bg-white border-gray-300">
               Special Offers
            </div>
         </div>

         {/* Crop Posts */}
         <div className="flex w-full items-center gap-5 flex-col">
            {cropsPostData.map((post) => (
               <CropPost
                  key={post._id}
                  postId={post._id}
                  farmerId={post.farmerId}
                  title={post.cropsName}
                  quantity={post.quantity}
                  price={post.price}
                  location={post.location}
                  description={post.description}
                  bids={post.bids}
                  farmer={post.farmer}
                 
               />
            ))}
         </div>
      </section>
   );
}

export default FindCrops;
