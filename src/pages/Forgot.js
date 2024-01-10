import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../Components/style4.css';

function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    axios.post('https://xnova-back-end.onrender.com/api/admin/forgotAdmin', { email })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage('Error resetting the password. Please try again.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API request completes
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
      {loading && <Spinner animation="border" variant="primary" />} {/* Show spinner while loading */}
      {message && <p>{message}</p>}
    </Container>
  );
}

export default Forgot;
