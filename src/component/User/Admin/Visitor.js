import React, { useEffect, useMemo, useState } from 'react'
import './Visitor.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
function Visitor() {

    const [visitorData, setVisitorData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 10;
    
    const headers = [
        { name: "Full Name", field: "fullName", sortable: true },
        { name: "Email", field: "emailV", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Person to Visit", field: "personVisit", sortable: true },
        { name: "Homeowner's Address", field: "homeOwnerAddress", sortable: false },
        { name: "Purpose", field: "purpose", sortable: false },
    ];
    useEffect(() => {
        const fetchPosts = async () => {
            showLoader();
            axios.post('postVisitor')
                .then(res => {
                    hideLoader();
                    console.log(res);
                    setVisitorData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPosts();
    }, []);
    const visitorD = useMemo(() => {
        let visitor = visitorData;
        if (search) {
            visitor = visitor.filter(
                acc =>
                    acc.fullName.toLowerCase().includes(search.toLowerCase()) ||
                    acc.emailV.toLowerCase().includes(search.toLowerCase()) ||
                    acc.address.toLowerCase().includes(search.toLowerCase()) ||
                    acc.personVisit.toLowerCase().includes(search.toLowerCase()) ||
                    acc.homeOwnerAddress.toLowerCase().includes(search.toLowerCase()) ||
                    acc.purpose.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(visitor.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            visitor = visitor.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return visitor.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [visitorData, currentPage, search, sorting]);
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="vis_main">
                <div class="admin_recent-grid">
                    <div class="vis_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Visitor Table</h3>
                            </div>
                            <div className="vis_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="vis_table">
                                    <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                            {visitorD.reverse().map(visit => (
                                                <tr>
                                                <td>{visit.fullName}</td>
                                                <td>{visit.emailV}</td>
                                                <td>{visit.address}</td>
                                                <td>{visit.personVisit}</td>
                                                <td>{visit.homeOwnerAddress}</td>
                                                <td>{visit.purpose}</td>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Visitor
