import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutCommunity } from '../../Api/communityApi';
import { useDispatch, useSelector } from 'react-redux';
import { communityLogout } from '../../Redux/Slices/Auth';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.auth.communityData);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutCommunity();
      dispatch(communityLogout());
      navigate('/community/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className={`bg-gray-800 text-white py-4 ${open ? 'shadow-md' : ''}`}>
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/community/home')}>
          helpingHands
        </h1>
        <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" aria-label= 'button' type='button' onClick={() => setOpen(!open)}>
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <nav className={`flex-col md:flex  md:justify-end md:flex-row ${open ? 'flex' : 'hidden'}`}>
          <a className="px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg hover:text-gray-500 focus:text-white  focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer" onClick={() => navigate('/community/home')}>
            Home
          </a>
          <a className="px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg hover:text-gray-500 focus:text-white  focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer" onClick={() => navigate('/community/manageVolunteers')}>
            Volunteers
          </a>
          <a className="px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg hover:text-gray-500 focus:text-white  focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer">
            Events
          </a>
          <a className="px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg hover:text-gray-500 focus:text-white  focus:outline-none focus:shadow-outline transition-colors duration-300 cursor-pointer" onClick={handleLogout}>
            Logout
          </a>
          {data && (
            <button
              className="px-4 py-2 mt-2 ml-2 text-sm font-semibold bg-green-500 rounded-lg hover:text-gray-500 focus:text-white  focus:outline-none focus:shadow-outline transition-colors duration-300"
              onClick={() => navigate('/community/profile')}
            >
              Profile
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
