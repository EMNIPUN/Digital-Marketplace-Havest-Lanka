// Card5.jsx
import React, { useRef } from "react";
import ChatCard from "./ChatCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Card5() {
    // 1) Create a ref to the scrollable container
    const scrollContainerRef = useRef(null);

    // 2) Handlers for scrolling left/right
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="p-6 col-span-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#464255]">
                        User Support Requests
                    </h2>
                    <p className="text-sm text-gray-400">
                        Helping users through live chat
                    </p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={scrollRight}
                    >
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Cards Container */}
            <div
                ref={scrollContainerRef}
                className="flex space-x-4 mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#0895664f] scrollbar-track-[#f3f2f7]"
                style={{ scrollBehavior: "smooth" }} // or use Tailwind's scroll-smooth if configured
            >
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
                <ChatCard name="John Snow" recievedAt="23 min" message="Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry's standard dummy text."/>
            </div>
        </div>
    );
}

export default Card5;
