import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pencil, Trash2,X } from 'lucide-react';

import axios from 'axios'
import TimeCountDown from '@/components/farmerManagement/TimeCountDown/TimeCountDown';
import EditBidPost from '@/components/farmerManagement/EditBidPost/EditBidPost';

function Bid({}) {

  const [isVisibale, setIsVisible] = useState(false);

  const { id } = useParams();
  console.log(id);

  const [bidDetails, setBidDetails] = useState({});

  const getBidDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/BidPost/'+id);
      console.log(response.data)
      setBidDetails(response.data)
    } catch (error) {
      console.error("Error fetching bid details")
    }
  }
  
  useEffect(() => {
    getBidDetails();
  },[]);


  const shopOwnerBids = [
    { id: 1, name: "Shop Owner 1", bid: "₹2200/quintal", time: "2 hours ago" },
    { id: 2, name: "Shop Owner 2", bid: "₹2150/quintal", time: "3 hours ago" },
    { id: 3, name: "Shop Owner 3", bid: "₹2100/quintal", time: "5 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">


        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">

            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src="https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fycm90fGVufDB8fDB8fHww"
                alt={bidDetails.cropName}
              />
            </div>
            
            <div className="p-8">
              <div className='flex justify-between items-center'>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {bidDetails.cropsName}
                </h2>
                <div className='flex gap-3'>
                    <button onClick={()=>setIsVisible(!isVisibale)}><Pencil size={20} className="text-green-600" /></button>
                    <button><Trash2 size={20} className="text-red-500" /></button>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">{bidDetails.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">Base Price:</span>
                    <span className="ml-2 font-semibold">{bidDetails.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <span className="ml-2 font-semibold">{bidDetails.quantity}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">End Date:</span>
                    <span className="ml-2 font-semibold">{bidDetails.bidEndTime}</span>
                  </div>
                </div>
                <div>
                  <TimeCountDown bidTime={bidDetails.bidEndTime} />
                </div>

              </div>
            </div>
          </div>
        </div>

        {isVisibale && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Create New Post</h2>
                <button 
                  onClick={() => setIsVisible(!isVisibale)} 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <EditBidPost bidDetails={bidDetails} onUpdate={getBidDetails()}  />
              </div>
            </div>
          </div>
        )}
        

        {/* Shop Owner Bids Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Bids</h3>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {shopOwnerBids.map((bid) => (
                <li key={bid.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{bid.name}</p>
                      <p className="text-sm text-gray-500">{bid.time}</p>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {bid.bid}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Place Bid Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
            Place Your Bid
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bid;
