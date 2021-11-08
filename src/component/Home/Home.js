import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'

import Guest from '../Guest/Guest'
import UserHome from '../User/UserHome/UserHome'
export default class Home extends Component{
    render() { 
        return(
            <div>
                {localStorage.getItem("token") === null ? (<Guest/>) :(<UserHome/>)}
            </div>
            
        )
    }
}
    /*return (
        <div>
        <UNavbar/>
            <a href = "/Login">Logout</a>
            <button onClick ={sample}>sample</button>
            <UsersList/>
        </div>
    )*/

