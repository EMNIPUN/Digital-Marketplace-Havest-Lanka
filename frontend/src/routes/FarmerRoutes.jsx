import DailyPrice from "@/pages/farmerManagement/dailyprice.page";
import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import Bid from "@/pages/farmerManagement/bid.page";
import Bids from "@/pages/farmerManagement/bids.page";
import React from "react";
import {Routes, Route} from "react-router-dom";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<Bids />} />
         <Route path="/dailyprice" element={<DailyPrice />} />
         <Route path="/mybids/:id" element={<Bid />} />
      </Routes>
   )
}

export default FarmerRoutes;
