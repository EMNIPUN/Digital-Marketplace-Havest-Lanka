import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import MyBids from "@/pages/farmerManagement/mybids.page";
import React from "react";
import {Routes, Route} from "react-router-dom";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/dashboard" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<MyBids />} />
      </Routes>
   )
}

export default FarmerRoutes;
