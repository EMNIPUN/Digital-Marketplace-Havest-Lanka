import React, { useState, useEffect } from 'react';
import { Clock, Award, User, Wheat,Tag } from 'lucide-react';
import HandleBitPlacement from '../HandleBitPlacement/HandleBitPlacement';

const MyBidsCard = ({ bid }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 justify-center bg-green-50 rounded-full px-4 py-2">
            <div className="relative inline-flex">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="w-4 h-4 bg-green-600 rounded-full absolute top-0 left-0 animate-ping"></div>
              <div className="w-4 h-4 bg-green-600 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>   
            <h2 className="text-lg font-semibold text-gray-800">{bid.cropsName}</h2>        
          </div>
          <div>
            <button 
              className='text-green-600 px-4 '
              onClick={() => setShowDetails(!showDetails)}
            > 
            Viwe Details
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600 text-base leading-relaxed line-clamp-2">{bid.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-500 block mb-1">Starting Price</span>
                <span className="text-xl font-bold text-gray-800">Rs. {bid.price}.00</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-500 block mb-1">Quantity</span>
                <span className="text-xl font-bold text-gray-800">{bid.quantity} Kg</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Clock size={18} className="text-green-600 mr-2" />
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
        </div>

        {showDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Owner Bids</h3>
            <HandleBitPlacement />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBidsCard;