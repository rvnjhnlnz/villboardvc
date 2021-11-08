import { Container, Box, Grid, TextField, Button} from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
const Footer = () => {

    return (
        <footer class="footer">
        <div class="container">
            <div class="row">
                <div className = "social-links">
                <span class="dot"><a href="#"><i class="fab fa-facebook-f"></i></a></span>
                <span class="dot"><a href="#"><i class="fab fa-twitter"></i></a></span>
                <span class="dot"><a href="#"><i class="fab fa-instagram"></i></a></span>
                <span class="dot"><a href="#"><i class="fab fa-linkedin-in"></i></a></span>
                </div>
            </div>
            <div class="row">
                <span class="page-link"><a href="#">Home</a></span>
                <span class="page-link"><a href="#">Guest</a></span>
                <span class="page-link"><a href="#">About Us</a></span>
                <span class="page-link"><a href="#">Contact Us</a></span>
            </div>
            <div class="row">
                <h4>Villboard 2021</h4>
            </div>
        </div>
   </footer>
    )
}

export default Footer
