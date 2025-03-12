import React, { useState } from "react";
import user from "../../assets/shopOwnerManagement/user-ico.ico";
import logo from "../../assets/shopOwnerManagement/logo-white.jpg";
import { Link } from "react-router-dom";
import {
   FcBarChart,
   FcSearch,
   FcSms,
   FcSettings,
   FcShop,
   FcDocument,
   FcFolder,
   FcServices,
} from "react-icons/fc";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function ShopOwnerSideBar() {
   const [expandedSections, setExpandedSections] = useState({
      orderManagement: false,
      shopManagement: false,
      settings: false,
   });

   const toggleSection = (section) => {
      setExpandedSections((prev) => ({
         ...prev,
         [section]: !prev[section],
      }));
   };

   const activeItemClass = "bg-green-50 text-green-700 font-medium rounded-md";

   return (
      <aside className="so-side-bar w-80 bg-white h-screen overflow-y-auto  border-r border-gray-100 flex flex-col gap-4 fixed top-0 left-0 z-50">
         <div className=" px-6 py-2 border-b border-gray-100">
            <img src={logo} className="w-32" alt="" />
         </div>

         <div className="profile flex items-center flex-col gap-3 px-6 py-3">
            <div className="relative">
               <img src={user} alt="Profile" className="w-20 h-20 rounded-full " />
               <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center">
               <h4 className="text-md font-semibold">Chathush Vishmika</h4>
               <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  Level 2 |
                  <span className="text-yellow-500 font-medium flex items-center">
                     5.0
                  </span>
               </p>
            </div>
            <button className="w-full py-2 bg-main-green hover:bg-green-700 transition-colors rounded-sm text-white text-sm font-medium cursor-pointer">
               View Profile
            </button>
         </div>

         <div className="px-6">
            <div className="w-full h-px bg-gray-200"></div>
         </div>

         <div className="flex-1 overflow-y-auto px-4">
            <div className="main-menu mb-4">
               <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 px-2 mb-2">
                  Main Menu
               </p>
               <ul className="flex flex-col gap-1 text-gray-700">
                  <li className={`rounded-md ${activeItemClass}`}>
                     <a href="#" className="flex gap-2 items-center py-2 px-3">
                        <FcBarChart className="text-xl" />
                        <p>Dashboard</p>
                     </a>
                  </li>
                  <li className="rounded-md hover:bg-gray-50">
                     <Link
                        to="/findCrops"
                        className="flex gap-2 items-center py-2 px-3"
                     >
                        <FcSearch className="text-xl" />
                        <p>Find Crops</p>
                     </Link>
                  </li>
                  <li className="rounded-md hover:bg-gray-50">
                     <a
                        href="#"
                        className="flex items-center justify-between py-2 px-3"
                     >
                        <div className="flex gap-2 items-center">
                           <FcSms className="text-xl" />
                           <p>Inbox</p>
                        </div>
                        <div className="text-xs bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                           1
                        </div>
                     </a>
                  </li>
               </ul>
            </div>

            <div className="menu-section mb-4">
               <div
                  className="flex justify-between items-center px-2 mb-2 cursor-pointer"
                  onClick={() => toggleSection("orderManagement")}
               >
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                     Order Management
                  </p>
                  {expandedSections.orderManagement ? (
                     <BiChevronUp className="text-gray-500" />
                  ) : (
                     <BiChevronDown className="text-gray-500" />
                  )}
               </div>

               {expandedSections.orderManagement && (
                  <ul className="flex flex-col gap-1 text-gray-700">
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcDocument className="text-xl" />
                           <p>All Orders</p>
                        </a>
                     </li>
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcFolder className="text-xl" />
                           <p>Previous Orders</p>
                        </a>
                     </li>
                  </ul>
               )}
            </div>

            <div className="menu-section mb-4">
               <div
                  className="flex justify-between items-center px-2 mb-2 cursor-pointer"
                  onClick={() => toggleSection("shopManagement")}
               >
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                     Shop Management
                  </p>
                  {expandedSections.shopManagement ? (
                     <BiChevronUp className="text-gray-500" />
                  ) : (
                     <BiChevronDown className="text-gray-500" />
                  )}
               </div>

               {expandedSections.shopManagement && (
                  <ul className="flex flex-col gap-1 text-gray-700">
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcShop className="text-xl" />
                           <p>Manage Inventory</p>
                        </a>
                     </li>
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcServices className="text-xl" />
                           <p>Products</p>
                        </a>
                     </li>
                  </ul>
               )}
            </div>

            <div className="menu-section mb-4">
               <div
                  className="flex justify-between items-center px-2 mb-2 cursor-pointer"
                  onClick={() => toggleSection("settings")}
               >
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                     Settings
                  </p>
                  {expandedSections.settings ? (
                     <BiChevronUp className="text-gray-500" />
                  ) : (
                     <BiChevronDown className="text-gray-500" />
                  )}
               </div>

               {expandedSections.settings && (
                  <ul className="flex flex-col gap-1 text-gray-700">
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcSettings className="text-xl" />
                           <p>Account Settings</p>
                        </a>
                     </li>
                     <li className="rounded-md hover:bg-gray-50">
                        <a
                           href="#"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcSettings className="text-xl opacity-60" />
                           <p>Preferences</p>
                        </a>
                     </li>
                  </ul>
               )}
            </div>
         </div>

         <div className="mt-auto border-t border-gray-100 p-4">
            <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
               </svg>
               Sign Out
            </button>
         </div>
      </aside>
   );
}

export default ShopOwnerSideBar;
