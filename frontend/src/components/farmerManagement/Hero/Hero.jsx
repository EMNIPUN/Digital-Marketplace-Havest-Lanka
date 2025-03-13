import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = 5000; // Change slide every 5 seconds

    const sliderImages = [
        {
            url: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
            title: 'Fresh Vegetables Market',
            subtitle: 'Explore our wide variety of fresh, organic produce'
        },
        {
            url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
            title: 'Farm Fresh Quality',
            subtitle: 'Direct from local farmers to your table'
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
        }, slideInterval);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [sliderImages.length]);

    return (
        <div className="relative h-[300px] w-full p-0 bg-gray-800">
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                {sliderImages.map((slide, index) => {
                    return (
                        <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}>
                            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-between px-4">
                <button 
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))}
                    className="rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition duration-300"
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <div className="rounded-full bg-black/50 px-4 py-2 text-center text-white shadow-md">
                    <h2 className="text-xl font-bold">{sliderImages[currentSlide].title}</h2>
                    <p className="text-sm">{sliderImages[currentSlide].subtitle}</p>
                </div>

                <button 
                    onClick={() => setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))}
                    className="rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition duration-300"
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

export default Hero