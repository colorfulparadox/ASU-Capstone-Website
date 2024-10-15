
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie'

// not transparent 😭
import logo from '../assets/logo.png' 
  

function RequestLogin(event, navigate) {
    event.preventDefault();

    let username = document.getElementById("usernameForm");
    let password = document.getElementById("passwordForm");

    if (username === null || password === null) {
        console.log("form fields are missing!");
        return
    }
    
    let u = username.value;
    let p = password.value;

    if (u === "" || p === "") {
        //console.log("empty form data");
        return
    }

    fetch("https://backend.project-persona.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: u, password: p }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error ("network is not ok bro")
        }
        return response.json();
    }).then((data) => {
        console.log(data)
        Cookies.set("LoginToken", data.authID, {
            expires: new Date(data.expires * 1000), 
            secure: true, 
            sameSite: 'Strict'
        });
        SkipLogin(navigate, data.authID);
    }).catch((error) => {
        console.log(error);
    });

    console.log("Login has finished");
}

function SkipLogin(navigate, authiddata) {
    if (authiddata === undefined) {
        authiddata = Cookies.get("LoginToken");
        console.log("Auth ID: " + authiddata);
    }
    

    fetch("https://backend.project-persona.com/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ authID: authiddata }),
    }).then((response) => {
        if (!response.ok) {
            Cookies.remove("LoginToken")
            throw new Error ("LoginToken was invalid and has been reset")
        }
        return response.json();
    }).then((data) => {
        console.log(data)
        Cookies.set("Username", data.username, {
            expires: new Date(data.expires * 1000), 
            secure: true, 
            sameSite: 'Strict'
        });
        console.log("Username Cookie added");
        Cookies.set("Permission_Level", data.permission_level, {
            expires: new Date(data.expires * 1000), 
            secure: true, 
            sameSite: 'Strict'
        });
        console.log("Permission Cookie added");
        Cookies.set("Name", data.name, {
            expires: new Date(data.expires * 1000), 
            secure: true, 
            sameSite: 'Strict'
        });
        console.log("Name Cookie added");
        Cookies.set("Email", data.email, {
            expires: new Date(data.expires * 1000), 
            secure: true, 
            sameSite: 'Strict'
        });
        console.log("Email Cookie added");
        navigate('/game');
    }).catch((error) => {
        console.log(error);
    });
}


export default function Login() {
    const navigate = useNavigate();

    if (Cookies.get("LoginToken") !== undefined) {
        console.log("Skipping Login");
        SkipLogin(navigate);
    }

    const onSubmit = (event) => {
        RequestLogin(event, navigate)
    }



    return (
        <div className="LoginMain">
            <img src={logo} className="App-logo" alt="logo"/>
            <h3>Login</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-5">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="username" placeholder="username" id="usernameForm"/>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="password" id="passwordForm"/>
                    <Button className="LoginButton" variant="primary" type="submit">Login</Button>{' '}
                </Form.Group>
            </Form>
        </div>
    )
}