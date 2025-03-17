import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/shopOwnerManagement/shopOwner.css";

import ShopOwnerSideBar from "../components/shopOwnerManagement/ShopOwnerSideBar";
import ShopOwnerDashboard from "../pages/shopOwnerManagement/ShopOwnerDashboard";
import ShopOwnerNavBar from "../components/shopOwnerManagement/ShopOwnerNavBar";
import FindCrops from "../pages/shopOwnerManagement/FindCrops";
import ShopOwnerFooter from "../components/shopOwnerManagement/ShopOwnerFooter";
import ShopOwnerOrders from "../pages/shopOwnerManagement/ShopOwnerOrders";
import ShopOwnerInbox from "../pages/shopOwnerManagement/ShopOwnerInbox";
import ManageInventory from "../pages/shopOwnerManagement/ManageInventory";
import AddInventoryItem from "../components/shopOwnerManagement/AddInventoryItem";
import CropDetails from "../components/shopOwnerManagement/CropDetails";

function ShopOwnerRoutes() {
   const [isClickAddItem, setIsClickAddItem] = useState(false);
   const [isClickViewCropDetails, setIsClickViewCropDetails] = useState(false);

   return (
      <div className="w-full flex bg-gray-100">
         <div className="max-w-64">
            <ShopOwnerSideBar />
         </div>
         <div className="w-full pl-80">
            <ShopOwnerNavBar />
            {isClickAddItem && (
               <AddInventoryItem setIsClickAddItem={setIsClickAddItem} />
            )}
            {isClickViewCropDetails && (
               <CropDetails
                  setIsClickViewCropDetails={setIsClickViewCropDetails}
               />
            )}
            <div className="mt-14">
               <Routes>
                  <Route path="/" element={<ShopOwnerDashboard />}></Route>
                  <Route
                     path="/findcrops"
                     element={
                        <FindCrops
                           setIsClickViewCropDetails={setIsClickViewCropDetails}
                        />
                     }
                  ></Route>
                  <Route path="/orders" element={<ShopOwnerOrders />}></Route>
                  <Route path="/inbox" element={<ShopOwnerInbox />}></Route>
                  <Route
                     path="/inventory"
                     element={
                        <ManageInventory
                           setIsClickAddItem={setIsClickAddItem}
                        />
                     }
                  ></Route>
               </Routes>
            </div>
            <ShopOwnerFooter />
         </div>
      </div>
   );
}

export default ShopOwnerRoutes;
