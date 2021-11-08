/*import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Admin.css'
import avatar from '../../../images/sample.jpg'
import avatar1 from '../../../images/Avatar.jpg'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { decodeToken, useJwt } from "react-jwt";
import Reservation from './Reservation';
import Accounts from './Accounts';
import Vehicle from './Vehicle';
import Pet from './Pet';
import Transactions from './Transactions';
import Posts from './Posts';
import VLogo from '../../../images/background.png'
import Suggestions from './Suggestions';
import Dashboard from './Dashboard'


function Admin() {
    return (
        <div class="admin_body">
            <Router>
                <div class="admin_sidebar">
                    <div class="sidebar-menu">
                        <ul>
                            <li>
                                <NavLink to="/Dashboard" activeClassName="active">
                                    <span class="las la-home"></span>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/Dashboard-Reservation' activeClassName="active">
                                    <span class="las la-sticky-note"></span>
                                    <span>Reservation</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-Accounts" activeClassName="active">
                                    <span class="las la-user"></span>
                                    <span>Accounts</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-Vehicle" activeClassName="active">
                                    <span class="las la-car"></span>
                                    <span>Vehicle</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-Pets" activeClassName="active">
                                    <span class="las la-dog"></span>
                                    <span>Pet</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-Transactions" activeClassName="active">
                                    <span class="las la-receipt"></span>
                                    <span>Transactions</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-Posts" activeClassName="active">
                                    <span class="las la-bullhorn"></span>
                                    <span>Posts</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Admin-User-Suggestions" activeClassName="active">
                                    <span class="las la-lightbulb"></span>
                                    <span>Suggestions</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="admin_dashboard">
                    <Switch>
                        <Route exact path="/Dashboard">
                            <Dashboard />
                        </Route>
                        <Route exact path="/Dashboard-Reservation">
                            <Reservation />
                        </Route>
                        <Route exact path="/Admin-Accounts">
                            <Accounts />
                        </Route>
                        <Route exact path="/Admin-Vehicle">
                            <Vehicle />
                        </Route>
                        <Route exact path="/Admin-Pets">
                            <Pet />
                        </Route>
                        <Route exact path="/Admin-Transactions">
                            <Transactions />
                        </Route>
                        <Route exact path="/Admin-Posts">
                            <Posts />
                        </Route>
                        <Route exact path="/Admin-User-Suggestions">
                            <Suggestions />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Admin
*/