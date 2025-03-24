import React, { useState } from 'react';
import { Heart } from 'lucide-react';

function BidsCard({ bids }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      {/* Status badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          bids.status === 'Active' ? 'bg-green-100 text-green-800' :
          bids.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          bids.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {bids.status || 'Active'}
        </span>
      </div>

      {/* Farmer image column */}
      <div className="p-4 flex items-start">
        <div className="relative">
          <img 
            src={bids.farmer.imageUrl} 
            alt={`${bids.farmer.name}'s profile`} 
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 bg-gray-50" 
          />
          <div className="absolute -bottom-1 -right-1">
            <button 
              onClick={handleLike}
              className={`p-1.5 rounded-full ${isLiked ? 'bg-green-50' : 'bg-gray-50'} shadow-sm focus:outline-none transition-colors duration-200`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart 
                size={16} 
                className={`${isLiked ? 'text-green-500 fill-green-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content column */}
      <div className="flex-1 p-4 pl-0">
        {/* Farmer info */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{bids.farmer.name}</h3>
          </div>
          <div className="flex items-center mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              {bids.farmer.location}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              Posted {bids.postedDate || '3 days ago'}
            </span>
          </div>
        </div>

        {/* Crop details */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-3">
          <div>
            <p className="text-xs text-gray-500">Crop Name</p>
            <p className="font-medium text-gray-900">{bids.crop.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Quantity</p>
            <p className="font-medium text-gray-900">{bids.crop.quantity} kg</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Price per kg</p>
            <p className="font-medium text-green-600">{bids.crop.price}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-2">
          <p className="text-sm text-gray-600 line-clamp-2">{bids.crop.description}</p>
        </div>

        {/* Action button */}
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default BidsCard;