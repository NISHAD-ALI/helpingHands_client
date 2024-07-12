import React from 'react'
import Nav from '../../Components/UserComponents/Nav'
import EditProfile from '../../Components/UserComponents/EditProfile'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Common/Footer'

const EditProfilePage:React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-green-200">
    <Nav/>
    <div className="flex-grow">
      <EditProfile/>
    </div>
    <div className="flex justify-center mb-16">
        <p onClick={() => navigate('/changePassword')} className='text-blue-800 cursor-pointer'>
          Change Password?Click Here
        </p>
      </div>
      <Footer/>
  </div>
  )
}

export default EditProfilePage
