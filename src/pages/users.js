import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from '../Components/sidebar.js';



class Users extends Component{
  constructor(){
    super();
    this.state = {
      company: [], //To store the data retrieved from the server
    }
  }

  componentDidMount(){
    //Make the API request to the server to get data
    // eslint-disable-next-line no-undef
    axios.get('http://192.168.1.66:3005/api/companies')
      .then((response) =>{
        //Successful response
        this.setState({comapny: response.company});
      })
      .catch((error)=>{
        //Handle any errors
        console.error('Error fetching data:', error);
        });
      }

    render(){
    return(
        <div>
            <Sidebar />

            <section class="main-content">
              <div id="pre-content" class="p-4">
                <h3>Utilisateurs</h3>
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
                <h4>Liste des utilisateurs</h4>
                <div class="mb-3">
                  <select class="form-select form-select-sm" name="select_type_user" id="">
                    <option selected="">Tous</option>
                    <option value="">Particuliers</option>
                    <option value="">PME</option>
                  </select>
                </div>
              </div>
              <div class="overflow-scroll">
                  <table class="table table-striped table-responsive">

                    <thead>
                      <tr>
                        <th scope="col"><span class="th-title">#</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col" colspan="2"><span class="th-title">Pseudo</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col" colspan="2"><span class="th-title">Résidence</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col" colspan="2"><span class="th-title">Occupation</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col"><span class="th-title">Contact</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col"><span class="th-title">Date Insc</span>
                          <i class="bx bx-expand-vertical"></i>
                        </th>
                        <th scope="col"><span class="th-title">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <td>
                              <div class="form-check">
                                <input class=" form-check-input" type="checkbox" name="" id="" />
                              </div>
                            </td>
                            <td>
                              <span>
                              </span>
                            </td>
                            <td>
                              <div class="img" style={{maxHeight: "50px", maxWidth: "50px"}}>
                                <img src="assets/users_img/<?php echo $getListeUsers_resultats->image_user; ?>" alt="" style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}} />
                              </div>
                            </td>
                            <td>
                              <span>
                                Galagoue
                              </span>
                            </td>
                            <td>
                              <span>
                                ses@gmail.com
                              </span>
                            </td>
                            <td>
                              <span>
                                4444444444
                              </span>
                            </td>
                            <td>
                              <span>
                                23/12/2023
                              </span>
                            </td>
                            <td>
                              <span>
                                Marcory
                              </span>
                            </td>
                            <td>
                              <button type='button' className='btn btn-danger'>Delete</button>
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
}


export default Users;