import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/donate');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-6xl font-bold">SUCCESS</div>
        <div className="mt-4 flex justify-center">
          <svg className="w-16 h-16 text-green-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="mt-4 text-lg">
          Your payment is successful,
          <br />
          please wait while we redirect to the donations page.
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
