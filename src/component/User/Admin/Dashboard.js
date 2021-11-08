import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import avatar from '../../../images/sample.jpg'
import avatar1 from '../../../images/Avatar.jpg'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'

function Dashboard() {
    const decodedToken = decodeToken(localStorage.getItem('token'));

    const [visitorData, setVisitorData] = useState([])
    useEffect(() => {
        axios.post('postVisitor')
            .then(res => {
                console.log(res);
                setVisitorData(res.data)
            }).catch(err => {
                console.log(err);
            })

    }, []);
    const visitors = visitorData.map((obj) => {
        return <tr>
            <td>{obj.fullName}</td>
            <td>{obj.emailV}</td>
            <td>{obj.address}</td>
            <td>{obj.personVisit}</td>
            <td>{obj.homeOwnerAddress}</td>
            <td>{obj.purpose}</td>
        </tr>
    })

    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }

    else {
        const Chart = () => {
            return (
                <div>
                    <Bar
                        data={{
                            labels: ['Total People','Homeowners', 'Senior Citizens', 'Children', 'Admins', 'Security Guards'],
                            datasets: [
                                {
                                    label: 'Population of Villa Caseres',
                                    data: [500,76, 24, 250, 25, 15],
                                    backgroundColor: ['rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)'],
                                }
                            ]
                        }}
                        height={300}
                        width={500}
                        options={{
                            maintainAspectRatio:false,
                            scales:{
                                yAxes: [
                                    {
                                        ticks:{
                                            beginAtZero: true,
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                </div>
            )
        }
        return (
            <div class="user_main">
                <h1>Data</h1>
                <div class="admin_cards">
                    <div class="card-single">
                    <div>
                            <h1>10</h1>
                            <span>Accounts</span>
                        </div>
                    </div>
                    <div class="card-single">
                        <div>
                            <h1>10</h1>
                            <span>Accounts</span>
                        </div>
                        <div>
                            <span class="las la-user"></span>
                        </div>
                    </div>
                    <div class="card-single">
                        <div>
                            <h1>1</h1>
                            <span>Vehicles</span>
                        </div>
                        <div>
                            <span class="las la-car"></span>
                        </div>
                    </div>
                    <div class="card-single">
                        <div>
                            <h1>2</h1>
                            <span>Pets</span>
                        </div>
                        <div>
                            <span class="las la-dog"></span>
                        </div>
                    </div>
                    <div class="card-single">
                        <div>
                            <h1>3</h1>
                            <span>Transactions</span>
                        </div>
                        <div>
                            <span class="las la-receipt"></span>
                        </div>
                    </div>
                    <div class="card-single">
                        <div>
                            <h1>5</h1>
                            <span>Posts</span>
                        </div>
                        <div>
                            <span class="las la-bullhorn"></span>
                        </div>
                    </div>
                </div>
                <div class="admin_recent-grid">
                    <div class="admin_accounts">
                        <div class="admin_card">
                            <div class="card-header">
                                <h4>Existing Accounts</h4>
                                <Link to="/Admin-Accounts"><button>See All <span class="las la-arrow-right"></span></button></Link>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="accounts_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Email</td>
                                                <td>Role</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Jasper Ian Escoto</td>
                                                <td>jasperianescoto@gmail.com</td>
                                                <td>Home Owner</td>
                                            </tr>
                                            <tr>
                                                <td>Arvin John Lanuza</td>
                                                <td>vin.lanuza2@gmail.com</td>
                                                <td>Admin</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>jamewellgonato@gmail.com</td>
                                                <td>Home Owner</td>
                                            </tr>
                                            <tr>
                                                <td>Patrick Navarrete</td>
                                                <td>PatrickNavarrete@gmail.com</td>
                                                <td>Admin</td>
                                            </tr>
                                            <tr>
                                                <td>Vincent Caberte</td>
                                                <td>VincentCaberte@gmail.com</td>
                                                <td>Home Owner</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="admin_UT">
                        <div class="admin_card">
                            <div class="card-header">
                                <h4>Transactions</h4>
                                <Link to="/Admin-Transactions"><button>See All <span class="las la-arrow-right"></span></button></Link>
                            </div>
                            <div class="card-body">
                                <div class="account_transaction">
                                    <div class="account_info">
                                        <img src={avatar1} width="40px" height="40px"></img>
                                        <div>
                                            <h4>Jasper Ian Escoto</h4>
                                            <small>Home Owner</small>
                                        </div>
                                    </div>
                                    <div class="account_contact">
                                        <span class="las la-user-circle"></span>
                                        <span class="las la-comment"></span>
                                    </div>
                                </div>
                                <div class="account_transaction">
                                    <div class="account_info">
                                        <img src={avatar} width="40px" height="40px"></img>
                                        <div>
                                            <h4>Jamewell Gonato</h4>
                                            <small>Home Owner</small>
                                        </div>
                                    </div>
                                    <div class="account_contact">
                                        <span class="las la-user-circle"></span>
                                        <span class="las la-comment"></span>
                                    </div>
                                </div>
                                <div class="account_transaction">
                                    <div class="account_info">
                                        <img src={avatar} width="40px" height="40px"></img>
                                        <div>
                                            <h4>Vincent Caberte</h4>
                                            <small>Home Owner</small>
                                        </div>
                                    </div>
                                    <div class="account_contact">
                                        <span class="las la-user-circle"></span>
                                        <span class="las la-comment"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Visitors</h1>
                    <table className="table table-white">
                        <thead>
                            <tr>
                                <th>Full Name: </th>
                                <th>Email:</th>
                                <th>Address:</th>
                                <th>Person to visit:</th>
                                <th>Homeowner's Address:</th>
                                <th>Purpose:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitors}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard
