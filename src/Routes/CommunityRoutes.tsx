import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Community/SignupPage'
import LoginPage from '../Pages/Community/LoginPage'


const CommunityRoutes = () => {
  return (
    <Routes>
        {/* <Route path='/' element={<Home />} /> */}
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage />}/>
    </Routes>
  )
}

export default CommunityRoutes
