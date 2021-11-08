import React from 'react'
import './Vehicle.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
function Vehicle() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="vehicle_main">
                <div class="admin_recent-grid">
                    <div class="vehicle_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Vehicle Users</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="vehicle_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Address</td>
                                                <td>Email Address</td>
                                                <td>Phone Number</td>
                                                <td>Car Model</td>
                                                <td>Plate Number</td>
                                                <td>Image</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto@gmail.com</td>
                                                <td>09959278654</td>
                                                <td>Montero Sports</td>
                                                <td>5F1DAW</td>
                                                <td>Click</td>
                                            </tr>
                                            <tr>
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto@gmail.com</td>
                                                <td>09959278654</td>
                                                <td>Montero Sports</td>
                                                <td>5F1DAW</td>
                                                <td>Click</td>
                                            </tr>
                                            <tr>
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto@gmail.com</td>
                                                <td>09959278654</td>
                                                <td>Montero Sports</td>
                                                <td>5F1DAW</td>
                                                <td>Click</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Vehicle
