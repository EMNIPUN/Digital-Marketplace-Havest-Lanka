import DailyPrice from "@/pages/farmerManagement/dailyprice.page";
import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import Bid from "@/pages/farmerManagement/bid.page";
import Bids from "@/pages/farmerManagement/bids.page";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CropsPredictionPage from "@/pages/farmerManagement/cropsprediction.page";
import TranspotationPage from "@/pages/farmerManagement/transpotation.page";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<Bids />} />
         <Route path="/dailyprice" element={<DailyPrice />} />
         <Route path="/mybids/:id" element={<Bid />} />
<<<<<<< HEAD
         <Route path="/ai-prediction" element={<CropsPredictionPage />} />
=======
         <Route path="/ai-prediction" element={<CropsPredictionPage/>} />
         <Route path="/tarnsposition" element={<TranspotationPage/>} />
>>>>>>> 1e726901fb3fa928c1fd25a9ac0c7a542d0d0a33
      </Routes>
   );
}

export default FarmerRoutes;
