import React from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import Communities from '../../Components/AdminComponents/Users';

const UserManagement: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        <Communities />
      </div>
    </div>
  );
};

export default UserManagement;
