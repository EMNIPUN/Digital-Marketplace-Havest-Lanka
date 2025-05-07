import AllPayments from "@/components/financeManagement/AllPayments";
import DailyPrices from "@/components/financeManagement/DailyPrices";
import FinanceAnalysis from "@/components/financeManagement/FinanceAnalysis";
import FinanceFooter from "@/components/financeManagement/FinanceFooter";
import FinanceNavBar from "@/components/financeManagement/FinanceNavBar";
import FinanceOverview from "@/components/financeManagement/FinanceOverview";
import FinanceSidebar from "@/components/financeManagement/FinanceSidebar";
import PayFarmers from "@/components/financeManagement/PayFarmers";

import Payform from "@/components/financeManagement/Payform";

import React from "react";
import { Routes, Route } from "react-router-dom";

function FinanceRoutes() {
   return (
      <div className="w-full flex bg-gray-100">
         <div className="max-w-64">
            {/* Side bar showing */}
            <FinanceSidebar />
         </div>
         <div className="w-full pl-80">
            <div className="mt-[50px]">
               {/* Routes for shopowner's pages */}
               <Routes>
                  <Route path="/" element={<FinanceOverview />}></Route>
                  <Route path="/analysis" element={<FinanceAnalysis />}></Route>
                  <Route path="/allpayments" element={<AllPayments />}></Route>
                  <Route path="/payfarmers" element={<PayFarmers />}></Route>
                  <Route path="/dailyprices" element={<DailyPrices />}></Route>
               </Routes>
            </div>
            {/* Footer showing */}
            
         </div>
      </div>
   );
}

export default FinanceRoutes;
