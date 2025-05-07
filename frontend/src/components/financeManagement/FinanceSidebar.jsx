import { Route, Router, Link } from "react-router-dom";
import {
   FcBarChart,
   FcSearch,
   FcSms,
   FcPieChart,
   FcHome,
   FcMoneyTransfer,
   FcComboChart
   
} from "react-icons/fc";
import user from "../../assets/shopOwnerManagement/profile.png";
import Token from "../userManagement/logins/Token";
import ruchith from '../../assets/financeManagement/CHE_5153.jpg'


export default function FinanceSidebar() {
   const token = Token();
   const fid = token.userId;

   return (
      <>
         <aside className="so-side-bar w-80 bg-white h-screen overflow-y-auto  shadow-sm flex flex-col gap-4 fixed top-0 left-0 z-50">
            <div className=" px-6 py-2 "></div>

            <div className="profile flex items-center flex-col gap-3 px-6 py-3">
               <div className="relative">
                  <img
                     src={ruchith}
                     alt="Profile"
                     className="w-20 h-20 rounded-full "
                  />
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
               </div>
               <div className="text-center">
                  <h4 className=" text-base font-semibold">Finance Manager</h4>
               </div>
               <Link to={`/profile/${fid}`} className="w-full">
                  <button className="w-full py-2 bg-green-500 hover:bg-green-700 transition-colors rounded-sm text-white text-sm font-medium cursor-pointer">
                     View Profile
                  </button>
               </Link>
            </div>

            <div className="flex flex-col gap-2 px-6">
               <div className="main-menu mb-4">
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 px-2 mb-2">
                     Main Menu
                  </p>
                  <ul className="flex flex-col gap-1 text-gray-700">
                     <li
                        className={`rounded-md 
                          hover:bg-gray-50 `}
                     >
                        <Link
                           to="/finance/"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcHome className="text-xl" />
                           <p>Overview</p>
                        </Link>
                     </li>
                     <li
                        className={`rounded-md 
                              hover:bg-gray-50 `}
                     >
                        <Link
                           to="/finance/analysis"
                           className="flex gap-2 items-center py-2 px-3"
                        >
                           <FcPieChart className="text-xl" />
                           <p>Analysis</p>
                        </Link>
                     </li>
                     <li
                        className={`rounded-md 
                               hover:bg-gray-50 `}
                     >
                        <Link
                           to="/finance/allpayments"
                           className="flex items-center justify-between py-2 px-3"
                        >
                           <div className="flex gap-2 items-center">
                              <FcMoneyTransfer className="text-xl" />
                              <p>All payments</p>
                           </div>
                        </Link>
                     </li>
                     <li
                        className={`rounded-md 
                               hover:bg-gray-50 `}
                     >
                        <Link
                           to="/finance/payfarmers"
                           className="flex items-center justify-between py-2 px-3"
                        >
                           <div className="flex gap-2 items-center">
                              <FcMoneyTransfer className="text-xl" />
                              <p>Pay Farmers</p>
                           </div>
                        </Link>
                     </li>
                     <li
                        className={`rounded-md 
                               hover:bg-gray-50 `}
                     >
                        <Link
                           to="/finance/dailyprices"
                           className="flex items-center justify-between py-2 px-3"
                        >
                           <div className="flex gap-2 items-center">
                              <FcComboChart className="text-xl" />
                              <p>Daily Prices</p>
                           </div>
                        </Link>
                     </li>
                  </ul>
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
      </>
   );
}
