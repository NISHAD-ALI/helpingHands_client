import React, { useEffect, useState } from 'react';
import donations from '../../Interface/donations';

interface FundraiserModalProps {
  show: boolean;
  onClose: () => void;
  fundraisers: donations | any
}

const FundraiserModal: React.FC<FundraiserModalProps> = ({ show, onClose, fundraisers }) => {
  const [, setIsVisible] = useState(false);
  console.log(fundraisers)
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setTimeout(() => setIsVisible(false), 300); 
    }
  }, [show]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`bg-white bg-opacity-90 rounded-lg py-10 w-11/12 h-2/3 md:w-4/5 lg:w-2/3 relative flex flex-col items-center justify-center transition-transform duration-300 transform ${show ? 'scale-100' : 'scale-90'}`}
      >
        <h2 className="text-3xl font-bold mb-4 text-center"><span className='text-green-700'>helpingHands</span> welcomes you.</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black"
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-eduHand font-semibold mb-4 text-center">Be part of making the world a better place.</h2>
          <div className="flex flex-wrap justify-center">
            {fundraisers.map((fundraiser :any) => (
              <div key={fundraiser.id} className="relative flex flex-col justify-between mx-3 mb-4 w-1/2 md:w-1/3 lg:w-1/4">
                <img
                  src={fundraiser.image}
                  alt={`Fundraiser: ${fundraiser.name}`}
                  className="w-full max-h-52 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2 text-center">{fundraiser.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserModal;
