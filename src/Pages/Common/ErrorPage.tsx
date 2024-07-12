import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  redirectTo: string; 
}

const NotFoundPage: React.FC<NotFoundProps> = ({ redirectTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo);
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <div className="animate-bounce mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <p className="text-lg text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
