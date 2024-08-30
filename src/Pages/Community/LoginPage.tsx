import React from 'react';
import Login from '../../Components/CommunityComponents/Login';
import '../../Styles/LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="bg absolute inset-0"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
