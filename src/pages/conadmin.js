import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import '../Components/style3.css';
import { useNavigate } from 'react-router-dom';

function Connect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true when request begins

      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post('https://xnova-back-end.onrender.com/api/admin/loginAdmin', userData);

      if (response.status === 200) {
        navigate('/home');
      } else {
        // Handle other response cases
      }

      setLoading(false); // Set loading to false after request completes
    } catch (error) {
      setLoading(false); // Set loading to false in case of errors
      alert('Mot de passe ou email incorrect veuillez réessayez');
    }
  };

  return (
    <div className="form_main">
      <>
        <h1 className="heading">Connexion</h1>
        <div className="inputContainer">
          <span className="inputIcon">📧</span>
          <input
            className="inputField"
            type="text"
            placeholder="Nom d'utilisateur ou e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <span className="inputIcon">🔒</span>
          <input
            className="inputField"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Chargement...' : 'Se connecter'}
        </button>
        <a className="forgotLink" href="forgot">
          Mot de passe oublié?
        </a>
      </>
    </div>
  );
}

export default Connect;

