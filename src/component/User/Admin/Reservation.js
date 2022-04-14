import React, { useState, useEffect, useMemo } from 'react'
import './Reservation.css'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import PaginationCom from './PaginationCom';
import Modal from 'react-modal'
import Table from 'react-bootstrap/Table'
function Reservation() {
    const [reservation, setReservationData] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            axios.post('postReservation')
                .then(res => {
                    console.log(res);
                    setReservationData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPosts();
    }, []);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const item_per_page = 10;
    const pendingWord = "PENDING";
    const approve = "APPROVED"
    const headers = [
        { name: "Status", field: "rPending", sortable: true },
        { name: "First Name", field: "rFirstName", sortable: true },
        { name: "Last Name", field: "rLastName", sortable: true },
        { name: "Phone Number", field: "rPhoneNumber", sortable: true },
        { name: "Venue", field: "venue", sortable: true },
        { name: "Time", field: "reservationTime", sortable: true },
        { name: "Date", field: "reservationDate", sortable: true },
    ];
    const pheaders = [
        { name: "Status", field: "rPending", sortable: true },
        { name: "First Name", field: "rFirstName", sortable: true },
        { name: "Last Name", field: "rLastName", sortable: true },
        { name: "Phone Number", field: "rPhoneNumber", sortable: true },
        { name: "Venue", field: "venue", sortable: true },
        { name: "Time", field: "reservationTime", sortable: true },
        { name: "Date", field: "reservationDate", sortable: true },
        { name: "Actions", field: "", sortable: false },
    ];
    const preserveD = useMemo(() => {
        let reserve = reservation;
        if (pendingWord) {
            reserve = reserve.filter(
                tr =>
                    tr.rPending.toLowerCase().includes(pendingWord.toLowerCase())
            )
        }
        setTotalItems(reserve.length);
        console.log(reserve.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            reserve = reserve.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return reserve.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [reservation, currentPage, search, sorting]);
    const reserveD = useMemo(() => {
        let reserve = reservation;
        if (approve) {
            reserve = reserve.filter(
                acc =>
                    acc.rPending.toLowerCase().includes(approve.toLowerCase())
            )
            if (search) {
                reserve = reserve.filter(
                    acc =>

                        acc.rFirstName.toLowerCase().includes(search.toLowerCase()) ||
                        acc.rLastName.toLowerCase().includes(search.toLowerCase()) ||
                        acc.rPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                        acc.venue.toLowerCase().includes(search.toLowerCase()) ||
                        acc.reservationTime.toLowerCase().includes(search.toLowerCase()) ||
                        acc.reservationDate.toLowerCase().includes(search.toLowerCase())
                )
            }
        }
        setTotalItems(reserve.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            reserve = reserve.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return reserve.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [reservation, currentPage, search, sorting]);
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div className='accounts-container'>
                <div class="card-header">
                    <h3>Pending Reservations</h3>
                </div>
                <form>
                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={pheaders} onSorting={(field, order) => setSorting({ field, order })} />
                        <tbody>
                            {preserveD.map(res => (
                                <tr>
                                    <td>{res.rPending}</td>
                                    <td>{res.rFirstName}</td>
                                    <td>{res.rLastName}</td>
                                    <td>{res.rPhoneNumber}</td>
                                    <td>{res.venue}</td>
                                    <td>{res.reservationTime}</td>
                                    <td>{res.reservationDate}</td>
                                    <td>
            <button type='button' className='genButton' >Accept</button>
            <button type='button' className='genButton' >X</button>
        </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </form>
                <div class="card-header">
                    <h3>Reservation History</h3>
                </div>
                <form>
                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                        <tbody>
                            {reserveD.map(res => (
                                <tr>
                                    <td>{res.rPending}</td>
                                    <td>{res.rFirstName}</td>
                                    <td>{res.rLastName}</td>
                                    <td>{res.rPhoneNumber}</td>
                                    <td>{res.venue}</td>
                                    <td>{res.reservationTime}</td>
                                    <td>{res.reservationDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </form>
            </div>
        )
    }
}

export default Reservation
