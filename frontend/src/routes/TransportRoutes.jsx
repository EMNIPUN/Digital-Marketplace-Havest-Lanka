import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/transportManagement/Dashboard";
import TransportManagement from "../components/transportManagement/TransportManagement";
import DriverDashboard from "../pages/transportManagement/DriverDashboard";



function TransportRoutes() {
   return (
  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<DriverDashboard />} />
        <Route path="/management" element={<TransportManagement />} />
        {/* Add other routes as needed */}
      </Routes>
   
   );
}

export default TransportRoutes;

