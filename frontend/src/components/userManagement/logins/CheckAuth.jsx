import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../BaseUrl";
import { Outlet, Navigate } from "react-router-dom";

const CheckAuth = () => {
   const [loading, setLoading] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await axios.get(`${BASE_URL}/check-auth`, {
               withCredentials: true,
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsAuthenticated(response.data.loggedIn);
         } catch (error) {
            setIsAuthenticated(false);
         } finally {
            setLoading(false);
         }
      };

      checkAuth();
   }, []);

   if (loading) {
      return (
         <div className="h-screen w-full bg-white flex items-center justify-center">
            <div className="w-9 h-9 border-4 border-[#4fab4a] border-t-transparent rounded-full animate-spin"></div>
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
