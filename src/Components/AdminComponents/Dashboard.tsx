import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-black">helpingHands</h1>
        </div>
        {/* Sidebar Content */}
        <nav className="text-black">
  <ul className="mt-6 pl-4">
    <li className="p-4 font-medium text-gray-500 hover:text-blue-800 hover:translate-x-1 cursor-pointer transition-transform">
      Dashboard
    </li>
    <li className="p-4 font-medium text-gray-500 hover:text-blue-800 hover:translate-x-1 cursor-pointer transition-transform">
      Communities
    </li>
    <li className="p-4 font-medium text-gray-500 hover:text-blue-800 hover:translate-x-1 cursor-pointer transition-transform">
      Users
    </li>
    <li className="p-4 font-medium text-gray-500 hover:text-blue-800 hover:translate-x-1 cursor-pointer transition-transform">
      Donations
    </li>
  </ul>
</nav>

      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="bg-white text-black p-4">
          <h2 className="text-lg font-semibold">Overview</h2>
        </div>
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
              {/* Your content here */}
              <div className="w-full bg-blue-500">
                <div className="w-1/5 bg-red-500 h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
