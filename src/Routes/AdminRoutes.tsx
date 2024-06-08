import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Dashboard from '../Pages/Admin/Dashboard'
import UserManagement from '../Pages/Admin/UserManagement'
import IsLoggedIn from '../Components/AdminComponents/IsLoggedIn'


const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element = {<Login />} />
      <Route path='' element={<IsLoggedIn/>}>
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/userManagement' element = {<UserManagement />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
