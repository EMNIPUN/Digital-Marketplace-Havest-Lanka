import FarmerDashboardPage from "@/pages/farmerManagement/farmerdashboard.page";
import React from "react";
import {Routes, Route} from "react-router-dom";

function FarmerRoutes() {
   return (
      <Routes>
         <Route path="/dashboard" element={<FarmerDashboardPage />} />

      </Routes>
   )
}

export default FarmerRoutes;
