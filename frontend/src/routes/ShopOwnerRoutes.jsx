import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/shopOwnerManagement/shopOwner.css";

import ShopOwnerSideBar from "../components/shopOwnerManagement/ShopOwnerSideBar";
import ShopOwnerDashboard from "../pages/shopOwnerManagement/ShopOwnerDashboard";
import ShopOwnerNavBar from "../components/shopOwnerManagement/ShopOwnerNavBar";
import FindCrops from "../pages/shopOwnerManagement/FindCrops";

function ShopOwnerRoutes() {
   return (
      <div className="w-full flex bg-gray-100">
         <div className="max-w-64">
            <ShopOwnerSideBar />
         </div>
         <div className="w-full pl-80">
            <ShopOwnerNavBar />
            <div className="mt-14">
               <Routes>
                  <Route
                     path="/dashboard"
                     element={<ShopOwnerDashboard />}
                  ></Route>
                  <Route path="/" element={<FindCrops />}></Route>
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default ShopOwnerRoutes;
