import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // Import the Axios library
import ReactDOM from 'react-dom/client';
import {Outlet, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../Components/sidebar.js';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale, //x
  LinearScale, //y
  Tooltip,
  PointElement,
  Legend
}from 'chart.js';
import {Doughnut, Line, getElementAtEvent} from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale, //x
  LinearScale, //y
  PointElement,
  Tooltip,
  Legend
);

function Home() {

  const [nombreUser, setNombreUser] = useState(0);
  const [nombreCompany, setNombreCompany] = useState(0);
  const [nombreNotif, setNombreNotif] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState();
  const [monthlyDataReserv, setMonthlyDataReserv] = useState();
  const [companyName, setCompanyName] = useState([]);
  const [companyNumber, setCompanyNumber] = useState ([]);

  //Count User
  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.44.1:3005/api/countUsers"),
    ])
    .then(([dataCountUser]) => {
      const countUser = dataCountUser.data.countUser;
      setNombreUser(countUser);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  
  //Get the ranking
  useEffect(() => {
    const fetchRankedCompanies = async () => {
      try {
        const response = await axios.get('http://192.168.44.1:3005/api/rankingCompany');
        const data = response.data;
  
        const names = data.map(item => item.compagnia);
        const documents = data.map(item => item.totaldocuments);
  
        setCompanyName(names);
        setCompanyNumber(documents);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de compagnies classées :', error);
      }
    };
  
    fetchRankedCompanies();
  }, []);

  //Count Company
  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.44.1:3005/api/countCompany"),
    ])
    .then(([dataCountCompany]) => {
      const countCompany = dataCountCompany.data.companyCount;
      setNombreCompany(countCompany);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  //Count Transactions
  useEffect(() => {
    axios
      .get("http://192.168.44.1:3005/api/countTransaction")
      .then((response) => {
        setTransactions(response.data.Transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  
  //Count Notification
  useEffect(() => {
    axios.get("http://192.168.44.1:3005/api/countNotifs")
      .then((response) => {
       setNombreNotif(response.data.notifications);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Line Statistiques(Using variables and others)
  useEffect(() => {
    axios.get("http://192.168.44.1:3005/api/dataTravel")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch Monthly Data
  useEffect(() => {
    axios.get(`http://192.168.44.1:3005/api/dataTravel/${selectedYear}`)
      .then((response) => {
        const travelsByMonth = new Array(12).fill(0);
  
        response.data.forEach((item) => {
          const month = new Date(item.datePay).getMonth();
          travelsByMonth[month]++;
        });
  
        setMonthlyData(travelsByMonth);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedYear]);
  

  // Fetch Monthly Data for reservations
  useEffect(() => {
    axios.get(`http://192.168.44.1:3005/api/dataReservation/${selectedYear}`)
      .then((response) => {
        const monthlyCount = new Array(12).fill(0);
  
        response.data.forEach((reserv) => {
          const month = new Date(reserv.datePay).getMonth();
          monthlyCount[month]++;
        });
  
        setMonthlyDataReserv(monthlyCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedYear]);


  // Create Line Chart Data
  const data = {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [
        {
          label: 'Total vendu',
          data: monthlyData,
          borderColor: 'orange',
          backgroundColor: 'blue',
          borderWidth: 1,
          PointBorderColor : 'dark',
          PointBorderWidth : '6px',
          fill: true,
          tension : 0.3,
        },
        {
          label: 'Total réservation',
          data: monthlyDataReserv,
          borderColor: 'blue',
          backgroundColor: 'brown',
          borderWidth: 1,
          PointBorderColor : 'brown',
          PointBorderWidth : '6px',
          fill: true,
          tension : 0.3,
        },
      ],
    };

  //Create Line CHART DATA(SELL)
  const data2 = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total vendu',
        data: monthlyData,
        borderColor: 'orange',
        backgroundColor: 'blue',
        borderWidth: 1,
        PointBorderColor : 'dark',
        PointBorderWidth : '6px',
        fill: true,
        tension : 0.3,
      },
      ],
    };
  
    //Create Line CHART DATA(RESERV)
  const data3 = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total reservations',
        data: monthlyDataReserv,
        borderColor: 'orange',
        backgroundColor: 'blue',
        borderWidth: 1,
        PointBorderColor : 'dark',
        PointBorderWidth : '6px',
        fill: true,
        tension : 0.3,
      },
      ],
    };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const datas = {
    labels: ['Company', 'Users'],
    datasets: [{
      label: 'Type account',
      data: [nombreCompany, nombreUser],
      backgroundColor: ['blue', 'orange'],
      borderColor: 'transparent',
    }],
  };

  const options = {
    plugins:{
      Legend : false
    },
    scales:{
      y:{}
    }
  };
  
  const option = {}

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
                <div id="contents" className="col-12 col-xl-12 mx-2 d-flex flex-wrap justify-content-evenly  rounded-5">
                  <div className="container my-3">
                    <div className="row">
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"blue 10px solid"}}>
                        <Link to="/users">
                          <h5>
                            <center>Utilisateurs</center>
                          </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreUser}</center>
                        </span>
                        </Link>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"orange 10px solid"}}>
                      <Link to="/company"style={{color:"orange"}}>
                        <h5>
                          <center>Companies</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreCompany}</center>
                        </span>
                        </Link>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"brown 10px solid"}}>
                      <Link to="/reservation" style={{color:"brown"}}>
                        <h5>
                          <center>Transactions</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{transactions}</center>
                        </span>
                      </Link>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer", borderLeft:"aqua 10px solid"}}>
                      <Link to="/notif" style={{color:"aqua"}}>
                        <h5>
                          <center>Notifications</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreNotif}</center>
                        </span>
                      </Link>
                      </div>
                    </div>
                  </div>

                    {/*Courbes des informations pour les ventes */}
                    <div className="col-12 px-5 col-xl-10 py-2">
                      <div className="card" style={{display:"flex",flexDirection:"column",height:"100%",overflow: "hidden",border: "0px"}}>
                          <div className="card-body">
                            <div className="header" style={{height:"100%"}}>
                              <h5 className="card-title" style={{fontWeight: "bold"}}>Les ventes</h5>
                              <label htmlFor="selectYear">Sélectionner une année : </label>
                              <select id="selectYear" onChange={handleYearChange} value={selectedYear}>
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                              <div className="c2 rounded " style={{height:"100%"}}>
                                <div className="chart-container" style={{position: "relative", height:"100%", width:"100%"}}>
                                  <div style={{width: "100% !important", height:"100%;"}}>
                                    <Line
                                      data = {data2}
                                      options = {options}
                                      onClick = {onClick}
                                      ref = {chartRef}
                                
                                      style={{height:"auto"}}
                                      ></Line>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>

                    {/*Courbes des informations pour les reservations */}
                    <div className="col-12 px-5 col-xl-10 py-2">
                      <div className="card" style={{display:"flex",flexDirection:"column",height:"100%",overflow: "hidden",border: "0px"}}>
                          <div className="card-body">
                            <div className="header" style={{height:"100%"}}>
                              <h5 className="card-title" style={{fontWeight: "bold"}}>Les réservations</h5>
                              <label htmlFor="selectYear">Sélectionner une année : </label>
                              <select id="selectYear" onChange={handleYearChange} value={selectedYear}>
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                              <div className="c2 rounded " style={{height:"100%"}}>
                                <div className="chart-container" style={{position: "relative", height:"100%", width:"100%"}}>
                                  <div style={{width: "100% !important", height:"100%;"}}>
                                    <Line
                                      data = {data3}
                                      options = {options}
                                      onClick = {onClick}
                                      ref = {chartRef}
                                
                                      style={{height:"auto"}}
                                      ></Line>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>

                                      {/*Courbes des informations générales */}
                  <div className="col-12 px-5 col-xl-8 py-2">
                    <div className="card" style={{display:"flex",flexDirection:"column",height:"100%",overflow: "hidden",border: "0px"}}>
                      <div className="card-body">
                        <div className="header" style={{height:"100%"}}>
                          <h5 className="card-title" style={{fontWeight: "bold"}}>Courbes comparatives( Ventes et achats )</h5>
                          <label htmlFor="selectYear">Sélectionner une année : </label>
                          <select id="selectYear" onChange={handleYearChange} value={selectedYear}>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <div className="c2 rounded " style={{height:"100%"}}>
                            <div className="chart-container" style={{position: "relative", height:"100%", width:"100%"}}>
                              <div style={{width: "100% !important", height:"100%;"}}>
                                <Line
                                  data = {data}
                                  options = {options}
                                  onClick = {onClick}
                                  ref = {chartRef}

                                  style={{height:"auto"}}
                                  ></Line>
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
                        <h5 className="card-title" style={{fontWeight: "bold"}}>Types de comptes</h5>
                          <div className="c1 rounded " style={{height:"90%"}}>
                            <div className="chart-container" style={{position: "relative", height:"90%", width:"100%"}}>
                              <Doughnut 
                              data = {datas}
                              options = {option}
                              style={{width: "100% !important", height:"100% !important"}}

                              ></Doughnut>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 px-2 col-md-10 col-xl-10 mx-1 mt-2 h-3">
                      <table className="table" style={{border:"10px", width:"100%"}}>
                        <thead>
                          <tr style={{color:"orange"}}>
                            <th style={{fontSize: "1.2rem"}}>Nom compagnie</th>
                            <th style={{fontSize: "1.2rem"}}>Total des transactions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companyName.map((company, index) =>(
                          <tr key={index} style={{color:"#000", fontSize:"1rem", width:"100%", fontWeight:"lighter"}}>
                              <td>{company}</td>
                              <td>{companyNumber[index]}</td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
                
                <Outlet />
        </div>


    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();

export default Home;