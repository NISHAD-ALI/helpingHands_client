import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-4">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto">
        <div>
          <h3 className="text-2xl font-bold text-green-500">helpingHands</h3>
          <p>&copy; 2024 helpingHand Inc. Copyright and rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="font-semibold">Support</h4>
          <ul>
            <li>Help centre</li>
            <li>Account information</li>
            <li>About</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="font-semibold">Help and Solution</h4>
          <ul>
            <li>Talk to support</li>
            <li>Support docs</li>
            <li>System status</li>
            <li>Covid response</li>
          </ul>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="font-semibold">Product</h4>
          <ul>
            <li>Update</li>
            <li>Security</li>
            <li>Beta test</li>
            <li>Pricing product</li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Need a writeback?</h4>
        <div className="flex items-center mt-2">
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-full px-4 py-2 bg-gray-700 rounded-l-lg focus:outline-none"
          />
          <button className="px-4 py-2 bg-green-500 rounded-r-lg">→</button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-gray-400 hover:underline">Terms and Conditions</a> ・
        <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
