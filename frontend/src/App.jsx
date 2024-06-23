import { useEffect, useState } from 'react'

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import MyBlogs from './components/MyBlogs';


function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/v1/getData')
        .then(response => response.json())
        .then(data => setData(data));
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-post" element={<MyBlogs/>} />
          {/* <Route path="/update-asset/:assetId" element={<UpdateAsset />} />  */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<h2>404 page</h2>} />
      </Routes>
    </Router>
  );
}




export default App
