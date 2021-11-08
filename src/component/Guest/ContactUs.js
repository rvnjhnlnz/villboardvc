import React from 'react'
import Footer from '../Footer/Footer'
import Iframe from 'react-iframe'
import './contactus.css'
import Navbar from '../Navbar/Navbar'

const ContactUs = () => {
    return (
        <div className = "con-container">
            <div className="con-header">
                <h1>Contact Us</h1>
            </div>
            <div className="con-location">
                <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.408964419397!2d121.09938921431697!3d14.28765478850061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d838a3401537%3A0xabef2dc0e7e54d6e!2sVilla%20Caceres!5e0!3m2!1sen!2sph!4v1621451755012!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></Iframe>
            </div>
            <div className = "con-contact">
                <div className = "con-row">
                    <div className = "con-col">
                        <div>
                            <i className ="fa fa-home"/>
                            <span>
                                <h5>Villa Caceres</h5>
                                <p>Balibago, Sta Rosa, Laguna</p>
                            </span>
                        </div>
                        
                        <div>
                            <i className ="fa fa-phone"/>
                            <span>
                                <h5>+639292136357</h5>
                                <p>Monday to Sunday,  6AM to 12AM</p>
                            </span>
                        </div>
                        <div>
                            <i class="fa fa-envelope-open-text"/>
                            <span>
                                <h5>villacaceres@gmail.com</h5>
                                <p>Email us for more details</p>
                            </span>
                        </div>
                    </div>
                    <div className = "con-col">
                        <form>
                            <input type = "text" placeholder = "Enter your Name" required/>
                            <input type = "email" placeholder = "Enter your Email Address" required/>
                            <input type = "number" placeholder = "Enter your Contact Number" required/>
                            <input type = "text" placeholder = "Enter your Home Address" required/>
                            <textarea rows="8" placeholder= "Message" required />
                            <button type = "submit" className = "con-submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactUs
