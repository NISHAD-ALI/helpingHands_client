import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCommunity } from '../../Api/communityApi';
import { communityLogout } from '../../Redux/Slices/Auth';

interface NavBarProps {
  bgColor?: string;
}

const NavBar: React.FC<NavBarProps> = ({ bgColor = 'transparent' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.auth.communityData);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900' : bgColor} ${scrolled ? 'shadow-lg' : ''}`}
      
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-white cursor-pointer" onClick={() => navigate('/community/home')}>
          helpingHands
        </h1>
        <button
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
          aria-label="menu button"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-white">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <nav className={`md:flex items-center ${open ? 'block' : 'hidden'}`}>
          <a className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer" onClick={() => navigate('/community/home')}>
            Home
          </a>
          <a className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer" onClick={() => navigate('/community/manageVolunteers')}>
            Volunteers
          </a>
          <a className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer" onClick={() => navigate('/community/eventList')}>
            Events
          </a>
          <a className="px-4 py-2 text-sm font-semibold text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer" onClick={handleLogout}>
            Logout
          </a>
          {data && (
            <button
              className="px-6 py-2 ml-4 text-sm font-semibold bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300"
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
