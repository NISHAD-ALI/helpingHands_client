import React, { useState, useEffect } from 'react';
import Nav from '../../Components/UserComponents/Nav';
import MainBanner from '../../Components/UserComponents/MainBanner';
import Features from '../../Components/UserComponents/Features';
import { useNavigate } from 'react-router-dom';
import Fundraiser from '../../Components/UserComponents/Fundraiser';
import LatestFeeds from '../../Components/UserComponents/LatestFeeds';
import Footer from '../../Components/UserComponents/Footer';
import ScrollToTop from '../../Components/Common/ScrollToTop';
import FundraiserModal from '../../Components/UserComponents/FundraiserModal';
import { useSelector } from 'react-redux';
import '../../Styles/HomePage.css';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.userData !== null);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');
    if (!modalShown) {
      setShowModal(true);
      sessionStorage.setItem('modalShown', 'true');
    }
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      {showModal && <FundraiserModal show={showModal} onClose={closeModal} />}
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <MainBanner />
      <Features />
      <Fundraiser />
      {isLoggedIn && (
        <>
          <LatestFeeds />
          <div className='flex justify-center mt-8'>
            <button className="bg-green-600 text-white rounded-lg px-6 py-3 shadow-lg hover:bg-green-700 transition-colors duration-300" onClick={() => navigate('/allPosts')}>
              See More
            </button>
          </div>
        </>
      )}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
