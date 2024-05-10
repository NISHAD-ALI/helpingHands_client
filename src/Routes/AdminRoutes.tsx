import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Dashboard from '../Components/AdminComponents/Dashboard'


const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        
    </Routes>
  )
}

export default AdminRoutes
