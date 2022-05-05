import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './Transactions.css'
import { decodeToken } from "react-jwt";
import { Redirect } from 'react-router-dom';
// import useFullPageLoader from "../../../../reducers/useFullPageLoader";
import Search from '../Search';
import PaginationCom from '../PaginationCom';
import TableHeader from '../Header'
// import Modal from 'react-modal'
import Table from 'react-bootstrap/Table'
import TransactionPending from './TransactionPending';

function Transactions() {
    const [transactionData, setTransactionData] = useState([]);
    const [pendingTrans, setPendingTrans] = useState([])
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
        const fetchTrans = async () => {
            axios.post('http://localhost:5000/postPayment', {
                headers: headers,
            })
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    const notpending = res.data.filter(
                        (acc) => acc.pPending.toLowerCase() !== "pending"
                    );
                    setTransactionData(notpending);
                    const pending = res.data.filter(
                        (acc) => acc.pPending.toLowerCase() === "pending"
                    );
                    setPendingTrans(pending);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        fetchTrans();
    }, []);

    // const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1)
    const [search, setSearch] = useState("");
    const [searchP, setSearchP] = useState("")
    // const pendingWord = "PENDING";
    // const approve = "APPROVED"
    const [sorting, setSorting] = useState({ field: "", order: "" });
    // const [pictureModal, setpictureModal] = useState(false);
    const item_per_page = 10;
    const pheaders = [
        { name: "Status", field: "pPending", sortable: true },
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: false },
        { name: "Type of Transaction", field: "typeTransaction", sortable: false },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
        { name: "Actions", field: "", sortable: false },
    ];
    const headers = [
        { name: "Status", field: "pPending", sortable: true },
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: false },
        { name: "Type of Transaction", field: "typeTransaction", sortable: true },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
    ];
    const transactionDataDisc = useMemo(() => {
        let computedTr = transactionData;
        // if (approve) {
        //     computedTr = computedTr.filter(
        //         tr =>
        //             tr.pPending.toLowerCase().includes(approve.toLowerCase())
        //     )
        //}
        if (search) {
            computedTr = computedTr.filter(
                tr =>
                    tr.uLastName.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uFirstName.toLowerCase().includes(search.toLowerCase()) ||
                    tr.uAddress.toLowerCase().includes(search.toLowerCase()) ||
                    // tr.uEmail.toLowerCase().includes(search.toLowerCase()) ||
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

    const pendingTransaction = useMemo(() => {
        let computedTr = pendingTrans;
        // if (pendingWord) {
        //     computedTr = computedTr.filter(
        //         tr =>
        //             tr.pPending.toLowerCase().includes(pendingWord.toLowerCase())
        //     )
        // }

        if (searchP) {
            computedTr = computedTr.filter(
                tr =>
                    tr.uLastName.toLowerCase().includes(searchP.toLowerCase()) ||
                    tr.uFirstName.toLowerCase().includes(searchP.toLowerCase()) ||
                    tr.uAddress.toLowerCase().includes(searchP.toLowerCase()) ||
                    // tr.user_payment.email.toLowerCase().includes(searchP.toLowerCase()) ||
                    tr.uPhoneNumber.toLowerCase().includes(searchP.toLowerCase()) ||
                    tr.refNumber.toLowerCase().includes(searchP.toLowerCase()) ||
                    tr.typeTransaction.toLowerCase().includes(searchP.toLowerCase())
            )
        }
        setTotalItems(computedTr.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedTr = computedTr.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return computedTr.slice(
            (currentPagePending - 1) * item_per_page,
            (currentPagePending - 1) * item_per_page + item_per_page
        );
    }, [pendingTrans, currentPagePending, searchP, sorting]);

    const handleAcceptDecline = (res, header, reason) => {
        // event.preventDefault();
        const transPending = [...pendingTrans]; //pedning
    
        const index = pendingTrans.findIndex((ac) => ac._id === res._id);
        var verdict = "declined";
    
        if (header === "Confirm Accept") verdict = "approved";
        else verdict = "declined";
    
        axios
          .post("http://localhost:5000/approveDeclineTransaction", {
            transItem: res,
            verdict,
            reason: ""
          })
          .then((res) => {
            transPending.splice(index, 1);
            setPendingTrans(transPending);
            console.log(res.data);
            //   if (verdict === 'approved') {
            const transL = [...transactionData, res.data]; // existing
            setTransactionData(transL);
            //   }
          })
          .catch((err) => console.log(err));
      };


    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div className='accounts-container'>
                <div className="card-header">
                    <h3>Pending Transactions</h3>
                </div>
                <div className="vis_inputs">
                    <Search onSearch={(val) => {
                        setSearchP(val);
                        setCurrentPagePending(1);
                    }} />
                </div>
                <form>
                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={pheaders} onSorting={(field, order) => setSorting({ field, order })} />
                        <tbody>
                            {pendingTransaction.map(tr => (
                                <TransactionPending key={tr._id} tr={tr} handleAcceptDecline={handleAcceptDecline}/>
                            ))}
                        </tbody>
                    </Table>
                    <div className="acc_paginationBtns">
                        <PaginationCom
                            total={totalItems}
                            itemsPerPage={item_per_page}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </form>
                <div className="card-header">
                    <h3>Transactions History</h3>
                </div>
                <div className="vis_inputs">
                    <Search onSearch={(val) => {
                        setSearch(val);
                        setCurrentPage(1);
                    }} />
                </div>
                <form>

                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                        <tbody>
                            {transactionDataDisc.map(tr => (
                                <tr key={tr._id}>
                                    <td>{tr.pPending.toUpperCase()}</td>
                                    <td>{tr.uLastName}</td>
                                    <td>{tr.uFirstName}</td>
                                    <td>{tr.uAddress}</td>
                                    <td>{tr.uPhoneNumber}</td>
                                    <td>{tr.refNumber}</td>
                                    <td>{tr.typeTransaction}</td>
                                    <td><a href={tr.photoUrl}>Click to Download</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </form>
            </div>
        );
    }

}
export default Transactions
