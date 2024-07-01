import React from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import ReportPost from '../../Components/AdminComponents/ReportPost';

const ReportPostManagement: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        <ReportPost />
      </div>
    </div>
  );
};

export default ReportPostManagement;