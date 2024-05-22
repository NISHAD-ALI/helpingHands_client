import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="text-3xl text-green-500 font-bold mb-4">helpingHands</h2>
            <p className="mb-4">Need a writeback?</p>
            <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email here"
                className="bg-gray-800 text-gray-300 px-4 py-2 focus:outline-none w-full"
              />
              <button className="bg-green-500 p-3">
                <FaArrowRight className="text-white" />
              </button>
            </div>
          </div>
          
        </div>
        <div className="border-t border-gray-700 pt-4 mt-8 text-center md:text-left">
          <p className="mb-2">&copy; 2024 helpingHands Inc. Copyright and rights reserved</p>
          <p className="mb-2">
            <a href="#" className="hover:underline">Terms and Conditions</a> &middot; <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
