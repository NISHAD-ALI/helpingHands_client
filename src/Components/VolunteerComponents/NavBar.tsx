import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileVolunteer, logoutVolunteer } from '../../Api/volunteerApi';
import { volunteerLogout } from '../../Redux/Slices/Auth';
import { jwtDecode } from "jwt-decode";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const data = useSelector((state: any) => state.auth.volunteerData !== null);
  const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('volunteerData') as string));

  const handleLogout = async () => {
    try {
      await logoutVolunteer();
      dispatch(volunteerLogout());
      navigate('/volunteer/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileVolunteer();
        setUserName(response?.data?.data?.name || null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (data) {
      fetchUserProfile();
    }
  }, [data]);

  return (
    <header className={`p-4 bg-green-200 ${open ? 'shadow-md' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold font-inter cursor-pointer" onClick={() => navigate('/volunteer/home')}>
          helpingHands
        </div>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label='open'>
            <svg
              className={`w-6 h-6 ${open ? 'hidden' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <nav className={`md:flex ${open ? 'block' : 'hidden'} md:flex-row md:justify-end md:space-x-4 mt-4 md:mt-0`}>
          <a className="hover:text-gray-400 font-medium cursor-pointer block md:inline-block md:mt-0" onClick={() => navigate('/volunteer/home')}>Home</a>
          <a className="hover:text-gray-400 font-medium cursor-pointer block md:inline-block md:mt-0" onClick={() => navigate('/volunteer/myEvents')}>Events</a>
          <a className="hover:text-gray-400 font-medium cursor-pointer block md:inline-block md:mt-0" onClick={() => navigate(`/volunteer/messages/${decoded.id}`)}>Communities</a>
          {data ?
            <a className="hover:text-gray-400 font-medium cursor-pointer block md:inline-block md:mt-0" onClick={handleLogout}>Logout</a>
            : <a className="hover:text-gray-400 font-medium cursor-pointer block md:inline-block md:mt-0" onClick={() => navigate('/volunteer/login')}>Login</a>}
        </nav>
        {data &&
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 md:mt-0" onClick={() => navigate('/volunteer/profile')}>
            {userName}
          </button>
        }
      </div>
    </header>
  );
};

export default NavBar;
