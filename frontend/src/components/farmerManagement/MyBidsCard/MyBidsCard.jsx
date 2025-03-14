import React from 'react'
import { Calendar, DollarSign, Package, Timer, User } from 'lucide-react'

function MyBidsCard({ bid }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      {/* Bid Header */}
      <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Bid #{bid?.id || '001'}</h3>
          <p className="text-sm text-gray-500 mt-1">Created on {bid?.date || '2024-03-20'}</p>
      </div>

      {/* Bid Details */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100">
            <Package className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Crops Name</p>
              <p className="font-medium text-gray-800">{bid.cropName}</p>
            </div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100">
            <DollarSign className="w-5 h-5 mr-3 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Bid Amount</p>
              <p className="font-medium text-gray-800">${bid?.amount || '250'}/ton</p>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100">
            <Timer className="w-5 h-5 mr-3 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Expires in</p>
              <p className="font-medium text-gray-800">{bid?.expiresIn || '2 days'}</p>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="text-green-600 bg-white hover:text-green-700 py-2 px-4 rounded-lg">
          View Details
        </button>
        <button className="text-gray-600  hover:text-green-600 py-2 px-4 rounded-lg">
          Edit Bid
        </button>
      </div>
    </div>
  )
}

export default MyBidsCard