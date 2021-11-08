import React from 'react'
import './styles.css'
function GuestNavbar() {
    return (
        <nav>
        <div class="n_wrapper">
            <div class="logo"><a href="#">VILLBOARD</a></div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul class="nav-links">
                <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                <li><a href="/">Home</a></li>
                <li><a href="/About-Us">About</a></li>
                <li><a href="/Contact-Us">Contact Us</a></li>
                <li>
                </li>
                <li><a href="/Login">Sign in</a></li>
            </ul>
            <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
        </div>
    </nav>
    )
}

export default GuestNavbar
