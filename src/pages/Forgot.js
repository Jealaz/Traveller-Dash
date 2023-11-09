import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for making API requests
import '../Components/style4.css';

function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an Axios POST request to your password reset API
    axios.post('http://192.168.1.16:3005/api/forgotAdmin', { email })
      .then((response) => {
        // Assuming your API returns a success message, set the message state accordingly
        setMessage(response.data.message);
      })
      .catch((error) => {
        // Handle API request error here
        setMessage('Error resetting the password. Please try again.');
      });
  };

  return (
    <Container>
      <h1>Réinitialisation de mot de passe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse e-mail :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Réinitialiser le mot de passe
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  );
}

export default Forgot;
