import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import RequestTransport from '@/components/farmerManagement/RequestTransport/RequestTransport';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import React, { useState } from 'react';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaBox, FaInfoCircle } from 'react-icons/fa';

function TranspotationPage() {


  return (
    <>
        <Navigation/>
        <div className="min-h-screen bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-5">
            <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                <FaTruck className="text-green-600 text-3xl" />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Request Transportation
            </h1>
            <p className="text-gray-600">
                Fill out the form below to request transportation for your agricultural products
            </p>
            </div>

            {/* Main Form */}
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <RequestTransport/>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Transportation Guidelines
            </h2>
            <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>Please provide accurate weight and dimensions of your cargo</span>
                </li>
                <li className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>Ensure your contact number is correct for delivery updates</span>
                </li>
                <li className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>Special handling requirements should be clearly mentioned</span>
                </li>
                <li className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>Transportation rates may vary based on distance and cargo type</span>
                </li>
            </ul>
            </div>
        </div>
        </div>
        <FooterLandingPage/>
    </>
  );
}

export default TranspotationPage;