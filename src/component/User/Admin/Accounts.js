import './Accounts.css'
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import { COLUMNS } from './AccountsData'
import ReactPaginate from 'react-paginate'
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import Swal from 'sweetalert2'
import Modal from 'react-modal'
function Accounts() {
    const [usersList, setUsersList] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 10;
    const headers = [
        { name: "", field: "", sortable: false },
        { name: "Role", field: "role", sortable: false },
        { name: "Last Name", field: "lastName", sortable: true },
        { name: "First Name", field: "firstName", sortable: true },
        { name: "Middle Initial", field: "middleInitial", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone Number", field: "phoneNumber", sortable: false },
        { name: "Address", field: "address", sortable: false },
    ];
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
        const fetchPosts = async () => {
            showLoader();
            axios.post('postUserinfo', {
                headers: headers
            })
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    setUsersList(res.data);
                    hideLoader();
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        };
        fetchPosts();
    }, []);
    const accountsData = useMemo(() => {
        let computedAcc = usersList;
        if (search) {
            computedAcc = computedAcc.filter(
                acc =>
                    acc.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.role.toLowerCase().includes(search.toLowerCase()) ||
                    acc.middleInitial.toLowerCase().includes(search.toLowerCase()) ||
                    acc.email.toLowerCase().includes(search.toLowerCase()) ||
                    acc.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    acc.address.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(computedAcc.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedAcc = computedAcc.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return computedAcc.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [usersList, currentPage, search, sorting]);

    function sample() {
        Swal.fire({
            title: 'Do you want to delete that account?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Deleted', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div class="accounts_main">
                <div class="admin_recent-grid">
                    <div class="accounts_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Existing Accounts</h3>
                            </div>
                            <div className="acc_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="account_table">
                                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                            {accountsData.map(acc => (
                                                <tr>
                                                    <td>
                                                        <div className="acc_btns">
                                                            <a onClick={() => set_editModal(true)}><i class="las la-edit"></i></a>
                                                            <Modal isOpen={editModal}
                                                                className="p_addmodalContainer"
                                                                shouldCloseOnOverlayClick={false}
                                                                onRequestClose={() => set_editModal(false)}>
                                                                <a class="p_addbutton" onClick={() => set_editModal(false)}>X</a>
                                                                <div class='p_addmodal'>
                                                                    <div class="c_wrapper">
                                                                        <div className="c_logo"></div>
                                                                        <div class="title">
                                                                            Edit Profile
                                                                        </div>
                                                                        <div class="ownInfo">
                                                                        </div>
                                                                        <form className="form">
                                                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>

                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>First Name</label>
                                                                                <input type="text" className="form-control" defaultValue={acc.firstName}
                                                                                    name="firstName" />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>

                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>Middle Initial</label>
                                                                                <input type="text" className="form-control" defaultValue={acc.middleInitial}
                                                                                    name="middleInitial" />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>

                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>Last Name</label>
                                                                                <input type="text" className="form-control" defaultValue={acc.lastName}
                                                                                    name="lastName" />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>

                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>Address</label>
                                                                                <input type="text" className="form-control" defaultValue={acc.address}
                                                                                    name="Relationship" />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>

                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>Phone Number</label>
                                                                                <input type="text" className="form-control" defaultValue={acc.phoneNumber}
                                                                                    name="address" />
                                                                            </div>
                                                                            <div class="inputfield">
                                                                                <label>Email Address</label>
                                                                                <input type="email" className="form-control" defaultValue={acc.email}
                                                                                    name="email" />
                                                                            </div>

                                                                        </form>
                                                                        <div class="inputfield">
                                                                            <input type="submit" value="Submit" class="btn" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                            <a onClick={sample}><i class="las la-times"></i></a>
                                                        </div>
                                                    </td>
                                                    <td>{acc.role}</td>
                                                    <td>{acc.lastName}</td>
                                                    <td>{acc.firstName}</td>
                                                    <td>{acc.middleInitial}</td>
                                                    <td>{acc.email}</td>
                                                    <td>{acc.phoneNumber}</td>
                                                    <td>{acc.address}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="acc_paginationBtns">
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
                    </div>
                </div>
                <div className="acc_loader">
                    {loader}
                </div>
            </div>
        );
    }
}


export default Accounts
