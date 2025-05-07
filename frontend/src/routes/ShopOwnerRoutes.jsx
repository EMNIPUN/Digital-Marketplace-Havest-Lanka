import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/shopOwnerManagement/shopOwner.css";
import ShopOwnerSideBar from "../components/shopOwnerManagement/ShopOwnerSideBar";
import ShopOwnerDashboard from "../pages/shopOwnerManagement/ShopOwnerDashboard";
import ShopOwnerNavBar from "../components/shopOwnerManagement/ShopOwnerNavBar";
import FindCrops from "../pages/shopOwnerManagement/FindCrops";
import ShopOwnerFooter from "../components/shopOwnerManagement/ShopOwnerFooter";
import ShopOwnerOrders from "../pages/shopOwnerManagement/ShopOwnerOrders";
import ManageInventory from "../pages/shopOwnerManagement/ManageInventory";
import DailyPrice from "@/components/other/DailyPrice";
import ShopOwnerFinance from "@/pages/shopOwnerManagement/ShopOwnerFinance";
import PaymentDone from "@/components/shopOwnerManagement/paymentDone";

function ShopOwnerRoutes() {
   return (
      <div className="w-full flex bg-gray-100">
         <div className="max-w-64">
            {/* Side bar showing */}
            <ShopOwnerSideBar />
         </div>
         <div className="w-full pl-80">
            {/* Navbar showing */}
            <div className="z-50">
               <ShopOwnerNavBar />
            </div>
            {/* Daily pprice showing */}
            <div className="mt-[58px] fixed top-0 z-20">
               <DailyPrice />
            </div>

            {/* payment done */}

            <div className="mt-[105px]">
               {/* Routes for shopowner's pages */}
               <Routes>
                  <Route path="/" element={<ShopOwnerDashboard />}></Route>
                  <Route path="/findcrops" element={<FindCrops />}></Route>
                  <Route path="/orders" element={<ShopOwnerOrders />}></Route>
                  <Route
                     path="/inventory"
                     element={<ManageInventory />}
                  ></Route>
                  <Route path="/finance" element={<ShopOwnerFinance />}></Route>
               </Routes>
            </div>
            {/* Footer showing */}
            <ShopOwnerFooter />
         </div>
      </div>
   );
}

export default ShopOwnerRoutes;
