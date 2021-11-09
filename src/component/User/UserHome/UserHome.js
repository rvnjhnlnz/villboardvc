import React, { Component } from 'react'
import './styles.css'
import avatar from '../../../images/Avatar.jpg'
import post from '../../../images/court.jpg'
import WhatsHappening from './WhatsHappening'
import { decodeToken } from "react-jwt";
export default class UserHome extends Component {
    render() {
        const decodedToken = decodeToken(localStorage.getItem('token'));
        if (decodedToken.role === "admin") {
            return (
                <div className="admin_home">
                    <div className="home_feed">
                        <div className="home_fHeader">
                            <h3>Home</h3>
                        </div>
                        <div className="home_post">
                            <div className="home_avatar">
                                <img src={avatar} />
                            </div>
                            <div className="home_pbody">
                                <div className="home_pheader">
                                    <div className="home_pheadertext">
                                        <h3>Arvin John Lanuza
                                            <span className="home_headerspecial">
                                                Admin
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="home_headerdescription">
                                        <p>
                                            Go to Admin Building to Vaccine
                                            Schedule: 10am to 5pm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home_post">
                            <div className="home_avatar">
                                <img src={avatar} />
                            </div>
                            <div className="home_pbody">
                                <div className="home_pheader">
                                    <div className="home_pheadertext">
                                        <h3>Arvin John Lanuza
                                            <span className="home_headerspecial">
                                                Admin
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="home_headerdescription">
                                        <p>
                                            Go to Admin Building to Vaccine
                                            Schedule: 10am to 5pm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home_post">
                            <div className="home_avatar">
                                <img src={avatar} />
                            </div>
                            <div className="home_pbody">
                                <div className="home_pheader">
                                    <div className="home_pheadertext">
                                        <h3>Arvin John Lanuza
                                            <span className="home_headerspecial">
                                                Admin
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="home_headerdescription">
                                        <p>
                                            Ready for Reservations to use our Basketball court
                                        </p>
                                    </div>
                                </div>
                                <img src={"https://villboard-main.s3.ap-southeast-1.amazonaws.com/f8dff87c-1a5a-451b-88bf-1661212381b7.jpg"} />
                            </div>
                        </div>
                    </div>
                    <WhatsHappening/>
                </div>
            );
        }
        else if(decodedToken.role === "homeowners"){
            return(
                <div className="admin_home">
                <div className="home_feed">
                    <div className="home_fHeader">
                        <h3>Home</h3>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Go to Admin Building to Vaccine 
                                        Schedule: 10am to 5pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Go to Admin Building to Vaccine 
                                        Schedule: 10am to 5pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Ready for Reservations to use our Basketball court
                                    </p>
                                </div>
                            </div>
                            <img src={post} />
                        </div>
                    </div>
                </div>
                
            </div>
            )
        }
    }

}

