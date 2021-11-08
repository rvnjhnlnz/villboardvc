import React from 'react'
import './Reservation.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
function Reservation() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="reserve_main">
                <div class="admin_recent-grid">
                    <div class="admin_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pending</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="reserve_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Amenities</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>Swimming Pool</td>
                                                <td>
                                                    <div class="reserve-decision">
                                                        <span class="las la-check"></span>
                                                        <span class="las la-times"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>Gym</td>
                                                <td>
                                                    <div class="pending-decision">
                                                        <span class="las la-check"></span>
                                                        <span class="las la-times"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Swimming Pool</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
    
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Gym</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
    
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
    
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Clubhouse</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
    
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
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

export default Reservation
