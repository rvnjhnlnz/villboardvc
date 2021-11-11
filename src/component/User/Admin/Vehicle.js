import React, {   useState, useEffect,useMemo } from 'react'
import './Vehicle.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
function Vehicle() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    const [carData, setCarData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
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
        { name: "Vehicle Model", field: "vehicleModel", sortable: false },
        { name: "Plate Number", field: "plateNumber", sortable: false },
    ];
    useEffect(() => {
        const fetchPets = async () => {
            showLoader();
            axios.post('postCar')
                .then(res => {
                    hideLoader();
                    console.log(res);
                    setCarData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPets();
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
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="vehicle_main">
                <div class="admin_recent-grid">
                    <div class="vehicle_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Vehicle Users</h3>
                            </div>
                            <div className="car_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="vehicle_table">
                                    <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                        {carD.map(car => (
                                                <tr> 
                                                <td>{car.cLastName}</td>
                                                <td>{car.cFirstName}</td>
                                                <td>{car.cAddress}</td>
                                                <td>{car.cPhoneNumber}</td>
                                                <td>{car.vehicleModel}</td>
                                                <td>{car.plateNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="car_paginationBtns">
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

export default Vehicle
