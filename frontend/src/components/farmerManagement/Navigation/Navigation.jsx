import React, { useState } from 'react';
import { FaUser, FaChevronDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/farmerManagement/Navigation/avest.png';
import Token from '@/components/userManagement/logins/Token';

function Navigation() {
  const token = Token();
  const farmerId = token.userId;
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/farmer" className="flex items-center">
              <img src={logo} alt="Avest Logo" className="h-12 w-auto" />
              <span className="ml-2 text-xl font-semibold text-green-600 hidden md:block">Avest</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/farmer" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/farmer') 
                    ? 'text-green-600 border-b-2 border-green-500' 
                    : 'text-slate-600 hover:text-green-500 hover:bg-gray-50'
                }`}>
                Dashboard
              </Link>
              
              <Link to="/farmer/dailyprice"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/farmer/dailyprice') 
                    ? 'text-green-600 border-b-2 border-green-500' 
                    : 'text-slate-600 hover:text-green-500 hover:bg-gray-50'
                }`}>
                Daily Prices
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-green-500 hover:bg-gray-50 flex items-center"
                >
                  Orders
                  <FaChevronDown className="ml-1 h-3 w-3" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/farmer/orders/active" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Active Orders
                    </Link>
                    <Link to="/farmer/orders/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Payment History
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/farmer/shops"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/farmer/shops') 
                    ? 'text-green-600 border-b-2 border-green-500' 
                    : 'text-slate-600 hover:text-green-500 hover:bg-gray-50'
                }`}>
                Shops
              </Link>
              
              <Link to="/farmer/mybids"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/farmer/mybids') 
                    ? 'text-green-600 border-b-2 border-green-500' 
                    : 'text-slate-600 hover:text-green-500 hover:bg-gray-50'
                }`}>
                My Bids
              </Link>
              
              <Link to="/farmer/ai-prediction"
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition duration-150 ease-in-out shadow-sm">
                AI Prediction
              </Link>
              
              <Link to={`/profile/${farmerId}`}
                className="p-2 rounded-full text-slate-600 hover:text-green-500 hover:bg-gray-100">
                <FaUser className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/farmer" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;