import React from 'react'
import './styles.css'
import {
    Link, Route,
    NavLink,
    HashRouter
} from 'react-router-dom';
import ChatAdmin from './ChatAdmin'
import CChat from './CChat'
function Contact() {
    return (
        <HashRouter>
        <div>
        <div className="ba-header">
                <h1><b>Contact Admin</b></h1>
            </div>
            <div className="ca_container">
                <div className="ca_buttons">
                <NavLink to="/"><button>Chat Admin</button></NavLink>
                <NavLink to="/CChat"><button>CChat</button></NavLink>
                </div>
                <div className="ca_ccontainers">
                    <Route exact path="/" component={ChatAdmin}/>
                    <Route path="/CChat" component={CChat}/>
                </div>
            </div>
        </div>
    </HashRouter>
    )
}

export default Contact
