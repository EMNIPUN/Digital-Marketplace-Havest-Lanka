import DailyPrice from "@/pages/farmerManagement/dailyprice.page";
import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import Bid from "@/pages/farmerManagement/bid.page";
import Bids from "@/pages/farmerManagement/bids.page";
import React from "react";
import {Routes, Route} from "react-router-dom";
import CropsPredictionPage from "@/pages/farmerManagement/cropsprediction.page";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<Bids />} />
         <Route path="/dailyprice" element={<DailyPrice />} />
         <Route path="/mybids/:id" element={<Bid />} />
         <Route path="/ai-prediction" element={<CropsPredictionPage/>} />
      </Routes>
   )
}

export default FarmerRoutes;
