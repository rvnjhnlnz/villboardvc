import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './Transactions.css'
import { decodeToken } from "react-jwt";
import { Redirect } from 'react-router-dom';
// import useFullPageLoader from "../../../../reducers/useFullPageLoader";
import Search from '../Search';
import PaginationCom from '../PaginationCom';
import TableHeader from '../Header'
// import Modal from 'react-modal'
import Table from 'react-bootstrap/Table'
import TransactionPending from './TransactionPending';
import ReactExport from 'react-data-export'
import moment from 'moment'
import { CChart } from '@coreui/react-chartjs';
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Transactions() {
    const [transactionData, setTransactionData] = useState([]);
    const [pendingTrans, setPendingTrans] = useState([])

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const Dataset = [{
        columns: [
            { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Reference Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Type of Transaction", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Proof of Payment", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
            { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        ],
        data: transactionData.map((data) => [
            { value: data.pPending, style: { font: { sz: "14" } } },
            { value: data.uLastName, style: { font: { sz: "14" } } },
            { value: data.uFirstName, style: { font: { sz: "14" } } },
            { value: data.uAddress, style: { font: { sz: "14" } } },
            { value: data.uPhoneNumber, style: { font: { sz: "14" } } },
            { value: data.refNumber, style: { font: { sz: "14" } } },
            { value: data.typeTransaction, style: { font: { sz: "14" } } },
            { value: data.photoUrl, style: { font: { sz: "14" } } },
            { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
        ])
    }
    ]

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
        const fetchTrans = async () => {
            axios.post('postPayment', {
                headers: headers,
            })
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    const notpending = res.data.reverse().filter(
                        (acc) => acc.pPending.toLowerCase() !== "pending"
                    );
                    setTransactionData(notpending);
                    const pending = res.data.filter(
                        (acc) => acc.pPending.toLowerCase() === "pending"
                    );
                    setPendingTrans(pending);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        fetchTrans();
        chart();
    }, []);

    // const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemsPending, setTotalItemsPending] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1)
    const [search, setSearch] = useState("");
    const [searchP, setSearchP] = useState("");
    const [searchD, setSearchD] = useState("");
    // const pendingWord = "PENDING";
    // const approve = "APPROVED"
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [sortingPending, setSortingPending] = useState({
        field: "",
        order: "",
    });
    const [totalItemsD, setTotalItemsD] = useState(0);
const [currentPageD, setCurrentPageD] = useState(1)
const [sortingD, setSortingD] = useState({ field: "", order: "" });
    // const [pictureModal, setpictureModal] = useState(false);
    const item_per_page = 6;
    const pheaders = [
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: true },
        { name: "Type of Transaction", field: "typeTransaction", sortable: true },
        { name: "Transaction Date", field: "createdAt", sortable: true },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
        { name: "Actions", field: "", sortable: false },
    ];
    const headers = [
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: true },
        { name: "Type of Transaction", field: "typeTransaction", sortable: true },
        { name: "Transaction Date", field: "createdAt", sortable: true },
        { name: "Acceptance of Transaction", field: "updatedAt", sortable: true },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
    ];
    const dheaders = [
        { name: "Last Name", field: "uLastName", sortable: true },
        { name: "First Name", field: "uFirstName", sortable: true },
        { name: "Address", field: "uAddress", sortable: true },
        { name: "Phone Number", field: "uPhoneNumber", sortable: true },
        { name: "Reference Number", field: "refNumber", sortable: false },
        { name: "Type of Transaction", field: "typeTransaction", sortable: true },
        { name: "Reason", field: "reasonNote", sortable: false },
        { name: "Transaction Date", field: "createdAt", sortable: false },
        { name: "Decline of Transaction", field: "updatedAt", sortable: false },
        { name: "Proof of Payment", field: "photoUrl", sortable: false },
    ];


    const [category, setCategory] = useState("Last Name");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);

    function reservedC(e) {
        setCategory(e.target.value);
        setStartDate(null);
        setendDate(null)
    }

    const transactionDataDisc = useMemo(() => {
        let computedTr = transactionData.filter((acc) => acc.pPending === "approved").reverse();
        if (category == "Last Name") {
            if (search) {
                computedTr = computedTr.filter((acc) => acc.uLastName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "First Name") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.uFirstName.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Address") {
            if (search) {
                computedTr = computedTr.filter((acc) => acc.uAddress.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Phone Number") {
            if (search) {
                computedTr = computedTr.filter((acc) => acc.uPhoneNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Reference Number") {
            if (search) {
                computedTr = computedTr.filter((acc) => acc.refNumber.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Type of Transaction") {
            if (search) {
                computedTr = computedTr.filter((acc) => acc.typeTransaction.toLowerCase().includes(search.toLowerCase()))
            }
        }
        else if (category == "Transaction Date") {
            if (startDate) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        else if (category == "Acceptance of Transaction") {
            if (startDate) {
                computedTr = computedTr.filter((acc) => moment(acc.updatedAt).isSameOrAfter(startDate));
            }
            if (endDate) {
                computedTr = computedTr.filter((acc) => moment(acc.updatedAt).isSameOrBefore(moment(endDate), 'day'));
            }
        }
        setTotalItems(computedTr.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedTr = computedTr.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return computedTr.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [transactionData, currentPage, search, startDate, endDate, sorting]);


    const [categoryP, setCategoryP] = useState("Last Name");
    const [startDateP, setStartDateP] = useState(null);
    const [endDateP, setendDateP] = useState(null);

    function pendingC(e) {
        setCategoryP(e.target.value);
        setStartDateP(null);
        setendDateP(null)
    }

    const pendingTransaction  = useMemo(() => {
        let computedTr =pendingTrans;
        if (categoryP == "Last Name") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.uLastName.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "First Name") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.uFirstName.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "Address") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.uAddress.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "Phone Number") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.uPhoneNumber.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "Reference Number") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.refNumber.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "Type of Transaction") {
            if (searchP) {
                computedTr = computedTr.filter((acc) => acc.typeTransaction.toLowerCase().includes(searchP.toLowerCase()))
            }
        }
        else if (categoryP == "Transaction Date") {
            if (startDateP) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateP));
            }
            if (endDateP) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateP), 'day'));
            }
        }
        setTotalItemsPending(computedTr.length);
        if (sortingPending.field) {
            const reversed = sortingPending.order === "asc" ? 1 : -1;
            computedTr = computedTr.sort(
                (a, b) => reversed * a[sortingPending.field].localeCompare(b[sortingPending.field])
            );
        }
        return computedTr.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
    }, [pendingTrans, currentPagePending, searchP, startDateP, endDateP, sortingPending]);

    const [categoryD, setCategoryD] = useState("Last Name");
    const [startDateD, setStartDateD] = useState(null);
    const [endDateD, setendDateD] = useState(null);

    function declineC(e) {
        setCategoryD(e.target.value);
        setStartDateD(null);
        setendDateD(null)
    }

    const declineD = useMemo(() => {
        let computedTr = transactionData.filter((acc) => acc.pPending === "declined");
        if (categoryD == "Last Name") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.uLastName.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "First Name") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.uFirstName.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "Address") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.uAddress.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "Phone Number") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.uPhoneNumber.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "Reference Number") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.refNumber.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "Type of Transaction") {
            if (searchD) {
                computedTr = computedTr.filter((acc) => acc.typeTransaction.toLowerCase().includes(searchD.toLowerCase()))
            }
        }
        else if (categoryD == "Transaction Date") {
            if (startDateD) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateD));
            }
            if (endDateD) {
                computedTr = computedTr.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateD), 'day'));
            }
        }
        setTotalItemsD(computedTr.length);
        if (sortingD.field) {
            const reversed = sortingD.order === "asc" ? 1 : -1;
            computedTr = computedTr.sort(
                (a, b) => reversed * a[sortingD.field].localeCompare(b[sortingD.field])
            );
        }
        return computedTr.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1).slice(
            (currentPageD - 1) * item_per_page,
            (currentPageD - 1) * item_per_page + item_per_page
        );
    }, [transactionData, currentPageD, searchD, startDateD, endDateD, sortingD]);

    const handleAcceptDecline = (res, header, reason) => {
        // event.preventDefault();
        const transPending = [...pendingTrans]; //pedning

        const index = pendingTrans.findIndex((ac) => ac._id === res._id);
        var verdict = "declined";

        if (header === "Confirm Accept") verdict = "approved";
        else verdict = "declined";

        axios
            .post("approveDeclineTransaction", {
                transItem: res,
                verdict,
                reason: reason
            })
            .then((res) => {
                transPending.splice(index, 1);
                setPendingTrans(transPending);
                console.log(res.data);
                //   if (verdict === 'approved') {
                const transL = [...transactionData, res.data]; // existing
                setTransactionData(transL);
                //   }
            })
            .catch((err) => console.log(err));
    };

    const [chartData, setChartData] = useState({});
    const chart = () => {
        let approveData = [];
        let declineData = [];
        const myArray = [{
          date: "2022-02-01",
          approve: 0,
          decline: 0,
        }, {
          date: "2022-03-01",
          approve: 0,
          decline: 0,
        }, {
          date: "2022-04-01",
          approve: 0,
          decline: 0,
        },{
          date: "2022-05-01",
          approve: 0,
          decline: 0,
        },{
          date: "2022-6-01",
          approve: 0,
          decline: 0,
        }]
        
        axios
          .post("postPayment")
          .then(res => {
            for (const dataObj of res.data) {
              if (moment(dataObj.createdAt).isSameOrAfter("2022-02-01",'month')) {
                //if(moment(myArray[dataObj]).format('MMMM-YYYY') === moment(dataObj.createdAt).format('MMMM-YYYY')){
                  const index = myArray.findIndex(acc => moment(acc.date).format("MMMM-YYYY") === moment(dataObj.createdAt).format("MMMM-YYYY"));
                  if (dataObj.pPending === 'approved') {
                    myArray[index].approve += 1;
                  }
                  else if (dataObj.pPending === 'declined') {
                    myArray[index].decline += 1;
                  }
                  //const index = myArray.findIndex(acc => acc.id === employee.id);
                //approveData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
              }
            }
            setChartData(
              {
                labels: myArray.map((x) => moment(x.date).format('MMMM-YYYY')),
                datasets: [
                  {
                    label: 'Total number of Transaction Accepted',
                    backgroundColor: 'lightgreen',
                    data: myArray.map((x) => x.approve),
                  },
                  {
                    label: 'Total number of Transaction Declined',
                    backgroundColor: 'darkgreen',
                    data: myArray.map((x) => x.decline),
                  },
                ],
              });
          })
          .catch(err => {
    
          });
      };
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
            <div className='accounts-container'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Transactions | Villboard</title>
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
                <div className="card-header">
                    <h3>Pending Transactions</h3>
                </div>
                <div className="account_inputs">
                    {categoryP === 'Transaction Date' ? (
                        <div className="accI_horizontal">
                            <h4>From: </h4>
                            <DatePicker maxDate={moment().toDate()} selected={startDateP} className="datePicker" onChange={(date) => {
                                setStartDateP(date);
                                setCurrentPagePending(1);
                            }} />
                            <h4>To: </h4>
                            <DatePicker minDate={moment(startDateP).toDate()} maxDate={moment().toDate()} selected={endDateP} className="datePicker" onChange={(date) => {
                                setendDateP(date);
                                setCurrentPagePending(1);
                            }} />
                        </div>
                    ) : <Search
                        onSearch={(val) => {
                            setSearchP(val);
                            setCurrentPagePending(1);
                        }}
                    />}
                    <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { pendingC(e) }}>
                        <option value="Last Name">Last Name</option>
                        <option value="First Name">First Name</option>
                        <option value="Address">Address</option>
                        <option value="Phone Number">Phone Number</option>
                        <option value="Reference Number">Reference Number</option>
                        <option value="Type of Transaction">Type of Transaction</option>
                        <option value="Transaction Date">Transaction Date</option>
                    </CFormSelect>
                </div>
                <form>
                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={pheaders} onSorting={(field, order) => setSortingPending({ field, order })} />
                        <tbody>
                            {pendingTransaction.slice(
                                (currentPagePending - 1) * item_per_page,
                                (currentPagePending - 1) * item_per_page + item_per_page
                            ).map(tr => (
                                <TransactionPending key={tr._id} tr={tr} handleAcceptDecline={handleAcceptDecline} />
                            ))}
                        </tbody>
                    </Table>
                    <div className="acc_paginationBtns">
                        <PaginationCom
                            total={totalItemsPending}
                            itemsPerPage={item_per_page}
                            currentPage={currentPagePending}
                            onPageChange={page => setCurrentPagePending(page)}
                        />
                    </div>

                </form>
                <div className="card-header">
                    <h3>Accepted Transactions</h3>
                </div>
                <div className="account_inputs">
                    {category === 'Transaction Date' || category === 'Acceptance of Transaction' ? (
                        <div className="accI_horizontal">
                            <h4>From: </h4>
                            <DatePicker maxDate={moment().toDate()} selected={startDate} className="datePicker" onChange={(date) => {
                                setStartDate(date);
                                setCurrentPage(1);
                            }} />
                            <h4>To: </h4>
                            <DatePicker minDate={moment(startDate).toDate()} maxDate={moment().toDate()} selected={endDate} className="datePicker" onChange={(date) => {
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
                    <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { reservedC(e) }}>
                        <option value="Last Name">Last Name</option>
                        <option value="First Name">First Name</option>
                        <option value="Address">Phone Number</option>
                        <option value="Phone Number">Phone Number</option>
                        <option value="Reference Number">Reference Number</option>
                        <option value="Type of Transaction">Type of Transaction</option>
                        <option value="Transaction Date">Transaction Date</option>
                        <option value="Acceptance of Transaction">Acceptance of Transaction</option>
                    </CFormSelect>

                    {transactionDataDisc.length !== 0 ? (
                        <ExcelFile
                            filename={"Transaction(" + date + ")"}
                            element={<button type="button" className="excelBtn">Export Data</button>}>
                            <ExcelSheet dataSet={[{
                                columns: [
                                    { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Reference Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Type of Transaction", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Transaction Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Acceptance of Transaction", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Proof of Payment", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },

                                ],
                                data: transactionDataDisc.map((data) => [
                                    { value: data.pPending, style: { font: { sz: "14" } } },
                                    { value: data.uLastName, style: { font: { sz: "14" } } },
                                    { value: data.uFirstName, style: { font: { sz: "14" } } },
                                    { value: data.uAddress, style: { font: { sz: "14" } } },
                                    { value: data.uPhoneNumber, style: { font: { sz: "14" } } },
                                    { value: data.refNumber, style: { font: { sz: "14" } } },
                                    { value: data.typeTransaction, style: { font: { sz: "14" } } },
                                    { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                                    { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
                                    { value: data.photoUrl, style: { font: { sz: "14" } } },
                                ])
                            }
                            ]} name="Homeowner Transactions" />
                        </ExcelFile>
                    ) : null}
                </div>

                <form>

                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                        <tbody>
                            {transactionDataDisc.slice(
            (currentPage - 1) * item_per_page,
            (currentPage - 1) * item_per_page + item_per_page
        ).map(tr => (
                                <tr key={tr._id}>
                                    <td>{tr.uLastName}</td>
                                    <td>{tr.uFirstName}</td>
                                    <td>{tr.uAddress}</td>
                                    <td>{tr.uPhoneNumber}</td>
                                    <td>{tr.refNumber}</td>
                                    <td>{tr.typeTransaction}</td>
                                    <td>{moment(tr.createdAt).format('lll')}</td>
                                    <td>{moment(tr.updatedAt).format('lll')}</td>
                                    <td><a href={tr.photoUrl}>Click to Download</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="acc_paginationBtns">
                        <PaginationCom
                            total={totalItems}
                            itemsPerPage={item_per_page}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </form>
                <div className="card-header">
                    <h3>Decline Transactions</h3>
                </div>
                <div className="account_inputs">
                    {categoryD === 'Transaction Date' || categoryD === 'Decline of Transaction' ? (
                        <div className="accI_horizontal">
                            <h4>From: </h4>
                            <DatePicker maxDate={moment().toDate()} selected={startDateD} className="datePicker" onChange={(date) => {
                                setStartDateD(date);
                                setCurrentPageD(1);
                            }} />
                            <h4>To: </h4>
                            <DatePicker minDate={moment(startDateD).toDate()} maxDate={moment().toDate()} selected={endDateD} className="datePicker" onChange={(date) => {
                                setendDateD(date);
                                setCurrentPageD(1);
                            }} />


                        </div>
                    ) : <Search
                        onSearch={(val) => {
                            setSearchD(val);
                            setCurrentPageD(1);
                        }}
                    />}
                    <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { declineC(e) }}>
                        <option value="Last Name">Last Name</option>
                        <option value="First Name">First Name</option>
                        <option value="Address">Phone Number</option>
                        <option value="Phone Number">Phone Number</option>
                        <option value="Reference Number">Reference Number</option>
                        <option value="Type of Transaction">Type of Transaction</option>
                        <option value="Transaction Date">Transaction Date</option>
                        <option value="Acceptance of Transaction">Acceptance of Transaction</option>
                    </CFormSelect>

                    {declineD.length !== 0 ? (
                        <ExcelFile
                            filename={"Transaction(" + date + ")"}
                            element={<button type="button" className="excelBtn">Export Data</button>}>
                            <ExcelSheet dataSet={[{
                                columns: [
                                    { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Reference Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Type of Transaction", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Transaction Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Acceptance of Transaction", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                                    { title: "Proof of Payment", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },

                                ],
                                data: declineD.map((data) => [
                                    { value: data.pPending, style: { font: { sz: "14" } } },
                                    { value: data.uLastName, style: { font: { sz: "14" } } },
                                    { value: data.uFirstName, style: { font: { sz: "14" } } },
                                    { value: data.uAddress, style: { font: { sz: "14" } } },
                                    { value: data.uPhoneNumber, style: { font: { sz: "14" } } },
                                    { value: data.refNumber, style: { font: { sz: "14" } } },
                                    { value: data.typeTransaction, style: { font: { sz: "14" } } },
                                    { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                                    { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
                                    { value: data.photoUrl, style: { font: { sz: "14" } } },
                                ])
                            }
                            ]} name="Homeowner Transactions" />
                        </ExcelFile>
                    ) : null}
                </div>

                <form>

                    <Table striped bordered hover responsive className='accounts_table'>
                        <TableHeader headers={dheaders} onSorting={(field, order) => setSortingD({ field, order })} />
                        <tbody>
                            {declineD.map(tr => (
                                <tr key={tr._id}>
                                    <td>{tr.uLastName}</td>
                                    <td>{tr.uFirstName}</td>
                                    <td>{tr.uAddress}</td>
                                    <td>{tr.uPhoneNumber}</td>
                                    <td>{tr.refNumber}</td>
                                    <td>{tr.typeTransaction}</td>
                                    <td>{tr.reasonNote}</td>
                                    <td>{moment(tr.createdAt).format('lll')}</td>
                                    <td>{moment(tr.updatedAt).format('lll')}</td>
                                    <td><a href={tr.photoUrl}>Click to Download</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="acc_paginationBtns">
                        <PaginationCom
                            total={totalItemsD}
                            itemsPerPage={item_per_page}
                            currentPage={currentPageD}
                            onPageChange={page => setCurrentPageD(page)}
                        />
                    </div>
                </form>
            </div>
        );
    }

}
export default Transactions