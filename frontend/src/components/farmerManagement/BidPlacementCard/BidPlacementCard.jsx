import React, { useState } from 'react';
import { Heart,MailPlus, PhoneOutgoing, Package, DollarSign  } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function BidPlacementCard({bidplacementDetails, shopOwnerDetails}) {

  const handleAcceptBid =  async (e) => {
    toast("Wow so easy!")
    e.preventDefault();
    console.log(bidplacementDetails._id);
    const acceptBidData = {
      status: "Accepted"
    };
    try{
      await axios.put("http://localhost:8005/api/bid/updateBid/"+bidplacementDetails._id, acceptBidData);
      console.log("Bid Accepted Successfully");

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      {/* Status badge */}
      {/* <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          bidplacementDetails.status === 'Active' ? 'bg-green-100 text-green-800' :
          bidplacementDetails.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          bidplacementDetails.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {bidplacementDetails.status || 'Active'}
        </span>
      </div> */}


      <div className="flex justify-between items-center gap-4">

        {/* farmer details */}
        <div className="mb-3 flex-col items-center gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Saman Kumara</h3>
            <span className="ml-2 text-xs text-gray-500">
              ( 3 hours ago )
            </span>
          </div>
          <div className='flex items-center gap-2 mt-6'>
            <MailPlus className='w-5 h-5 text-gray-500' />
            <p className="text-sm text-gray-500">samankumara@email.com</p>
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <PhoneOutgoing  className='w-5 h-5 text-gray-500' />
            <p className="text-sm text-gray-500">+94 712 33 4012</p>
          </div>
        </div>

        <div className='w-[1px] h-[100px] bg-gray-300 mt-4'></div>


        {/* Crop details */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-md">
                <Package className="text-blue-600 h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Quantity</p>
                <p className="font-semibold text-gray-900">{bidplacementDetails.price}kg</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-50 rounded-md">
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Price per kg</p>
                <p className="font-semibold text-green-600">Rs.{bidplacementDetails.price}.00/kg</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[1px] h-[100px] bg-gray-300 mt-4'></div>

        {/* Action buttons */}
        <div className=" flex items-center justify-center gap-2 mr-20">
          <button 
            className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            type='submit'
            onClick={handleAcceptBid}
          >
            Accept Bid
          </button>
          <button className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Reject Bid
          </button>
          <ToastContainer />
        </div>

      </div>
    </div>
  );
}

export default BidPlacementCard;