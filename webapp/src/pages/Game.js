import NavBar from '../components/NavBar'; 
import { Container, Row, Col, Image, Form, ListGroup, Button } from 'react-bootstrap';

//import logo from '../assets/logo.png' 

import { Unity, useUnityContext } from "react-unity-webgl";

export default function Game() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "UnityBuild/build.loader.js",
        dataUrl: "UnityBuild/build.data",
        frameworkUrl: "UnityBuild/build.framework.js",
        codeUrl: "UnityBuild/build.wasm",
      });
      /*<Unity unityProvider={unityProvider} style={{ width: 960, height: 600 }}/>*/

    return (
        <>
            <NavBar />
            <div className="LoginMain">
            <Container>
                <Row>
                        <h1>Project Persona User Guide</h1>
                    <Col style={{ padding: '20px' }}>
                    <div>
                        <h3>Logging In</h3>
                        <p>User will have to navigate to the Login Button. Once on the Login Screen the user should enter their username and password. Once the user has entered their information the user will click 'Login'. </p>
                        <h3>Playing the Game</h3>
                        <p>As the user plays the game customers will walk in. Customers will find a seat to sit at and then the user will click on the customer to interact with them.</p>
                        <h4>Customer Interactions</h4>
                        <p>Users will interact with customers by conducting a short quiz and then interacting with them through the UI. Once the user is done interacting with the customer the user will exit the interaction and the customer will leave.</p>
                    </div>
                </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}