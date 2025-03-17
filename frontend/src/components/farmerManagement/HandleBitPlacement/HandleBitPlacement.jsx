import React from 'react'
import { Clock, Sprout, Tag, AlertCircle, DollarSign, Users, Search, Filter, ChevronDown, X, MapPin, Phone, Mail, Star } from 'lucide-react'

function HandleBitPlacement() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Bid Placement Details</h3>
      </div>

      <div className="p-6">
        {/* Farmer Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-4">Farmer Details</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={24} className="text-green-600" />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} /> deailt123
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} /> Details123
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} /> Details123
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-4">Bid Information</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bid Amount</span>
                <span className="text-xl font-semibold text-green-600">₹123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Previous Deals</span>
                <span className="font-medium">wefwefvwefwefwef completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Delivery Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Proposed Delivery Date</span>
                <span>asdqedf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transport Mode</span>
                <span>qwdqw wecwqec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Terms</span>
                <span>efewvwefv wevwevwe</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Farm Details</h4>
            <p className="text-gray-600">doneasffefwef</p>
          </div>
        </div>

        {/* Action Buttons */}
      </div>
    </div>
  </div>
  )
}

export default HandleBitPlacement;