import NavBar from '../components/NavBar'; 
import { Container, Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap';

import logo from '../assets/logo.png' 

export default function Home() {
    return (
        <>
            <NavBar />
            <Container style={{ padding: '20px' }}>
                <Row className='justify-content-center'><Image 
                    src={logo} 
                    alt="logo"
                    roundedCircle 
                    className="mb-3"
                    style={{ width: '300px', height: 'auto'}}/>
                </Row>
                <Row className='justify-content-center'><Button href="/Game" style={{ width: '300px'}}>Start Game</Button></Row>
                {/* future: perhaps assigned and completed training sessions */}
            </Container>
        </>
    )
}