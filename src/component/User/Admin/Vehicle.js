import React, {   useState, useEffect,useMemo,Fragment } from 'react'
import './Vehicle.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import Table from "react-bootstrap/Table";
import ReactExport from 'react-data-export'
import moment from 'moment'
import { CChart } from '@coreui/react-chartjs';
import {Helmet} from "react-helmet";

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
        { name: "Last Name", field: "cCLastName", sortable: true },
        { name: "First Name", field: "cFirstName", sortable: true },
        { name: "Address", field: "cAddress", sortable: true },
        { name: "Phone Number", field: "cPhoneNumber", sortable: true },
        { name: "Vehicle Model", field: "vehicleModel", sortable: true },
        { name: "Plate Number", field: "plateNumber", sortable: true },
        { name: "Timestamp", field: "Timestamp", sortable: false },
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
            { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
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
                    setCarData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPets();
        chart();
    }, []);
    const carD = useMemo(() => {
        let car = carData;
        if (search) {
            car = car.filter(
                c =>
                    c.pLastName.toLowerCase().includes(search.toLowerCase()) ||
                    c.pFirstName.toLowerCase().includes(search.toLowerCase()) ||
                    c.pAddress.toLowerCase().includes(search.toLowerCase()) ||
                    c.pPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    c.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
                    c.plateNumber.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(car.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            car = car.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return car.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [carData, currentPage, search, sorting]);

    const [chartData, setChartData] = useState({});
    const chart = () => {
        let carData = [];
        axios
            .post("postCar")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data) {
                    carData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
                }
                const counts1 = {};
                carData.forEach((x) => {
                    counts1[x] = (counts1[x] || 0) + 1;
                });
                setChartData(
                    {
                        labels: Object.keys(counts1),
                        datasets: [
                            {
                                label: 'Total number of Cars',
                                backgroundColor: '#f87979',
                                data: Object.values(counts1),
                            },
                        ],
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
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
                    />
                </div>
                <div class="card-header">
                    <h3>Car Owners</h3>
                </div>
                <form>
                    <div className="vis_inputs">
                        <Search
                            onSearch={(val) => {
                                setSearch(val);
                                setCurrentPage(1);
                            }}
                        />
                        {carData.length !== 0 ? (
                            <ExcelFile
                                filename={"Cars(" + date + ")"}
                                element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                <ExcelSheet dataSet={Dataset} name="Homeowner Cars" />
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
