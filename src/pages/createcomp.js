import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "../Components/sidebar";
import '../Components/style2.css';
import axios from 'axios';




function Createcomp(){

  //Déclaration de toutes les variables à receuillir dans la base de données
  const [formData, setFormData] = useState({
    compagnie: '',
    email: '',
    destinationTravel: '',
    tarifTravel: '',
    gareTravel: '',
    destinationColis: '',
    TarifColis: '',
    gareColis: '',
    depart: '00:00', //Valeur par défaut pour l'heure
  });

  //Message d'erreurs en cas d'erreur
  const [error, setError] = useState('');

  //Receuillir les données fournies lors du remplissage du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'depart' ? formatTime(value) : value,
    });
  };

  //Définir le paramètre de temps
  const formatTime = (time) => {
    // Personnalisez le format de l'heure ici (ajoutez des secondes, etc.)
    return time; // Exemple : ajoute des secondes
  };

  //Fonction pour manipuler l'entrée des différentes valeurs
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://xnova-back-end.onrender.com/api/company/register', formData);
      if (response.data.exists){
        setError("Compagnie déja existante");
      }else{
      console.log(formData);
      console.log(response.data);
      alert('La compagnie a été créée');
      window.location.reload();
    }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Compagnie existante');
      } else {
        setError('Erreur de connexion');
      }
    }
  };
   
    return(
        <>

        <Sidebar />
        <div class="login-box">
        <h3>Créer un compte</h3><hr/>
          <form onSubmit={handleSubmit}>
            <div class="user-box">
              <input type="text" name="compagnie" value={formData.compagnie} onChange={handleInputChange} required />
              <label>Company name</label>
            </div>
            <div class="user-box">
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} required />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input type="text" name="destinationTravel" value={formData.destinationTravel} onChange={handleInputChange} required />
              <label>Destination du voyage</label>
            </div>
            <div class="user-box">
              <input type="number" name="tarifTravel" value={formData.tarifTravel} onChange={handleInputChange} required />
              <label>Tarif voyage</label>
            </div>            
            <div class="user-box">
              <input type="text" name="gareTravel" value={formData.gareTravel} onChange={handleInputChange} required />
              <label>Localisation de la gare</label>
            </div>
            <div class="user-box">
              <input type="text" name="destinationColis" value={formData.destinationColis} onChange={handleInputChange} required />
              <label>Destination des colis</label>
            </div>
            <div class="user-box">
              <input type="number" name="TarifColis" value={formData.TarifColis} onChange={handleInputChange} required />
              <label>Tarif colis</label>
            </div>
            <div class="user-box">
              <input type="text" name="gareColis" value={formData.gareColis} onChange={handleInputChange} required />
              <label>Gare des colis</label>
            </div>
            <div class="user-box">
              <input type="time" name="depart" value={formData.depart} onChange={handleInputChange} required />
              <label>Heure de départ</label>
            </div>
            <center>
            <button type="submit">
                   Envoyer
            </button>
            </center>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>

        </>
    )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();
export default Createcomp;