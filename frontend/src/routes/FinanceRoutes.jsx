import Payform from "@/components/financeManagement/Payform";
import React from "react";
import { Routes, Route } from "react-router-dom";

function FinanceRoutes() {
   return (
      <Routes>
         <Route path="/payform" element={<Payform />}></Route>
      </Routes>
   );
}

export default FinanceRoutes;
