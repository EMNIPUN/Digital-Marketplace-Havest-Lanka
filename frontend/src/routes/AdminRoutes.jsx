import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/userManagement/dashboard/AdminDashboardLayout";
import AdminDashboardHome from "../pages/userManagement/dashboardPages/AdminDashboardHomePage";
import AdminDashboardRegistrationPage from "../pages/userManagement/dashboardPages/AdminDashboardRegistrationPage";
import ShopOwnerRegistrationPage from "../pages/userManagement/dashboardPages/ShopOwnerRegistrationPage";
import DriverRegistrationPage from "../pages/userManagement/dashboardPages/DriverRegistrationPage";
import FinanceManagerRegistrationPage from "../pages/userManagement/dashboardPages/FinanceManagerRegistrationPage";
import MarketManagerRegistrationPage from "../pages/userManagement/dashboardPages/MarketManagerRegistrationPage";
import AccountManagementPage from "../pages/userManagement/dashboardPages/AccountManagementPage";

function AdminRoutes() {
   return (
      <Routes>
         <Route path="/*" element={<DashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />

            <Route path="user-registration" >
               <Route index element={<AdminDashboardRegistrationPage />} />
               <Route path="shop-owner" element={<ShopOwnerRegistrationPage />} />
               <Route path="driver" element={<DriverRegistrationPage />} />
               <Route path="finance-manager" element={<FinanceManagerRegistrationPage />} />
               <Route path="market-manager" element={<MarketManagerRegistrationPage />} />
            </Route>

            <Route path="account-management" element={<AccountManagementPage />} />
         </Route>
      </Routes>
   );
}

export default AdminRoutes;
