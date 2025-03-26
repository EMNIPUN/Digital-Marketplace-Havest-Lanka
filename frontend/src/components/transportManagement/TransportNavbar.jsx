import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Token from "../userManagement/logins/Token";

function TransportNavbar() {
   const token = Token();
   const tid = token.userId;
   return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
               <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-green-800">
                     Harvest Lanka
                  </span>
               </div>
               <div className="flex items-center space-x-6">
                  <Link to="/transport">Dashboard</Link>
                  <Link to="/transport/management">Vehicles & Drivers</Link>
                  <Link to="/transport/requests">Transport Requests</Link>
               </div>
               <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 group">
                     <div className="text-right hidden md:block group-hover:opacity-75 transition-opacity">
                        <p className="text-sm font-medium text-gray-800">
                           Admin Portal
                        </p>
                        <p className="text-xs text-gray-500">
                           Transport Manager
                        </p>
                     </div>
                     <Link to={`/profile/${tid}`}>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                           <FaUser className="h-4 w-4 text-white" />
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default TransportNavbar;
