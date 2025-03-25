import React, { useEffect, useState } from "react";
import CropPost from "../../components/shopOwnerManagement/CropPost";
import axios from "axios";

function FindCrops() {
   // showing products listing
   const [cropsPostData, setCropPostData] = useState([]);

   const getCropPostDetails = async () => {
      await axios
         .get("http://localhost:8005/api/BidPost")
         .then((response) => {
            setCropPostData(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      getCropPostDetails();
   }, []);

   // tab changing and filtering
   const [activeTab, setActiveTab] = useState("all");

   const toggleActiveTab = (name) => {
      setActiveTab(name);
   };

   // search operation
   const [searchValue, setSearchValue] = useState("");
   const [relatedSearch, setRelatedSearch] = useState(false);

   const filteredCrops = cropsPostData.filter((post) =>
      post.cropsName.toLowerCase().includes(searchValue.toLowerCase())
   );

   const [isSearch, setIsSearch] = useState(false);

   const searchItems = cropsPostData.filter(
      (post) => post.cropsName === searchValue
   );
   const getSearchedCrops = () => {
      if (searchValue.length > 0 && searchItems.length > 0) {
         setIsSearch(true);
         setRelatedSearch(false);
      }
   };

   return (
      <section className="w-full p-[20px] flex flex-col gap-5">
         {/* Search bar */}
         <form
            className="flex w-full items-center gap-2"
            onSubmit={(e) => {
               e.preventDefault();
               getSearchedCrops();
            }}
         >
            <div className="w-full relative">
               <input
                  type="text"
                  className="h-12 w-full border border-gray-300 px-[15px] tracking-wide text-sm font-light bg-white rounded-sm"
                  placeholder="Search Crops or Farmers"
                  value={searchValue}
                  onChange={(e) => {
                     setSearchValue(e.target.value);
                     setRelatedSearch(e.target.value.length > 0);
                     setIsSearch(searchValue.length < 0);
                  }}
               />
               {searchValue.length > 0 && (
                  <i
                     onClick={() => {
                        setSearchValue("");
                        setIsSearch(false);
                        setRelatedSearch(false);
                     }}
                     className="bi bi-x-circle-fill absolute right-5 top-[12px] text-gray-400 cursor-pointer hover:text-gray-600"
                  ></i>
               )}

               {/* Search values */}
               {relatedSearch && (
                  <div className="search-area bg-white p-5 rounded-sm shadow-sm border border-gray-300 absolute top-14 w-full flex flex-col divide-y-2 divide-gray-100 text-gray-500">
                     {filteredCrops.length > 0 ? (
                        filteredCrops.map((crop, index) => (
                           <div
                              key={index}
                              className="text-sm cursor-pointer hover:bg-gray-50 py-3"
                              onClick={() => {
                                 setSearchValue(crop.cropsName);
                                 setRelatedSearch(false);
                              }}
                           >
                              <i className="bi bi-search pr-3 text-gray-500"></i>
                              {crop.cropsName}
                           </div>
                        ))
                     ) : (
                        <div className="text-sm text-gray-500 py-0 text-center">
                           No related item found
                        </div>
                     )}
                  </div>
               )}
            </div>
            <button
               type="submit"
               className="w-32 h-12 bg-sec-green text-white border border-gray-100 rounded-sm"
            >
               Search
            </button>
         </form>

         {/* Filter tabs */}
         {!isSearch && (
            <div className="w-full flex flex-col gap-4 text-sm text-gray-400 capitalize">
               <div className="text-2xl text-gray-800 font-medium">
                  Find related crops
               </div>
               <div className="flex flex-col">
                  <div className="flex gap-4 text-sm">
                     {[
                        "all",
                        "Vegetables",
                        "Fruits",
                        "nuts",
                        "spices",
                        "other",
                     ].map((tab) => (
                        <div
                           key={tab}
                           className={`cursor-pointer ${
                              activeTab === tab
                                 ? "border-b-[3px] text-gray-700 font-medium pb-2 border-[#108a01]"
                                 : "border-b-none text-gray-400 font-normal"
                           }`}
                           onClick={() => toggleActiveTab(tab)}
                        >
                           {tab === "all" ? "All Crops" : tab}
                        </div>
                     ))}
                  </div>
                  <div className="line h-px w-full bg-gray-300"></div>
               </div>
            </div>
         )}

         {/* Crop Posts */}
         <div className="flex w-full items-center gap-5 flex-col">
            {!isSearch &&
               cropsPostData
                  .filter(
                     (post) =>
                        activeTab === "all" || post.cropsCategory === activeTab
                  )
                  .map((post) => (
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

         {/* Searched crop post */}
         {isSearch && (
            <div className="flex w-full gap-5 flex-col">
               {searchItems.length > 0 ? (
                  <>
                     <h2 className=" text-gray-800 font-medium text-2xl">
                        Related posts for {searchValue}
                     </h2>
                     {searchItems.map((post) => (
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
                  </>
               ) : (
                  <h2 className="text-xl font-medium text-gray-800">
                     No related crops found for "{searchValue}"
                  </h2>
               )}
            </div>
         )}
      </section>
   );
}

export default FindCrops;
