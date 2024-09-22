
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import logo from '../logo.svg'
  

function RequestLogin(event) {
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

    fetch("http://localhost:4040/login", {
        body: JSON.stringify({ u, p }),
        method: "POST",
        
    }).then((response) => {
        console.log(response.json());
    }).catch((error) => {
        console.log(error);
    });

}


export default function Login() {
    return (
        <div className="LoginMain">
            <img src={logo} className="App-logo" alt="logo"/>
            <h3>Login</h3>
            <Form onSubmit={RequestLogin}>
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