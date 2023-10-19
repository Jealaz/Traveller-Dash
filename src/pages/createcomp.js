import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "../Components/sidebar";
import '../Components/style2.css';





function Createcomp(){
    return(
        <>

        <Sidebar />
        <div class="login-box">
        <h3>Créer un compte</h3><hr/>
          <form>
            <div class="user-box">
              <input type="text" name="compagnie" required="" />
              <label>Company name</label>
            </div>
            <div class="user-box">
              <input type="text" name="email" required="" />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input type="password" name="password" required="" />
              <label>Password</label>
            </div>
            <div class="user-box">
              <input type="password" name="conPwd" required="" />
              <label>Confirm password</label>
            </div>
            <div class="user-box">
              <input type="number" name="tarifTravel" required="" />
              <label>Tarif voyage</label>
            </div>
            <div class="user-box">
              <input type="number" name="TarifColis" required="" />
              <label>Tarif colis</label>
            </div>            
            <div class="user-box">
              <input type="text" name="gareTravel" required="" />
              <label>Localisation de la gare</label>
            </div>
            <div class="user-box">
              <input type="file" name="logo" required="" />
              <label>Logo</label>
            </div>
            <center>
            <button type="submit">
                   Envoyer
               <span></span>
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