import React from 'react';

const FounderMessage: React.FC = () => {
    return (
        <div className="mt-8 flex flex-col items-center justify-center">
            <div className="max-w-xl text-center mb-4">
                <h2 className="text-3xl font-bold mb-2">Message from the Founder</h2>
            </div>
            <div className="mb-4">
                <img
                    src="src/assets/nishad1.jpg"
                    alt="Founder"
                    className="w-80 h-80 rounded-full object-cover"
                />
            </div>
            <div className="text-center">
                <p className="text-lg font-semibold">Nishad Ali Chenadan</p>
                <p className="text-lg">
                    ellarkum
                    sugalle        </p>
            </div>
        </div>
    );
};

export default FounderMessage;
