import './App.css';

import { Game, Invalid404, Leaderboard, Login, Profile, Admin, Home } from './pages'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

function ProtectedRoute() {
  //check if cookie exists
  let loggedIn = Cookies.get('LoginToken');

  console.log(loggedIn);

  return (
    loggedIn ? <Outlet/> : <Navigate to="/"/>
  )
}

function NotLoggedIn() {
  let loggedIn = Cookies.get('LoginToken');

  return (
    !loggedIn ? <Outlet/> : <Navigate to="/home"/>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NotLoggedIn/>}>
          <Route path="/" element={<Login />} /> 
        </Route>
        <Route path="*" element={<Invalid404 />}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Game" element={<Game />} /> 
          <Route path="/Leaderboard" element={<Leaderboard />} /> 
          <Route path="/Profile" element={<Profile />} /> 
          <Route path="/Admin" element={<Admin />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
