import React from "react";
import {
   Navigation,
   Pagination,
   Scrollbar,
   A11y,
   Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";
import slide1 from "../../assets/hero-1.jpg";
import slide2 from "../../assets/hero-2.jpg";
import slide3 from "../../assets/hero-3.jpg";

function HeroSlider() {
   return (
      <div>
         {" "}
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ width: "100%", height: "100vh" }}
            autoplay={{
               delay: 7000,
               disableOnInteraction: false,
            }}
            className="custom-swiper"
         >
            <SwiperSlide>
               <div className=" bg-black/60 w-full h-screen flex flex-col gap-5 items-start justify-center text-white rounded-sm relative px-[120px]">
                  <div className="flex gap-1 flex-col">
                     <h4 className="text-5xl font-medium w-3/5 leading-tight">
                        Build a Future Where Every Harvest Gets the Value It
                        Deserves.
                     </h4>
                     <p className="text-base font-light tracking-wide text-white">
                        Join with harvest Lanka and make trading easy
                     </p>
                  </div>
                  <button className="bg-sec-green w-36 h-12 rounded text-base font-medium uppercase">
                     Join Now
                  </button>
                  <img
                     src={slide3}
                     alt="Slide 1"
                     style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                     }}
                     className=" absolute top-0 left-0 -z-10 rounded-sm"
                  />
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className=" bg-black/60 w-full h-screen flex flex-col gap-5 items-start justify-center text-white rounded-sm relative px-[120px]">
                  <div className="flex gap-1 flex-col">
                     <h4 className="text-5xl font-medium w-3/5 leading-tight">
                        Take Control of Your Produce and Earn 100% profit that You Truly
                        Deserve.
                     </h4>
                     <p className="text-base font-light tracking-wide text-white">
                        Join with harvest Lanka and make trading easy
                     </p>
                  </div>
                  <button className="bg-sec-green w-36 h-12 rounded text-base font-medium uppercase">
                     Lear More
                  </button>
                  <img
                     src={slide2}
                     alt="Slide 1"
                     style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                        position: "top",
                     }}
                     className=" absolute top-0 left-0 -z-10 rounded-sm"
                  />
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className=" bg-black/60 w-full h-screen flex flex-col gap-5 items-start justify-center text-white rounded-sm relative px-[120px]">
                  <div className="flex gap-1 flex-col">
                     <h4 className="text-5xl font-medium w-3/5 leading-tight">
                        Bringing Farmers and Marketplaces Together for Smarter,
                        Hassle-Free Trading.
                     </h4>
                     <p className="text-base font-light tracking-wide text-white">
                        Join with harvest Lanka and make trading easy
                     </p>
                  </div>
                  <button className="bg-sec-green w-36 h-12 rounded text-base font-medium uppercase">
                     Contact
                  </button>
                  <img
                     src={slide1}
                     alt="Slide 1"
                     style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                        position: "top",
                     }}
                     className=" absolute top-0 left-0 -z-10 rounded-sm"
                  />
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   );
}

export default HeroSlider;
