import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/userManagement/logins/login";
import LoginPortal from "../components/userManagement/logins/loginPortal";
import AdminImg from "../assets/userManagement/admin.jpg"

function LoginRoutes() {
    return (
        <Routes>
            <Route path="/admin-login" element={<Login role="Admin" img={AdminImg} />}></Route>
            <Route path="/farmer-login" element={<Login role="Farmer" img={AdminImg} />}></Route>
            <Route path="/shopowner-login" element={<Login role="Shop Owner" img={AdminImg} />}></Route>
            <Route path="/driver-login" element={<Login role="Driver" img={AdminImg} />}></Route>
            <Route path="/financemanager-login" element={<Login role="Admin" img={AdminImg} />}></Route>

            <Route path="/portal" element={<LoginPortal />} ></Route>
        </Routes>
    );
}

export default LoginRoutes;
