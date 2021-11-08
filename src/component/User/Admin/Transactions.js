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
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Email Address", field: "uEmail", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: false },
        { name: "Type of Transaction", field: "typeTransaction", sortable: false },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
    ];
    /*useEffect(() => {
        const fetchTrans = async () => {
            showLoader();
            axios.post('postPayment')
                .then(res => {
                    console.log(res);
                    setTransactionData(res.data)
                }).catch(err => {
                    console.log(err);
                })
        }
        fetchTrans();
    }, []);*/
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
            <div>
                <table class="transactions_table">
                    <thead>
                        <th>uLastName</th>
                        <th>uFirstName</th>
                        <th>uAddress</th>
                        <th>uEmail</th>
                        <th>uPhoneNumber</th>
                        <th>refNumber</th>
                        <th>typeTransaction</th>
                        <th>Photo</th>
                        <tbody>
                            <tr>
                                <td>asd1'</td>
                                <td>asd2</td>
                                <td>asd3</td>
                                <td>asd4</td>
                                <td>asd5</td>
                                <td>asd6</td>
                                <td>asd7</td>
                                <td><a onClick={pictureModal} className="visitor_link">Click</a></td>
                                <Modal isOpen={pictureModal}
                                    className="visitor_modalContainer"
                                    shouldCloseOnOverlayClick={false}
                                    onRequestClose={() => setpictureModal(false)}>
                                    <div class='v_modal'>
                                        <h2>Visitors Digital Pass</h2>
                                        <div className="output-box">
                                            <img src={Logo} alt="" />
                                            <h2>You may show your QR Code to the guard to identify your identity and for contact tracing</h2>
                                            <a href={Logo} download="QRCode">
                                                <button type="button">Download</button>
                                                <button type="button" onClick={alert('okay na')}>Ok</button>
                                            </a>
                                        </div>
                                    </div>
                                </Modal>
                            </tr>
                        </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}
export default Transactions
