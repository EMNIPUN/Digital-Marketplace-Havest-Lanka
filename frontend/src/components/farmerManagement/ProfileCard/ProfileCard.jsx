import React from 'react';
import { User, ShoppingBag, CheckCircle, CreditCard, ChevronRight } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-md">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-24 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
              <img 
                src="https://img.freepik.com/premium-photo/young-indian-farmer-standing-cotton-agriculture-field_75648-6961.jpg?ga=GA1.1.354948533.1732556959&semt=ais_hybrid" 
                alt="Nipun Dhanajaya" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-6 px-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Nipun Dhanajaya</h1>
              <p className="text-sm text-gray-500 mt-1">Premium Member since 2023</p>
            </div>
            <button className="bg-green-50 text-green-700 font-medium text-sm px-4 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200">
              View Profile
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2">
                <ShoppingBag size={18} className="text-green-600" />
              </div>
              <p className="text-xs text-gray-500">Ongoing</p>
              <p className="font-bold text-gray-800">1</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-2">
                <CheckCircle size={18} className="text-blue-600" />
              </div>
              <p className="text-xs text-gray-500">Completed</p>
              <p className="font-bold text-gray-800">25</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-full mb-2">
                <CreditCard size={18} className="text-purple-600" />
              </div>
              <p className="text-xs text-gray-500">Monthly</p>
              <p className="font-bold text-gray-800">₹122,500</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3">
                  <ShoppingBag size={16} className="text-amber-600" />
                </div>
                <span className="text-gray-700">My Orders</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mr-3">
                  <User size={16} className="text-red-600" />
                </div>
                <span className="text-gray-700">Edit Profile</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                  <CreditCard size={16} className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Payment Methods</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;