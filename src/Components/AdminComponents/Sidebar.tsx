import React from 'react';
import { FaHome, FaUsers, FaHandHoldingHeart, FaChartBar ,FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../Api/adminApi';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../Redux/Slices/Auth';

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await logoutAdmin();
      dispatch(adminLogout());
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">helpingHands</div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <a onClick={()=>navigate('/admin/dashboard')} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaHome />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="mb-4">
          <a onClick={()=>navigate('/admin/communityManagement')} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaUsers />
              <span>Communities</span>
            </a>
          </li>
          <li className="mb-4">
            <a onClick={()=>navigate('/admin/userManagement')} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaHandHoldingHeart />
              <span>Users</span>
            </a>
          </li>
          <li className="mb-4">
            <a onClick={()=>navigate('/admin/donationManagement')} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaChartBar />
              <span>Donations</span>
            </a>
          </li>
          <li className="mb-4">
            <a onClick={()=>navigate('/admin/reportPostManagement')} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaChartBar />
              <span>Reported Posts</span>
            </a>
          </li>
          <li className="mb-4">
            <a onClick={handleLogout} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FaSignOutAlt  />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
