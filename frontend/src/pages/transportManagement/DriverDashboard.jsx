import React from "react";
import logo from "../../assets/shopOwnerManagement/logo-white.jpg";
import {
   TruckIcon,
   MapIcon,
   ClockIcon,
   ChartBarIcon,
   BellIcon,
   UserIcon,
   ArrowTrendingUpIcon,
   ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import Token from "@/components/userManagement/logins/Token";
import { Link } from "react-router-dom";
import logo from '@/assets/farmerManagement/Navigation/avest.png';

function DriverDashboard() {
   const token = Token();
   const tid = token.userId;

   return (
      <div className="min-h-screen bg-gray-50">
         {/* header */}
         <header className="w-full h-14 shadow flex items-center justify-between px-14">
            <div className="flex items-center">
               <Link to="/farmer" className="flex items-center">
               <img src={logo} alt="Avest Logo" className="h-32 w-auto" />
               </Link>
            </div>
            <Link to={`/profile/${tid}`}>
               <button className="bg-sec-green py-2 px-4 rounded text-white">
                  Profile
               </button>
            </Link>
         </header>

         {/* Main Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
               {/* Today's Deliveries */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">
                           Today's Deliveries
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">
                           12
                        </p>
                        <div className="mt-2 flex items-center text-sm">
                           <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                           <span className="text-green-600">
                              +2 from yesterday
                           </span>
                        </div>
                     </div>
                     <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <TruckIcon className="h-6 w-6 text-blue-600" />
                     </div>
                  </div>
               </div>

               {/* Active Route */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">
                           Active Route
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">
                           Route #45
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           3 stops remaining
                        </p>
                     </div>
                     <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <MapIcon className="h-6 w-6 text-green-600" />
                     </div>
                  </div>
               </div>

               {/* Hours Driven */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">
                           Hours Driven
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">
                           6.5
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           4.5 hours remaining
                        </p>
                     </div>
                     <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <ClockIcon className="h-6 w-6 text-yellow-600" />
                     </div>
                  </div>
               </div>

               {/* Performance Score */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">
                           Performance Score
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">
                           95%
                        </p>
                        <div className="mt-2 flex items-center text-sm">
                           <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                           <span className="text-green-600">+5% this week</span>
                        </div>
                     </div>
                     <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                        <ChartBarIcon className="h-6 w-6 text-purple-600" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
               {/* Upcoming Deliveries */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                     Upcoming Deliveries
                  </h2>
                  <div className="space-y-4">
                     <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <TruckIcon className="h-4 w-4 text-blue-600" />
                           </div>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-900">
                              123 Main Street
                           </p>
                           <p className="text-sm text-gray-500">
                              Package #4567
                           </p>
                           <p className="text-xs text-gray-400 mt-1">
                              ETA: 2:30 PM
                           </p>
                        </div>
                     </div>
                     <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <TruckIcon className="h-4 w-4 text-blue-600" />
                           </div>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-900">
                              456 Oak Avenue
                           </p>
                           <p className="text-sm text-gray-500">
                              Package #4568
                           </p>
                           <p className="text-xs text-gray-400 mt-1">
                              ETA: 3:15 PM
                           </p>
                        </div>
                     </div>
                     <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <TruckIcon className="h-4 w-4 text-blue-600" />
                           </div>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-900">
                              789 Pine Street
                           </p>
                           <p className="text-sm text-gray-500">
                              Package #4569
                           </p>
                           <p className="text-xs text-gray-400 mt-1">
                              ETA: 4:00 PM
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Recent Activity */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                     Recent Activity
                  </h2>
                  <div className="space-y-4">
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                              <TruckIcon className="h-4 w-4 text-green-600" />
                           </div>
                        </div>
                        <div className="ml-4 flex-1">
                           <p className="text-sm font-medium text-gray-900">
                              Delivery completed
                           </p>
                           <p className="text-sm text-gray-500">
                              321 Elm Street
                           </p>
                        </div>
                        <div className="text-sm text-gray-500">2:15 PM</div>
                     </div>
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <MapIcon className="h-4 w-4 text-blue-600" />
                           </div>
                        </div>
                        <div className="ml-4 flex-1">
                           <p className="text-sm font-medium text-gray-900">
                              Route updated
                           </p>
                           <p className="text-sm text-gray-500">
                              New delivery added
                           </p>
                        </div>
                        <div className="text-sm text-gray-500">1:45 PM</div>
                     </div>
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                              <ClockIcon className="h-4 w-4 text-yellow-600" />
                           </div>
                        </div>
                        <div className="ml-4 flex-1">
                           <p className="text-sm font-medium text-gray-900">
                              Break time
                           </p>
                           <p className="text-sm text-gray-500">15 minutes</p>
                        </div>
                        <div className="text-sm text-gray-500">12:30 PM</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DriverDashboard;
