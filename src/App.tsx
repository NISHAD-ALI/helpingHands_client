import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import './index.css'
import AdminRoutes from "./Routes/AdminRoutes";
function App() {

  return (
   <Router>
    <Routes>
    <Route path="/*" element={<UserRoutes />} />
    <Route path="/admin*" element={<AdminRoutes />} />
    </Routes>
   </Router>
  )
}

export default App

  