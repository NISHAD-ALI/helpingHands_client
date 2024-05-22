import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Components/UserComponents/Loader';
import IsLogged from '../Components/CommunityComponents/IsLogged';
import IsLoggedOut from '../Components/CommunityComponents/IsLoggedOut';

const SignupPage = lazy(() => import('../Pages/Community/SignupPage'));
const LoginPage = lazy(() => import('../Pages/Community/LoginPage'));
const Otp = lazy(() => import('../Pages/Community/Otp'));
const HomePage = lazy(() => import('../Pages/Community/HomePage'));

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
        </Route>
        <Route path='/otp' element={<Otp />} />
      </Routes>
    </Suspense>
  );
}

export default CommunityRoutes;
