
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import logo from '../logo.svg'
  

function requestLogin(){

}


export default function Login() {
    return (
        <div className="LoginMain">
            <img src={logo} className="App-logo" alt="logo"/>
            <h3>Login</h3>
            <Form>
                <Form.Group className="mb-4" controlId="formPlaintextPassword">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="username" placeholder="" id="username"/>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="" id="password"/>
                    <Button className="LoginButton" variant="primary" id="loginButton">Login</Button>{' '}
                </Form.Group>
            </Form>
        </div>
    )
}