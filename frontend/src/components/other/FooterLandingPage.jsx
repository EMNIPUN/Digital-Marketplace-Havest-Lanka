import React from "react";

function FooterLandingPage() {
   return (
      <footer className="px-[120px] bg-white rounded">
         <footer className="bg-white text-gray-600 pt-10 shadow-sm ">
            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-6">
               <div>
                  <h2 className="text-xl font-semibold mb-4">About Us</h2>
                  <p className="text-sm text-gray-400">
                     We connect farmers and marketplace shops to ensure fair
                     trade and better business opportunities.
                  </p>
               </div>

               <div>
                  <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                  <ul className="space-y-2 text-sm">
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Home
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           How It Works
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Features
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Contact Us
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <h2 className="text-xl font-semibold mb-4">Categories</h2>
                  <ul className="space-y-2 text-sm">
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Fruits & Vegetables
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Grains & Pulses
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Dairy Products
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Transport Services
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <h2 className="text-xl font-semibold mb-4">Support</h2>
                  <ul className="space-y-2 text-sm">
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Help Center
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Privacy Policy
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-400 ">
                           Terms of Service
                        </a>
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-4">Follow Us</h2>
                  <div className="flex space-x-4 text-sm">
                     <a href="#" className="text-gray-400 ">
                        <i className="fab fa-facebook"></i> Facebook
                     </a>
                     <a href="#" className="text-gray-400 ">
                        <i className="fab fa-twitter"></i> Twitter
                     </a>
                     <a href="#" className="text-gray-400 ">
                        <i className="fab fa-instagram"></i> Instagram
                     </a>
                  </div>
               </div>
            </div>

            <div className="mt-5 text-center text-gray-500 text-sm border-t border-gray-200 py-5">
               © 2025 Harvest Lanka. All rights reserved.
            </div>
         </footer>
      </footer>
   );
}

export default FooterLandingPage;
