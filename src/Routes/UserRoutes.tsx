import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home'
import Login from '../Pages/User/Login'
import Signup from '../Pages/User/Signup'
import Otp from '../Pages/User/Otp'


const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/verifyOtp' element={<Otp/>} />
    </Routes>
  )
}

export default UserRoutes
