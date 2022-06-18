import React, { useEffect, useMemo, useState, Fragment } from 'react'
import './Pet.css'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
import Table from "react-bootstrap/Table";
import ReactExport from 'react-data-export'
import moment from 'moment'
import { CChart } from '@coreui/react-chartjs';
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function Pet() {
    const [petData, setPetData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 8;
    const [category, setCategory] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const Dataset = [{
        columns: [
            { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Pet Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Breed", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: petData.map((data) => [
            { value: data.pLastName, style: { font: { sz: "14" } } },
            { value: data.pFirstName, style: { font: { sz: "14" } } },
            { value: data.pAddress, style: { font: { sz: "14" } } },
            { value: data.pPhoneNumber, style: { font: { sz: "14" } } },
            { value: data.petName, style: { font: { sz: "14" } } },
            { value: data.petBreed, style: { font: { sz: "14" } } },
            { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
    ];

    const headers = [
        { name: "Last Name", field: "pLastName", sortable: true },
        { name: "First Name", field: "pFirstName", sortable: true },
        { name: "Address", field: "pAddress", sortable: true },
        { name: "Phone Number", field: "pPhoneNumber", sortable: true },
        { name: "Pet Name", field: "petName", sortable: true },
        { name: "Pet Breed", field: "petBreed", sortable: true },
        { name: "Registration Date", field: "createdAt", sortable: true },
    ];

    function petC(e) {
        setCategory(e.target.value);
        setStartDate(null);
        setendDate(null)
    }

    useEffect(() => {
        const fetchPets = async () => {
            showLoader();
            axios.post('postPet')
                .then(res => {
                    hideLoader();
                    console.log(res);
                    setPetData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPets();
        chart();
    }, []);
    // const petD = useMemo(() => {
    //     let pet = petData;
    //     if (search) {
    //         pet = pet.filter(
    //             p =>
    //                 p.pLastName.toLowerCase().includes(search.toLowerCase()) ||
    //                 p.pFirstName.toLowerCase().includes(search.toLowerCase()) ||
    //                 p.pAddress.toLowerCase().includes(search.toLowerCase()) ||
    //                 p.pPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
    //                 p.petName.toLowerCase().includes(search.toLowerCase()) ||
    //                 p.petBreed.toLowerCase().includes(search.toLowerCase())
    //         )
    //     }
    //     setTotalItems(pet.length);
    //     if (sorting.field) {
    //         const reversed = sorting.order === "asc" ? 1 : -1;
    //         pet = pet.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    //     }
    //     return pet.slice(
    //         (currentPage - 1) * item_per_page,
    //         (currentPage - 1) * item_per_page + item_per_page
    //     );
    // }, [petData, currentPage, search, sorting]);

    const petD = useMemo(() => {
        let pet = petData;
        if (category == "Last Name") {
            if (search) {
                pet = pet.filter((acc) => acc.pLastName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "First Name") {
            if (search) {
                pet = pet.filter((acc) => acc.pFirstName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Address") {
            if (search) {
                pet = pet.filter((acc) => acc.pAddress.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Phone Number") {
            if (search) {
                pet = pet.filter((acc) => acc.pPhoneNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Pet Name") {
            if (search) {
                pet = pet.filter((acc) => acc.petName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Pet Breed") {
            if (search) {
                pet = pet.filter((acc) => acc.petBreed.toLowerCase().includes(search.toLowerCase()))
            }
        }

        else if (category == "Registered Date") {
            if (startDate) {
                pet = pet.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                pet = pet.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        setTotalItems(pet.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            pet = pet.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return pet.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [petData, currentPage, search, startDate, endDate, sorting]);
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
        },{
          date: "2022-05-01",
          
          total: 0
        },{
          date: "2022-6-01",
         
          total: 0
        }]
        
        axios
          .post("postPet")
          .then(res => {
            for (const dataObj of res.data) {
              if (moment(dataObj.createdAt).isSameOrAfter("2022-02-01",'month')) {
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
                    label: 'Total number of Pets',
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
                    <title>Pet | Villboard</title>
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
                <div class="card-header">
                    <h3>Pet Owners</h3>
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
                            <option value="Last Name">Last Name</option>
                            <option value="First Name">First Name</option>
                            <option value="Phone Number">Phone Number</option>
                            <option value="Pet Name">Pet Name</option>
                            <option value="Pet Breed">Pet Breed</option>
                            <option value="Registered Date">Registered Date</option>
                        </CFormSelect>
                        {petData.length !== 0 ? (
                            <ExcelFile
                                filename={"Pets(" + date + ")"}
                                element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                <ExcelSheet dataSet={[{
                                    columns: [
                                        { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Pet Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Breed", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                        { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    ],
                                    data: petD.map((data) => [
                                        { value: data.pLastName, style: { font: { sz: "14" } } },
                                        { value: data.pFirstName, style: { font: { sz: "14" } } },
                                        { value: data.pAddress, style: { font: { sz: "14" } } },
                                        { value: data.pPhoneNumber, style: { font: { sz: "14" } } },
                                        { value: data.petName, style: { font: { sz: "14" } } },
                                        { value: data.petBreed, style: { font: { sz: "14" } } },
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
                            {petD.slice(
                                (currentPage - 1) * item_per_page,
                                (currentPage - 1) * item_per_page + item_per_page
                            ).map((res) => (
                                <Fragment key={res?._id}>
                                    <tr>
                                        <td>{res.pLastName}</td>
                                        <td>{res.pFirstName}</td>
                                        <td>{res.pAddress}</td>
                                        <td>{res.pPhoneNumber}</td>
                                        <td>{res.petName}</td>
                                        <td>{res.petBreed}</td>
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

export default Pet
