import React from "react";
import Profile from "../../assets/shopOwnerManagement/profile.png";

function CropDetails(props) {
   const { setIsClickViewCropDetails } = props;

   const close = (e) => {
      if (e.target.id === "cropDetailsBg") {
         setIsClickViewCropDetails(false);
      }
   };

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
                     Fresh Organic Tomatoes - 500 lbs Available
                  </h2>
                  <div class="flex flex-wrap gap-x-10 gap-y-2">
                     <div class="flex items-center gap-2">
                        <i className="bi bi-currency-exchange text-sm text-yellow-500"></i>
                        <h4 class="text-gray-600 font-medium">Price per Kg:</h4>
                        <span class=" font-medium">120 LKR</span>
                     </div>
                     <div class="flex items-center gap-2">
                        <i className="bi bi-geo-fill text-sm text-rose-500"></i>
                        <h4 class="text-gray-600 font-medium">Location:</h4>
                        <span class="font-medium">Badulla</span>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 tracking-wide">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                     Quod odit dolor labore mollitia odio dicta nam dolorum quos
                     tempora voluptatem atque eos quasi ipsa, quibusdam sint
                     sequi? Amet, explicabo esse. <br />
                     <br />
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Optio assumenda consequatur culpa ut nobis porro
                     blanditiis! Non voluptatem id iusto nesciunt ipsum optio
                     sunt, temporibus cumque reprehenderit, eveniet vel quidem?
                     Aut reiciendis assumenda adipisci debitis ut error
                     excepturi eum aperiam?
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
                  <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                     Bid to this crops
                  </h2>
                  <form
                     action=""
                     className="w-full flex items-center gap-3 justify-between"
                  >
                     <input
                        type="text"
                        placeholder="Enter your Price per Kg"
                        className="border border-gray-400 text-gray-600 rounded w-full h-11 py-2 px-5 text-sm"
                        required
                     />
                     <input
                        type="text"
                        placeholder="Enter quantity you want"
                        className="border border-gray-400 text-gray-600 rounded w-full h-11 py-2 px-5 text-sm"
                        required
                     />
                     <input
                        type="submit"
                        value="Place Bid"
                        className="border bg-sec-green text-white rounded w-54 h-11 py-2 px-5 text-sm"
                     />
                  </form>
               </div>
               <div className="line w-full h-px bg-gray-200"></div>
               {/* ----------------------
                  Other bids showing area
               ----------------------- */}
            </div>
         </div>
      </div>
   );
}

export default CropDetails;
