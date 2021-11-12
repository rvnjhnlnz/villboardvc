import React, { useEffect, useState } from 'react';
import './Chat.css'
import Modal from 'react-modal'
import { decodeToken, useJwt } from "react-jwt";
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
function Chat() {
    const[name, setName] = useState('');
    const[suggestion,setSuggestions] = useState('');
    const[scModal,setscModal] = useState(false);
    let history = useHistory
    function handleSubmit (e) {
        e.preventDefault();

        const data = {
            aName: name,
            suggestions: suggestion,
        };
        axios.post('addSuggestion', data).then(res => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Successfully Submitted',
                confirmButtonText: 'Save',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push('/');
                } 
              })
        }).catch(err => {
            console.log(err);
        });
    }
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken.role === "admin" || !decodedToken) {
        return (
            <Redirect to={'/'} />
        )
    }
    else{
    return (
        <div class="chat_container">
            <div className="chat_wrapper">
                <form className="chat_form">
                    <div class="chat_logo">
                    </div>
                    <div class="title">
                        Suggestion Box
                    </div>
                    <div className="chat_input-field">
                        <input type="text" className="form-control"
                            name="Name" onChange={(e) => setName(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                                
                        </div>
                        <label className="chat_label">Name</label>
                    </div>
                    <div className="chat_input-field">
                        <textarea className="form-control"
                            name="SuggCom" rows="4" cols="2" onChange={(e) => setSuggestions(e.target.value)} />
                            
                        <div style={{ fontSize: 12, color: "red" }}>
                                {}
                        </div>
                        <label className="chat_label">Suggestion/Complaints</label>
                    </div>
                </form>
                <div className="">
                    <input type="submit" value='SUBMIT' className="chat_submitBtn" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}
}

export default Chat
