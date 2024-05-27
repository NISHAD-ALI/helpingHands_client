import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header className=" text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold font-inter">helpingHands</div>
        <nav className="hidden md:flex space-x-4">
          <a href="#home" className="hover:text-gray-400 font-medium">Home</a>
          <a href="#events" className="hover:text-gray-400 font-medium">Events</a>
          <a href="#communities" className="hover:text-gray-400 font-medium">Communities</a>
          <a href="#logout" className="hover:text-gray-400 font-medium">Logout</a>
        </nav>
        {/* <button className="bg-green-500 text-black px-4 py-2 rounded-full">Nishad</button> */}
        <div className="md:hidden">
          <button>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
