import React, { useState, useEffect, useMemo, Fragment } from "react";
import './Visitor.css'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import Table from "react-bootstrap/Table";
import VisitorHistory from './VisitorHistory'
import ReactExport from 'react-data-export'
import moment from 'moment'
import {Helmet} from "react-helmet";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Visitor() {


    const [visitorData, setVisitorData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 10;
    const [pendingVisitor, setPendingVisitor] = useState([]);
    const [totalItemsPending, setTotalItemsPending] = useState(0);
    const [currentPagePending, setCurrentPagePending] = useState(1);
    const [searchP, setSearchP] = useState("");
    const [sortingPending, setSortingPending] = useState({
        field: "",
        order: "",
    });
    const headers = [
        { name: "Full Name", field: "fullName", sortable: true },
        { name: "Email", field: "emailV", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Person to Visit", field: "personVisit", sortable: true },
        { name: "Homeowner's Contact Number", field: "contactHomeOwner", sortable: true },
        { name: "Homeowner's Email", field: "emailHomeOwner", sortable: true },
        { name: "Homeowner's Address", field: "homeOwnerAddress", sortable: true },
        { name: "Purpose", field: "purpose", sortable: true },
        { name: "Timestamp", field: "Timestamp", sortable: false },
        { name: "Reference Number", field: "ReferenceNumber", sortable: true },
    ];
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const Dataset = [{
        columns: [
            { title: "Full Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Person to Visit", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Homeowner's Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Purpose", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: visitorData.map((data) => [
            { value: data.fullName, style: { font: { sz: "14" } } },
            { value: data.emailV, style: { font: { sz: "14" } } },
            { value: data.address, style: { font: { sz: "14" } } },
            { value: data.personVisit, style: { font: { sz: "14" } } },
            { value: data.homeOwnerAddress, style: { font: { sz: "14" } } },
            { value: data.purpose, style: { font: { sz: "14" } } },
            { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
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
              (acc) =>
                acc.fullName.toLowerCase().includes(search.toLowerCase()) ||
                acc.emailV.toLowerCase().includes(search.toLowerCase()) ||
                acc.address.toLowerCase().includes(search.toLowerCase()) ||
                acc.personVisit.toLowerCase().includes(search.toLowerCase()) ||
                acc.contactHomeOwner.toLowerCase().includes(search.toLowerCase()) ||
                acc.emailHomeOwner.toLowerCase().includes(search.toLowerCase()) ||
                acc.homeOwnerAddress.toLowerCase().includes(search.toLowerCase()) ||
                acc.purpose.toLowerCase().includes(search.toLowerCase())
            );
          }
        setTotalItems(visitor.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            visitor = visitor.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
              );
        }
        return visitor.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        ).reverse();
    }, [visitorData, currentPage, search, sorting]);


    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div className="accounts-container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Visitor | Villboard</title>
            </Helmet>
                <div className="card-header">
                    <h3>Visitor History</h3>
                </div>

                <form>
                    <div className="vis_inputs">
                        <Search
                            onSearch={(val) => {
                                setSearch(val);
                                setCurrentPage(1);
                            }}
                        />
                        {visitorData.length !== 0 ? (
                            <ExcelFile
                                filename={"Visitor(" + date + ")"}
                                element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                <ExcelSheet dataSet={Dataset} name="Homeowner Visitors" />
                            </ExcelFile>
                        ) : null}
                    </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {visitorD.map((res) => (
                                <Fragment key={res?._id}>
                                    <VisitorHistory key={res._id} res={res} />
                                </Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <div className="acc_paginationBtns">
                        <Pagination
                            total={totalItems}
                            itemsPerPage={item_per_page}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Visitor
