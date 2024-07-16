import React from 'react';
import Nav from '../../Components/UserComponents/Nav';
import MainBanner from '../../Components/UserComponents/MainBanner';
import Features from '../../Components/UserComponents/Features';
import { useNavigate } from 'react-router-dom';
import Fundraiser from '../../Components/UserComponents/Fundraiser';
import LatestFeeds from '../../Components/UserComponents/LatestFeeds';
import Footer from '../../Components/UserComponents/Footer';
import ScrollToTop from '../../Components/Common/ScrollToTop';
import { useSelector } from 'react-redux';
const Home: React.FC = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.userData !== null);
  const navigate = useNavigate();

  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <MainBanner />
      <Features />
      <Fundraiser />
      {isLoggedIn && <>
      <LatestFeeds />
      <div className='flex justify-center '>
        <button className="text-white bg-green-500 rounded-sm px-4 mb-3 py-2 cursor-pointer" onClick={() => navigate('/allPosts')}>
          See More
        </button>
      </div>
      </>}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
