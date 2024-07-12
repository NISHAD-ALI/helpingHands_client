import React from 'react';
import Login from '../../Components/CommunityComponents/Login';
import '../../Styles/LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="sliding-bg"></div>
      <Login />
     
    </div>
  );
};

export default LoginPage;
