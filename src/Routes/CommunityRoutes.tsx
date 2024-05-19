import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Community/SignupPage'
import LoginPage from '../Pages/Community/LoginPage'
import Otp from '../Pages/Community/Otp'
import HomePage from '../Pages/Community/HomePage'


const CommunityRoutes:React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/otp' element={<Otp />}/>
    </Routes>
  )
}

export default CommunityRoutes
