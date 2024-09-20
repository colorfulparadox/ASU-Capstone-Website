import './App.css';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import NavBar from './components/NavBar'; 


function OnClick() {
  const buttonHolder = document.getElementById("ButtonHolder");
  buttonHolder.remove();

  const app = document.getElementById("App");
  const node = document.createTextNode("this is a test here is your test number 1337!");
  app.appendChild(node);
}


function App() {
  return (
    <div className="App" id="App"> 
        <NavBar />
        <h1>Hello press the button to get a random number!</h1>
        <div id="ButtonHolder">
          <Button variant="primary" onClick={OnClick}>Press me!</Button>
        </div>
    </div>
  );
}

export default App;
