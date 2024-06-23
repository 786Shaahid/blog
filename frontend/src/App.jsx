
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";



function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          
          <Route path="/dashboard" element={<Dashboard />} />
          
          
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<h2>404 page</h2>} />
      </Routes>
    </Router>
  );
}




export default App
