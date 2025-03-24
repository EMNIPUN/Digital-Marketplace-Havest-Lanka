import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/userManagement/dashboard/DashboardLayout";

function AdminRoutes() {
   return (
      <>
         <DashboardLayout>
            <Routes>
               <Route path="/*" ></Route>
            </Routes>
         </DashboardLayout>
      </>
   );
}

export default AdminRoutes;
