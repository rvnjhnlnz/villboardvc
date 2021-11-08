import React from 'react'
import './Posts.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
function Posts() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="posts_main">
                <div class="admin_recent-grid">
                    <div class="posts_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pending Posts</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="posts_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Address</td>
                                                <td>Email Address</td>
                                                <td>Phone Number</td>
                                                <td>Reference Number</td>
                                                <td>Mode of Payment</td>
                                                <td>Date</td>
                                                <td>Image</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto</td>
                                                <td>09959278654</td>
                                                <td>63929213939495</td>
                                                <td>G Cash</td>
                                                <td>9/20/21</td>
                                                <td>Click</td>
                                                <td>
                                                    <div class="posts-decision">
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
                                <h3>Posts History</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="posts_table">
                                        <thead>
                                            <tr>
                                                <td>Pet Owner</td>
                                                <td>Address</td>
                                                <td>Email Address</td>
                                                <td>Phone Number</td>
                                                <td>Pet Name</td>
                                                <td>Pet Breed</td>
                                                <td>Gender</td>
                                                <td>Image</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto</td>
                                                <td>09959278654</td>
                                                <td>63929213939495</td>
                                                <td>G Cash</td>
                                                <td>9/20/21</td>
                                                <td>Click</td>
                                            </tr>
                                            <tr>
                                            <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto</td>
                                                <td>09959278654</td>
                                                <td>63929213939495</td>
                                                <td>G Cash</td>
                                                <td>9/20/21</td>
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

export default Posts
