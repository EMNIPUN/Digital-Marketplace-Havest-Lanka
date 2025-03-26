import React from "react";

const Loading = () => {
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
         <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            role="status"
         ></div>
      </div>
   );
};

export default Loading;
