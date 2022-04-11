import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { decodeToken } from "react-jwt";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
function WhatsHappening() {
    //const [accountNum, setAccountData] = useState();
    const [suggestionNum, setSuggestionNum] = useState();
    useEffect(() => {
        /*axios.post('postUserinfo')
            .then(res => {
                console.log(res);
                setAccountData(res.data.length)
            }).catch(err => {
                console.log(err);
            })*/
        axios.post('postSuggestion')
            .then(res => {
                console.log(res);
                setSuggestionNum(res.data.length)
            }).catch(err => {
                console.log(err);
            })
    }, [])
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken)
        return (
            <div className="home_news">
                <div className="home_fHeader">
                    <h3>Summary of Data</h3>
                </div>
                <div class="admin_gridContainer">
                    <div class="grid-item">
                        <Card style={{ width: '15rem', height: '15rem' }} className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending Transactions</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    6
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Transactions Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="grid-item">
                        <Card style={{ width: '15rem', height: '15rem' }} className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/>Accounts</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    2
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Accounts <br/> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="grid-item">
                        <Card style={{ width: '15rem', height: '15rem' }} className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending Reservations</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    2
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Reservations Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="grid-item">
                        <Card style={{ width: '15rem', height: '15rem' }} className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/> Visitors</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    2
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Visitors <br/> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
}

export default WhatsHappening
