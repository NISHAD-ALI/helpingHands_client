import React from 'react'
import NavBar from '../../Components/VolunteerComponents/NavBar'
import Footer from '../../Components/Common/Footer'
import ChangePassword from '../../Components/VolunteerComponents/ChangePassword'
const ChangePasswordPage = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
         <NavBar />
            
            <ChangePassword/>
            <Footer/>
       </div>
  )
}

export default ChangePasswordPage
