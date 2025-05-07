import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LandingPage from "./pages/LandingPage";

const ShopOwnerRoutes = lazy(() => import("./routes/ShopOwnerRoutes"));
const FarmerRoutes = lazy(() => import("./routes/FarmerRoutes"));
const TransportRoutes = lazy(() => import("./routes/TransportRoutes"));
const FinanceRoutes = lazy(() => import("./routes/FinanceRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const LoginRoutes = lazy(() => import("./routes/LoginRoutes"));
const LogoutRoute = lazy(() => import("./routes/LogoutRoutes"));
const CheckAuth = lazy(() => import("./components/userManagement/logins/CheckAuth"));
const ProfilePage = lazy(() => import("./pages/userManagement/ProfilePage"));
const FarmerRegistration = lazy(() => import("./pages/userManagement/dashboardPages/FarmerRegistration"));
const DriverDashboard = lazy(() => import("./pages/transportManagement/DriverDashboard"));
const Payform = lazy(() => import("./components/financeManagement/Payform"));





function App() {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <Routes>
            <Route index element={<LandingPage />} />

            <Route element={<CheckAuth />} path="/*">
               <Route path="shopOwner/*" element={<ShopOwnerRoutes />} />
               <Route path="farmer/*" element={<FarmerRoutes />} />
               <Route path="transport/*" element={<TransportRoutes />} />
               <Route path="admin/*" element={<AdminRoutes />} />
               <Route path="finance/*" element={<FinanceRoutes />} />
               <Route path="profile/:id" element={<ProfilePage />} />
               <Route path="driver/" element={<DriverDashboard />} />
               <Route path="payform" element={<Payform />} />
            </Route>

            <Route path="/login/*" element={<LoginRoutes />} />
            <Route path="/logout/*" element={<LogoutRoute />} />
            <Route path="/farmer/register" element={<FarmerRegistration />} />
         </Routes>
      </Suspense>
   );
}

export default App;
