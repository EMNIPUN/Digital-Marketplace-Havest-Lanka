import React from "react";
import CropPost from "../../components/shopOwnerManagement/CropPost";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function FindCrops() {
   const active = "bg-main-green text-white";

   const cropPosts = [
      {
         id: 1,
         title: "Fresh Organic Tomatoes - 500 lbs Available",
         farmer: {
            name: "Akindu Nayanajith",
            rating: 4.9,
            image: Profile, // Replace with the actual image path
         },
         price: "120 LKR/kg",
         location: "Badulla",
         description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tempora debitis in fugiat veniam corrupti ex cumque expedita voluptate architecto. Eos, vel minus! Deleniti voluptate cum adipisci porro quo omnis.",
         bids: 12,
      },
      {
         id: 2,
         title: "Organic Green Beans - 300 lbs Available",
         farmer: {
            name: "Kasun Perera",
            rating: 4.7,
            image: Profile, // Replace with the actual image path
         },
         price: "90 LKR/kg",
         location: "Kandy",
         description:
            "High-quality organic green beans, freshly harvested and ready for sale. Ensure fresh supply for your needs.",
         bids: 8,
      },
      {
         id: 3,
         title: "Fresh Carrots - 250 lbs Available",
         farmer: {
            name: "Nuwan Bandara",
            rating: 4.8,
            image: Profile, // Replace with the actual image path
         },
         price: "110 LKR/kg",
         location: "Nuwara Eliya",
         description:
            "Naturally grown carrots with a sweet taste and rich in nutrients. Ideal for both cooking and raw consumption.",
         bids: 15,
      },
   ];

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
            {cropPosts.map((post) => (
               <CropPost
                  key={post.id}
                  title={post.title}
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
