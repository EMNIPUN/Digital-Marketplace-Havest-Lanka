import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../BaseUrl";
import { Outlet, Navigate } from "react-router-dom";

const CheckAuth = () => {
   const [loading, setLoading] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         axios
            .get(`${BASE_URL}/check-auth`, { withCredentials: true })
            .then((response) => {
               setIsAuthenticated(response.data.loggedIn);
               setLoading(false);
            })
            .catch(() => {
               setIsAuthenticated(false);
               setLoading(false);
            });
      }, 2000);
   }, []);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen bg-white">
            <img
               className="w-14 h-14 animate-spin"
               src="https://www.svgrepo.com/show/70469/loading.svg"
               alt="Loading icon"
            />
         </div>
      );
   }

   return isAuthenticated ? (
      <Outlet />
   ) : (
      <Navigate to="/login/portal" replace />
   );
};

export default CheckAuth;
