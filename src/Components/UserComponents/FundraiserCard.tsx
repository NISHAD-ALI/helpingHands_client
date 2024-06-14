import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { payment } from '../../Api/userApi';

interface FundraiserCardProps {
  category: string;
  image: string;
  progress?: number;
  name: string;
  details: string;
  _id:string
}

const FundraiserCard: React.FC<FundraiserCardProps> = ({ category, image, progress, name, details,_id }) => {
  const handleDonateNow = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);
      const amount = 1000; 
      const { sessionId } = await payment(amount,_id);

      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during donation:', error);
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden group">
      <div className="relative">
        <img
          src={image}
          alt={category}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
          <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
          <p className="text-gray-200 text-center mb-2">{category}</p>
          <p className="text-gray-200 text-center mb-4">{details}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleDonateNow}
          >
            Donate Now
          </button>
        </div>
      </div>
      {progress !== undefined && (
        <div className="p-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundraiserCard;
