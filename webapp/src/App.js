import './App.css';

import { Game, Invalid404, Leaderboard, Login, Profile } from './pages'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

function ProtectedRoute() {
  let auth = false;

  //check if cookie exists
  let loggedIn = Cookies.get('loggedIn');

  console.log(loggedIn);

  return (
    auth === true ? <Outlet/> : <Navigate to="/"/>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="*" element={<Invalid404 />}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/Game" element={<Game/>} /> 
          <Route path="/Leaderboard" element={<Leaderboard/>} /> 
          <Route path="/Profile" element={<Profile />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
