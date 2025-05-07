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
import ReportsPage from "../pages/userManagement/dashboardPages/ReportsPage";
import ActivityMonitoringPage from "../pages/userManagement/dashboardPages/ActivityMonitoringPage";
import SystemConfigurationsPage from "../pages/userManagement/dashboardPages/SystemConfigurationsPage";
import TransportManagerRegistration from "../pages/userManagement/dashboardPages/TransportManagerRegistration";
import AdministrationToolsPage from "@/pages/userManagement/dashboardPages/AdministrationToolsPage";

function AdminRoutes() {
   return (
      <Routes>
         <Route path="/*" element={<DashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />

            <Route path="account-management" element={<AccountManagementPage />} />

            <Route path="user-registration" >
               <Route index element={<AdminDashboardRegistrationPage />} />
               <Route path="shop-owner" element={<ShopOwnerRegistrationPage />} />
               <Route path="driver" element={<DriverRegistrationPage />} />
               <Route path="finance-manager" element={<FinanceManagerRegistrationPage />} />
               <Route path="transport-manager" element={<TransportManagerRegistration />} />
               <Route path="market-manager" element={<MarketManagerRegistrationPage />} />
            </Route>

            <Route path="reports" element={<ReportsPage />} />

            <Route path="activity-monitoring" element={<ActivityMonitoringPage />} />

            <Route path="administration-tools" element={<AdministrationToolsPage />} />

            <Route path="system-configurations" element={<SystemConfigurationsPage />} />
         </Route>
      </Routes>
   );
}

export default AdminRoutes;
