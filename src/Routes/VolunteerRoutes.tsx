import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/VolunteerComponents/Login'

const VolunteerRoutes:React.FC = () => {
  return (
    <Routes>
       <Route path='/login' element = {<Login />} />
   
    </Routes>
  )
}

export default VolunteerRoutes
