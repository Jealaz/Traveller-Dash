import React from "react";
import ReactDom from 'react-dom/client';
import { Outlet, Link } from "react-router-dom";
import { FaBell, FaUser, FaStore, FaHome, FaUserPlus, FaChartBar, FaBus, FaBox } from 'react-icons/fa';
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
                                    <FaHome />
                                </span>
                                <span className="navlink">Accueil</span>
                                </Link>
                            </div>
                        </li>
                        <li className="item">
                            <div href="#" className="nav_link submenu_item">
                                <Link to="/createcomp" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaUserPlus />
                                    </span>
                                    <span className="navlink">Créer un compte</span>
                                </Link>
                            </div>
                        </li>    
                    </ul>
                
                    <ul className="menu_items">
                        <div className="menu_title menu_editor"></div>
                            <li className="item">
                                <Link to="/notif" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaBell />
                                    </span>
                                    <span className="navlink">Notifications</span>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/users" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaUser />
                                    </span>
                                    <span className="navlink">Utilisateurs</span>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/company" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaStore />
                                    </span>
                                    <span className="navlink">Compagnies</span>
                                </Link>
                            </li>
                    </ul>
                    <ul className="menu_items">
                        <div className="menu_title menu_transac"></div>
                            <li className="item">
                                <Link to="/travel" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaBus />
                                    </span>
                                    <span className="navlink">Voyage</span>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/colis" className="nav_link">
                                    <span className="navlink_icon">
                                        <FaBox />
                                    </span>
                                    <span className="navlink">Colis</span>
                                </Link>
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