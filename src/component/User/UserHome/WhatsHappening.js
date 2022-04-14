import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { decodeToken } from "react-jwt";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
function WhatsHappening() {
    const [accountNum, setAccountData] = useState();
    const [visitorData, setVisitorData] = useState();
    const [reservation, setReservationData] = useState([]);
    const[payment, setPaymentData] = useState([]);
    const pendingWord = "PENDING";
    const [currentPage, setCurrentPage] = useState(1);
    const item_per_page = 10;
    useEffect(() => {
        axios.post('postUserinfo')
            .then(res => {
                console.log(res);
                setAccountData(res.data.length)
            }).catch(err => {
                console.log(err);
            })
        axios.post('postReservation')
            .then(res => {

                setReservationData(res.data);
            }).catch(err => {
                console.log(err);
            })
            axios.post('postPayment')
            .then(res => {

                setPaymentData(res.data);
            }).catch(err => {
                console.log(err);
            })
            axios.post('postVisitor')
                .then(res => {
                    setVisitorData(res.data.length);
                }).catch(err => {
                    console.log(err);
                })
    }, [])
    const totalPendingReserve = useMemo(() => {
        let reserve = reservation;
        if (pendingWord) {
            reserve = reserve.filter(
                tr =>
                    tr.rPending.toLowerCase().includes(pendingWord.toLowerCase())
            )
        }
        return reserve
    }, [reservation]);
    const totalPendingPayment = useMemo(() => {
        let pay = payment;
        if (pendingWord) {
            pay = pay.filter(
                tr =>
                    tr.pPending.toLowerCase().includes(pendingWord.toLowerCase())
            )
        }
        return pay
    }, [payment]);


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
                                    {totalPendingPayment.length}
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
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br />Accounts</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of accounts palang ito*/accountNum}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Accounts <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="grid-item">
                        <Card style={{ width: '15rem', height: '15rem' }} className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending Reservations</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {totalPendingReserve.length}
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
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br /> Visitors</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of visitor pa lang*/visitorData}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Visitors <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
}

export default WhatsHappening
