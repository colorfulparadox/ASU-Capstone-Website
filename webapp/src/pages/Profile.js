import NavBar from '../components/NavBar'; 
import { Container, Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie'

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const passwordRef = useRef("");
  
    // Fetch user data on component mount
    useEffect(() => {
        GetProfileData().then(data => {
            setUserData(data);    // Set the user data when the promise resolves
            setUsername(data.username);
            setName(data.name);
            setEmail(data.email);
        });
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === "" || name === "" || email === "") {
            console.log("Don't submit with empty fields");
            return;
        }

        // email validation
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email");
            return;
        }


        UpdateProfileData().then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    function GetProfileData() {

        let authiddata = Cookies.get('LoginToken');
    
        return fetch(process.env.REACT_APP_BACKEND_URL + "/authenticate", {
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
    
    function UpdateProfileData() {
        let authiddata = Cookies.get('LoginToken');
    
        return fetch(process.env.REACT_APP_BACKEND_URL + "/update_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ authID: authiddata, name: name, username: username, email: email }),
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
    
    
    
    const passwordUpdateSubmit = (event) => {
        event.preventDefault();

        var pw = passwordRef.current.value;
    
        if (pw === "") {
            console.log("Don't submit an empty password");
            return;
        }
    
        let authiddata = Cookies.get('LoginToken');
    
        // I imagine we could generalize this into an update function that passes the JSON
        return fetch(process.env.REACT_APP_BACKEND_URL + "/update_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ authID: authiddata, password: pw}),
        }).then((response) => {
            if (!response.ok) {
                throw new Error ("network error")
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

    const getIconCharacter = (name) => {
        if (name === "" || name === undefined) {
            return "?";
        }
        return name.charAt(0).toUpperCase();
    }

    const getIconColor = (name) => {
        // generate a color based on user's name
        if (name === "" || name === undefined) {
            return "#0000ff";
        }
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return "#" + "00000".substring(0, 6 - c.length) + c
    }

    const handleChange = (event) => {
        event.preventDefault();
    
        switch (event.target.name) {
            case 'user':
                setUsername(event.target.value);
                userData[event.target.name] = event.target.value;
                break;
            case 'name':
                setName(event.target.value);
                userData[event.target.name] = event.target.value;
                break;
            case 'email':
                setEmail(event.target.value);
                userData[event.target.name] = event.target.value;
                break;
        }
    
    }

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col style={{ padding: '20px' }}>
                        <h1>Profile</h1>
                        <div className="circle-icon" style={{ background: getIconColor(userData?.name) }}>
                            {getIconCharacter(userData?.name)}
                        </div>
                        
                        <h4>Score: <Form.Label htmlFor="inputScore">{userData?.points}</Form.Label></h4>
                        <Form.Group>
                            <Form.Label htmlFor="inputUsername">Username</Form.Label>
                            <Form.Control 
                                type="username"
                                name="username"
                                value={username}
                                className="mb-3"
                                id="inputUsername"
                                onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputName">Name</Form.Label>
                            <Form.Control 
                                type="name"
                                name="name"
                                value={name}
                                className="mb-3"
                                id="inputName"
                                onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputEmail">Email</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                value={email}
                                className="mb-3"
                                id="inputEmail"
                                onChange={handleChange}/>
                        </Form.Group>
                        
                        <Form.Label id="error-label" hidden>Error</Form.Label><br/>
                        <Button variant="primary" type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Update</Button>
                        <br/>
                        <Form.Group>
                            <Form.Label htmlFor="inputPassword1">Set new password</Form.Label>
                            <Form.Control 
                                className="mb-3"
                                ref={passwordRef}
                                name="password"
                                type="password"
                                id="inputPassword1"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" 
                            className="mb-3"
                            onClick={passwordUpdateSubmit}
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
