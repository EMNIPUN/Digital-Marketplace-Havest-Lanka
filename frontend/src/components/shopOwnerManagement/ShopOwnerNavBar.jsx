import React from "react";
import { Link, useLocation } from "react-router-dom";
import Token from "../userManagement/logins/Token";

function ShopOwnerNavBar() {
   // shop owner details
   const token = Token();
   const shopOwnerName = token.name;
   const sid = token.userId;
   console.log(token);

   // add profile picture
   const baseURL = "http://localhost:8005";

   const profileImage = token.displayPicture
      ? `${baseURL}${token.displayPicture}`
      : "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png";

   return (
      <header className="w-full  bg-white fixed  z-40 right-0">
         <nav className="w-full flex flex-col ">
            <div className="nav-up w-full flex items-center justify-between py-3 border-b border-gray-200 px-[30px]">
               <div className="logo"></div>

               <div className="flex gap-5 items-center">
                  <div className="relative">
                     <i className="bi bi-bell-fill text-yellow-500 text-lg "></i>
                     <p className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-xs absolute -top-1 -right-2">
                        3
                     </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                     Welcome {shopOwnerName}!
                  </p>

                  <Link to={`/profile/${sid}`}>
                     <img
                        src={profileImage}
                        width="33px"
                        alt=""
                        className="rounded-full"
                     />
                  </Link>
               </div>
            </div>
         </nav>
      </header>
   );
}

export default ShopOwnerNavBar;
