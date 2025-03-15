import React from "react";
import CropPost from "../../components/shopOwnerManagement/CropPost";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function FindCrops(props) {
   const { setIsClickViewCropDetails } = props;

   const active = "bg-main-green text-white";

   const cropPosts = [
      {
         id: 1,
         title: "Fresh Organic Tomatoes - 500 lbs Available",
         farmer: {
            name: "Akindu Nayanajith",
            rating: 4.9,
            image: Profile,
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
            image: Profile,
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
            image: Profile,
         },
         price: "110 LKR/kg",
         location: "Nuwara Eliya",
         description:
            "Naturally grown carrots with a sweet taste and rich in nutrients. Ideal for both cooking and raw consumption.",
         bids: 15,
      },
      {
         id: 4,
         title: "Organic Cabbage - 400 lbs Available",
         farmer: {
            name: "Saman Wijesinghe",
            rating: 4.6,
            image: Profile,
         },
         price: "80 LKR/kg",
         location: "Kurunegala",
         description:
            "Fresh organic cabbage with crisp leaves, ideal for salads, soups, and stir-fry dishes. Grown without harmful chemicals.",
         bids: 10,
      },
      {
         id: 5,
         title: "Premium Red Onions - 600 lbs Available",
         farmer: {
            name: "Chathura Silva",
            rating: 4.9,
            image: Profile,
         },
         price: "130 LKR/kg",
         location: "Anuradhapura",
         description:
            "Handpicked red onions with a strong flavor, perfect for culinary use. Freshly harvested and ready for bulk purchase.",
         bids: 18,
      },
      {
         id: 6,
         title: "Organic Potatoes - 500 lbs Available",
         farmer: {
            name: "Dilshan Rathnayake",
            rating: 4.7,
            image: Profile,
         },
         price: "95 LKR/kg",
         location: "Rathnapura",
         description:
            "Farm-fresh potatoes with a smooth texture, great for fries, mashed potatoes, and other dishes.",
         bids: 14,
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
                  setIsClickViewCropDetails={setIsClickViewCropDetails}
               />
            ))}
         </div>
      </section>
   );
}

export default FindCrops;
