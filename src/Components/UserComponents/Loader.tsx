import React from 'react';

const companyName = 'helpingHands';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-opacity-50 bg-white backdrop-filter backdrop-blur-md">
            <div className="relative">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-8"></div>
            </div>
            <div className="text-xl font-semibold text-gray-900 mt-4">
                {companyName}
            </div>
        </div>
    );
};

export default Loader;
