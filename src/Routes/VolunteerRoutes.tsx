import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Pages/Volunteer/LoginPage'
import SignupPage from '../Pages/Volunteer/SignupPage'
import HomePage from '../Pages/Volunteer/HomePage'
import Otp from '../Pages/Volunteer/Otp'
import EventsListPage from '../Pages/Volunteer/EventsListPage'
import ProfilePage from '../Pages/Volunteer/ProfilePage'
import ChangePasswordPage from '../Pages/Volunteer/ChangePasswordPage'
import CommunityPage from '../Pages/Volunteer/CommunityPage'
import EventPage from '../Pages/Volunteer/EventsPage'
import JoinStream from '../Pages/Volunteer/JoinStream'
import MyEventsPage from '../Pages/Volunteer/MyEventPage'
import VolunteerMessages from '../Components/VolunteerComponents/VolunteerMessages'
import NotFoundPage from '../Pages/Common/ErrorPage'


const VolunteerRoutes:React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element = {<NotFoundPage redirectTo='/volunteer/login' />} />
       <Route path='/login' element = {<LoginPage />} />
       <Route path='/signup' element = {<SignupPage />} />
       <Route path='/' element = {<HomePage />} />
       <Route path='/home' element = {<HomePage />} />
       <Route path='/verifyOtp' element = {<Otp />} />
       <Route path='/events' element = {<EventsListPage />} />
       <Route path='/profile' element = {<ProfilePage />} />
       <Route path='/changePassword' element = {<ChangePasswordPage />} />
       <Route path="/community/:id" element={<CommunityPage />} />
       <Route path="/event/:id" element={<EventPage />} />
       <Route path="/joinStream/:id" element={<JoinStream />} />
       <Route path="/myEvents" element={<MyEventsPage />} />
       <Route path="/messages/:id" element={<VolunteerMessages />} />
    </Routes>
  )
}

export default VolunteerRoutes
