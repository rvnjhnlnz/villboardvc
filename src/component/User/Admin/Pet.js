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
    const item_per_page = 10;

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
            { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
    ];

    const headers = [
        { name: "Last Name", field: "pLastName", sortable: true },
        { name: "First Name", field: "pFirstName", sortable: true },
        { name: "Address", field: "pAddress", sortable: true },
        { name: "Phone Number", field: "pPhoneNumber", sortable: true },
        { name: "Pet Name", field: "petName", sortable: false },
        { name: "Breed", field: "petBreed", sortable: false },
        { name: "Timestamp", field: "Timestamp", sortable: false },
    ];
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
    }, []);
    const petD = useMemo(() => {
        let pet = petData;
        if (search) {
            pet = pet.filter(
                p =>
                    p.pLastName.toLowerCase().includes(search.toLowerCase()) ||
                    p.pFirstName.toLowerCase().includes(search.toLowerCase()) ||
                    p.pAddress.toLowerCase().includes(search.toLowerCase()) ||
                    p.pPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
                    p.petName.toLowerCase().includes(search.toLowerCase()) ||
                    p.petBreed.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(pet.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            pet = pet.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return pet.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [petData, currentPage, search, sorting]);
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div className="accounts-container">
                <div class="card-header">
                    <h3>Pet Owners</h3>
                </div>
                <form>
                    <div className="vis_inputs">
                        <Search
                            onSearch={(val) => {
                                setSearch(val);
                                setCurrentPage(1);
                            }}
                        />
                        {petData.length !== 0 ? (
                            <ExcelFile
                                filename={"Pets(" + date + ")"}
                                element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                <ExcelSheet dataSet={Dataset} name="Homeowner Pets" />
                            </ExcelFile>
                        ) : null}
                    </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {petD.map((res) => (
                                <Fragment key={res?._id}>
                                    <tr>
                                        <td>{res.pLastName}</td>
                                        <td>{res.pFirstName}</td>
                                        <td>{res.pAddress}</td>
                                        <td>{res.pPhoneNumber}</td>
                                        <td>{res.petName}</td>
                                        <td>{res.petBreed}</td>
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

export default Pet
