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
            axios.post('postUserinfo')
                .then(res => {
                    console.log(res);
                    const pending = res.data.filter((acc) => acc.status === "Pending");
                    setAccountData(pending);
                    if(pending.length === 0){
                        setColorA("green"); 
                    }
                    else if(pending.length !== 0){
                        setColorA("red"); 
                    }
                }).catch(err => {
                    console.log(err);
                })
            axios.post('postReservation')
                .then(res => {
                    const pending = res.data.filter(
                        (acc) => acc.rPending.toLowerCase() === "pending"
                      );
                    setReservationData(pending);
                    if(pending.length === 0){
                        setColorR("green"); 
                    }
                    else if(pending.length !== 0){
                        setColorR("red"); 
                    }
                }).catch(err => {
                    console.log(err);
                })
            axios.post('postPayment')
                .then(res => {
                    const pending = res.data.filter(
                        (acc) => acc.pPending.toLowerCase() === "pending"
                    );
                    setPaymentData(pending);
                    if(pending.length === 0){
                        setColorP("green"); 
                    }
                    else if(pending.length !== 0){
                        setColorP("red"); 
                    }
                }).catch(err => {
                    console.log(err);
                })
            axios.post('postVisitor')
                .then(res => {
                    const ivvisitor = res.data.filter(
                        (acc) => acc.timeOut === "inVillage"
                    );
                    setVisitorData(ivvisitor);
                    if(ivvisitor.length === 0){
                        setColorV("green"); 
                    }
                    else if(ivvisitor.length !== 0){
                        setColorV("red"); 
                    }
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

    const [colorA, setColorA] = useState("green");
    const [colorP, setColorP] = useState("green");
    const [colorR, setColorR] = useState("green");
    const [colorV, setColorV] = useState("green");

    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken)
        return (
            <div className="home_news">
                <div className="home_fHeader">
                    <h3>Pending Transactions</h3>
                </div>
                <div className="admin_gridContainer">
                    <div className="grid-item">
                        <Card className="grid-card"  >
                            <Card.Body style={{ textAlign: 'center' ,backgroundColor: `${colorP}` }}>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/> Payments</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {payment !== null ? payment?.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton" href="/Dashboard/AdminTransaction" >Payments <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card className="grid-card"  style={{ textAlign: 'center' ,backgroundColor: `${colorA}` }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br />Accounts</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of accounts palang ito*/accountNum !== null ? accountNum.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton" href="/Dashboard/Accounts" >Accounts <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card  className="grid-card" style={{ textAlign: 'center' ,backgroundColor: `${colorR}` }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Pending <br/>  Reservations</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {reservation !== null ? reservation.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton" href="/Dashboard/Reservation">Reservations Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="grid-item">
                        <Card  className="grid-card" style={{ textAlign: 'center' ,backgroundColor: `${colorV}` }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} className="grid-cardHeader">Visitors <br /> in village </Card.Title>
                                <Card.Text style={{ textAlign: 'center' }} className="grid-cardNumber">
                                    {/*total number of visitor pa lang*/visitorData !== null ? visitorData.length : <CSpinner/>}
                                </Card.Text>
                                <div className='grid-button'>
                                    <Button variant="primary" className="grid-cardButton" href="/Dashboard/Visitor">Visitors <br /> Dashboard</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
}

export default WhatsHappening
