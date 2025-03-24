import React, { useState} from 'react';
import { Clock,X,Pencil,Trash2,Ellipsis   } from 'lucide-react';
import HandleBitPlacement from '../HandleBitPlacement/HandleBitPlacement';
import EditBidPost from '../EditBidPost/EditBidPost';
import { Link } from 'react-router-dom';
import TimeCountDown from '../TimeCountDown/TimeCountDown';

const MyBidsCard = ({ bid }) => {

  const [showDetails, setShowDetails] = useState(false);


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
          <div className='flex items-center gap-3'>
            <Link to={'/farmer/mybids/'+bid._id}>
              <button 
                className='text-green-600 px-4 '
                onClick={() => setShowDetails(!showDetails)}
              > 
              View Details
              </button>
            </Link>
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
            <TimeCountDown bidTime={bid.bidEndTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBidsCard;