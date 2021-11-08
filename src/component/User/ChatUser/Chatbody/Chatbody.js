import React from 'react'
import './Chatbody.css'
import ChatList from '../ChatList/Chatlist'
import ChatContent from '../ChatContent/ChatContent'
import ChatProfile from '../ChatProfile/ChatProfile'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
function Chatbody() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if( localStorage.getItem("token") === null){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class = "chatbody_main">
                <ChatList/>
                <ChatContent/>
                <ChatProfile/>
            </div>
        )
    }
}

export default Chatbody
