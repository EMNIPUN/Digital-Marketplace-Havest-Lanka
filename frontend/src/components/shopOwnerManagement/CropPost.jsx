import React from "react";
import User from "../../assets/shopOwnerManagement/user-ico.ico";

function CropPost(props) {
   const {
      title,
      price,
      location,
      description,
      bids,
      farmer,
      setIsClickViewCropDetails,
   } = props;

   return (
      <div className="w-full p-5 rounded-sm bg-white flex flex-col gap-5 text-gray-600 border border-gray-200 shadow-sm">
         <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-1">
               <h3 className="text-gray-800 text-lg font-medium">{title}</h3>
               <div className="farmer-name flex gap-2 items-center text-sm">
                  <img src={User} width="25px" alt="" />
                  <p className="text-sm tracking-wide">{farmer}</p>
                  <p>|</p>
                  <div className="font-medium text-sm">{}</div>
               </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
               <h3 className="text-gray-700 text-lg font-semibold">{price}</h3>
               <div className="flex gap-2 items-center justify-center">
                  <i className="bi bi-geo-fill text-sm text-rose-500"></i>
                  <p className="text-sm text-gray-500 tracking-wide">
                     {location}
                  </p>
               </div>
            </div>
         </div>
         <div className="line w-full h-px bg-gray-200"></div>
         <div>
            <p className="tracking-wide font-light text-sm">{description}</p>
         </div>
         <div className="line w-full h-px bg-gray-200"></div>
         <div className="w-full flex items-center justify-between">
            <div className="flex gap-4">
               <button
                  onClick={() => setIsClickViewCropDetails(true)}
                  className="text-sm font-medium text-main-green flex gap-2 items-center justify-center"
               >
                  <p>View Details</p>
                  <i className="bi bi-arrow-right"></i>
               </button>
               
            </div>
            <div className="text-sm font-medium">{bids} bids posted</div>
         </div>
      </div>
   );
}

export default CropPost;
