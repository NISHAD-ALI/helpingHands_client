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
          <svg className="w-16 h-16 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m1-4a9 9 0 1 1-18 0a9 9 0 0 1 18 0z" />
          </svg>
        <div className="mt-4">
        </div>
        <div className="mt-4 text-lg">
          your payment is successfull,
          <br />
          please wait while we redirect to donations page
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
