import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { decodeToken } from "react-jwt";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { CSpinner } from '@coreui/react'

function WhatsHappening() {
    const [accountNum, setAccountData] = useState(null);
    const [visitorData, setVisitorData] = useState(null);
    const [reservation, setReservationData] = useState(null);
    const [payment, setPaymentData] = useState(null);
    // const pendingWord = "PENDING";
    // const [currentPage, setCurrentPage] = useState(1);
    // const item_per_page = 10;
    useEffect(() => {
        const cleanup = () => {
            axios.get('getPendingAccounts')
                .then(res => {
                    console.log(res);
                    setAccountData(res.data)
                }).catch(err => {
                    console.log(err);
                })
            axios.get('getPendingReservations')
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
                    setVisitorData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        }

        cleanup()
    }, [])
    // const totalPendingReserve = useMemo(() => {
    //     let reserve = reservation;
    //     if (pendingWord) {
    //         reserve = reserve?.filter(
    //             tr =>
    //                 tr.rPending.toLowerCase().includes(pendingWord.toLowerCase())
    //         )
    //     }
    //     return reserve
    // }, [reservation]);
    // const totalPendingPayment = useMemo(() => {
    //     let pay = payment;
    //     if (pendingWord) {
    //         pay = pay.filter(
    //             tr =>
    //                 tr.pPending.toLowerCase().includes(pendingWord.toLowerCase())
    //         )
    //     }
    //     return pay
    // }, [payment]);


    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken)
        return (
            <div className="home_news">
                <div className="home_fHeader">
                    <h3>Pendings</h3>
                </div>
                <div className="admin_gridContainer">
                    <div className="grid-item">
                        <Card className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/> Transactions</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {payment !== null ? payment?.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Transactions Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card  className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br />Accounts</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of accounts palang ito*/accountNum !== null ? accountNum.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Accounts <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card  className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/>  Reservations</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {reservation !== null ? reservation.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton">Reservations Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card  className="grid-card">
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br /> Visitors</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of visitor pa lang*/visitorData !== null ? visitorData.length : <CSpinner/>}
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
