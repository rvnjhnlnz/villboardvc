import React,{useState, useEffect} from 'react'
import './styles.css'
import { decodeToken, useJwt } from "react-jwt";
import logo from '../../images/background.png'
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
function UserNavbar(props) {
    const [user, setUser] = useState(props.user);
    const logout = () => {
        localStorage.clear();
        setUser(null);
      };
    const decodedToken = decodeToken(localStorage.getItem('token'))
    return (
        <nav>
                    <div class="n_wrapper">
                        <div class="logo">
                        <img className = "logo_pic" src ={logo}/>
                        <a href="#">VILLBOARD</a>
                        </div>
                        <input type="radio" name="slider" id="menu-btn" />
                        <input type="radio" name="slider" id="close-btn" />
                        <ul class="nav-links">
                            <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                            <li><a href="/UserHome">Home</a></li>
                            <li>
                                <a href="#" class="desktop-item">Main Menu</a>
                                <input type="checkbox" id="showMega" />
                                <label for="showMega" class="mobile-item">Main Menu</label>
                                <div class="mega-box">
                                    <div class="content">
                                        <div class="row">
                                            <ul class="mega-links">
                                                <li><a href="/UploadTransaction">Upload Transaction</a></li>
                                                <li><a href="#">Reservation</a></li>
                                                <li><a href="#">Contact Admin</a></li>
                                                <li><a href="#">Events</a></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <ul class="mega-links">
                                                <li><a href="/Donation">Donation</a></li>
                                                <li><a href="/Guidelines">Emergency and Guidelines</a></li>
                                                <li><a href="/DogRegistration">Dog Registration</a></li>
                                                <li><a href="/CarRegistration">Car Registration</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#" class="desktop-item">{decodedToken.lastName}, {decodedToken.firstName}</a>
                                <input type="checkbox" id="showDrop" />
                                <label for="showDrop" class="mobile-item">{decodedToken.lastName}, {decodedToken.firstName}</label>
                                <ul class="drop-menu">
                                    <li><a href="/Budget">Budget</a></li>
                                    <li><a href="#">Account</a></li>
                                    <li><a href="/UserProfile">Profile</a></li>
                                    <li><a href="#">Settings</a></li>
                                    <li><Link onClick={logout} className="btn_logout">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
                    </div>
            </nav>
    )
}

export default UserNavbar
