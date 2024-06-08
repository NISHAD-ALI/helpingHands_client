import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-green-200 text-black">
      <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105">
        <img src="/public/381599_error_icon.svg" alt="Error" className="mb-6" />
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">500</h1>
        <p className="text-2xl mb-4">Oops! Something went wrong.</p>
        <p className="text-lg mb-8">We're sorry, but it looks like there was an unexpected error. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none shadow-lg transform transition-transform hover:scale-105"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
