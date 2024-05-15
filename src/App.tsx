import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import './index.css'
import AdminRoutes from "./Routes/AdminRoutes";
import VolunteerRoutes from "./Routes/VolunteerRoutes";
function App() {

  return (
   <Router>
    <Routes>
    <Route path="/*" element={<UserRoutes />} />
    <Route path="/admin*" element={<AdminRoutes />} />
    <Route path="/volunteer*" element={<VolunteerRoutes />} />
    </Routes>
   </Router>
  )
}

export default App

  