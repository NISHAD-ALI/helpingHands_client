import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../Components/UserComponents/Loader'
import IsLoggedIn from '../Components/UserComponents/IsLoggedIn'
import IsLoggedOut from '../Components/UserComponents/IsLoggedOut'
import ErrorPage from '../Pages/Common/ErrorPage'
import Fundraiser from '../Pages/User/Fundraiser'
import PaymentSuccess from '../Pages/User/PaymentSuccess'
import PaymentFailure from '../Pages/User/PaymentFailure'
import AllPosts from '../Pages/User/AllPosts'
const Home = lazy(() => import('../Pages/User/Home'))
const Login = lazy(() => import('../Pages/User/Login'))
const Signup = lazy(() => import('../Pages/User/Signup'))
const Otp = lazy(() => import('../Pages/User/Otp'))
const ForgetPassword = lazy(() => import('../Pages/User/ForgetPassword'))
const ForgetPassOtp = lazy(() => import('../Pages/User/ForgetPassOTP'))
const ChangePassword = lazy(() => import('../Pages/User/ChangePassword'))
const ProfilePage = lazy(() => import('../Pages/User/ProfilePage'))
const EditProfilePage = lazy(() => import('../Pages/User/EditProfilePage'))

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='' element={<IsLoggedOut />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verifyOtp' element={<Otp />} />
        </Route>

        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/forgetPassOtp' element={<ForgetPassOtp />} />
        <Route path='/changePassword' element={<ChangePassword />} />

        <Route path='' element={<IsLoggedIn />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/editProfile' element={<EditProfilePage />} />
          <Route path='/donate' element={<Fundraiser />} />
        </Route>
          <Route path='/donate/success' element={<PaymentSuccess />} />
          <Route path='/donate/failure' element={<PaymentFailure />} />
          <Route path='/allPosts' element={<AllPosts/>} />
      </Routes>
    </Suspense>
  )
}

export default UserRoutes
