import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // Import the Axios library
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../Components/sidebar.js';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale, //x
  LinearScale, //y
  Tooltip,
  Legend
}from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Bar, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale, //x
  LinearScale, //y
  Tooltip,
  Legend
);

function Home() {

  const [nombreUser, setNombreUser] = useState(0);
  const [nombreCompany, setNombreCompany] = useState(0);
  const [nombreNotif, setNombreNotif] = useState(0);
  const [nombreTransac, setNombreTransac] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState();

  //Count User
  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.1.68:3005/api/countUsers"),
    ])
    .then(([dataCountUser]) => {
      const countUser = dataCountUser.data.countUser;
      setNombreUser(countUser);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  

  //Count Company
  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.1.68:3005/api/countCompany"),
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
    Promise.all([
      axios.get("http://192.168.1.68:3005/api/countTransaction"),
      ])
      .then(([dataCountTransactions]) => {
        setNombreTransac(dataCountTransactions.data.transactionsCount)
        })
        .catch((error) => {
          console.error(error);
          });
  }, []); 
  
  //Count Notification
  useEffect(() => {
    Promise.all([
      axios.get("http://192.168.1.68:3005/api/countNotifs"),
    ])
    .then(([dataCountNotifs]) => {
      setNombreNotif(dataCountNotifs.data.notifsCount);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  //Bar Statistiques(Using variables and others)
  useEffect(() => {
    axios.get("http://192.168.1.68:3005/api/dataTravel")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch Monthly Data
  useEffect(() => {
    axios.get(`http://192.168.1.68:3005/api/dataTravel/${selectedYear}`)
      .then((response) => {
        const monthlyTotal = new Array(12).fill(0);
        response.data.forEach((item) => {
          const month = new Date(item.datePay).getMonth();
          monthlyTotal[month] += item.nombre_place;
        });
        setMonthlyData(monthlyTotal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedYear]);

  // Create Bar Chart Data
  const data = {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [
        {
          label: `Total place achetée`,
          data: monthlyData,
          borderColor: 'dark',
          backgroundColor: 'blue',
          borderWidth: 1,
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

  const options = {};

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
                          <center>{nombreCompany}</center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Transactions</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreTransac}</center>
                        </span>
                      </div>
                      <div className="col bg-white shadow-lg mx-3 rounded-3 h-5" style={{cursor:"pointer"}}>
                        <h5>
                          <center>Notifications</center>
                        </h5>
                        <span style={{fontStyle: "italic", fontSize:"30px", fontWeight:"lighter", color:"orange"}}>
                          <center>{nombreNotif}</center>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 px-2 col-xl-8 my-2">
                    <div className="card" style={{display:"flex",flexDirection:"column",height:"340px",overflow: "hidden",border: "0px"}}>
                      <div className="card-body">
                        <div className="header" style={{height:"100%"}}>
                          <h5 className="card-title" style={{fontWeight: "bold"}}>Réservation tickets par mois</h5>
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
                        <h5 className="card-title" style={{fontWeight: "bold"}}>Types de comptes</h5>
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