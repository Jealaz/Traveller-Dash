import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Components/sidebar.js';
import axios from 'axios';


function Company() {
  const [data, setData] = useState([]);
  const [travel, setTravelCount] = useState([0]);
  const [reservation, setReservationCount] = useState([0]);
  const [colis, setColisCount] = useState([0]);

  //Get informations from Statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.44.1:3005/api/statistics');
        const data = response.data;
        console.log("Statistics", data);

          setTravelCount(data.travelCount);
          setReservationCount(data.reservationCount);
          setColisCount(data.colisCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };

    fetchData();
  }, []); // Le tableau vide en second argument signifie que cela s'exécutera seulement une fois au montage du composant

  useEffect(() => {
    axios.get('http://192.168.44.1:3005/api/everyCompanyInfo').then((response) => {
      setData(response.data);
    })
  }, []);

  const deleteCompany = (id) => {
    axios.delete(`http://192.168.44.1:3005/api/deleteCompanybyID/${id}`)
    .then((response) => {
      console.log('Utilisateur supprimé avec succès', response.data);
      // Mettez à jour votre liste d'utilisateurs ou effectuez d'autres actions nécessaires
      window.location.reload(); // Recharge la page après la suppression
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression :', error);
    });
}
  
    return(
            <div>
            <Sidebar />

            <section className="main-content">
              <div id="pre-content" className="p-4">
                <h3>Compagnies</h3>
                <div className="d-flex  align-items-center justify-content-start">
                  <div className="mt-3 d-flex flex-row">
                    <div className="col-4 bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"blue 10px solid"}}>
                      <h5>
                        <center>Pourcentage voyage</center>
                      </h5>
                      <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                        <center>{travel} %</center>
                      </span>
                    </div>
                    <div className="col-4 bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"blue 10px solid"}}>
                      <h5>
                        <center>Pourcentage réservation</center>
                      </h5>
                      <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                        <center>{reservation} %</center>
                      </span>
                    </div>
                    <div className="col-4 bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"blue 10px solid"}}>
                      <h5>
                        <center>Pourcentage Colis</center>
                      </h5>
                      <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                        <center>{colis} %</center>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="content" className="p-3">
                <div className="p-3 bg-light shadow rounded-2">
                  <div className="table mt-3 w-100 rounded">
                    <div className="d-flex justify-content-between">
                        <h4>Liste des compagnies</h4>
                    </div>
                    <div className="overflow-scroll">
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th scope="col"><span className="th-title">Logo</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Compagnie</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Email</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Destination de voyage</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Gare de voyage</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Prix du voyage</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Destination du colis</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Gare du colis</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Prix du colis</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Heure de départ</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Date Insc</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                            <th scope="col"><span className="th-title">Action</span>
                              <i className="bx bx-expand-vertical"></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {data.map((item) =>(
                            <tr  key={item._id}>
                              <td>
                                <div className="img" style={{maxHeight: "50px", maxWidth: "50px"}}>
                                  <img src="assets/users_img/<?php echo $getListeUsers_resultats->image_user; ?>" alt="" style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} />
                                </div>
                              </td>
                              <td>{item.compagnie}</td>
                              <td>{item.email}</td>
                              <td>{item.destinationTravel}</td>
                              <td>{item.gareTravel}</td>
                              <td>{item.tarifTravel}</td>
                              <td>{item.destinationColis}</td>
                              <td>{item.gareColis}</td>
                              <td>{item.TarifColis}</td>
                              <td>{item.depart}</td>
                              <td>{item.dateAdded}</td>
                              <td>
                              <button type='button' onClick={()=>deleteCompany(item.id)} className='btn btn-danger'>Delete</button>
                            </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
        }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();
export default Company;