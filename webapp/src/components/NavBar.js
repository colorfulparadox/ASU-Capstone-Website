import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

function Logout(event, navigate){
  event.preventDefault();
  Cookies.remove('LoginToken', { path: '/', domain: 'localhost' })
  navigate('/');
  console.log("hello world")
}

function GetPermission() {

  let authiddata = Cookies.get('LoginToken');

  return fetch("https://backend-969215233601.us-central1.run.app/authenticate", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ authID: authiddata }),
  }).then((response) => {
      if (!response.ok) {
          Cookies.remove('LoginToken', { path: '/', domain: 'localhost' })
          window.location.replace('/')
          throw new Error("my disappointment is immeasurable and my day is ruined")
      }
      return response.json();
  }
  ).then((data) => {
      console.log(data)
      return data;
  }).catch((error) => {
      console.log(error);
  });
}

export default function NavBar() {

  const [user, setAdminData] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
      GetPermission().then(data => {
            setAdminData(data);    // Set the user data when the promise resolves
        });
    }, []);

    const navigate = useNavigate();

    const onSubmit = (event) => {
        Logout(event, navigate)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="Home">Persona</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="Game">Game</Nav.Link>
            <Nav.Link href="Profile">Profile</Nav.Link>
            <Nav.Link href="Leaderboard">Leaderboard</Nav.Link>
            {user?.permission_level > 0 && <Nav.Link href="Admin">Admin</Nav.Link>}
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Button className="" variant="outline-danger" type="submit" onClick={onSubmit}>Logout</Button>
        </Container>
      </Navbar>
    )
}