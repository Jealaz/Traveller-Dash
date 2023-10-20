import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import the Axios library
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../Components/sidebar.js';
import { useRef } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale, //x
  LinearScale, //y
  Tooltip,
  Legend
}from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Bar, getElementAtEvent} from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale, //x
  LinearScale, //y
  Tooltip,
  Legend
);


function Home (){

  const [nombreUser, setNombreUser] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.1.8:3005/api/countUsers"),
    ])
    .then(([dataCountUser]) => {
      const countUser = dataCountUser.data.countUser;
      setNombreUser(countUser);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);


  //Bar Statistiques
  const data ={
    labels : ['January', 'Feb', 'March', 'April', 
              'May', 'June', 'July', 'Aug', 
              'Sep', 'Oct', 'Nov', 'Dec'],
    datasets : [{
      label : 'Tickets sold',
      data : [300, 122, 199, 123, 245, 192, 992, 121, 1003, 300, 1223, 2427],
      borderColor : 'dark',
      backgroundColor : 'blue',
      borderWidth: 1,
      links : ['https://www.chartjs3.com', 'https://www.chartjs.com', 'https://www.chartjs3.com', 'https://www.chartjs3.com']
    }]

  };

  //Doughnut Statistiques
  const datas = {
    labels : ['Company', 'Users'],
    datasets : [{
      label : 'Type account',
      data : [48, 52],
      backgroundColor : ['blue', 'orange'],
      borderColor : 'transparent'
    }]
  }

  const options = {
  };

  const chartRef = useRef();
  const onClick = (event) => {
    if(getElementAtEvent(chartRef.current, event).lenght>0){
    // console.log(getElementAtEvent(chartRef.current, event))
    const datasetIndexNum = getElementAtEvent(chartRef.current, event)[0].datasetIndex;
    const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
    window.open(console.log(data.datasets[datasetIndexNum].links[dataPoint]), '_blank')
    }
  };
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
                          <center>Utilisateur</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreUser}</center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Companies</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center> 168 </center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Transactions</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center> 3200</center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Notifications</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center> 300 </center>
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
                            <div className="chart-container" style={{position: "relative", height:"100%", width:"100%"}}>
                              <div style={{width: "100% !important", height:"100% !important;"}}>
                                <Bar
                                  data = {data}
                                  options = {options}
                                  onClick = {onClick}
                                  ref = {chartRef}

                                  style={{height:"auto"}}
                                  ></Bar>
                              </div>
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
                              <Doughnut 
                              data = {datas}
                              options = {options}
                              style={{width: "100% !important", height:"100% !important"}}

                              ></Doughnut>
                            </div>
                          </div>
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