import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { payment } from '../../Api/userApi';

interface FundraiserCardProps {
  category: string;
  image: string;
  progress?: number;
  name: string;
  details: string;
  _id: string;
}

const FundraiserCard: React.FC<FundraiserCardProps> = ({ category, image, progress, name, _id }) => {
  const handleDonateNow = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);
      const amount = 1000; 
      const { sessionId } = await payment(amount, _id);

      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during donation:', error);
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={category}
          className="w-full h-60 object-cover transition duration-500 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 flex flex-col justify-center items-center p-4 transition-all duration-500 hover:bg-black/60">
          <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
          <p className="text-sm text-gray-200 mb-4">{category}</p>
          <button
            className="bg-green-600 text-white px-5 py-3 rounded-full hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300"
            onClick={handleDonateNow}
          >
            Donate $10
          </button>
        </div>
      </div>
      {progress !== undefined && (
        <div className="p-4">
          <p className="text-gray-600 text-center mb-2">{progress}% funded</p>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-green-600 rounded-full transition-width duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FundraiserCard;
