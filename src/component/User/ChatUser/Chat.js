import React, { useEffect, useState } from 'react';
import './Chat.css'
import Modal from 'react-modal'
import { decodeToken, useJwt } from "react-jwt";
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ChatContent from './ChatContent';
function Chat() {

    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken.role === "admin" || !decodedToken) {
        return (
            <Redirect to={'/'} />
        )
    }
    else {
        return (
            <div class="chat_main">
                <div className="chat_nav">
                    <div className="nav_blocks">
                        {/*<img src={logo}></img>*/}
                    </div>
                    <div className="nav_blocks"></div>
                    <div className="nav_blocks"></div>
                </div>
                <div className="chat_body">
                    <ChatContent/>
                </div>
            </div>
        )
    }
}

export default Chat
