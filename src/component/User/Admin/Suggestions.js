import './Suggestions.css'
import React, { useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from 'react-router-dom';
import TableHeader from './Header'
import PaginationCom from './PaginationCom';
import Search from './Search';
import useFullPageLoader from "../../../reducers/useFullPageLoader";
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
    }, []);
    const SuggestionD = useMemo(()=> {
        let suggest = suggestionsData;
        if(search){
            suggest = suggest.filter(
                sg => sg.aName.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(suggest.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            suggest = suggest.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
        }
        return suggest.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        );
    }, [suggestionsData, currentPage, search, sorting]);

    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else {
        return (
            <div class="suggestions_main">
                <div class="admin_recent-grid">
                    <div class="suggestions_slots">
                        <div class="admin_card">
                            <div class="card-header">
                                <h3>Pending Transactions</h3>
                            </div>
                            <div className="sug_inputs">
                                <Search onSearch={(val) => {
                                    setSearch(val);
                                    setCurrentPage(1);
                                }} />
                            </div>
                            <div class="card-body">
                                <div class="admin_table-responsive">
                                    <table class="sug_table">
                                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                                        <tbody>
                                            {SuggestionD.map(sd => (
                                                <tr>
                                                    <td>{sd.aName}</td>
                                                    <td>{sd.suggestions}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="sug_paginationBtns">
                                        <PaginationCom
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

export default Suggestions
