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
         <Route path="/ai-prediction" element={<CropsPredictionPage/>} />
         <Route path="/tarnsposition/:id" element={<TranspotationPage/>} />
=======
         <Route path="/ai-prediction" element={<CropsPredictionPage />} />
         <Route path="/tarnsposition" element={<TranspotationPage />} />
>>>>>>> 25d70fe5e05b230c8b852dec026f19e1ca50b06a
      </Routes>
   );
}

export default FarmerRoutes;
