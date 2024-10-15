import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function Logout(event, navigate){
  event.preventDefault();
  Cookies.remove('LoginToken', { path: '/', domain: 'localhost' })
  Cookies.remove('Name', { path: '/', domain: 'localhost' })
  Cookies.remove('Username', { path: '/', domain: 'localhost' })
  Cookies.remove('Permission_Level', { path: '/', domain: 'localhost' })
  Cookies.remove('Email', { path: '/', domain: 'localhost' })
  navigate('/');
  console.log("hello world")
}

export default function NavBar() {
    const navigate = useNavigate();

    const onSubmit = (event) => {
        Logout(event, navigate)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="Game">Persona</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="Game">Game</Nav.Link>
            <Nav.Link href="Profile">Profile</Nav.Link>
            <Nav.Link href="Leaderboard">Leaderboard</Nav.Link>
            {parseInt(Cookies.get("Permission_Level")) > 0 && <Nav.Link href="Admin">Admin</Nav.Link>}
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Button className="" variant="outline-danger" type="submit" onClick={onSubmit}>Logout</Button>
        </Container>
      </Navbar>
    )
}