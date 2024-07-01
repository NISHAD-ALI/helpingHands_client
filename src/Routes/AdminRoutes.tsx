import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Dashboard from '../Pages/Admin/Dashboard'
import UserManagement from '../Pages/Admin/UserManagement'
import IsLoggedIn from '../Components/AdminComponents/IsLoggedIn'
import CommunityManagement from '../Pages/Admin/CommunityManagement'
import AddDonationPage from '../Pages/Admin/AddDonationPage'
import DonationManagement from '../Pages/Admin/DonationManagement'
import ReportPostManagement from '../Pages/Admin/ReportPostManagement'


const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element = {<Login />} />
      <Route path='' element={<IsLoggedIn/>}>
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/userManagement' element = {<UserManagement />} />
        <Route path='/communityManagement' element = {<CommunityManagement/>} />
        <Route path='/addDonation' element = {<AddDonationPage/>} />
        <Route path='/donationManagement' element = {<DonationManagement/>} />
        <Route path='/reportPostManagement' element = {<ReportPostManagement/>} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
