import React, { useEffect, useMemo, useState, Fragment } from 'react'
import './Accounts.css'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import TableHeader from '../Header'
import { decodeToken, useJwt } from "react-jwt";
import AccountReadOnly from './AccountReadOnly';
import AccountPending from './AccountPending';
import AccountEditable from './AccountEditable';
import Pagination from '../PaginationCom';
import Search from '../Search';
const Accounts = () => {
    const [usersList, setUsersList] = useState([]);
    const [editContactId, setEditContactId] = useState(null);
    const [editUserdata, setEditUserData] = useState({
        role: "",
        lastName: "",
        firstName: "",
        middleInitial: "",
        email: "",
        phoneNumber: "",
        address: "",
    })
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
        const fetchPosts = async () => {
            axios.post('postUserinfo', {
                headers: headers
            })
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    setUsersList(res.data);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        };
        fetchPosts();
    }, []);

    const handleEditClick = (event, acc) => {
        event.preventDefault();
        setEditContactId(acc._id)

        const formValues = {
            role: acc.role,
            lastName: acc.lastName,
            firstName: acc.firstName,
            middleInitial: acc.middleInitial,
            email: acc.email,
            phoneNumber: acc.phoneNumber,
            address: acc.address,
        }

        setEditUserData(formValues);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editUserdata };
        newFormData[fieldName] = fieldValue;

        setEditUserData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedUser = {
            id: editContactId,
            role: editUserdata.role,
            lastName: editUserdata.lastName,
            firstName: editUserdata.firstName,
            middleInitial: editUserdata.middleInitial,
            email: editUserdata.email,
            phoneNumber: editUserdata.phoneNumber,
            address: editUserdata.address,
        }

        const newEditUser = [...usersList];
        const index = usersList.findIndex((acc) => acc._id == editContactId);
        newEditUser[index] = editedUser;

        var UpdateFn = {
            email: editUserdata.email,
            newfirstname: editUserdata.firstName
        }
        var UpdateLn = {
            email: editUserdata.email,
            newlastname: editUserdata.lastName
        }
        var UpdateMi = {
            email: editUserdata.email,
            newmiddleinitial: editUserdata.middleInitial
        }
        var UpdateAdd = {
            email: editUserdata.email,
            newaddress: editUserdata.address
        }
        var UpdatePh = {
            email: editUserdata.email,
            newphonenumber: editUserdata.phoneNumber
        }
        axios.post('changeFirstname', UpdateFn).then(res => {
            console.log(res);
            setUsersList(newEditUser);
        }).catch(err => {
            console.log(err);
        })

        axios.post('changeLastname', UpdateLn).then(res => {
            console.log(res);
            setUsersList(newEditUser);
        }).catch(err => {
            console.log(err);
        })

        axios.post('changeMiddleinitial', UpdateMi).then(res => {
            console.log(res);
            setUsersList(newEditUser);
        }).catch(err => {
            console.log(err);
        })

        axios.post('changeAddress', UpdateAdd).then(res => {
            console.log(res);
            setUsersList(newEditUser);
        }).catch(err => {
            console.log(err);
        })

        axios.post('changePhonenumber', UpdatePh).then(res => {
            console.log(res);
            setUsersList(newEditUser);
        }).catch(err => {
            console.log(err);
        })


        setEditContactId(null);

    }

    const handleCancelClick = () => {
        setEditContactId(null);
    }

    const handleDeleteClick = (ContactId, accountemail) => {
        const newUser = [...usersList];

        const index = usersList.findIndex((acc) => acc._id == ContactId);
        var deleteUser = {
            email: accountemail,
        }
        axios.post('deleteDataUser', deleteUser).then(res => {
            console.log(res);
            newUser.splice(index, 1);
            setUsersList(newUser);
        }).catch(err => {
            console.log(err);
        })
    }


    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const item_per_page = 5;

    const headers = [
        { name: "Role", field: "role", sortable: true },
        { name: "Last Name", field: "lastName", sortable: true },
        { name: "First Name", field: "firstName", sortable: true },
        { name: "Middle Initial", field: "middleInitial", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone Number", field: "phoneNumber", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Actions", sortable: false },
    ];

    const accountD = useMemo(() => {
        let account = usersList;
        if (search) {
            account = account.filter(
                acc =>
                    acc.role.toLowerCase().includes(search.toLowerCase()) ||
                    acc.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.middleInitial.toLowerCase().includes(search.toLowerCase()) ||
                    acc.email.toLowerCase().includes(search.toLowerCase()) ||
                    acc.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    acc.address.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(account.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            account = account.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return account.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [usersList, currentPage, search, sorting]);


    const pheaders = [
        { name: "Status", field: "status", sortable: true },
        { name: "Last Name", field: "lastName", sortable: true },
        { name: "First Name", field: "firstName", sortable: true },
        { name: "Middle Initial", field: "middleInitial", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone Number", field: "phoneNumber", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Actions", sortable: false },
    ];

    return <div className='accounts-container'>
        <div class="card-header">
            <h3>Existing Accounts</h3>
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
                    {accountD.reverse().map((acc) => (
                        <Fragment>
                            {editContactId === acc._id ? (
                                <AccountEditable
                                    editUserData={editUserdata}
                                    handleEditUserChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                />
                            ) : (
                                <AccountReadOnly acc={acc}
                                    usersList={usersList}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
            <div className="acc_paginationBtns">
                <Pagination
                    total={totalItems}
                    itemsPerPage={item_per_page}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </form>
        <div class="card-header">
            <h3>Pending Accounts</h3>
        </div>
        <form>

            <Table striped bordered hover responsive className='accounts_table'>
                <TableHeader headers={pheaders} onSorting={(field, order) => setSorting({ field, order })} />
                <tbody>
                    {/*
                    ito yung sa approval nila pero ififilter pa gamit yung status ng account.
                    {accountD.reverse().map((acc) => (
                        <Fragment>
                            <AccountPending acc={acc}
                                usersList={usersList}
                                handleAccept={handleEditClick}
                                handleDisapproved={handleDeleteClick}
                            />
                        </Fragment>
                    ))}*/}
                </tbody>
            </Table>
            
        </form>
    </div>;
};

export default Accounts