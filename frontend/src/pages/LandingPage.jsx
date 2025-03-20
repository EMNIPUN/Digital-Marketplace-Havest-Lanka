import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shopOwnerManagement/logo-transparent.png";
import whyus from "../assets/why-us.jpg";
import aboutus from "../assets/about-us.jpg";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import testamonial from "../assets/testamonial.jpg";
import HeroSlider from "../components/other/heroSlider";
import DailyPrice from "@/components/other/DailyPrice";
import FooterLandingPage from "@/components/other/FooterLandingPage";

function LandingPage() {
   const [scrollNavbar, setScrollNavbar] = useState(false);

   const scrollNavbarChange = () => {
      if (window.scrollY > 150) {
         setScrollNavbar(true);
      } else {
         setScrollNavbar(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", scrollNavbarChange);
   }, []);

   return (
      <>
         {/* Navigation bar */}
         <header
            className={` fixed z-[50] top-0 left-0 w-full ${
               scrollNavbar ? "bg-sec-green shadow" : ""
            }`}
         >
            <nav className="w-full flex items-center justify-between px-[120px] py-3">
               <img src={logo} className="w-32" alt="" />
               <ul
                  className={`flex gap-5 items-center text-base font-medium ${
                     scrollNavbar ? "text-white" : "text-white"
                  } `}
               >
                  <li>
                     <Link to="">About Us</Link>
                  </li>
                  <li>
                     <Link to="">Contact</Link>
                  </li>
                  <div className="flex gap-2">
                     <Link to="/login/farmer-login">
                        <li
                           className={`py-2 w-24 flex items-center justify-center rounded border-white border  text-white`}
                        >
                           Log In
                        </li>
                     </Link>
                     <li
                        className={`${
                           scrollNavbar
                              ? "bg-white text-sec-green"
                              : "bg-sec-green  text-white"
                        } py-2 w-24 flex items-center justify-center  rounded  font-medium`}
                     >
                        <Link to="">Join</Link>
                     </li>
                  </div>
               </ul>
            </nav>
            {scrollNavbar && <DailyPrice />}
         </header>
         {/* Main content */}
         <main>
            {/* Hero section */}
            <div className="hero w-full h-screen bg-black">
               <HeroSlider
                  setScrollNavbar={setScrollNavbar}
                  scrollNavbar={scrollNavbar}
               />
            </div>
            {/* count */}
            <div className="w-full flex py-12 px-[120px] items-center justify-center">
               <div className="w-3/4 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                     <div className="text-4xl font-medium">350K+</div>
                     <div className="text-gray-700 font-light tracking-wide">
                        Completed Sells
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="text-4xl font-medium">1000+</div>
                     <div className="text-gray-700 font-light tracking-wide">
                        Happy Farmers
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="text-4xl font-medium">200+</div>
                     <div className="text-gray-700 font-light tracking-wide">
                        Working Staff
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="text-4xl font-medium">350+</div>
                     <div className="text-gray-700 font-light tracking-wide">
                        Busy Shops
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="text-4xl font-medium">4500K+</div>
                     <div className="text-gray-700 font-light tracking-wide">
                        Positive Reviews
                     </div>
                  </div>
               </div>
            </div>
            {/* Why us */}
            <div
               className="w-full h-screen flex"
               style={{
                  backgroundImage: ` linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),url(${whyus})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top right",
               }}
            >
               <div className="w-1/2 h-screen pl-[120px] pr-[50px]  bg-black/90 flex flex-col gap-10 justify-center">
                  <h2 className="text-4xl text-white">
                     How Our Marketplace Transforms Farming & Trade
                  </h2>
                  <div className="flex flex-col gap-7 text-white">
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Fair Pricing for Farmers:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7  tracking-wide">
                           Say goodbye to middlemen! Farmers get direct access
                           to shop owners, ensuring better prices for their
                           hard-earned produce.
                        </p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Seamless Marketplace Connections:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7 tracking-wide">
                           Shop owners can post their needs, and farmers can
                           browse and fulfill orders effortlessly—bringing
                           efficiency to the supply chain.
                        </p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Smart Inventory & Transport Management:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7  tracking-wide">
                           Easily book transport services for fresh produce
                           delivery, reducing waste and improving logistics for
                           both farmers and shop owners.
                        </p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Boosting Local Agriculture:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7  tracking-wide">
                           By connecting farmers and markets directly, we
                           empower rural communities, strengthen local
                           economies, and promote sustainable agriculture. .
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* About us */}
            <div
               className="w-full h-screen flex"
               style={{
                  backgroundImage: ` linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),url(${aboutus})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top right",
               }}
            >
               <div className="w-1/2"></div>
               <div className="w-1/2 h-screen pr-[120px] px-[70px]  bg-black/90 flex flex-col gap-10 justify-center">
                  <h2 className="text-4xl text-white">
                     About Us – Empowering Farmers, Revolutionizing Trade
                  </h2>
                  <div className="flex flex-col gap-7 text-white">
                     <p className="font-light text-gray-400  tracking-wide">
                        In today's agricultural landscape, farmers struggle with
                        unstable prices, limited market access, and unfair trade
                        practices. Our marketplace is here to change that!{" "}
                        <br />
                        <br />
                        We bridge the gap between farmers and shop owners,
                        providing a fair, transparent, and efficient trading
                        platform. By eliminating middlemen, we ensure that
                        farmers get the best price for their produce, while shop
                        owners find fresh, high-quality crops with ease.
                     </p>
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Our Mission:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7  tracking-wide">
                           To create a sustainable ecosystem where farmers
                           thrive, shop owners grow, and communities benefit.
                        </p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium flex items-center gap-2">
                           <i class="bi bi-check-circle-fill text-sec-green"></i>{" "}
                           <div>Our Vision:</div>
                        </h3>
                        <p className="font-light text-gray-400 pl-7 tracking-wide">
                           A future where every farmer has direct market access,
                           every shop owner gets fresh produce effortlessly, and
                           agriculture becomes more profitable for all.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* How it's work */}
            <div className="w-full  flex flex-col px-[120px] py-24 gap-14">
               <div className="w-full flex items-center justify-center">
                  <h2 className="text-4xl text-black text-center w-3/5 font-semibold">
                     How It Works – Seamless Trading for Farmers & Shop Owners.
                  </h2>
               </div>
               <div className="flex w-full gap-14">
                  {/* Farmers Section */}
                  <div className="w-1/2 flex flex-col gap-5">
                     <h3 className="text-2xl font-medium">
                        For Farmers – Sell Your Crops with Ease
                     </h3>
                     <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 1
                              </div>
                              <div>List Your Produce</div>
                           </h3>
                           <div className="flex flex-col gap-1">
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Sign up and create a listing for your crops.
                              </p>
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Add details like crop type, quantity, price
                                 per kg, and location.
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 2
                              </div>
                              <div>Find Shop Owners in Need</div>
                           </h3>
                           <div className="flex flex-col gap-1">
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Browse shop owners' posted requests for fresh
                                 produce.
                              </p>
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Send offers or negotiate directly to secure
                                 the best deal.
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 3
                              </div>
                              <div>Deliver & Get Paid Securely</div>
                           </h3>
                           <div className="flex flex-col gap-1">
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Confirm the order and book a transport
                                 service if needed.
                              </p>
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Receive secure payments without middlemen.
                              </p>
                              <p className="font-normal text-gray-700 pl-7 tracking-wide">
                                 - Rate and review your buyer to build a trusted
                                 reputation.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Line */}
                  <div className="line w-px h-auto bg-gray-300"></div>
                  {/* Shop Owners Section */}
                  <div className="w-1/2 flex flex-col gap-5">
                     <h3 className="text-2xl font-medium">
                        For Shop Owners – Get Produce Hassle-Free
                     </h3>
                     <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 1
                              </div>
                              <div>Post Your Crop Needs</div>
                           </h3>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Register and post what crops you need, along
                              with quantity, location, and expected delivery
                              date.
                           </p>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 2
                              </div>
                              <div>Receive Offers & Choose the Best Deal</div>
                           </h3>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Farmers will send offers based on your needs.
                           </p>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Compare prices, quality, and seller ratings
                              before making a deal.
                           </p>
                        </div>
                        <div className="flex flex-col gap-1">
                           <h3 className="text-xl font-medium flex items-center gap-2">
                              <div className="w-6 h-6 bg-sec-green text-sm text-white font-medium flex items-center justify-center rounded">
                                 3
                              </div>
                              <div>Secure the Order & Arrange Transport</div>
                           </h3>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Confirm your order and schedule a transport
                              service if required.
                           </p>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Make safe online payments and receive your crops
                              on time.
                           </p>
                           <p className="font-normal text-gray-700 pl-7 tracking-wide">
                              - Leave a review to help improve the marketplace
                              experience.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Testamonials */}
            <div
               className="w-full flex flex-col gap-14 text-white px-[120px] py-16"
               style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),url(${testamonial})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top right",
               }}
            >
               {/* Section Heading */}
               <div className="w-full flex items-center justify-center flex-col gap-1">
                  <h2 className="text-4xl text-white text-center w-3/5 font-semibold">
                     What Farmers Say About Us.
                  </h2>
                  <p className="font-light tracking-wide text-gray-300">
                     Hear from farmers who have transformed their trade with our
                     platform.
                  </p>
               </div>

               {/* Testimonial Cards */}
               <div className="flex w-full gap-6 items-stretch justify-between mb-10">
                  {/* Card 1 */}
                  <div className="w-1/3 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 px-6 py-8 flex flex-col items-center text-center border border-gray-100">
                     <div className="relative mb-4">
                        <img
                           src={img1}
                           alt="Akindu Nayanajith"
                           className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800">
                        Akindu Nayanajith
                     </h3>
                     <p className="text-gray-500 text-sm flex items-center gap-1">
                        <i className="bi bi-geo-alt text-gray-400"></i>Badulla
                     </p>
                     <div className="flex items-center mt-3 text-yellow-500">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span className="text-gray-500 text-xs ml-1">
                           (5.0)
                        </span>
                     </div>
                     <div className="mt-4 relative">
                        <i className="bi bi-quote text-gray-200 text-4xl absolute -top-4 -left-2 opacity-30"></i>
                        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                           "This platform has helped me connect with shop owners
                           directly and get fair prices for my crops. Highly
                           recommended!"
                        </p>
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 w-full">
                        <p className="text-xs text-gray-400">
                           Verified Farmer • Member since 2023
                        </p>
                     </div>
                  </div>

                  {/* Card 2 */}
                  <div className="w-1/3 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 px-6 py-8 flex flex-col items-center text-center border border-gray-100">
                     <div className="relative mb-4">
                        <img
                           src={img2}
                           alt="Kasun Perera"
                           className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800">
                        Kasun Perera
                     </h3>
                     <p className="text-gray-500 text-sm flex items-center gap-1">
                        <i className="bi bi-geo-alt text-gray-400"></i>Kandy
                     </p>
                     <div className="flex items-center mt-3 text-yellow-500">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span className="text-gray-500 text-xs ml-1">
                           (5.0)
                        </span>
                     </div>
                     <div className="mt-4 relative">
                        <i className="bi bi-quote text-gray-200 text-4xl absolute -top-4 -left-2 opacity-30"></i>
                        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                           "I can now sell my vegetables without middlemen
                           taking a cut. The transport booking feature is also a
                           game-changer!"
                        </p>
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 w-full">
                        <p className="text-xs text-gray-400">
                           Verified Farmer • Member since 2022
                        </p>
                     </div>
                  </div>

                  {/* Card 3 */}
                  <div className="w-1/3 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 px-6 py-8 flex flex-col items-center text-center border border-gray-100">
                     <div className="relative mb-4">
                        <img
                           src={img3}
                           alt="Nuwan Bandara"
                           className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800">
                        Nuwan Bandara
                     </h3>
                     <p className="text-gray-500 text-sm flex items-center gap-1">
                        <i className="bi bi-geo-alt text-gray-400"></i>Nuwara
                        Eliya
                     </p>
                     <div className="flex items-center mt-3 text-yellow-500">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span className="text-gray-500 text-xs ml-1">
                           (5.0)
                        </span>
                     </div>
                     <div className="mt-4 relative">
                        <i className="bi bi-quote text-gray-200 text-4xl absolute -top-4 -left-2 opacity-30"></i>
                        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                           "Easy to use and very effective. I get real-time
                           requests from shop owners and negotiate the best
                           deals."
                        </p>
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 w-full">
                        <p className="text-xs text-gray-400">
                           Verified Farmer • Member since 2024
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Footer */}
            <FooterLandingPage />
         </main>
      </>
   );
}

export default LandingPage;
