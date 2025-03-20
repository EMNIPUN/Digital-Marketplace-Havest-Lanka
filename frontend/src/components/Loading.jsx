import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
