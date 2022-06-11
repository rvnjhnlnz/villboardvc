import './Suggestions.css'
import React, { useState, useEffect, useMemo , Fragment} from 'react'
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
        { name: "Timestamp", field: "Timestamp", sortable: false },
    ];

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const Dataset = [{
        columns: [
            { title: "Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: suggestionsData.map((data) => [
            { value: data.aName, style: { font: { sz: "14" } } },
            { value: data.suggestions, style: { font: { sz: "14" } } },
            { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
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
    }, []);
    const SuggestionD = useMemo(() => {
        let suggest = suggestionsData;
        if (search) {
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
            <div className="accounts-container">
                <div className="card-header">
                    <h3>Suggestion Box</h3>
                </div>
                <form>
                    <div className="vis_inputs">
                        <Search
                            onSearch={(val) => {
                                setSearch(val);
                                setCurrentPage(1);
                            }}
                        />
                        {suggestionsData.length !== 0 ? (
                            <ExcelFile
                                filename={"Suggestions(" + date + ")"}
                                element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                                <ExcelSheet dataSet={Dataset} name="Homeowner Suggestions" />
                            </ExcelFile>
                        ) : null}
                    </div>
                    <Table striped bordered hover responsive className="accounts_table">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {suggestionsData.map((res) => (
                                <Fragment key={res?._id}>
                                    <tr>
                                        <td>{res.aName}</td>
                                        <td>{res.suggestions}</td>
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

export default Suggestions
