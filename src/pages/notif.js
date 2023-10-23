import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Sidebar from '../Components/sidebar.js';
import axios from 'axios';



function Notifs(){
  const [data, setData] = useState([]);

  //Get the info from the API
  useEffect(() =>{
      axios.get("http://192.168.1.68:3005/api/everyNotifInfo").then((response) =>{
        setData(response.data);
      });
      }, []);

    return(
        <div>
            <Sidebar />

            <section class="main-content">
              <div id="pre-content" class="p-4">
                <h3>Notifications de suppressions</h3>
                <div class="d-flex  align-items-center justify-content-start">
                  <div class="mt-3 d-flex flex-row">
                    <div class="mx-3">
                      <button class="btn btn-warning">Imprimer <i class="bx bx-printer"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form_sup_client bg-red h-100 position-fixed top-0 start-0 w-100" style={{zIndex: "1010", backgroundColor: "rgba(0, 0, 0, 0.6)", display:"none"}}>
                <div class="form_sup_client2 col-md-6 p-5  mt-5 position-absolute bg-white top-50 start-50 translate-middle rounded" style={{backgroundColor: "var(--sidebar-color)"}}>
                  <h2 class="text-center mb-4" style={{color: "var(--text-color)"}}>Voulez-vous vraiment supprimer cet utilisateur ?
                  </h2>

                  <div class="row d-flex mt-5 justify-content-evenly align-items-center">
                    <div class="col-md-4  d-flex justify-content-evenly align-items-center mb-3">
                      <button class="btn btn-primary w-100" id="bbb" ariaLabel="false">Annuler</button>
                    </div>
                    <div class="col-md-4  d-flex justify-content-evenly align-items-center mb-3">
                      <button class="btn btn-danger w-100" id="aaa" ariaLabel="true">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="content" class="p-3">
                <div class="p-3 bg-light shadow rounded-2">
                  <div class="table mt-3 w-100 rounded">
                    <div class="d-flex justify-content-between">
                        <h4>Liste des notifications</h4>
                      </div>
                        <div class="overflow-scroll">
                          <table class="table table-striped table-responsive">
                            <thead>
                              <tr>
                                <th scope="col"><span class="th-title">Numéro de l'utilisateur</span>
                                  <i class="bx bx-expand-vertical"></i>
                                </th>
                                <th scope="col"><span class="th-title">Motif de la demande</span>
                                  <i class="bx bx-expand-vertical"></i>
                                </th>
                                <th scope="col"><span class="th-title">Date de la demande</span>
                                  <i class="bx bx-expand-vertical"></i>
                                </th>
                                <th scope="col"><span class="th-title">Action</span>
                                <i class="bx bx-expand-vertical"></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="table-group-divider">
                              {data.map((data) =>
                                <tr>
                                  <td>{data.tel}</td>
                                  <td>{data.pattern}</td>
                                  <td>{data.dateAdded}</td>
                                  <td>
                                    <button type='button' className='btn btn-danger'>Supprimer</button>
                                  </td>
                                </tr>
                            )}
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

export default Notifs;