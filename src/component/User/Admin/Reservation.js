import React,{useState, useEffect, useMemo} from 'react'
import './Reservation.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
function Reservation() {
    const [reservation, setReservationData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const item_per_page = 10;
    const headers = [
        { name: "Status", field: "rPending", sortable: true },
        { name: "First Name", field: "rFirstName", sortable: true },
        { name: "Last Name", field: "rLastName", sortable: true },
        { name: "Phone Number", field: "rPhoneNumber", sortable: true },
        { name: "Venue", field: "venue", sortable: true },
        { name: "Time", field: "reservationTime", sortable: true },
        { name: "Date", field: "reservationDate", sortable: true },
    ];
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
    const reserveD = useMemo(() => {
        let reserve = reservation;
        if (search) {
            reserve = reserve.filter(
                acc =>
                    acc.rPending.toLowerCase().includes(search.toLowerCase()) ||
                    acc.rFirstName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.rLastName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.rPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    acc.venue.toLowerCase().includes(search.toLowerCase()) ||
                    acc.reservationTime.toLowerCase().includes(search.toLowerCase()) ||
                    acc.reservationDate.toLowerCase().includes(search.toLowerCase())
            )
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
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="reserve_main">
                <div class="admin_recent-grid">
                    <div class="admin_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pending</h3>
                            </div>
                            <div className="vis_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="reserve_table">
                                    <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                            {reserveD.reverse().map(res => (
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
                                    </table>
                                    <div className="vis_paginationBtns">
                                        <Pagination
                                            total={totalItems}
                                            itemsPerPage={item_per_page}
                                            currentPage={currentPage}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Swimming Pool</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
    
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Gym</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
    
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
    
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Clubhouse</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="reserve_table">
                                        <thead>
    
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Date</td>
                                                <td>Time Started</td>
                                                <td>Time Ended</td>
                                                <td>Phone Number</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
    
                                                <td>Jasper Ian Escoto</td>
                                                <td>9/21/2021</td>
                                                <td>10am</td>
                                                <td>5pm</td>
                                                <td>09957549278</td>
                                                <td>Reserved</td>
                                            </tr>
                                            <tr>
                                                <td>Jamewell Gonato</td>
                                                <td>9/29/2021</td>
                                                <td>10am</td>
                                                <td>6pm</td>
                                                <td>09292136357</td>
                                                <td>Reserved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reservation
