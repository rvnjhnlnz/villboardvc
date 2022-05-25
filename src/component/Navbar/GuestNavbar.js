/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './styles.css'
function GuestNavbar() {
    return (
        <nav>
        <div className="n_wrapper">
            <div className="logo"><a href="#">VILLBOARD</a></div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links">
                <label for="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                <li><a href="/">Home</a></li>
                <li><a href="/About-Us">About</a></li>
                <li><a href="/Contact-Us">Contact Us</a></li>
                <li>
                </li>
                <li><a href="/Login">Sign in</a></li>
            </ul>
            <label for="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
        </div>
    </nav>
    )
}

export default GuestNavbar
