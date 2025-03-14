import React from 'react'
import { FaUser } from 'react-icons/fa'
import logo from '@/assets/farmerManagement/Navigation/avest.png';

function Navigation() {
  return (
    <>
      <nav className="bg-white shadow-md px-[120px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-20 h-20" />
          </div>

          <ul className="flex justify-end space-x-5 p-4 items-center">
            <li className=" text-black-600 hover:text-green-600 cursor-pointer font-medium">Home</li>
            <li className="text-slate-400 hover:text-green-600 cursor-pointer font-normal">Daily Prices</li>
            <li className="text-slate-400 hover:text-green-600 cursor-pointer font-normal">Orders</li>
            <li className="text-slate-400 hover:text-green-600 cursor-pointer font-normal">Shops</li>
            <li className="text-slate-400 hover:text-green-600 cursor-pointer font-normal">My Bids</li>
            <li className="text-slate-400 hover:text-green-600 cursor-pointer font-normal">
              <FaUser className="w-5 h-5" />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation