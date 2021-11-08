import React, { useEffect, useMemo, useState } from 'react'
import './Pet.css'
import { decodeToken, useJwt } from "react-jwt";
import {Redirect } from 'react-router-dom';
import TableHeader from './Header'
import Pagination from './PaginationCom';
import Search from './Search';
import axios from 'axios'
import useFullPageLoader from "../../../reducers/useFullPageLoader";
function Pet() {
    const [petData, setPetData] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [editModal, set_editModal] = useState(false);
    const item_per_page = 10;
    const headers = [
        { name: "Last Name", field: "pLastName", sortable: true },
        { name: "First Name", field: "pFirstName", sortable: true },
        { name: "Address", field: "pAddress", sortable: true },
        { name: "Phone Number", field: "pPhoneNumber", sortable: true },
        { name: "Pet Name", field: "petName", sortable: false },
        { name: "Breed", field: "petBreed", sortable: false },
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
    if(!decodedToken||decodedToken.role === "homeowners"){
        return(
            <Redirect to={'/'}/>
        );
    }
    else{
        return (
            <div class="pet_main">
                <div class="admin_recent-grid">
                    <div class="pet_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pet Owners</h3>
                            </div>
                            <div className="pet_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table width="100%" class="pet_table">
                                    <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                        {petD.map(pet => (
                                                <tr> 
                                                <td>{pet.pLastName}</td>
                                                <td>{pet.pFirstName}</td>
                                                <td>{pet.pAddress}</td>
                                                <td>{pet.pPhoneNumber}</td>
                                                <td>{pet.petName}</td>
                                                <td>{pet.petBreed}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="pet_paginationBtns">
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

export default Pet
