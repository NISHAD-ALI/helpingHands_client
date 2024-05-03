import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import './index.css'
function App() {

  return (
   <Router>
    <Routes>
    <Route path="/*" element={<UserRoutes />} />
    </Routes>
   </Router>
  )
}

export default App

