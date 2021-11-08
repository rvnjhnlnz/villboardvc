import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import community from '../../../images/community.jpg'
import swabtest from '../../../images/swabtest.jpg'
function Events() {
    return (
        <div class="main">
            <div className="ba-header">
                <h1><b>Events</b></h1>
            </div>
            <div class="card">
                <div class="image">
                    <img src={swabtest}/>
                </div>
                <div class="title">
                    <h1>Swab Test</h1>
                </div>
                <div class="des">
                    <p>Starts on June 19, 2021</p>
                    <button className = "e_btn">Read More...</button>
                </div>
            </div>

            <div class="card">

                <div class="image">
                    <img src={community} />
                </div>
                <div class="title">
                    <h1>Community Pantry</h1>
                </div>
                <div class="des">
                    <p>Starts on June 20, 2021</p>
                    <button className = "e_btn">Read More...</button>
                </div>
            </div>

            <div class="card">

            <div class="image">
                    <img src="https://external-preview.redd.it/W2aLXjCegdnD68U0_BDkvlNDmBSTelWk8N0XrHAYYkU.jpg?auto=webp&s=075340f3702593b7c6b337e7a9ab424afb1e8a40"/>
                </div>
                <div class="title">
                    <h1>Vaccination</h1>
                </div>
                <div class="des">
                    <p>Starts on June 25, 2021</p>
                    <button className = "e_btn">Read More...</button>
                </div>
            </div>

            <div class="card">

                <div class="image">
                <img src="http://entertainkidsonadime.com/wp-content/uploads/2016/01/familyday2014.jpg" />
                </div>
                <div class="title">
                    <h1>Family Day</h1>
                </div>
                <div class="des">
                    <p>June 27, 2021</p>
                    <button className = "e_btn">Read More...</button>
                </div>
            </div>
        </div>
    )
}

export default Events