import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import Profile from '../../Components/CommunityComponents/Profile'
import Footer from '../../Components/Common/Footer'

const ProfilePage:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
           <Profile />
            <Footer />
        </div>
  )
}

export default ProfilePage
