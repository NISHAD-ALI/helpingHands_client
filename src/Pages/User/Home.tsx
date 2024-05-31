import React from 'react';
import Nav from '../../Components/UserComponents/Nav';
import MainBanner from '../../Components/UserComponents/MainBanner';
import Features from '../../Components/UserComponents/Features';
import Fundraiser from '../../Components/UserComponents/Fundraiser';
import LatestFeeds from '../../Components/UserComponents/LatestFeeds';
import Footer from '../../Components/UserComponents/Footer';
const Home:React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      <Nav  />
      <MainBanner />
      <Features />
      <Fundraiser />
      <LatestFeeds />
      <Footer />
    </div>
  );
};

export default Home;