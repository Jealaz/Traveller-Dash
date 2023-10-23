import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "../Components/sidebar";
import '../Components/style2.css';
import axios from 'axios';




function Createcomp(){
  
    let [company, setCompany] = useState({
      name: "",
      email:"",
      password:"",
      conPwd:"",
      destinationTravel:"",
      tarifTravel:"",
      gareTravel:"",
      destinationColis:"",
      TarifColis:"",
      gareColis:"",
      });
      
      const handleInputChange = (event) =>{
        event.preventDefault();
        setCompany({...company,[event.target.name]: event.target.value});
      }
      const submitForm= async(e)=>{
        if (company.password !== company.conPwd){
          alert('Le mot de passe et la confirmation ne sont pas identiques');
          return;
        }else{
        try{
          e.preventDefault()
          await axios.post('http://192.168.1.68:3005/api/registerCompany', company);
          alert("Votre Compagnie a bien été enregistrée");
          window.location.reload();
          }catch(err){
            console.log(err);
          }
          };
        }



  //Register a company account
  //await axios.post('http://192.168.1.68:3005/api/registerCompany', company);
  //alert("Votre Compagnie a été ajouté avec succés");
  //window.location.reload()
  /*function handleSubmit(e){
    e.preventDefault();
    if (password !== confirm_pass) {
      alert('Le mot de passe et la confirmation ne sont pas identiques');
      return;
      } else{
        let data={
          name: name,
          email: email,
          password: password,
          destinationTravel: destinationTravel,
          tarifTravel: tarifTravel,
          gareTravel: gareTravel,
          destinationColis: destinationColis,
          TarifColis: TarifColis,
          gareColis: gareColis,
          depart: depart
          };
          console.log(data);
          axios.post('/', data).then((response)=>{
            console.log(response.data);
            window.location.reload()})
            .catch(()=>{console.error("Error")});
            }}*/
    return(
        <>

        <Sidebar />
        <div class="login-box">
        <h3>Créer un compte</h3><hr/>
          <form onSubmit={submitForm}>
            <div class="user-box">
              <input type="text" name="compagnie" value={company.compagnie} onChange={handleInputChange} required="" />
              <label>Company name</label>
            </div>
            <div class="user-box">
              <input type="text" name="email" value={company.email} onChange={handleInputChange} required="" />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input type="password" name="password" value={company.password} onChange={handleInputChange} required="" />
              <label>Password</label>
            </div>
            <div class="user-box">
              <input type="password" name="conPwd" value={company.conPwd} onChange={handleInputChange} required="" />
              <label>Confirm password</label>
            </div>
            <div class="user-box">
              <input type="text" name="destinationTravel" value={company.destinationTravel} onChange={handleInputChange} required="" />
              <label>Destination du voyage</label>
            </div>
            <div class="user-box">
              <input type="number" name="tarifTravel" value={company.tarifTravel} onChange={handleInputChange} required="" />
              <label>Tarif voyage</label>
            </div>            
            <div class="user-box">
              <input type="text" name="gareTravel" value={company.gareTravel} onChange={handleInputChange} required="" />
              <label>Localisation de la gare</label>
            </div>
            <div class="user-box">
              <input type="text" name="destinationColis" value={company.destinationColis} onChange={handleInputChange} required="" />
              <label>Destination des colis</label>
            </div>
            <div class="user-box">
              <input type="text" name="TarifColis" value={company.TarifColis} onChange={handleInputChange} required="" />
              <label>Tarif colis</label>
            </div>
            <div class="user-box">
              <input type="text" name="gareColis" value={company.gareColis} onChange={handleInputChange} required="" />
              <label>Gare des colis</label>
            </div>
            <div class="user-box">
              <input type="time" name="depart" value={company.depart} required="" />
              <label>Heure de départ</label>
            </div>
            <div class="user-box">
              <input type="file" name="logo" required="" />
              <label>Logo</label>
            </div>
            <center>
            <button type="submit">
                   Envoyer
            </button>
            </center>
          </form>
        </div>

        </>
    )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();
export default Createcomp;