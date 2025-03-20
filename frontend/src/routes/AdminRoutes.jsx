import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/userManagement/dashboard/AdminDashboardLayout";
import AdminDashboardHome from "../pages/userManagement/dashboardPages/AdminDashboardHomePage";
import AdminDashboardRegistrationPage from "../pages/userManagement/dashboardPages/AdminDashboardRegistrationPage";
import ShopOwnerRegistrationPage from "../pages/userManagement/dashboardPages/ShopOwnerRegistrationPage";

function AdminRoutes() {
   return (
      <Routes>
         <Route path="/*" element={<DashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="user-registration" element={<AdminDashboardRegistrationPage />} />
            <Route path="user-registration/shop-owner" element={<ShopOwnerRegistrationPage />} />
         </Route>
      </Routes>
   );
}

export default AdminRoutes;
