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

   // change active tabs
   const [activeTab, setActiveTab] = useState({
      all: true,
      fruits: false,
      vegetables: false,
      nuts: false,
      spices: false,
      other: false,
   });

   const toggleActiveTab = (name) => {
      setActiveTab({
         [name]: !activeTab[name],
      });
   };

   const activeTabStyle =
      "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01] ";

   return (
      <section className="w-full p-[20px] flex flex-col gap-5">
         {/* Search bar */}
         <div className="flex w-full items-center gap-2">
            <input
               type="text"
               className="h-12 w-full border border-gray-300 px-[15px] tracking-wide text-sm font-light  bg-white rounded-sm"
               placeholder="Search Crops or Farmers"
            />
            <button className="w-32 h-12 bg-sec-green text-white border border-gray-100 rounded-sm">
               Search
            </button>
         </div>

         {/* Filter tabs */}
         <div className="w-full flex flex-col gap-4 text-sm text-gray-400 capitalize">
            <div className="text-2xl text-gray-800 font-medium">
               Find related crops
            </div>
            <div className="flex flex-col">
               <div className="flex gap-4 text-sm">
                  <div
                     className={`cursor-pointer ${
                        activeTab.all
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("all")}
                  >
                     All Crops
                  </div>
                  <div
                     className={`cursor-pointer ${
                        activeTab.vegetables
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("vegetables")}
                  >
                     Vegetables
                  </div>
                  <div
                     className={`cursor-pointer ${
                        activeTab.fruits
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("fruits")}
                  >
                     Fruits
                  </div>
                  <div
                     className={`cursor-pointer ${
                        activeTab.nuts
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("nuts")}
                  >
                     Nuts
                  </div>
                  <div
                     className={`cursor-pointer ${
                        activeTab.spices
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("spices")}
                  >
                     Spices
                  </div>
                  <div
                     className={`cursor-pointer ${
                        activeTab.other
                           ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                           : "border-b-none text-gray-400 font-normal"
                     }`}
                     onClick={() => toggleActiveTab("other")}
                  >
                     Other
                  </div>
               </div>
               <div className="line h-px w-full bg-gray-300"></div>
            </div>
         </div>

         {/* Crop Posts */}
         <div className="flex w-full items-center gap-5 flex-col">
            {cropsPostData.map((post) => (
               <CropPost
                  key={post._id}
                  postId={post._id}
                  farmerId={post.farmerId}
                  product={post.cropsName}
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
