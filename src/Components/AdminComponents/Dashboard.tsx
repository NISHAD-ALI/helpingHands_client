import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-gray-800 transition duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
          <button
            className="text-white focus:outline-none focus:text-white"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
        {/* Sidebar Content */}
        <nav className="text-white">
          <ul className="space-y-2">
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Option 1</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Option 2</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Option 3</li>
            
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <div className="bg-gray-900 text-white p-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
         fvfevfv
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
              {/* Your content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
