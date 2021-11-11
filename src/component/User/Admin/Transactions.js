import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './Transactions.css'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import Search from './Search';
import PaginationCom from './PaginationCom';
import TableHeader from './Header'
import Modal from 'react-modal'
import Logo from '../../../images/background.png'
function Transactions() {
    const [transactionData, setTransactionData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [pictureModal, setpictureModal] = useState(false);
    const item_per_page = 10;
    const headers = [
        { name: "Status", field: "pPending", sortable: true },
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: false },
        { name: "Type of Transaction", field: "typeTransaction", sortable: false },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
    ];
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
        const fetchTrans = async () => {
            axios.post('postPayment', {
                headers: headers,
            })
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    setTransactionData(res.data);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        fetchTrans();
    }, []);
    const transactionDataDisc = useMemo(() => {
        let computedTr = transactionData;
        if (search) {
            computedTr = computedTr.filter(
                tr =>
                    tr.uLastName.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uFirstName.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uAddress.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uEmail.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    tr.refNumber.toLowerCase().includes(search.toLowerCase()) ||
                    tr.typeTransaction.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(computedTr.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedTr = computedTr.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return computedTr.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [transactionData, currentPage, search, sorting]);

    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div class="transactions_main">
                <div class="admin_recent-grid">
                    <div class="transactions_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pending Transactions</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="transactions_table">
                                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                            {transactionDataDisc.map(tr => (
                                                <tr>
                                                    <td>{tr.pPending}</td>
                                                    <td>{tr.uLastName}</td>
                                                    <td>{tr.uFirstName}</td>
                                                    <td>{tr.uAddress}</td>
                                                    <td>{tr.uPhoneNumber}</td>
                                                    <td>{tr.refNumber}</td>
                                                    <td>{tr.typeTransaction}</td>
                                                    <td><a href = {tr.photoUrl}>Click to Download</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="tra_paginationBtns">
                                        <PaginationCom
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
                                <h3>Transactions History</h3>
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="transactions_table">
                                        <thead>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>Address</td>
                                                <td>Email Address</td>
                                                <td>Phone Number</td>
                                                <td>Reference Number</td>
                                                <td>Type of Payment</td>
                                                <td>Image</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto@gmail.com</td>
                                                <td>09959278654</td>
                                                <td>63929213939495</td>
                                                <td>G Cash</td>
                                                <td><a href="">Click</a></td>
                                            </tr>
                                            <tr>
                                                <td>Jasper Ian Escoto</td>
                                                <td>20 A. Luna Street. </td>
                                                <td>jasperianescoto</td>
                                                <td>09959278654</td>
                                                <td>63929213939495</td>
                                                <td>G Cash</td>
                                                <td><a href="">Click</a></td>
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
export default Transactions
