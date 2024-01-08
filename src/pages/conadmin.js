import React, {useState} from 'react';
import ReactDOM  from 'react-dom/client';
import axios from 'axios';
import '../Components/style3.css';
//import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Connect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Créer un objet avec les données de l'utilisateur
      const userData = {
        email: email,
        password: password,
      };

      // Faire une requête POST à votre API
      const response = await axios.post('https://xnova-back-end.onrender.com/api/admin/loginAdmin', userData);

      // Traiter la réponse de l'API
      if (response.status === 200) {
        navigate('/home'); // Use navigate for redirection
        // Login réussi, vous pouvez gérer la redirection ou afficher un message de succès ici.
      } else {
        // Gérer d'autres cas de réponse (par exemple, mauvais mot de passe, email incorrect, etc.)
      }
    } catch (error) {
      // Gérer les erreurs de requête ici
      alert('Mot de passe ou email incorrect veuillez réessayez');

    }
  };

  return (
    <div className="form_main">
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
      <button id="button" onClick={handleLogin}>
        Se connecter
      </button>
      <a className="forgotLink" href="forgot">
        Mot de passe oublié?
      </a>
    </div>
  );
}

export default Connect;
