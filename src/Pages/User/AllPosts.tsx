import React from 'react';
import Nav from '../../Components/UserComponents/Nav';
import AllPosts from '../../Components/UserComponents/FeedCard';
import Footer from '../../Components/UserComponents/Footer';
import ScrollToTop from '../../Components/Common/ScrollToTop';
const AllPostsPage:React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      <Nav  />
      <AllPosts />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AllPostsPage;