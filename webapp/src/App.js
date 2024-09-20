import './App.css';

import { Game, Invalid404, Leaderboard, Login, Profile } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="/Game" element={<Game/>} /> 
        <Route path="/Leaderboard" element={<Leaderboard/>} /> 
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="*" element={<Invalid404 />} /> 
      </Routes>
    </Router>
  );
}

export default App;
