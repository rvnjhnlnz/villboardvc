/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './styles.css'
import { Link } from "react-router-dom";
import { Component } from 'react';
import logo from '../../images/background.png'
import { decodeToken } from "react-jwt";
import styled from 'styled-components';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { AdminSidebarData } from './AdminSidebarData';
// import AdminSubMenu from './AdminSubMenu';
// import { IconContext } from 'react-icons/lib'
// import noimage from '../../images/noimage.png'
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
                    <div className="n_wrapper">

                        <div className="n_logo">
                            <img className="logo_pic" src={logo} alt='logo' />
                            <a href="#">VILLBOARD</a>
                        </div>
                        <input type="radio" name="slider" id="menu-btn" />
                        <input type="radio" name="slider" id="close-btn" />
                        <ul className="nav-links">
                            <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                            <li>
                                <img className="n_mobile-item" src={logo} alt='logo' />
                            </li>
                            <li>
                                <a href="/" className="n_desktop-item">Home</a>
                                <a href="/" className="n_mobile-item">Home</a>
                            </li>
                            {/* <li>
                                <a href="/Contact-us" className="n_desktop-item">Contact</a>
                                <a href="/Contact-us" className="n_mobile-item">Contact</a>
                            </li> */}
                            <li>
                                <a href="/Login" className="n_desktop-item">Login</a>
                                <a href="/Login" className="n_mobile-item">Login</a>
                            </li>
                        </ul>
                        <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                    </div>
                </nav>
            )
        } else {
            if (decodedToken.role === "admin") {
                return (
                    <Navbar collapseOnSelect expand="lg" className='color-navAdmin' variant="dark">

                        <Navbar.Brand href="#home" className='brand'><img src={logo} alt='logo' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="justify-content-end" style={{ width: "95%" }}>
                                <Nav.Link className="nav-links1" href="/"><p>Home</p></Nav.Link>
                                <Nav.Link className="nav-links1" href="/" onClick={this.logout}><p>Logout</p></Nav.Link>
                                <NavDropdown className="nav-links1" title="Dashboard" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Dashboard/Accounts">Accounts</NavDropdown.Item>
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
            else if (decodedToken.role === "homeowners") {
                return (
                    <nav className="user_nav">
                        <div className="n_wrapper">
                            <div className="n_logo">
                                <img className="logo_pic" src={logo} alt='logo' />
                                <a href="#">VILLBOARD</a>
                            </div>
                            <input type="radio" name="slider" id="menu-btn" />
                            <input type="radio" name="slider" id="close-btn" />
                            <ul className="nav-links">
                                <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                                <li><a href="/">Home</a></li>
                                <li>
                                    <a href="#" className="n_desktop-item">Main Menu</a>
                                    <input type="checkbox" id="showMega" />
                                    <label for="showMega" className="n_mobile-item">Main Menu</label>
                                    <div className="n_mega-box">
                                        <div className="n_content">
                                            <div className="n_row">
                                                <ul className="n_mega-links">
                                                    <li><a href="/UploadTransaction">Upload Transaction</a></li>
                                                    <li><a href="/Reservation">Reservation</a></li>
                                                </ul>
                                            </div>
                                            <div className="n_row">
                                                <ul className="n_mega-links">
                                                    <li><a href="/DogRegistration">Pet Registration</a></li>
                                                    <li><a href="/CarRegistration">Vehicle Registration</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" className="n_desktop-item">Hello, {decodedToken.firstName}</a>
                                    <input type="checkbox" id="showDrop" />
                                    <label for="showDrop" className="n_mobile-item">Hello, {decodedToken.firstName}</label>
                                    <ul className="n_drop-menu">
                                        <li><a href="/Profile">Profile</a></li>
                                        <li><Link to="/" onClick={this.logout} className="btn_logout">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                        </div>
                    </nav>
                )
            }
            else if (decodedToken.role === "security") {
                return (
                    <nav className="user_nav">
                        <div className="n_wrapper">
                            <div className="n_logo">
                                <img className="logo_pic" src={logo} alt='logo' />
                                <a href="#">VILLBOARD</a>
                            </div>
                            <input type="radio" name="slider" id="menu-btn" />
                            <input type="radio" name="slider" id="close-btn" />
                            <ul className="nav-links">
                                <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                                <li><a href="/">Home</a></li>
                                <li>
                                    <a href="#" className="n_desktop-item">Hello, {decodedToken.firstName}</a>
                                    <input type="checkbox" id="showDrop" />
                                    <label for="showDrop" className="n_mobile-item">Hello, {decodedToken.firstName}</label>
                                    <ul className="n_drop-menu">
                                        <li><a href="/Profile">Profile</a></li>
                                        <li><Link to="/" onClick={this.logout} className="btn_logout">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
                        </div>
                    </nav>
                )
            }
        }
    }
}

