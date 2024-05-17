import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home'
import Login from '../Pages/User/Login'
import Signup from '../Pages/User/Signup'
import Otp from '../Pages/User/Otp'
import ForgetPassword from '../Pages/User/ForgetPassword'
import ForgetPassOtp from '../Pages/User/ForgetPassOTP'
import ChangePassword from '../Pages/User/ChangePassword'


const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/verifyOtp' element={<Otp/>} />
      <Route path='/forgetPassword' element={<ForgetPassword />} />
      <Route path='/forgetPassOtp' element={<ForgetPassOtp />} />
      <Route path='/changePassword' element={<ChangePassword/>} />
    </Routes>
  )
}

export default UserRoutes
