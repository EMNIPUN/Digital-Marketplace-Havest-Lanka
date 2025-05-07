import DailyPrice from "@/pages/farmerManagement/dailyprice.page";
import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import Bid from "@/pages/farmerManagement/bid.page";
import Bids from "@/pages/farmerManagement/bids.page";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CropsPredictionPage from "@/pages/farmerManagement/cropsprediction.page";
import TranspotationPage from "@/pages/farmerManagement/transpotation.page";
import PaymentHistory from "@/pages/farmerManagement/payamenthistory.page";
import ShopDetailsPage from "@/pages/farmerManagement/shopdetails.page";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/" element={<FarmerDashboardPage />} />
         <Route path="/mybids" element={<Bids />} />
         <Route path="/dailyprice" element={<DailyPrice />} />
         <Route path="/mybids/:id" element={<Bid />} />
         <Route path="/ai-prediction" element={<CropsPredictionPage />} />
         <Route path="/tarnsposition/:id" element={<TranspotationPage />} />
         <Route path="/orders/history" element={<PaymentHistory/>} />
         <Route path="/shops" element={<ShopDetailsPage/>} />
      </Routes>
   );
}

export default FarmerRoutes;
