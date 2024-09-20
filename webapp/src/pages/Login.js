import NavBar from '../components/NavBar'; 
import Button from 'react-bootstrap/Button';


function OnClick() {
    const buttonHolder = document.getElementById("ButtonNumber");
    buttonHolder.remove();
  
    const app = document.getElementById("numberID");
    const node = document.createTextNode("this is a test here is your test number 1337!");
    app.appendChild(node);
  }
  

  

export default function Login() {
    return (
        <>
            <NavBar />
            <h5>login screen with a demo!</h5>
            <br/>
            <h1>Hello press the button to get a random number!</h1>
            <div id="NumberID">
                <Button id="ButtonNumber" variant="primary" onClick={OnClick}>Press me!</Button>
            </div>
        </>
    )
}