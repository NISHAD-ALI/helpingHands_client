import React, { useState, useEffect } from 'react';

const companyName = 'helpingHands';

const Loader: React.FC = () => {
    const [displayedName, setDisplayedName] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < companyName.length) {
                setDisplayedName((prev) => prev + companyName[index]);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 300);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-opacity-50 bg-white backdrop-filter backdrop-blur-md">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-8"></div>
            <div className="text-3xl font-semibold text-gray-900">{displayedName}</div>
        </div>
    );
};

export default Loader;
