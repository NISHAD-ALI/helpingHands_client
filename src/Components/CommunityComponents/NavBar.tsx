import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">helpingHands</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Volunteers</a>
          <a href="#" className="hover:underline">Events</a>
          <a href="#" className="hover:underline">Logout</a>
        </nav>
        <div className="bg-green-600 px-4 py-2 rounded-lg">
          <span>Nishad</span>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
