import React from "react";
import User from "../../assets/shopOwnerManagement/user-ico.ico"

function ShopOwnerNavBar() {
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
                  <p className="text-gray-600 text-sm">Welcome Chathush!</p>
                  {/* <i className="bi bi-person text-xl bg-main-green text-white px-2 py-1 rounded-full"></i> */}
                  <img src={User} width="33px" alt="" />
               </div>
            </div>
         </nav>
      </header>
   );
}

export default ShopOwnerNavBar;
