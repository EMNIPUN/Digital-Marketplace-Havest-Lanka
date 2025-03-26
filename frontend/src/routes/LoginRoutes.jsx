import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/userManagement/logins/Login";
import LoginPortal from "../components/userManagement/logins/LoginPortal";
import AdminImg from "../assets/userManagement/admin.jpg"
import ShopImg from "../assets/userManagement/shop.jpg"
import FarmerImg from "../assets/userManagement/farmer.jpg"
import FinanceImg from "../assets/userManagement/finance.jpg"
import DriverImg from "../assets/userManagement/driver.jpg"
import TransportImg from "../assets/userManagement/transportLogin.jpg"

function LoginRoutes() {
    return (
        <Routes>
            <Route path="/admin-login" element={<Login role="Admin" img={AdminImg} />}></Route>
            <Route path="/farmer-login" element={<Login role="Farmer" img={FarmerImg} />}></Route>
            <Route path="/shopowner-login" element={<Login role="Shop Owner" img={ShopImg} />}></Route>
            <Route path="/driver-login" element={<Login role="Driver" img={DriverImg} />}></Route>
            <Route path="/financemanager-login" element={<Login role="Finance Manager" img={FinanceImg} />}></Route>
            <Route path="/transport-login" element={<Login role="Transport Manager" img={TransportImg} />}></Route>

            <Route path="/portal" element={<LoginPortal />} ></Route>
        </Routes>
    );
}

export default LoginRoutes;
