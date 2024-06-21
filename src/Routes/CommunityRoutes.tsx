import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Components/UserComponents/Loader';
import IsLogged from '../Components/CommunityComponents/IsLogged';
import IsLoggedOut from '../Components/CommunityComponents/IsLoggedOut';
import EventListPage from '../Pages/Community/EventListPage';
import EventPage from '../Pages/Community/EventPage';
import EditEvent from '../Pages/Community/EditEvent';
import ProfilePage from '../Pages/Community/ProfilePage';
import HireVolunteers from '../Pages/Community/HireVolunteers';
import VolunteerManagement from '../Pages/Community/VolunteerManagement';
import LiveStreamPage from '../Pages/Community/LiveStreamPage';

const SignupPage = lazy(() => import('../Pages/Community/SignupPage'));
const LoginPage = lazy(() => import('../Pages/Community/LoginPage'));
const Otp = lazy(() => import('../Pages/Community/Otp'));
const HomePage = lazy(() => import('../Pages/Community/HomePage'));
const CreateEvents = lazy(() => import('../Pages/Community/CreateEventsPage'));

const CommunityRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
      <Route path='' element={<IsLoggedOut />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
      <Route path='' element={<IsLogged/>}>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/createEvents' element={<CreateEvents />} />
        <Route path='/eventList' element={<EventListPage />} />
        <Route path='/event/:id' element={<EventPage />} />
        <Route path='/editEvent/:id' element={<EditEvent />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/hireNow' element={<HireVolunteers />} />
        <Route path='/manageVolunteers' element={<VolunteerManagement />} />
        <Route path='/stream/:id' element={<LiveStreamPage />} />
        </Route>
        <Route path='/otp' element={<Otp />} />
        
      </Routes>
    </Suspense>
  );
}

export default CommunityRoutes;
