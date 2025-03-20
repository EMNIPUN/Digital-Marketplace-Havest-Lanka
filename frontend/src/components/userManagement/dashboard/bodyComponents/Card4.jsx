import React from "react";
import ThreeDots from '../../../../assets/userManagement/threeDots.svg'

function Card4() {
    return (
        <div className="col-span-4 bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#464255]">Broadcast</h2>
                <img className="w-[30px] h-[30px]" src={ThreeDots} />
            </div>

            {/* Heading Input */}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Type Heading ..."
                    className="w-full p-3 rounded-md bg-[#EBF8FF] text-gray-700 
                     placeholder-gray-500 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Message Textarea */}
            <div className="mt-4">
                <textarea
                    rows="4"
                    placeholder="Message ..."
                    className="w-full p-3 rounded-md bg-[#EBF8FF] text-gray-700 
                     placeholder-gray-500 text-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Send Button */}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    className="bg-[#3B82F6] text-white font-semibold 
                     px-4 py-2 rounded-md text-sm uppercase
                     hover:bg-[#2563EB] focus:outline-none 
                     focus:ring-2 focus:ring-blue-300"
                >
                    SEND
                </button>
            </div>
        </div>
    );
}

export default Card4;
