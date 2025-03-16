import DailyPrice from "@/pages/farmerManagement/dailyprice.page";
import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import MyBids from "@/pages/farmerManagement/mybids.page";
import React from "react";
import {Routes, Route} from "react-router-dom";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<MyBids />} />
         <Route path="/dailyprice" element={<DailyPrice />} />
      </Routes>
   )
}

export default FarmerRoutes;
