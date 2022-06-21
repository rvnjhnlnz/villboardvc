import React, { useState, useEffect, useMemo, Fragment } from 'react'
import './Vehicle.css'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import Table from "react-bootstrap/Table";
import ReactExport from 'react-data-export'
import moment from 'moment'
import { CChart } from '@coreui/react-chartjs';
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Vehicle() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    const [carData, setCarData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 10;
    const headers = [
        { name: "Last Name", field: "cLastName", sortable: true },
        { name: "First Name", field: "cFirstName", sortable: true },
        { name: "Address", field: "cAddress", sortable: true },
        { name: "Phone Number", field: "cPhoneNumber", sortable: true },
        { name: "Vehicle Model", field: "vehicleModel", sortable: true },
        { name: "Plate Number", field: "plateNumber", sortable: true },
        { name: "Registered Date", field: "createdAt", sortable: false },
    ];
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const Dataset = [{
        columns: [
            { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Vehicle Model", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Plate Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: carData.map((data) => [
            { value: data.cLastName, style: { font: { sz: "14" } } },
            { value: data.cFirstName, style: { font: { sz: "14" } } },
            { value: data.cAddress, style: { font: { sz: "14" } } },
            { value: data.cPhoneNumber, style: { font: { sz: "14" } } },
            { value: data.vehicleModel, style: { font: { sz: "14" } } },
            { value: data.plateNumber, style: { font: { sz: "14" } } },
            { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
    ];

    useEffect(() => {
        const fetchPets = async () => {
            axios.post('postCar')
                .then(res => {
                    console.log(res);
                    setCarData(res.data.reverse());
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPets();
        chart();
    }, []);

    function vehicleC(e) {
        setCategory(e.target.value);
        setStartDate(null);
        setendDate(null)
    }
    const [category, setCategory] = useState("Last Name");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const carD = useMemo(() => {
        let car = carData;
        if (category == "Last Name") {
            if (search) {
                car = car.filter((acc) => acc.cLastName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "First Name") {
            if (search) {
                car = car.filter((acc) => acc.cFirstName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Address") {
            if (search) {
                car = car.filter((acc) => acc.cAddress.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Phone Number") {
            if (search) {
                car = car.filter((acc) => acc.cPhoneNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Vehicle Model") {
            if (search) {
                car = car.filter((acc) => acc.vehicleModel.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Plate Number") {
            if (search) {
                car = car.filter((acc) => acc.plateNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }

        else if (category == "Registered Date") {
            if (startDate) {
                car = car.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                car = car.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        setTotalItems(car.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            car = car.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return car.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1).slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [carData, currentPage, search, startDate, endDate, sorting]);
    // const carD = useMemo(() => {
    //     let car = carData;
    //     if (search) {
    //         car = car.filter(
    //             c =>
    //                 c.pLastName.toLowerCase().includes(search.toLowerCase()) ||
    //                 c.pFirstName.toLowerCase().includes(search.toLowerCase()) ||
    //                 c.pAddress.toLowerCase().includes(search.toLowerCase()) ||
    //                 c.pPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
    //                 c.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
    //                 c.plateNumber.toLowerCase().includes(search.toLowerCase())
    //         )
    //     }
    //     setTotalItems(car.length);
    //     if (sorting.field) {
    //         const reversed = sorting.order === "asc" ? 1 : -1;
    //         car = car.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    //     }
    //     return car.slice(
    //         (currentPage - 1) * item_per_page,
    //         (currentPage - 1) * item_per_page + item_per_page
    //     );
    // }, [carData, currentPage, search, sorting]);

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
            .post("postCar")
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
                const counts1 = {};
                approveData.forEach((x) => {
                    counts1[x] = (counts1[x] || 0) + 1;
                });
                setChartData(
                    {
                        labels: myArray.map((x) => moment(x.date).format('MMMM-YYYY')),
                        datasets: [
                            {
                                label: 'Total number of Vehicles',
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
    const options = {
        maintainAspectRatio: false
    }
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
                    <title>Vehicle | Villboard</title>
                </Helmet>
                <div className="accounts-charts">
                    <CChart
                        className="chartMenu"
                        type="bar"
                        data={chartData}
                        labels="months"
                        height={80}
                        options={options}
                    />
                </div>
                <div class="card-header">
                    <h3>Vehicle Owners</h3>
                </div>
                <form>
                    <div className="account_inputs">
                        {category === 'Registered Date' ? (
                            <div className="accI_horizontal">
                                <h4>From: </h4>
                                <DatePicker maxDate={moment().toDate()} selected={startDate} className="datePicker" onChange={(date) => {
                                    setStartDate(date);
                                    setCurrentPage(1);
                                }} />
                                <h4>To: </h4>
                                <DatePicker maxDate={moment().toDate()} selected={endDate} className="datePicker" onChange={(date) => {
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
                        <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { vehicleC(e) }}>
                            <option value="Last Name">Last Name</option>
                            <option value="First Name">First Name</option>
                            <option value="Phone Number">Phone Number</option>
                            <option value="Address">Address</option>
                            <option value="Vehicle Model">Vehicle Model</option>
                            <option value="Plate Number">Plate Number</option>
                            <option value="Registered Date">Registered Date</option>
                        </CFormSelect>
                        {carD.length !== 0 ? (
                            <ExcelFile
                                filename={"Cars(" + date + ")"}
                                element={<button type="button" className="excelBtn">Export to Excel</button>}>
                                <ExcelSheet dataSet={[{
                                    columns: [
                                        { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Vehicle Model", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Plate Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    ],
                                    data: carD.map((data) => [
                                        { value: data.cLastName, style: { font: { sz: "14" } } },
                                        { value: data.cFirstName, style: { font: { sz: "14" } } },
                                        { value: data.cAddress, style: { font: { sz: "14" } } },
                                        { value: data.cPhoneNumber, style: { font: { sz: "14" } } },
                                        { value: data.vehicleModel, style: { font: { sz: "14" } } },
                                        { value: data.plateNumber, style: { font: { sz: "14" } } },
                                        { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
                                    ])
                                }
                                ]} name="Homeowner Cars" />
                            </ExcelFile>
                        ) : null}
                    </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {carD.map((res) => (
                                <Fragment key={res?._id}>
                                    <tr>
                                        <td>{res.cLastName}</td>
                                        <td>{res.cFirstName}</td>
                                        <td>{res.cAddress}</td>
                                        <td>{res.cPhoneNumber}</td>
                                        <td>{res.vehicleModel}</td>
                                        <td>{res.plateNumber.toUpperCase()}</td>
                                        <td>{moment(res.updatedAt).format('lll')}</td>
                                    </tr>
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
        )
    }
}

export default Vehicle
