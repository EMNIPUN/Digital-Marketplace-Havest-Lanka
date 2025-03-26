import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/transportManagement/Dashboard";
import TransportManagement from "../components/transportManagement/TransportManagement";
import TransportNavbar from "@/components/transportManagement/TransportNavbar";
import TransportRequest from "@/pages/transportManagement/TransportRequest";

function TransportRoutes() {
   return (
      <>
         <TransportNavbar />
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/management" element={<TransportManagement />} />
            <Route path="/requests" element={<TransportRequest />} />
         </Routes>
      </>
   );
}

export default TransportRoutes;
