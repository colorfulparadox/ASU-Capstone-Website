import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'; 
import { Form, Table, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [players, setPlayers] = useState([]);      
  const [selectedPlayer, setSelectedPlayer] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    grabUserList();  
  }, []);  

  function grabUserList() {
    let authiddata = Cookies.get('LoginToken');

    return fetch("https://backend.project-persona.com/user_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authID: authiddata, admin: false }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("my disappointment is immeasurable and my day is ruined hiii squidward *freakbob*");
      }
      return response.json();
    })
    .then((data) => {
      const playerList = data.map((player, index) => ({
        id: index,
        name: player.name,
        points: player.points,
      }));
      setPlayers(playerList); 
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
  );
}



