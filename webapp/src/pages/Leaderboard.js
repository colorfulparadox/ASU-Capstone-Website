import NavBar from '../components/NavBar'; 
import React, { useState } from 'react';
import { Form, Table, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie'

var playersData = [
        // TEMPORARY Need to integrate database functionality 
       /* { id: 1, name: 'Employee 1', score: 50 },
        { id: 2, name: 'Employee 2', score: 78 },
        { id: 3, name: 'Employee 3', score: 84 },
        { id: 4, name: 'Employee 4', score: 80 },
        { id: 5, name: 'Employee 5', score: 25 },
        { id: 6, name: 'Employee 6', score: 44 },
        { id: 7, name: 'Employee 7', score: 81 },
        { id: 8, name: 'Employee 8', score: 96 },
        { id: 9, name: 'Employee 9', score: 12 },
        { id: 10, name: 'Employee 10', score: 8 }     
         */   
];

function grabUserList() {
  let authiddata = Cookies.get('LoginToken');

  return fetch("https://backend.project-persona.com/user_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authID: authiddata, admin: false }),
  }).then((response) => {
    if (!response.ok) {
      //console.log(response)
      throw new Error ("my disappointment is immeasurable and my day is ruined hiii squidward *freakbob*")
    }
    return response.json();
  }).then((data) => {
      for (var i = 0; i < data.length; i++) {
        playersData.push({id: i, name: data[i].name, points: data[i].points})
      }
      return data;
  }).catch((error) => {
      console.log(error);
  });
}
    
grabUserList()
console.log(playersData)

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState(playersData);
  const [selectedPlayer, setSelectedPlayer] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const handleSearchChange = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
  };

  const handleRowClick = (player) => {
      setSelectedPlayer(player); 
      setShowModal(true); 
  };

  const handleCloseModal = () => {
      setShowModal(false); 
      setSelectedPlayer(null); 
  };

  const filteredPlayers = players
      .filter(player => player.name.toLowerCase().includes(searchQuery))
      .sort((a, b) => b.points - a.points);

      /*
          type SpecifyUser struct {
            AuthID    string `json:"authID"`
            AdminList bool   `json:"admin"`
          }

          type UserElement struct {
            Name        string `json:"name"`
            Username    string `json:"username"`
            Email       string `json:"email"`
            Permissions int    `json:"permission_level"`
            Points      int    `json:"points"`
          }
      */

return (
  <>
      <NavBar />
      <Container style={{ padding: '20px' }}>
      <Row>
        <Col>
          <h1>Leaderboard</h1>
          <Form className="mb-4">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by player name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <tr key={player.id} onClick={() => handleRowClick(player)}>
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    No players found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>

  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Player Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedPlayer ? (
          <>
            <h4>{selectedPlayer.name}</h4>
            <p>Points: {selectedPlayer.points}</p>
          </>
        ) : (
          <p>No player selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>   
  )
}


