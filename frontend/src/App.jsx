import { Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import ShopOwnerRoutes from "./routes/ShopOwnerRoutes";
import FarmerRoutes from "./routes/FarmerRoutes";
import TransportRoutes from "./routes/TransportRoutes";
import FinanceRoutes from "./routes/FinanceRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import LogoutRoute from "./routes/LogoutRoutes";
import CheckAuth from "./components/userManagement/logins/CheckAuth";
import ProfilePage from "./pages/userManagement/ProfilePage";
import FarmerRegistration from "./pages/userManagement/dashboardPages/FarmerRegistration";

function App() {
   return (
      <Routes>
         <Route index element={<Test />} />
         <Route element={<CheckAuth />} path="/*">
            <Route path="shopOwner/*" element={<ShopOwnerRoutes />} />
            <Route path="farmer/*" element={<FarmerRoutes />} />
            <Route path="transport/*" element={<TransportRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
            <Route path="finance/*" element={<FinanceRoutes />} />
            <Route path="profile/*" element={<ProfilePage />} />
            <Route path="farmer/register" element={<FarmerRegistration />} />
         </Route>

         <Route path="/login/*" element={<LoginRoutes />} />
         <Route path="/logout/*" element={<LogoutRoute />} />
      </Routes>
   );
}

export default App;
