import react from 'react';
import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import logo from '../../../images/background.png'
import Modal from 'react-modal'
function Reserve() {
    const [r_modalIsOpen, r_setModalIsOpen] = useState(false);
    return (
        <div class="dr_container">
            <div className="dr_wrapper">
                <form className="reserve_form">
                    <div class="dr_logo">
                    </div>
                    <div class="title">
                        Reservation
                    </div>
                    <div className="reserve_input-field">
                        <select className="form-control">
                        <option value="Clubhouse">Clubhouse</option>
                                <option value="Volleyball Court">Volleyball Court</option>
                                <option value="Basketball Court">Basketball Court</option>
                                <option value="Swimming Pool">Swimming Pool</option>
                        </select>
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Amenities</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="date" className="form-control" name="number" id="date" placeholder="Date" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Date</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="time" className="form-control" name="number" id="date" placeholder="Time" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Time Started</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="time" className="form-control" name="number" id="date" placeholder="Time" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Time Ended</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="text" className="form-control"
                            name="firstName" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">First Name</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="text" className="form-control"
                            name="lastName" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Last Name</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="text" className="form-control"
                            name="address" />
                        <div style={{ fontSize: 12, color: "red" }}>

                        </div>
                        <label className="reserve_label">Address</label>
                    </div>
                    <div className="reserve_input-field">
                        <input type="email" className="form-control"
                            name="email" />
                        <div style={{ fontSize: 12, color: "red" }}>
                        
                        </div>
                        <label className="reserve_label">Upload File</label>
                    </div>
                    <div className="reserve_input-field">
                    <input type="number" className="form-control"
                            name="phoneNumber" />
                        <div style={{ fontSize: 12, color: "red" }}>
                        
                        </div>
                        <label className="reserve_label">Phone Number</label>
                    </div>
                    
                <div className="reserve_input-field">
                    <input type="submit" value='SUBMIT' className="reserve_submitBtn"  />
                </div>
                
                </form>
            </div>
        </div>
    )
}

export default Reserve