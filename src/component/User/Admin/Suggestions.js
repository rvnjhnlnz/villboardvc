import './Suggestions.css'
import React, { useState, useEffect, useMemo, Fragment } from 'react'
import axios from 'axios'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import PaginationCom from './PaginationCom';
import Search from './Search';
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import moment from 'moment'
import ReactExport from 'react-data-export'
import Pagination from './PaginationCom';
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';
import { Helmet } from "react-helmet";
import { CChart } from '@coreui/react-chartjs';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Suggestions() {
    const [suggestionsData, setSuggestionsData] = useState([])
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const item_per_page = 10;
    const headers = [
        { name: "Name", field: "aName", sortable: true },
        { name: "Suggestions/Complaint", field: "suggestions", sortable: true },
        { name: "Accomplished", field: "", sortable: true },
        { name: "Registered Date", field: "createdAt", sortable: true },
    ];

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const Dataset = [{
        columns: [
            { title: "Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: suggestionsData.map((data) => [
            { value: data.aName, style: { font: { sz: "14" } } },
            { value: data.suggestions, style: { font: { sz: "14" } } },
            { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
    ];
    useEffect(() => {
        const fetchSuggestions = async () => {
            showLoader();
            axios.post('postSuggestion')
                .then(res => {
                    hideLoader();
                    console.log(res);
                    setSuggestionsData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchSuggestions();
        chart();
    }, []);
    const [category, setCategory] = useState("Name");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    function petC(e) {
        setCategory(e.target.value);
        setStartDate(null);
        setendDate(null)
    }
    const SuggestionD = useMemo(() => {
        let suggest = suggestionsData;

        if (category == "Name") {
            if (search) {
                suggest = suggest.filter((acc) => acc.aName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Suggestions") {
            if (search) {
                suggest = suggest.filter((acc) => acc.suggestions.toLowerCase().includes(search.toLowerCase()))
            }
        }
        // else if (category == "Address") {
        //     if (search) {
        //         pet = pet.filter((acc) => acc.pAddress.toLowerCase().includes(search.toLowerCase()))
        //     }
        // }
        else if (category == "Registered Date") {
            if (startDate) {
                suggest = suggest.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                suggest = suggest.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        setTotalItems(suggest.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            suggest = suggest.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return suggest.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [suggestionsData, currentPage, search, startDate, endDate, sorting]);

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
            .post("postSuggestion")
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
                                label: 'Total number of Suggestions',
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
                    <title>Suggestions | Villboard</title>
                </Helmet>
                <div className="accounts-charts">
                    <CChart
                        className="chartMenu"
                        type="bar"
                        data={chartData}
                        labels="months"
                        height={70}
                    />
                </div>
                <div className="card-header">
                    <h3>Suggestion Box</h3>
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
                                <option value="Name">Name</option>
                                <option value="Suggestions">Suggestions</option>
                                <option value="Registered Date">Registered Date</option>
                            </CFormSelect>
                            {SuggestionD.length !== 0 ? (
                                <ExcelFile
                                    filename={"Suggestions(" + date + ")"}
                                    element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                    <ExcelSheet dataSet={[{
                                        columns: [
                                            { title: "Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                            { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                            { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        ],
                                        data: suggestionsData.map((data) => [
                                            { value: data.aName, style: { font: { sz: "14" } } },
                                            { value: data.suggestions, style: { font: { sz: "14" } } },
                                            { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                                        ])
                                    }
                                    ]} name="Homeowner Pet" />
                                </ExcelFile>
                            ) : null}
                        </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {SuggestionD.slice(
                                (currentPage - 1) * item_per_page,
                                (currentPage - 1) * item_per_page + item_per_page
                            ).map((res) => (
                                <Fragment key={res?._id}>
                                    <tr>
                                        <td>{res.aName}</td>
                                        <td>{res.suggestions}</td>
                                        <td>sample</td>
                                        <td>{moment(res.createdAt).format('lll')}</td>
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

export default Suggestions
