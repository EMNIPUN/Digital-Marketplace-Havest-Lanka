import React from "react";
import { Routes, Route } from "react-router-dom";
import TestShopOwner from "../components/shopOwnerManagement/TestShopOwner";

function ShopOwnerRoutes() {
   return (
      <Routes>
         <Route path="/testShopOwner" element={<TestShopOwner />}></Route>
      </Routes>
   );
}

export default ShopOwnerRoutes;
