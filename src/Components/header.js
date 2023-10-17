import React from "react";
import ReactDOM  from "react-dom/client";


function Header (){
    return(
        <nav className="navbar">
              <div className="logo_item">
                <i className="bx bx-menu" id="sidebarOpen"></i>
                <img src="" alt="" hidden/> SmallMarket
              </div>
              <div className="search_bar">
                <input type="text" placeholder="Rechercher" />
              </div>

              <div className="navbar_content">
                <i className="bi bi-grid"></i>
                <i className='bx bx-sun' id="darkLight"></i>
                <i className='bx bx-bell' ></i>
                <img src="../assets/images/person-1.jpeg" alt="" className="profile" />
              </div>
        </nav>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();
export default Header;