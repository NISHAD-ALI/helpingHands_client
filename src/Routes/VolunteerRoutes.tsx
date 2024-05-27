import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/Volunteer/LoginPage'
import SignupPage from '../Pages/Volunteer/SignupPage'
import HomePage from '../Pages/Volunteer/HomePage'
import Otp from '../Pages/Volunteer/Otp'


const VolunteerRoutes:React.FC = () => {
  return (
    <Routes>
       <Route path='/login' element = {<LoginPage />} />
       <Route path='/signup' element = {<SignupPage />} />
       <Route path='/' element = {<HomePage />} />
       <Route path='/home' element = {<HomePage />} />
       <Route path='/verifyOtp' element = {<Otp />} />
    </Routes>
  )
}

export default VolunteerRoutes
