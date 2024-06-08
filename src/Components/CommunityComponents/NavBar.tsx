import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutCommunity } from '../../Api/communityApi';
import { useDispatch, useSelector } from 'react-redux';
import { communityLogout } from '../../Redux/Slices/Auth';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.auth.communityData);
  console.log(data)
  const handleLogout = async () => {
    try {
      console.log("here");
      await logoutCommunity();
      dispatch(communityLogout());
      navigate('/community/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold" onClick={()=>navigate('/community/home')}>helpingHands</h1>
        <nav className="space-x-4">
          <a className="hover:underline cursor-pointer">Home</a>
          <a className="hover:underline cursor-pointer" onClick={()=>navigate('/community/manageVolunteers')}>Volunteers</a>
          <a className="hover:underline cursor-pointer">Events</a>
          <a className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</a>

        </nav>
        {data ?<button className="bg-green-500 text-black px-4 py-2 rounded-lg" onClick={()=>navigate('/community/profile')}>Profile</button>:''}
      </div>
    </header>
  );
};

export default NavBar;
