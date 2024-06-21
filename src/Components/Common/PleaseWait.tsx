import React from 'react';

const PleaseWait: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen  bg-transparent backdrop-filter backdrop-blur-md">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-8"></div>
            <div className="text-xl font-semibold text-gray-900 mt-4">
                Please wait
            </div>
        </div>
    );
};

export default PleaseWait;
