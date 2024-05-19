import React from 'react'
import Nav from '../../Components/UserComponents/Nav'
import EditProfile from '../../Components/UserComponents/EditProfile'

const EditProfilePage:React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-green-200">
    <Nav/>
    <div className="flex-grow">
      <EditProfile/>
    </div>
     {/* <Footer /> */}
  </div>
  )
}

export default EditProfilePage
