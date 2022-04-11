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
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
/*Sample */
export default class NavbarApp extends Component {
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
                <nav className="user_nav">
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
                    <Navbar collapseOnSelect expand="lg" className='color-navAdmin' variant="dark">

                        <Navbar.Brand href="#home" className='brand'><img src={logo} /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="justify-content-end" style={{ width: "95%" }}>
                                <Nav.Link className = "nav-links1" href="/"><p>Home</p></Nav.Link>
                                <Nav.Link className = "nav-links1" href="/" onClick={this.logout}><p>Logout</p></Nav.Link>
                                <NavDropdown className = "nav-links1" title={<p>Dashboard</p>} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Dashboard/Accounts">Accounts</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard">Data</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard/Reservation">Reservation</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard/Pet">Pet</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard/AdminTransaction">Transactions</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard/Visitor">Visitor</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard/Vehicle">Vehicle</NavDropdown.Item>
                                </NavDropdown>
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
            }
            else if (decodedToken.role == "homeowners") {
                return (
                    <nav className="user_nav">
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
                                                </ul>
                                            </div>
                                            <div class="n_row">
                                                <ul class="n_mega-links">
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
            else if (decodedToken.role == "security") {
                return (
                    <nav className="user_nav">
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

