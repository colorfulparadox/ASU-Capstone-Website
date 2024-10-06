import NavBar from '../components/NavBar'; 
import { Container, Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'


function GetProfileData() {

    let authiddata = Cookies.get('LoginToken');

    return fetch("https://backend-969215233601.us-central1.run.app/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ authID: authiddata }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error ("my disappointment is immeasurable and my day is ruined")
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

const handleSubmit = (event) => {
    event.preventDefault();
    GetProfileData();
}


export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); 
  
    // Fetch user data on component mount
    useEffect(() => {
        GetProfileData().then(data => {
          setUserData(data);    // Set the user data when the promise resolves
        });
      }, []);

    console.log("userdata ", userData);
    console.log("loading ", loading);

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <h2>Profile</h2>
                        <Image src="https://placehold.co/150" roundedCircle className="mb-3"/>
                        {/* todo: click the profile image circle to upload a new photo */}
                        <h4>Score: <Form.Label htmlFor="inputScore">{userData?.points}</Form.Label></h4>
                        <Form.Label htmlFor="inputUsername">Username</Form.Label>
                        <Form.Control 
                            value={userData?.username}
                            className="mb-3"
                            id="inputUsername"/>
                        <Form.Label htmlFor="inputName">Name</Form.Label>
                        <Form.Control 
                            value={userData?.name}
                            className="mb-3"
                            id="inputName"/>
                        <Form.Label htmlFor="inputEmail">Email</Form.Label>
                        <Form.Control 
                            value={userData?.email}
                            className="mb-3"
                            id="inputEmail"/>

                        <Button variant="primary" type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Update</Button>
                        <br/>
                        <Form.Label htmlFor="inputPassword1">Password</Form.Label>
                        <Form.Control 
                            className="mb-3"
                            type="password"
                            id="inputPassword1"/>
                        <Button variant="primary" type="submit" 
                            className="mb-3"
                            onClick={handleSubmit}
                            >Update Password</Button>
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
