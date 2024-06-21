import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProfileVolunteer, logoutVolunteer } from '../../Api/volunteerApi';
import { volunteerLogout } from '../../Redux/Slices/Auth';
const NavBar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string | null>(null);
  const data = useSelector((state: any) => state.auth.volunteerData !== null);
  const handleLogout = async () => {
    try {
      console.log('in')
      await logoutVolunteer();
      dispatch(volunteerLogout());
      console.log("success")
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
    <header className=" text-black p-4 bg-green-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold font-inter" onClick={()=>navigate('/volunteer/home')}>helpingHands</div>
        <nav className="hidden md:flex space-x-4">
          <a className="hover:text-gray-400 font-medium">Home</a>
          <a className="hover:text-gray-400 font-medium" onClick={() => navigate('/volunteer/myEvents')}>Events</a>
          <a className="hover:text-gray-400 font-medium">Communities</a>
          {data ?
            <a onClick={handleLogout} className="hover:text-gray-400 font-medium cursor-pointer">Logout</a>
            : <a onClick={() => navigate('/volunteer/login')} className="hover:text-gray-400 font-medium">Login</a>}

        </nav>
        {data ?<button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={()=>navigate('/volunteer/profile')}>{userName}</button>:''}
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
