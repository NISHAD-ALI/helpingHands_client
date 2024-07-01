import React from 'react'
import Nav from '../../Components/UserComponents/Nav'
import Profile from '../../Components/UserComponents/Profile'
import Footer from '../../Components/UserComponents/Footer'
import ScrollToTop from '../../Components/Common/ScrollToTop';
const ProfilePage:React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-green-200">
    <Nav/>
    <div className="flex-grow">
      <Profile/>
    </div>
     <Footer />
     <ScrollToTop />
  </div>

  )
}

export default ProfilePage
