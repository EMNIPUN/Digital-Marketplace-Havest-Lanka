import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shopOwnerManagement/logo-transparent.png";
import HeroSlider from "../components/other/heroSlider";

function LandingPage() {
   return (
      <>
         <header className="px-[120px] py-3 fixed z-[50] top-0 left-0 w-full">
            <nav className="w-full flex items-center justify-between">
               <img src={logo} className="w-32" alt="" />
               <ul className="flex gap-7 items-center text-base font-medium text-white">
                  <li>
                     <Link to="">About Us</Link>
                  </li>
                  <li>
                     <Link to="">Contact</Link>
                  </li>
                  <div className="flex gap-2">
                     <li className="py-2 w-24 flex items-center justify-center  border border-white rounded uppercase  text-white">
                        <Link to="">Log In</Link>
                     </li>
                     <li className="py-2 w-24 flex items-center justify-center bg-sec-green rounded uppercase font-medium text-white">
                        <Link to="">Join</Link>
                     </li>
                  </div>
               </ul>
            </nav>
         </header>
         <main>
            <div className="hero w-full h-screen bg-black/60">
               <HeroSlider />
            </div>
         </main>
      </>
   );
}

export default LandingPage;
