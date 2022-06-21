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
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import VisitorInVillage from "./VisitorInVillage";

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

    const headers = [
        { name: "Reference Number", field: "createdAt", sortable: true },
        { name: "Time In", field: "createdAt", sortable: true },
        { name: "Time Out", field: "updatedAt", sortable: true },
        { name: "Full Name", field: "fullName", sortable: true },
        { name: "Email", field: "emailV", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Homeowner's Name", field: "personVisit", sortable: true },
        { name: "Homeowner's \n Contact Number", field: "contactHomeOwner", sortable: true },
        { name: "Homeowner's \n Telephone", field: "telHomeOwner", sortable: true },
        { name: "Homeowner's Address", field: "homeOwnerAddress", sortable: true },
        { name: "Purpose", field: "purpose", sortable: true },
    ];
    const IVheaders = [
        { name: "Reference Number", field: "createdAt", sortable: true },
        { name: "Full Name", field: "fullName", sortable: true },
        { name: "Email", field: "emailV", sortable: true },
        { name: "Address", field: "address", sortable: true },
        { name: "Homeowner's Name", field: "personVisit", sortable: true },
        { name: "Homeowner's \n Contact Number", field: "contactHomeOwner", sortable: true },
        { name: "Homeowner's \n Telephone", field: "telHomeOwner", sortable: true },
        { name: "Homeowner's Address", field: "homeOwnerAddress", sortable: true },
        { name: "Purpose", field: "purpose", sortable: true },
        { name: "Time In", field: "createdAt", sortable: true },
        { name: "Time Out", field: "", sortable: false },
    ];
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    const [InVillageVisitor, setInVillageVisitor] = useState([]);
    const [totalItemsIV, setTotalItemsIV] = useState(0);
    const [currentPageIV, setCurrentPageIV] = useState(1);
    const [searchIV, setSearchIV] = useState("");
    const [sortingIV, setSortingIV] = useState({
        field: "",
        order: "",
    });

    useEffect(() => {
        const fetchPosts = async () => {
            showLoader();
            axios.post('postVisitor')
                .then(res => {
                    hideLoader();
                    console.log(res);
                    // const outvillage = res.data.reverse().filter(
                    //     (acc) => acc.timeOut === "outVillage"
                    // );
                    setVisitorData(res.data.reverse());
                    // const invillage = res.data.reverse().filter(
                    //     (acc) => acc.timeOut !== "outVillage"
                    // );
                    // setInVillageVisitor(invillage);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPosts();
        chart();
    }, []);


    // const timeOutBtn = (res,event) => {
    //     event.preventDefault();
    //     const invillageIV = [...InVillageVisitor]; //pedning

    //     const index = InVillageVisitor.findIndex((ac) => ac._id === res._id);
    //     const data ={
    //         referenceNumber: res.referenceNumber
    //     }
    //     axios
    //         .post("changeTimeOut", data)
    //         .then((res) => {
    //             console.log(invillageIV);
    //             invillageIV.splice(index, 1);
    //             setInVillageVisitor(invillageIV);
    //             console.log(res.data);
    //             //   if (verdict === 'approved') {
    //             const visiIV = [...visitorData, res.data]; // existing
    //             setVisitorData(visiIV);
    //             //   }
    //         })
    //         .catch((err) => console.log(err));
    // };



    const [categoryIV, setCategoryIV] = useState("Reference Number");
    const [startDateIV, setStartDateIV] = useState(null);
    const [endDateIV, setendDateIV] = useState(null);
    function InvillageC(e) {
        setCategoryIV(e.target.value);
        setStartDateIV(null);
        setendDateIV(null)
    }

    const visitorIV = useMemo(() => {
        let visitor = InVillageVisitor;

        if (categoryIV == "Reference Number") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.referenceNumber.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Full Name") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.fullName.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Email") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.emailV.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Address") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.address.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Homeowner's Name") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.personVisit.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Homeowner's Contact Number") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.contactHomeOwner.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Homeowner's Address") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.contactHomeOwner.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Purpose") {
            if (searchIV) {
                visitor = visitor.filter((acc) => acc.purpose.toLowerCase().includes(searchIV.toLowerCase()))
            }
        }
        else if (categoryIV == "Time in") {
            if (startDateIV) {
                visitor = visitor.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateIV));
            }
            if (endDateIV) {
                visitor = visitor.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateIV), 'day'));
            }
        }
        setTotalItemsIV(visitor.length);
        if (sortingIV.field) {

            const reversed = sortingIV.order === "asc" ? 1 : -1;
            visitor = visitor.sort(
                (a, b) => reversed * a[sortingIV.field].localeCompare(b[sortingIV.field])
            );
        }
        return visitor.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [InVillageVisitor, currentPageIV, searchIV, startDateIV, endDateIV, sortingIV]);


    const [category, setCategory] = useState("Reference Number");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    function petC(e) {
        setCategory(e.target.value);
        setStartDate(null);
        setendDate(null)
    }

    const visitorD = useMemo(() => {
        let visitor = visitorData;

        if (category == "Reference Number") {
            if (search) {
                visitor = visitor.filter((acc) => acc.referenceNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Full Name") {
            if (search) {
                visitor = visitor.filter((acc) => acc.fullName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Email") {
            if (search) {
                visitor = visitor.filter((acc) => acc.emailV.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Address") {
            if (search) {
                visitor = visitor.filter((acc) => acc.address.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Homeowner's Name") {
            if (search) {
                visitor = visitor.filter((acc) => acc.personVisit.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Homeowner's Contact Number") {
            if (search) {
                visitor = visitor.filter((acc) => acc.contactHomeOwner.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Homeowner's Telephone Number") {
            if (search) {
                visitor = visitor.filter((acc) => acc.telHomeOwner.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Homeowner's Address") {
            if (search) {
                visitor = visitor.filter((acc) => acc.contactHomeOwner.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Purpose") {
            if (search) {
                visitor = visitor.filter((acc) => acc.purpose.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Time In") {
            if (startDate) {
                visitor = visitor.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                visitor = visitor.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        else if (category == "Time Out") {
            if (startDate) {
                visitor = visitor.filter((acc) => moment(acc.updatedAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                visitor = visitor.filter((acc) => moment(acc.updatedAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        setTotalItems(visitor.length);
        if (sorting.field) {

            const reversed = sorting.order === "asc" ? 1 : -1;
            visitor = visitor.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return visitor.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [visitorData, currentPage, search, startDate, endDate, sorting]);


    const [chartData, setChartData] = useState({});

    const chart = () => {
        let approveData = [];
        const myArray = [{
            date: "2022-02-01",

            total: 0
        }, {
            date: "2022-03-01",

            total: 0
        }, {
            date: "2022-04-01",

            total: 0
        }, {
            date: "2022-05-01",

            total: 0
        }, {
            date: "2022-6-01",

            total: 0
        }]

        axios
            .post("postVisitor")
            .then(res => {
                for (const dataObj of res.data) {
                    if (moment(dataObj.createdAt).isSameOrAfter("2022-02-01", 'month')) {
                        //if(moment(myArray[dataObj]).format('MMMM-YYYY') === moment(dataObj.createdAt).format('MMMM-YYYY')){
                        const index = myArray.findIndex(acc => moment(acc.date).format("MMMM-YYYY") === moment(dataObj.createdAt).format("MMMM-YYYY"));
                        myArray[index].total += 1;
                        //const index = myArray.findIndex(acc => acc.id === employee.id);
                        //approveData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
                    }
                }
                setChartData(
                    {
                        labels: myArray.map((x) => moment(x.date).format('MMMM-YYYY')),
                        datasets: [
                            {
                                label: 'Total number of Visitor',
                                backgroundColor: 'green',
                                data: myArray.map((x) => x.total),
                            },
                        ],
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const changeTimeO = (event, res) => {
        event.preventDefault();
        const data = {
            referenceNumber: res.referenceNumber,
            fullName: res.fullName,
            emailV: res.emailV,
            address: res.address,
            personVisit: res.personVisit,
            contactHomeOwner: res.contactHomeOwner,
            telHomeOwner: res.telHomeOwner,
            emailHomeOwner: res.emailHomeOwner,
            homeOwnerAddress: res.homeOwnerAddress,
            purpose: res.purpose,
            timeOut: res.timeOut,
        };
        const ref = {
            referenceNumber: res.referenceNumber,
        };
        const newEditUser = [...visitorData];
        const index = visitorData.findIndex((acc) => acc._id === res._id);
        newEditUser[index] = data;
        axios
            .post("changeTimeOut", data)
            .then((res) => {
                console.log(res.data);
                //   if (verdict === 'approved') {
                setVisitorData(newEditUser);
                //   }
            })
            .catch((err) => console.log(err));
    };

    const handleEditFormSubmit = (res, event) => {
        event.preventDefault();
        const editedUser = {
            referenceNumber: res.referenceNumber,
            fullName: res.fullName,
            emailV: res.emailV,
            address: res.address,
            personVisit: res.personVisit,
            contactHomeOwner: res.contactHomeOwner,
            telHomeOwner: res.telHomeOwner,
            emailHomeOwner: res.emailHomeOwner,
            homeOwnerAddress: res.homeOwnerAddress,
            purpose: res.purpose,
            updatedAt: new Date(),
            createdAt: res.createdAt,
        };
        const newEditUser = [...visitorData];
        const index = visitorData.findIndex((acc) => acc._id === res._id);
        newEditUser[index] = editedUser;

        var data = {
            referenceNumber: res.referenceNumber,
        };
        axios
      .post("changeTimeOut", data)
      .then((res) => {
        console.log(res);
        setVisitorData(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    }
    const options = {
        maintainAspectRatio: false
    }
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

                {decodedToken.role === "admin" ? (
                    <div className="accounts-charts">
                        <CChart
                            className="chartMenu"
                            type="bar"
                            data={chartData}
                            labels="months"
                            height={70}
                            options={options}
                        />
                    </div>
                ) : null}
                <div className="card-header">
                    <h3>Visitors</h3>
                </div>
                <form>
                    <div className="account_inputs">
                        {category === 'Time In' ||  category === 'Time Out' ? (
                            <div className="accI_horizontal">
                                <h4>From: </h4>
                                <DatePicker maxDate={moment().toDate()} selected={startDate} className="datePicker" onChange={(date) => {
                                    setStartDate(date);
                                    setCurrentPage(1);
                                }} />
                                <h4>To: </h4>
                                <DatePicker maxDate={moment().toDate()} minDate={moment(startDate).toDate()} selected={endDate} className="datePicker" onChange={(date) => {
                                    setendDate(date);
                                    setCurrentPage(1);
                                }} />
                            </div>
                        ) : <Search
                            onSearch={(val) => {
                                setSearch(val);
                                setCurrentPage(1);
                            }}
                        />}
                        <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { petC(e) }}>
                            <option value="Reference Number">Reference Number</option>
                            <option value="Full Name">Full Name</option>
                            <option value="Email">Email</option>
                            <option value="Address">Address</option>
                            <option value="Homeowner's Name">Homeowner's Name</option>
                            <option value="Homeowner's Contact Number">Homeowner's Contact Number</option>
                            <option value="Homeowner's Address">Homeowner's Address</option>
                            <option value="Homeowner's Telephone Number">Homeowner's Telephone Number</option>
                            <option value="Purpose">Purpose</option>
                            <option value="Time In">Time In</option>
                            <option value="Time Out">Time Out</option>
                        </CFormSelect>
                        {visitorData.length !== 0 ? (
                            <ExcelFile
                                filename={"Visitor(" + date + ")"}
                                element={<button type="button" className="excelBtn">Export to Excel</button>}>
                                <ExcelSheet dataSet={[{
                                    columns: [
                                        { title: "Full Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Person to Visit", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Homeowner's Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Purpose", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    ],
                                    data: visitorD.map((data) => [
                                        { value: data.fullName, style: { font: { sz: "14" } } },
                                        { value: data.emailV, style: { font: { sz: "14" } } },
                                        { value: data.address, style: { font: { sz: "14" } } },
                                        { value: data.personVisit, style: { font: { sz: "14" } } },
                                        { value: data.homeOwnerAddress, style: { font: { sz: "14" } } },
                                        { value: data.purpose, style: { font: { sz: "14" } } },
                                        { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
                                    ])
                                }
                                ]} name="Homeowner Visitors" />
                            </ExcelFile>
                        ) : null}
                    </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {visitorD.slice(
                                (currentPage - 1) * item_per_page,
                                (currentPage - 1) * item_per_page + item_per_page
                            ).map((res) => (
                                <Fragment key={res._id}>
                                    <VisitorHistory key={res._id} res={res} handleEditFormSubmit ={handleEditFormSubmit}/>
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
