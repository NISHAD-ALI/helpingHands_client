import React from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import Donations from '../../Components/AdminComponents/Donations';
import { useNavigate } from 'react-router-dom';
const DonationManagement: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4 relative">
        <button className="absolute right-4 bg-gray-800 text-white px-4 py-2 rounded-md" onClick={()=>navigate('/admin/addDonation')}>
          + Add Donation
        </button>
        <Donations />
      </div>
    </div>
  );
};

export default DonationManagement;
