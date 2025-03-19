import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Bid({}) {

  const { id } = useParams();
  console.log(id);

  const [bidData, setBidData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8005/api/BidPost/'+id)
      .then((response) => {
        console.log(response.data)
        setBidData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },[]);


  const bidDetails = {
    cropName: "Organic Wheat",
    basePrice: "₹2000/quintal",
    quantity: "50 quintals",
    endDate: "2024-04-15",
    description: "High-quality organic wheat harvested from sustainable farms",
    image: "https://example.com/wheat-image.jpg" // Replace with actual image path
  }

  const shopOwnerBids = [
    { id: 1, name: "Shop Owner 1", bid: "₹2200/quintal", time: "2 hours ago" },
    { id: 2, name: "Shop Owner 2", bid: "₹2150/quintal", time: "3 hours ago" },
    { id: 3, name: "Shop Owner 3", bid: "₹2100/quintal", time: "5 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Crop Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Crop Image */}
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={bidDetails.image}
                alt={bidDetails.cropName}
              />
            </div>
            
            {/* Crop Details */}
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Current Bid
              </div>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {bidDetails.cropName}
              </h2>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">{bidDetails.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">Base Price:</span>
                    <span className="ml-2 font-semibold">{bidDetails.basePrice}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <span className="ml-2 font-semibold">{bidDetails.quantity}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">End Date:</span>
                    <span className="ml-2 font-semibold">{bidDetails.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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