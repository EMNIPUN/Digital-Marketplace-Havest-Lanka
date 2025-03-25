import React, { useState} from 'react';
import { X, CheckCircle, Wheat, Leaf,Truck,FileText} from 'lucide-react';
import HandleBitPlacement from '../HandleBitPlacement/HandleBitPlacement';
import EditBidPost from '../EditBidPost/EditBidPost';
import { Link } from 'react-router-dom';
import TimeCountDown from '../TimeCountDown/TimeCountDown';

const MyBidsCard = ({ bid }) => {

  const [showDetails, setShowDetails] = useState(false);


  return (
    
    <div className= "relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 justify-center rounded-full px-2 py-1  bg-green-100 text-green-700 text-sm 
            font-medium  hover:bg-green-100 transition-colors duration-200 border  border-green-300 shadow-sm z-10">
            <div className="relative inline-flex ">
              <div className={`w-3 h-3 rounded-full ${
                 bid.status === "Active" ? "bg-green-600" :
                 bid.status === "Payment Pending" ? "bg-yellow-400" :
                 bid.status === "Payment Failed" ? "bg-red-600" :
                 "bg-green-600"
              }`}></div>

              <div className={`w-3 h-3 rounded-full absolute top-0 left-0 animate-ping
              ${
                 bid.status === "Active" ? "bg-green-600" :
                 bid.status === "Payment Pending" ? "bg-yellow-400" :
                 bid.status === "Payment Failed" ? "bg-red-600" :
                 "bg-green-600"
              }`}></div>

              <div className={`w-3 h-3 rounded-full absolute top-0 left-0 animate-pulse ${
                 bid.status === "Active" ? "bg-green-600" :
                 bid.status === "Payment Pending" ? "bg-yellow-400" :
                 bid.status === "Payment Failed" ? "bg-red-600" :
                 "bg-green-600"
              }`}></div>
            </div>   
            <h2 className="text-xs font-semibold  text-gray-800">{bid.status}</h2>        
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
          <div className="bg-white">
            <div className="flex items-center mb-3">
              <Wheat className="mr-3 text-green-600" size={24} />
              <h1 className='text-2xl font-semibold text-gray-800'>{bid.cropsName}</h1>
            </div>
            <div className="flex items-start">
              <Leaf className="mr-3 mt-1 text-green-500" size={16} />
              <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
                {bid.description}
              </p>
            </div>
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

        {bid.status === "Payment Pending" && (
          <div className="absolute top-[65px] left-[3px] right-[20px] w-full bg-gray-100 flex justify-center">
            <div className="bg-white p-5 text-center w-[800px] h-[350px] ">
              <div className="flex justify-center items-center gap-3">
                <div className="flex justify-center">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Bid Accepted Successfully</h2>
              </div>

              <p className="text-gray-600 mb-4 text-sm">
                Congratulations! Your bid has been accepted. Here are the details:
              </p>

              <div className="bg-gray-100 flex-col items-center justify-between gap-2 p-3 rounded-lg text-left mb-4">
                <p className="text-sm text-gray-700"><strong>Quantity:</strong> {bid.quantity} kg</p>
                <p className="text-sm text-gray-700"><strong>Price per kg:</strong> Rs.{bid.price}.00</p>
                <p className="text-sm text-gray-700"><strong>Delivery Date:</strong> {bid.deliveryDate || "Not Specified"}</p>
              </div>

              <div className="flex justify-center gap-4">
              <div className="flex items-center justify-between gap-20">
                <button disabled className="flex items-center justify-center px-4 py-2  bg-green-100 text-green-600 text-sm 
                      font-medium  rounded-lg cursor-not-allowed opacity-50  hover:bg-green-100 transition-colors duration-200 
                      border  border-green-300 shadow-sm"
                  >
                    <Truck className="mr-2" size={16} />
                    Request Transport
                  </button>
                  
                  <button 
                    className="flex items-center justify-center px-4 py-2  bg-blue-100 text-blue-600 text-sm font-medium 
                      rounded-lg  opacity-90  hover:bg-blue-100 transition-colors duration-200 border border-blue-300 
                      shadow-sm"
                  >
                    <FileText className="mr-2" size={16} />
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default MyBidsCard;