import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

//import NavbarBrand from 'react-bootstrap/NavbarBrand'

export default function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="Game">Persona</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="Game">Game</Nav.Link>
            <Nav.Link href="Profile">Profile</Nav.Link>
            <Nav.Link href="Leaderboard">Leaderboard</Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link className="" href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}