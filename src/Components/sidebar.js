import React from "react";
import ReactDom from 'react-dom/client';
import { Outlet, Link } from "react-router-dom";
import './styles.css';



function Sidebar (){
    return(
            <nav className="sidebar">
                <div className="menu_content">
                    <ul className="menu_items">
                        <div className="menu_title menu_dahsboard"></div>

                        <li className="item">
                            <div href="#" className="nav_link submenu_item">
                                <Link to="/home" style={{textDecoration:"none", color:"gray"}}>
                                <span className="navlink_icon">
                                    <i className="bx bx-home-alt"></i>
                                </span>
                                <span className="navlink">Accueil</span>
                                </Link>
                            </div>
                        </li>
                        <li className="item">
                            <div href="#" className="nav_link submenu_item">
                                <Link to="/createcomp" className="nav_link">
                                    <span className="navlink_icon">
                                        <i className="fa-solid fa-percent"></i>
                                    </span>
                                    <span className="navlink">Créer un compte</span>
                                </Link>
                            </div>
                        </li>    
                    </ul>
                
                    <ul className="menu_items">
                        <div className="menu_title menu_editor"></div>
                            <li className="item">
                                <Link to="/users" className="nav_link">
                                    <span className="navlink_icon">
                                        <i className='bx bxs-user-account'></i>
                                    </span>
                                    <span className="navlink">Utilisateurs</span>
                                </Link>
                            </li>
                        
                            <li className="item">
                                <Link to="/company" className="nav_link">
                                    <span className="navlink_icon">
                                        <i className='bx bx-card'></i>
                                    </span>
                                    <span className="navlink">Compagnies</span>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/transaction" className="nav_link">    
                                    <span className="navlink_icon">
                                        <i className='bx bx-credit-card'></i>
                                    </span>
                                    <span className="navlink">Transactions</span>
                                </Link>
                            </li>
                            <li className="item">
                                <a href="admins.php" className="nav_link">
                                    <span className="navlink_icon">
                                        <i className='bx bx-credit-card'></i>
                                    </span>
                                    <span className="navlink">Administrateurs</span>
                                </a>
                            </li>
                    </ul>
                    <div className="bottom_content">
                        <div className="bottom collapse_sidebar">
                            <span> Disconnect </span>
                            <i className="bx-bx-log-out"></i>
                        </div>
                    </div>
                </div>

                <Outlet />
            </nav>
    )
}



const root = ReactDom.createRoot(document.getElementById('root'));
root.render();
export default Sidebar;