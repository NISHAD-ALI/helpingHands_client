import React from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import Users from '../../Components/AdminComponents/Users';

const UserManagement: React.FC = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        <Users />
      </div>
    </div>
  );
};

export default UserManagement;
