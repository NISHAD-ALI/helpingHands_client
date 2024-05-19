import { Suspense,lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../Components/UserComponents/Loader'
const Home = lazy(()=>import( '../Pages/User/Home')) 
const Login = lazy(()=>import( '../Pages/User/Login')) 
const Signup = lazy(()=>import( '../Pages/User/Signup')) 
const Otp = lazy(()=>import( '../Pages/User/Otp')) 
const ForgetPassword = lazy(()=>import( '../Pages/User/ForgetPassword')) 
const ForgetPassOtp = lazy(()=>import( '../Pages/User/ForgetPassOTP')) 
const ChangePassword = lazy(()=>import( '../Pages/User/ChangePassword')) 
const ProfilePage = lazy(()=>import( '../Pages/User/ProfilePage')) 
const EditProfilePage = lazy(()=>import( '../Pages/User/EditProfilePage')) 

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/verifyOtp' element={<Otp />} />
      <Route path='/forgetPassword' element={<ForgetPassword />} />
      <Route path='/forgetPassOtp' element={<ForgetPassOtp />} />
      <Route path='/changePassword' element={<ChangePassword />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/editProfile' element={<EditProfilePage/>}/>
    </Routes>
    </Suspense>
  )
}

export default UserRoutes
