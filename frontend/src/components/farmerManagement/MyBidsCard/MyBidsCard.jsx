import React, { useState, useEffect } from 'react';
import { Clock, Award, User, Wheat,Tag } from 'lucide-react';

const MyBidsCard = ({ bid }) => {

  function calculateTimeLeft() {
    const difference = new Date(bid.bidEndTime) - new Date();
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className=" bg-white rounded-lg overflow-hidden shadow-md">

      <div className="p-6">

        <div className="flex items-center mb-4 bg-slate-200 rounded-lg w-[145px] px-2 ">
          <Tag size={16} className="text-sm text-gray-500 gap-2 mr-2"></Tag>
          <h2 className="text-base font-medium text-gray-800 ">{bid.cropsName}</h2>
        </div>
        
        <div className='flex justify-between items-center gap-3'>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-600 line-clamp-2 w-[400px]">{bid.description}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Starting Price(Rs) : {bid.price}</span>
                <span className="text-gray-700">Quantity: {bid.quantity}</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-2 text-blue-600" />
                <span className="text-sm text-gray-600">Auction ends in:</span>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold bg-green-600 text-white py-2 px-3 rounded-md">
                    {timeLeft.hours}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold bg-green-600 text-white py-2 px-3 rounded-md">
                    {timeLeft.minutes}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold bg-green-600 text-white py-2 px-3 rounded-md">
                    {timeLeft.seconds}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Seconds</span>
                </div>
              </div>
            </div>
        </div>
        
        
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBidsCard;