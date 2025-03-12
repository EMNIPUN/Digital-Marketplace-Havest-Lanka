import React from "react";
import { Routes, Route } from "react-router-dom";
import TestShopOwner from "../components/shopOwnerManagement/TestShopOwner";
import ShopOwnerSideBar from "../components/shopOwnerManagement/ShopOwnerSideBar";

function ShopOwnerRoutes() {
   return (
      <>
         <ShopOwnerSideBar />
         <Routes>
            <Route path="/testShopOwner" element={<TestShopOwner />}></Route>
         </Routes>
      </>
   );
}

export default ShopOwnerRoutes;
