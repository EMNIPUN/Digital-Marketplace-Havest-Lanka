import React, { useState, useEffect } from 'react';
import { Clock, LoaderCircle  } from 'lucide-react';

function TimeCountDown({ bidTime }) {  // Accept props correctly

    const [isLoading, setIsLoading] = useState(false);

    function calculateTimeLeft() {
        const difference = new Date(bidTime) - new Date();
        if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

        return {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
            setIsLoading(true);
        }, 1000);

        return () => clearInterval(timer);
    }, [bidTime]); 
    
    if (!isLoading) {
        return (
            <div className='mt-10 ml-32'>
                <LoaderCircle  className="h-4 w-4 text-gray-400 animate-spin" />
            </div>
        )
    }

    return (
        <div className="bg-green-50 rounded-xl p-4 text w-[250px]">
            <div className="flex items-center mb-3">
                <Clock size={18} className="text-green-600 mr-2 " />
                <span className="text-sm font-medium text-gray-700">Auction ends in</span>
            </div>
            <div className="flex space-x-3">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold bg-white text-green-600 py-2 px-3 rounded-lg shadow-sm min-w-[60px] text-center">
                        {timeLeft.hours}
                    </div>
                    <span className="text-xs mt-2 text-gray-600 font-medium">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold bg-white text-green-600 py-2 px-3 rounded-lg shadow-sm min-w-[60px] text-center">
                        {timeLeft.minutes}
                    </div>
                    <span className="text-xs mt-2 text-gray-600 font-medium">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold bg-white text-green-600 py-2 px-3 rounded-lg shadow-sm min-w-[60px] text-center">
                        {timeLeft.seconds}
                    </div>
                    <span className="text-xs mt-2 text-gray-600 font-medium">Seconds</span>
                </div>
            </div>
        </div>
    );
}

export default TimeCountDown;
