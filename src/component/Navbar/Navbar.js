import React from 'react'
import './styles.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from 'react';
import logo from '../../images/background.png'
import { decodeToken, useJwt } from "react-jwt";
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData';
import AdminSubMenu from './AdminSubMenu';
import { IconContext } from 'react-icons/lib'
import noimage from '../../images/noimage.png'
/*Sample */
export default class Navbar extends Component {
    state = {
        sidebar: false,
    };
    logout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }
    showSidebar = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }
    SidebarNav = styled.nav`
    background: green;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    `;
    render() {
        const decodedToken = decodeToken(localStorage.getItem('token'))
        if (localStorage.getItem("token") === null) {
            return (
                <nav className = "user_nav">
                    <div class="n_wrapper">

                        <div class="n_logo">
                            <img className="logo_pic" src={logo} />
                            <a href="#">VILLBOARD</a>
                        </div>
                        <input type="radio" name="slider" id="menu-btn" />
                        <input type="radio" name="slider" id="close-btn" />
                        <ul class="nav-links">
                            <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                            <li>
                                <img class="n_mobile-item" src={logo} />
                            </li>
                            <li>
                                <a href="/" class="n_desktop-item">Home</a>
                                <a href="/" class="n_mobile-item">Home</a>
                            </li>
                            <li>
                                <a href="/About-us" class="n_desktop-item">About</a>
                                <a href="/About-us" class="n_mobile-item">About</a>
                            </li>
                            <li>
                                <a href="/Contact-us" class="n_desktop-item">Contact</a>
                                <a href="/Contact-us" class="n_mobile-item">Contact</a>
                            </li>
                            <li>
                                <a href="/Login" class="n_desktop-item">Login</a>
                                <a href="/Login" class="n_mobile-item">Login</a>
                            </li>
                        </ul>
                        <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
                    </div>
                </nav>
            )
        } else {
            if (decodedToken.role == "admin") {
                return (
                    <nav className = "user_nav">
                        <div class="n_wrapper">
                            <div class="n_logo">
                                <img className="logo_pic" src={logo} />
                                <a href="#">VILLBOARD</a>
                            </div>
                            <input type="radio" name="slider" id="menu-btn" />
                            <input type="radio" name="slider" id="close-btn" />
                            <ul class="nav-links">
                                <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                                <li><a href="/">Home</a></li>
                                <li>
                                    <a href="#" class="n_desktop-item">Main Menu</a>
                                    <input type="checkbox" id="showMega" />
                                    <label for="showMega" class="n_mobile-item">Dashboard</label>
                                    <div class="n_mega-box">
                                        <div class="n_content">
                                            <div class="n_row">
                                                <ul class="n_mega-links">
                                                    <li><a href="/Dashboard/AdminTransaction">Transactions</a></li>
                                                    <li><a href="/Dashboard">Data</a></li>
                                                    <li><a href="/Dashboard/Reservation">Reservation</a></li>
                                                    <li><a href="/Dashboard/Accounts">Accounts</a></li>
                                                </ul>
                                            </div>
                                            <div class="n_row">
                                                <ul class="n_mega-links">
                                                    <li><a href="/Dashboard/Pet">Pet</a></li>
                                                    <li><a href="/Dashboard/Suggestion">Suggestions</a></li>
                                                    <li><a href="/Dashboard/Visitor">Visitor</a></li>
                                                    <li><a href="/Dashboard/Vehicle">Vehicle</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" class="n_desktop-item">Hello, {decodedToken.firstName}</a>
                                    <input type="checkbox" id="showDrop" />
                                    <label for="showDrop" class="n_mobile-item">Hello, {decodedToken.firstName}</label>
                                    <ul class="n_drop-menu">
                                        <li><a href="/Profile">Profile</a></li>
                                        <li><Link to="/" onClick={this.logout} className="btn_logout">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
                        </div>
                    </nav>
                )
            }
            else if (decodedToken.role == "homeowners") {
                return (
                    <nav className = "user_nav">
                        <div class="n_wrapper">
                            <div class="n_logo">
                                <img className="logo_pic" src={logo} />
                                <a href="#">VILLBOARD</a>
                            </div>
                            <input type="radio" name="slider" id="menu-btn" />
                            <input type="radio" name="slider" id="close-btn" />
                            <ul class="nav-links">
                                <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                                <li><a href="/">Home</a></li>
                                <li>
                                    <a href="#" class="n_desktop-item">Main Menu</a>
                                    <input type="checkbox" id="showMega" />
                                    <label for="showMega" class="n_mobile-item">Main Menu</label>
                                    <div class="n_mega-box">
                                        <div class="n_content">
                                            <div class="n_row">
                                                <ul class="n_mega-links">
                                                    <li><a href="/UploadTransaction">Upload Transaction</a></li>
                                                    <li><a href="/Reservation">Reservation</a></li>
                                                    <li><a href="/Messages">Messages</a></li>
                                                    <li><a href="/Events">Events</a></li>
                                                </ul>
                                            </div>
                                            <div class="n_row">
                                                <ul class="n_mega-links">
                                                    <li><a href="/Budget">Budget Allocation</a></li>
                                                    <li><a href="/Guidelines">Guidelines</a></li>
                                                    <li><a href="/DogRegistration">Pet Registration</a></li>
                                                    <li><a href="/CarRegistration">Vehicle Registration</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" class="n_desktop-item">Hello, {decodedToken.firstName}</a>
                                    <input type="checkbox" id="showDrop" />
                                    <label for="showDrop" class="n_mobile-item">Hello, {decodedToken.firstName}</label>
                                    <ul class="n_drop-menu">
                                        <li><a href="/Profile">Profile</a></li>
                                        <li><Link to="/" onClick={this.logout} className="btn_logout">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
                        </div>
                    </nav>
                )
            }
        }
    }
}

