import React, { useState } from "react";
import { BoxArrowIn } from "../icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const findRole = () => {
      if (props.role === "Admin") return "marketmanager";
      else if (props.role === "Farmer") return "farmer";
      else if (props.role === "Shop Owner") return "shopowner";
      else if (props.role === "Driver") return "driver";
      else if (props.role === "Finance Manager") return "financemanager";
      else if (props.role === "Transport Manager") return "transportmanager";
      return "unknown";
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
         const response = await axios.post(
            `http://localhost:8005/login`,
            { email, password, role: findRole() },
            { withCredentials: true }
         );

         if (response.status === 400) toast.error(response.data.message);
         else if (response.status === 403) toast.warn(response.data.message);
         else if (response.status === 402) toast.error(response.data.message);
         else if (response.status === 401) toast.warn(response.data.message);
         else if (response.status === 200) toast.success(response.data.message);

         switch (findRole()) {
            case "marketmanager":
               navigate("/admin");
               break;
            case "farmer":
               navigate("/farmer");
               break;
            case "shopowner":
               navigate("/shopowner");
               break;
            case "driver":
               navigate("/driver");
               break;
            case "financemanager":
               navigate("/finance");
               break;
            case "transportmanager":
               navigate("/transport");
               break;
            default:
               console.log("Unknown role");
         }
      } catch (err) {
         const errorMessage =
            err.response?.data?.message || "An unexpected error occurred.";
         setError(errorMessage);
         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <ToastContainer />
         <div className="bg-[#f3f4f6] grid grid-cols-2 w-screen h-screen overflow-hidden">
            <div className="flex items-center justify-center">
               <div className="bg-[#fff] w-2/3 h-3/4 rounded-2xl grid grid-rows-12 overflow-hidden">
                  <div className="w-full h-full row-span-4 flex flex-col items-center justify-evenly">
                     <BoxArrowIn />
                     <h2 className="font-bold text-xl text-[#1f2937]">
                        Welcome Back {props.role}!
                     </h2>
                     <p className="text-sm text-[#4b5563] -mt-3">
                        Please sign in to continue
                     </p>
                  </div>
                  <div className="w-full h-full row-span-8 flex items-center justify-evenly border-t">
                     <form className="w-3/4 h-4/5  flex flex-col items-center justify-evenly">
                        <div className="w-full flex flex-col items-center justify-center">
                           <div className="flex flex-col items-start justify-center w-full">
                              <label className="text-[#374151] font-semibold text-sm">
                                 Email Address
                              </label>
                              <input
                                 type="email"
                                 placeholder="you@example.com"
                                 className="border mt-1 p-2 rounded-md w-full"
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                              />
                           </div>
                           <div className="flex flex-col items-start justify-center mt-2 w-full">
                              <label className="text-[#374151] font-semibold text-sm">
                                 Password
                              </label>
                              <input
                                 type="password"
                                 placeholder="••••••••"
                                 className="border mt-1 p-2 rounded-md w-full"
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                              />
                           </div>
                        </div>

                        <div className="w-full flex flex-col items-center justify-center">
                           <button
                              className={`w-full p-2 mt-4 rounded-md font-bold ${loading
                                 ? "bg-gray-400 cursor-not-allowed"
                                 : "bg-[#00b075d0] hover:bg-[#00B074] text-white"
                                 }`}
                              onClick={(e) => handleLogin(e)}
                              disabled={loading}
                           >
                              {loading ? "Wait..." : "Sign In"}
                           </button>
                           <p className="text-xs text-[#374151] font-md mt-1 cursor-pointer hover:text-[#00B074]">
                              Forgot password?
                           </p>
                        </div>
                        <div className="text-sm mt-5 text-gray-500">
                           Login as a{" "}
                           {props.role === "Shop Owner" ? (
                              <Link
                                 to="/login/farmer-login"
                                 className="text-blue-500 font-semibold"
                              >
                                 Farmer
                              </Link>
                           ) : props.role === "Farmer" ? (
                              <Link
                                 to="/login/shopowner-login"
                                 className="text-blue-500 font-semibold"
                              >
                                 Shop Owner
                              </Link>
                           ) : (
                              ""
                           )}
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            <div className="flex items-center justify-center overflow-hidden">
               <img src={props.img} className="object-cover" />
            </div>
         </div>
      </>
   );
}

export default Login;
