import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../Components/sidebar.js';
import Chart from "chart.js/auto";



function Home (){
    return(
      <div>
             <Sidebar />
              <section className="main-content p-xl-1 pt-1 col-md-12 d-flex bg-white">
                <div id="contents" class="col-12 col-xl-12 mx-2 d-flex flex-wrap justify-content-evenly  rounded-5">
                  <div class="hder mb-2" hidden  style={{paddingTop: "20px", width:"90%", display:"flex",justifyContent:"space-around",height:"30px"}}>
                    <h6 style={{marginRight: "0px"}}>
                      <label for="periode">Periode :</label>
                      <select name="perio" value="month" style={{cursor:"pointer"}}>
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="trim">Ce trimestre</option>
                        <option value="sem">Ce semestre</option>
                        <option value="year">Cette année</option>
                      </select>
                    </h6>
                    <h6>
                      <input class="btn btn-success" type="button" value="save" />
                      <input class="btn btn-danger" type="button" value="reset" />
                    </h6>
                  </div>
                  <div className="container my-3">
                    <div className="row">
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Comptes</center>
                        </h5>
                        <span style={{fontStyle: "italic;"}}>
                          <center> 45 </center>
                        </span>
                        <span style={{color: "green;"}}>
                          <center><i className="fa-solid fa-circle-up"></i>
                          + 12.4% ce mois
                          </center>
                        </span> 
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Transactions</center>
                        </h5>
                        <span style={{fontStyle: "italic;"}}>
                          <center> 1768 </center>
                        </span>
                        <span style={{color: "gray;"}}>
                          <center><i className="fa-solid fa-equals" style={{color:"grey"}}></i>10.4% ce mois </center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Ventes</center>
                        </h5>
                        <span style={{fontStyle: "italic;"}}>
                          <center> 733000</center>
                        </span>
                        <span style={{color: "red;"}}>
                        <center><i className="fa-solid fa-circle-up" style={{color:"red"}}></i>- 1.2% ce mois </center></span> 
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Total reçu des ventes</center>
                        </h5>
                        <span style={{fontStyle: "italic;"}}>
                          <center> 733000 </center>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 px-2 col-xl-8 my-2">
                    <div className="card" style={{display:"flex",flexDirection:"column",height:"340px",overflow: "hidden",border: "0px"}}>
                      <div className="card-body">
                        <div className="header" style={{height:"100%"}}>
                          <h5 className="card-title" style={{fontWeight: "bold"}}>Réservation tickets par mois</h5>
                          <div className="c2 rounded " style={{height:"100%"}}>
                            <div className="chart-container" style={{position: "relative", height:"90%", width:"100%"}}>
                              <canvas id="myChart2" role="img" style={{width: "100% !important", height:"100% !important;"}}></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-2 col-md-5 col-xl-3 mx-1 mt-2 h-3">
                    <div className="card" style={{flexDirection: "column",height:"340p",overflow: "hidden", border:"0px"}}>
                      <div className="card-body">
                        <h5 className="card-title" style={{fontWeight: "bold"}}>Types de comptes (%)</h5>
                          <div className="c1 rounded " style={{height:"90%"}}>
                            <div className="chart-container" style={{position: "relative", height:"90%", width:"100%"}}>
                              <canvas id="myChart" role="img" style={{width: "100% !important", height:"100% !important"}}></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 px-2 col-xl-12 mx-1 my-2 h-3" id="t2">
                      <div className="card shadow-lg" style={{flexDirection: "column",height:"340px",overflow: "hidden",borderRadius: "8px", width:"100%"}}>
                        <div className="card-body" style={{overflowX: "scroll"}}>
                          <div className="header" style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                            <h4>Top Compagnies</h4>
                            <input className="btn btn-info rounded-3" onclick="location.href=''" type="button" value="Voir plus.." />
                          </div>
                          <table className="table table-hover mt-3">
                            <thead>
                              <tr>
                                <th scope="col" style={{textWrap :"nowrap"}}>Compagnie</th>
                                <th scope="col" style={{textWrap :"nowrap"}}>Vue</th>
                                <th scope="col" style={{textWrap :"nowrap"}}>Article</th>
                                <th scope="col" style={{textWrap :"nowrap"}}>Téléphone</th>
                                <th scope="col" style={{textWrap :"nowrap"}}>Type d'utilisateur</th>
                              </tr>
                            </thead>
                            <tbody style={{fontWeight: "light;"}}>
                              <tr>
                                <td >
                                  <span style={{textWrap :"nowrap"}}>
                                    Gontougo transport
                                  </span>
                                </td>
                                <td>6768</td>
                                <td>
                                  <span style={{textWrap :"nowrap"}}>
                                    72
                                  </span>
                                </td>
                                <td>
                                  <span style={{textWrap :"nowrap"}}>
                                    04993322
                                  </span>
                                </td>
                                <td>
                                  <span style={{textWrap :"nowrap"}}>
                                    Bondoukou
                                  </span>
                                </td>
                              </tr>
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

export default Home;