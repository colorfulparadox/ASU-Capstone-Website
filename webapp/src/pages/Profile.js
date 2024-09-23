import NavBar from '../components/NavBar'; 
import { Container, Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap';

export default function Profile() {
    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <h2>Profile</h2>
                        <Image src="https://placehold.co/150" roundedCircle className="mb-3"/>
                        {/* todo: click the profile image circle to upload a new photo */}
                        <h4>Score</h4>
                        <Form.Label htmlFor="inputUsername">Username</Form.Label>
                        <Form.Control 
                            className="mb-3"
                            id="inputUsername"/>
                        <Form.Label htmlFor="inputEmail">Email</Form.Label>
                        <Form.Control 
                            className="mb-3"
                            id="inputEmail"/>
                        <Form.Label htmlFor="inputPassword1">Password</Form.Label>
                        <Form.Control 
                            className="mb-3"
                            type="password"
                            id="inputPassword1"/>
                        <Button variant="primary" type="submit" className="mb-3">Update</Button>
                        <h3>Completed training sessions</h3>
                        <ListGroup>
                            <ListGroup.Item action href="#session1">Session 1</ListGroup.Item>
                            <ListGroup.Item action href="#session2">Session 2</ListGroup.Item>
                            <ListGroup.Item action href="#session3">Session 3</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}