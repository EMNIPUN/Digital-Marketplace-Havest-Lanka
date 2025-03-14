import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/shopOwnerManagement/shopOwner.css";

import ShopOwnerSideBar from "../components/shopOwnerManagement/ShopOwnerSideBar";
import ShopOwnerDashboard from "../pages/shopOwnerManagement/ShopOwnerDashboard";
import ShopOwnerNavBar from "../components/shopOwnerManagement/ShopOwnerNavBar";
import FindCrops from "../pages/shopOwnerManagement/FindCrops";
import ShopOwnerFooter from "../components/shopOwnerManagement/ShopOwnerFooter";
import ShopOwnerOrders from "../pages/shopOwnerManagement/ShopOwnerOrders";
import ShopOwnerInbox from "../pages/shopOwnerManagement/ShopOwnerInbox";

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
                  <Route path="/" element={<ShopOwnerDashboard />}></Route>
                  <Route path="/findcrops" element={<FindCrops />}></Route>
                  <Route path="/orders" element={<ShopOwnerOrders />}></Route>
                  <Route path="/inbox" element={<ShopOwnerInbox />}></Route>
               </Routes>
            </div>
            <ShopOwnerFooter />
         </div>
      </div>
   );
}

export default ShopOwnerRoutes;
