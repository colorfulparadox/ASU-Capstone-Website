import logo from './logo.svg';
import './App.css';

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <h1>
        Example heading
        <Badge bg="secondary" as={Button}>
          New
        </Badge>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
      </h1>

    </div>
  );
}

export default App;
