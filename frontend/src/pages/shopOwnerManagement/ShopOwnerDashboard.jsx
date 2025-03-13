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
import slide2 from "../../assets/shopOwnerManagement/slide-2.jpg";
import slide3 from "../../assets/shopOwnerManagement/slide-3.jpg";
import slide1 from "../../assets/shopOwnerManagement/slide-1.jpg";

function ShopOwnerDashboard() {
   return (
      <div className="p-[20px] flex flex-col gap-5">
         <div className="w-full  flex  gap-5">
            {/* Spend */}
            <div className="w-full bg-white shadow-sm rounded border border-gray-200 p-[20px]">
               <h3 className="text-gray-600">Total spend in this month</h3>
               <div className="flex items-center justify-between mt-5">
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">Total Spend</h4>
                     <p className="font-medium text-lg">240 000 LKR</p>
                  </div>
                  <div className="line w-px self-stretch bg-gray-400"></div>
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">
                        Active order amount
                     </h4>
                     <p className="font-medium text-lg text-sec-green">
                        50 000 LKR
                     </p>
                  </div>
                  <div className="line w-px self-stretch bg-gray-400"></div>
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">
                        Cancel order amount
                     </h4>
                     <p className="font-medium text-lg text-gray-500">
                        13 500 LKR
                     </p>
                  </div>
               </div>
            </div>

            {/* Orders */}
            <div className="w-full bg-white shadow-sm rounded border border-gray-200 p-[20px]">
               <h3 className="text-gray-600">Order details in this month</h3>
               <div className="flex items-center justify-between mt-5">
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">Completed orders</h4>
                     <p className="font-medium text-lg">234</p>
                  </div>
                  <div className="line w-px self-stretch bg-gray-400"></div>
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">Ongoing orders</h4>
                     <p className="font-medium text-lg text-sec-green">3</p>
                  </div>
                  <div className="line w-px self-stretch bg-gray-400"></div>
                  <div className="flex flex-col gap-1">
                     <h4 className="text-gray-500 text-sm">Canceled orders</h4>
                     <p className="font-medium text-lg text-rose-500">4</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Announcements */}
         <div className="bg-white rounded-sm">
            {" "}
            <Swiper
               modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
               spaceBetween={20}
               slidesPerView={1}
               pagination={{ clickable: true }}
               style={{ width: "100%", height: "250px" }}
               autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
               }}
               className="custom-swiper"
            >
               <SwiperSlide>
                  <div className=" bg-black/50  h-[250px] w-full flex flex-col gap-2 items-start justify-end px-20 py-12 text-white rounded-sm relative">
                     <h4 className="text-4xl font-normal">New Announcements</h4>
                     <p className="text-sm font-light tracking-wide text-white w-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, laudantium.
                     </p>
                     <img
                        src={slide2}
                        alt="Slide 1"
                        style={{
                           width: "100%",
                           height: "300px",
                           objectFit: "cover",
                        }}
                        className=" absolute top-0 left-0 -z-10 rounded-sm"
                     />
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className=" bg-black/50  h-[250px] w-full flex flex-col gap-2 items-start justify-end px-20 py-12 text-white rounded-sm relative">
                     <h4 className="text-4xl font-normal">Upcoming Events</h4>
                     <p className="text-sm font-light tracking-wide text-white w-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, laudantium.
                     </p>
                     <img
                        src={slide3}
                        alt="Slide 1"
                        style={{
                           width: "100%",
                           height: "300px",
                           objectFit: "cover",
                        }}
                        className=" absolute top-0 left-0 -z-10 rounded-sm"
                     />
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className=" bg-black/50  h-[250px] w-full flex flex-col gap-2 items-start justify-end px-20 py-12 text-white rounded-sm relative">
                     <h4 className="text-4xl font-normal">Find Best Crops</h4>
                     <p className="text-sm font-light tracking-wide text-white w-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, laudantium.
                     </p>
                     <img
                        src={slide1}
                        alt="Slide 1"
                        style={{
                           width: "100%",
                           height: "300px",
                           objectFit: "cover",
                        }}
                        className=" absolute top-0 left-0 -z-10 rounded-sm"
                     />
                  </div>
               </SwiperSlide>
            </Swiper>
         </div>
      </div>
   );
}

export default ShopOwnerDashboard;
