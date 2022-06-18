import React, { useState, useEffect, useMemo, Fragment } from "react";
import "./Reservation.css";
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from "react-router-dom";
import TableHeader from "./Header";
import Pagination from "./PaginationCom";
import Search from "./Search";
import axios from "axios";
import DatePicker from "react-datepicker";
import { CFormSelect } from '@coreui/react';
import moment from 'moment'
// import useFullPageLoader from "../../../reducers/useFullPageLoader";
// import PaginationCom from './PaginationCom';
// import Modal from 'react-modal'
import Table from "react-bootstrap/Table";
import ReservationPending from "./ReservationPending";
import ReservationHistory from "./ReservationHistory";

import { CChart } from '@coreui/react-chartjs';
import ReactExport from 'react-data-export'
import { Helmet } from "react-helmet";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Reservation() {
  const [reservation, setReservationData] = useState([]);
  const [pendingReservation, setPendingReservation] = useState([]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const Dataset = [{
    columns: [
      { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Venue", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Reservation Time", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Reservation Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Booking Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Acceptance of Reservation", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Reason", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
    ],
    data: reservation.map((data) => [
      { value: data.rPending, style: { font: { sz: "14" } } },
      { value: data.rFirstName, style: { font: { sz: "14" } } },
      { value: data.rLastName, style: { font: { sz: "14" } } },
      { value: data.rPhoneNumber, style: { font: { sz: "14" } } },
      { value: data.venue, style: { font: { sz: "14" } } },
      { value: data.reservationTime, style: { font: { sz: "14" } } },
      { value: moment(data.reservationDate).format('ll'), style: { font: { sz: "14" } } },
      { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
      { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
      { value: data.reason, style: { font: { sz: "14" } } },
    ])
  }
  ]

  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .post("postReservation")
        .then((res) => {
          console.log(res);
          const notpending = res.data.filter(
            (acc) => acc.rPending.toLowerCase() !== "pending"
          );
          setReservationData(notpending);
          const pending = res.data.filter(
            (acc) => acc.rPending.toLowerCase() === "pending"
          );
          setPendingReservation(pending);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
    chart();
  }, []);
  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsPending, setTotalItemsPending] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [searchP, setSearchP] = useState("");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sortingPending, setSortingPending] = useState({
    field: "",
    order: "",
  });
  const [totalItemsPendingD, setTotalItemsD] = useState(0);
  const [currentPageD, setCurrentPageD] = useState(1);
  const [searchD, setSearchD] = useState("");
  const [sortingD, setSortingD] = useState({ field: "", order: "" });

  const item_per_page = 7;
  //   const approve = "APPROVED";
  const headers = [
    { name: "First Name", field: "rFirstName", sortable: true },
    { name: "Last Name", field: "rLastName", sortable: true },
    { name: "Phone Number", field: "rPhoneNumber", sortable: true },
    { name: "Venue", field: "venue", sortable: true },
    { name: "Reservation\nTime", field: "reservationTime", sortable: true },
    { name: "Reservation\nDate", field: "reservationDate", sortable: true },
    { name: "Booking Date", field: "timestamp", sortable: false },
    { name: "Acceptance of Reservation", field: "updatedAt", sortable: false },
  ];
  const pheaders = [
    { name: "First Name", field: "rFirstName", sortable: true },
    { name: "Last Name", field: "rLastName", sortable: true },
    { name: "Phone Number", field: "rPhoneNumber", sortable: true },
    { name: "Venue", field: "venue", sortable: true },
    { name: "Reservation\nTime", field: "reservationTime", sortable: true },
    { name: "Reservation\nDate", field: "reservationDate", sortable: true },
    { name: "Booking Date", field: "createdAt", sortable: true },
    { name: "Actions", field: "", sortable: false },
  ];

  const dheaders = [
    { name: "First Name", field: "rFirstName", sortable: true },
    { name: "Last Name", field: "rLastName", sortable: true },
    { name: "Phone Number", field: "rPhoneNumber", sortable: true },
    { name: "Venue", field: "venue", sortable: true },
    { name: "Reservation\nTime", field: "reservationTime", sortable: true },
    { name: "Reservation\nDate", field: "reservationDate", sortable: true },
    { name: "Booking Date", field: "timestamp", sortable: false },
    { name: "Acceptance of Reservation", field: "updatedAt", sortable: false },
    { name: "Reason", field: "reason", sortable: true },
  ];


  const [categoryP, setCategoryP] = useState(null);
  const [startDateP, setStartDateP] = useState(null);
  const [endDateP, setendDateP] = useState(null);


  function pendingC(e) {
    setCategoryP(e.target.value);
    setStartDateP(null);
    setendDateP(null)
  }

  const preserveD = useMemo(() => {
    let reserve = pendingReservation;
    if (categoryP == "Last Name") {
      if (searchP) {
        reserve = reserve.filter((acc) => acc.rLastName.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "First Name") {
      if (searchP) {
        reserve = reserve.filter((acc) => acc.rFirstName.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Phone Number") {
      if (searchP) {
        reserve = reserve.filter((acc) => acc.rPhoneNumber.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Venue") {
      if (searchP) {
        reserve = reserve.filter((acc) => acc.venue.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Reservation Time") {
      if (searchP) {
        reserve = reserve.filter((acc) => acc.reservationTime.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Reservation Date") {
      if (startDateP) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrAfter(startDateP));
      }
      if (endDateP) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrBefore(moment(endDateP), 'day'));
      }
    }
    else if (categoryP == "Booking Date") {
      if (startDateP) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateP));
      }
      if (endDateP) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateP), 'day'));
      }
    }
    setTotalItemsPending(reserve.length);

    if (sortingPending.field) {
      const reversed = sortingPending.order === "asc" ? 1 : -1;
      reserve = reserve.sort(
        (a, b) => reversed * a[sortingPending.field].localeCompare(b[sortingPending.field])
      );
    }
    return reserve.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [pendingReservation, currentPagePending, searchP, startDateP, endDateP, sortingPending]);




  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  function reservedC(e) {
    setCategory(e.target.value);
    setStartDate(null);
    setendDate(null)
  }

  const reserveD = useMemo(() => {
    let reserve = reservation.filter((acc) => acc.rPending === "approved");
    if (category == "Last Name") {
      if (search) {
        reserve = reserve.filter((acc) => acc.rLastName.toLowerCase().includes(search.toLowerCase()))
      }
    }
    else if (category == "First Name") {
      if (search) {
        reserve = reserve.filter((acc) => acc.rFirstName.toLowerCase().includes(search.toLowerCase()))
      }
    }
    else if (category == "Phone Number") {
      if (search) {
        reserve = reserve.filter((acc) => acc.rPhoneNumber.toLowerCase().includes(search.toLowerCase()))
      }
    }
    else if (category == "Venue") {
      if (search) {
        reserve = reserve.filter((acc) => acc.venue.toLowerCase().includes(search.toLowerCase()))
      }
    }
    else if (category == "Reservation Time") {
      if (search) {
        reserve = reserve.filter((acc) => acc.reservationTime.toLowerCase().includes(search.toLowerCase()))
      }
    }
    else if (category == "Reservation Date") {
      if (startDate) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrAfter(startDate));
      }
      if (endDate) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrBefore(moment(endDate), 'day'));
      }
    }
    else if (category == "Booking Date") {
      if (startDate) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
      }
      if (endDate) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
      }
    }
    else if (category == "Acceptance of Reservation") {
      if (startDate) {
        reserve = reserve.filter((acc) => moment(acc.updatedAt).isSameOrAfter(startDate));
      }
      if (endDate) {
        reserve = reserve.filter((acc) => moment(acc.updatedAt).isSameOrBefore(moment(endDate), 'day'));
      }
    }
    setTotalItems(reserve.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      reserve = reserve.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return reserve.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [reservation, currentPage, search, startDate, endDate, sorting]);

  const [categoryD, setCategoryD] = useState(null);
  const [startDateD, setStartDateD] = useState(null);
  const [endDateD, setendDateD] = useState(null);

  function reservedD(e) {
    setCategoryD(e.target.value);
    setStartDateD(null);
    setendDateD(null)
  }


  const declinedR = useMemo(() => {
    let reserve = reservation.filter((acc) => acc.rPending === "declined");
    if (categoryD == "Last Name") {
      if (searchD) {
        reserve = reserve.filter((acc) => acc.rLastName.toLowerCase().includes(searchD.toLowerCase()))
      }
    }
    else if (categoryD == "First Name") {
      if (searchD) {
        reserve = reserve.filter((acc) => acc.rLastName.toLowerCase().includes(searchD.toLowerCase()))
      }
    }
    else if (categoryD == "Phone Number") {
      if (searchD) {
        reserve = reserve.filter((acc) => acc.rPhoneNumber.toLowerCase().includes(searchD.toLowerCase()))
      }
    }
    else if (categoryD == "Venue") {
      if (searchD) {
        reserve = reserve.filter((acc) => acc.venue.toLowerCase().includes(searchD.toLowerCase()))
      }
    }
    else if (categoryD == "Reservation Time") {
      if (searchD) {
        reserve = reserve.filter((acc) => acc.reservationTime.toLowerCase().includes(searchD.toLowerCase()))
      }
    }
    else if (categoryD == "Reservation Date") {
      if (startDateD) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrAfter(startDateD));
      }
      if (endDateD) {
        reserve = reserve.filter((acc) => moment(acc.reservationDate).isSameOrBefore(moment(endDateD), 'day'));
      }
    }
    else if (categoryD == "Booking Date") {
      if (startDateD) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateD));
      }
      if (endDateD) {
        reserve = reserve.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateD), 'day'));
      }
    }
    else if (categoryD == "Decline of Reservation") {
      if (startDateD) {
        reserve = reserve.filter((acc) => moment(acc.updatedAt).isSameOrAfter(startDateD));
      }
      if (endDate) {
        reserve = reserve.filter((acc) => moment(acc.updatedAt).isSameOrBefore(moment(endDateD), 'day'));
      }
    }
    setTotalItemsD(reserve.length);
    if (sortingD.field) {
      const reversed = sortingD.order === "asc" ? 1 : -1;
      reserve = reserve.sort(
        (a, b) => reversed * a[sortingD.field].localeCompare(b[sortingD.field])
      );
    }
    return reserve.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1).slice(
      (currentPageD - 1) * item_per_page,
      (currentPageD - 1) * item_per_page + item_per_page
    );
  }, [reservation, currentPageD, searchD, startDateD, endDateD, sortingD]);

  const handleAcceptDecline = (res, header, reason) => {
    // event.preventDefault();
    const userLP = [...pendingReservation]; //pedning

    const index = pendingReservation.findIndex((ac) => ac._id === res._id);
    var verdict = "declined";

    if (header === "Confirm Accept") verdict = "approved";
    else verdict = "declined";

    if (reason === " " || reason === "") {
      reason = "-"
    }
    axios
      .post("approveDeclineReservation", {
        reserveItem: res,
        verdict,
        reason
      })
      .then((res) => {
        userLP.splice(index, 1);
        setPendingReservation(userLP);
        console.log(res.data);
        //   if (verdict === 'approved') {
        const userL = [...reservation, res.data]; // existing
        setReservationData(userL);
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
      .post("postReservation")
      .then(res => {
        for (const dataObj of res.data) {
          if (moment(dataObj.createdAt).isSameOrAfter("2022-02-01",'month')) {
            //if(moment(myArray[dataObj]).format('MMMM-YYYY') === moment(dataObj.createdAt).format('MMMM-YYYY')){
              const index = myArray.findIndex(acc => moment(acc.date).format("MMMM-YYYY") === moment(dataObj.createdAt).format("MMMM-YYYY"));
              if (dataObj.rPending === 'approved') {
                myArray[index].approve += 1;
              }
              else if (dataObj.rPending === 'declined') {
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
                label: 'Total number of Reservation Accepted',
                backgroundColor: 'lightgreen',
                data: myArray.map((x) => x.approve),
              },
              {
                label: 'Total number of Reservation Declined',
                backgroundColor: 'darkgreen',
                data: myArray.map((x) => x.decline),
              },
            ],
          });
      })
      .catch(err => {

      });
  };


  const decodedToken = decodeToken(localStorage.getItem("token"));
  if (!decodedToken || decodedToken.role === "homeowners") {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className="accounts-container">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Reservation | Villboard</title>
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
        <div className="card-header">
          <h3>Pending Reservations</h3>
        </div>
        <div className="account_inputs">
          {categoryP === 'Booking Date' || categoryP === 'Reservation Date' ? (
            <div className="accI_horizontal">
              <h4>From: </h4>
              <DatePicker maxDate={moment().toDate()} selected={startDateP} className="datePicker" onChange={(date) => {
                setStartDateP(date);
                setCurrentPagePending(1);
              }} />
              <h4>To: </h4>
              <DatePicker maxDate={moment().toDate()} minDate={moment(startDateP).toDate()} selected={endDateP} className="datePicker" onChange={(date) => {
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
            <option value="Phone Number">Phone Number</option>
            <option value="Venue">Venue</option>
            <option value="Reservation Time">Reservation Time</option>
            <option value="Reservation Date">Reservation Date</option>
            <option value="Booking Date">Booking Date</option>
          </CFormSelect>
        </div>
        <form>
          <Table striped bordered hover responsive className="accounts_table">
            <TableHeader
              headers={pheaders}
              onSorting={(field, order) => setSortingPending({ field, order })}
            />
            <tbody>
              {preserveD.slice(
      (currentPagePending - 1) * item_per_page,
      (currentPagePending - 1) * item_per_page + item_per_page
    ).map((res) => (
                <Fragment key={res?._id}>
                  <ReservationPending
                    key={res._id}
                    res={res}
                    handleAcceptDecline={handleAcceptDecline}
                  />
                </Fragment>
              ))}
            </tbody>
          </Table>
          <div className="acc_paginationBtns">
            <Pagination
              total={totalItemsPending}
              itemsPerPage={item_per_page}
              currentPage={currentPagePending}
              onPageChange={(page) => setCurrentPagePending(page)}
            />
          </div>
        </form>
        <div className="card-header">
          <h3>Accepted</h3>
        </div>
        <form>
          <div className="account_inputs">

            {category === 'Reservation Date' || category === 'Booking Date' || category === 'Acceptance of Reservation' ? (
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
          <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { reservedC(e) }}>
            <option value="Last Name">Last Name</option>
            <option value="First Name">First Name</option>
            <option value="Phone Number">Phone Number</option>
            <option value="Venue">Venue</option>
            <option value="Reservation Time">Reservation Time</option>
            <option value="Reservation Date">Reservation Date</option>
            <option value="Booking Date">Booking Date</option>
            <option value="Acceptance of Reservation">Acceptance of Reservation</option>
          </CFormSelect>

            {reserveD.length !== 0 ? (
              <ExcelFile
                filename={"Reservations(" + date + ")"}
                element={<button type="button" className="btn btn-success float-right m-1">Export Data</button>}>
                <ExcelSheet dataSet={[{
              columns: [
                { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Venue", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Reservation Time", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Registration Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Booking Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Acceptance of Reservation", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
              ],
              data: reserveD.map((data) => [
                { value: data.rPending, style: { font: { sz: "14" } } },
                { value: data.rFirstName, style: { font: { sz: "14" } } },
                { value: data.rLastName, style: { font: { sz: "14" } } },
                { value: data.rPhoneNumber.toUpperCase(), style: { font: { sz: "14" } } },
                { value: data.venue, style: { font: { sz: "14" } } },
                { value: data.reservationTime, style: { font: { sz: "14" } } },
                { value: moment(data.reservationDate).format('lll'), style: { font: { sz: "14" } } },
                { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                { value: moment(data.updatedAt).format('lll'), style: { font: { sz: "14" } } },
              ])
            }
            ]} name="Homeowner Reservation" />
              </ExcelFile>
            ) : null}
          </div>
          <Table striped bordered hover responsive className="accounts_table">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {reserveD.slice(
      (currentPage - 1) * item_per_page,
      (currentPage - 1) * item_per_page + item_per_page
    ).map((res) => (
                <Fragment key={res?._id}>
                  <ReservationHistory key={res._id} res={res} />
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
        <div className="card-header">
          <h3>Declined</h3>
        </div>
        <form>
          <div className="account_inputs">
            {categoryD === 'Registered Date' || categoryD === 'Reservation Date' || categoryD === 'Acceptance of Reservation' ? (
            <div className="accI_horizontal">
              <h4>From: </h4>
              <DatePicker maxDate={moment().toDate()} selected={startDateD} className="datePicker" onChange={(date) => {
                setStartDateD(date);
                setCurrentPageD(1);
              }} />
              <h4>To: </h4>
              <DatePicker maxDate={moment().toDate()} minDate={moment(startDateD).toDate()}  selected={endDate} className="datePicker" onChange={(date) => {
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
          <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { reservedD(e) }}>
            <option value="Last Name">Last Name</option>
            <option value="First Name">First Name</option>
            <option value="Phone Number">Phone Number</option>
            <option value="Reservation Time">Reservation Time</option>
            <option value="Reservation Date">Reservation Date</option>
            <option value="Registered Date">Registered Date</option>
            <option value="Decline of Reservation">Decline of Reservation</option>
            <option value="Reason">Reason</option>
          </CFormSelect>

            {reservation.length !== 0 ? (
              <ExcelFile
                filename={"Reservations(" + date + ")"}
                element={<button type="button" className="btn btn-success float-right m-1">Export Data</button>}>
                <ExcelSheet dataSet={Dataset} name="Homeowner Reservation" />
              </ExcelFile>
            ) : null}
          </div>
          <Table striped bordered hover responsive className="accounts_table">
            <TableHeader
              headers={dheaders}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {declinedR.slice(
      (currentPageD - 1) * item_per_page,
      (currentPageD - 1) * item_per_page + item_per_page
    ).map((res) => (
                <Fragment key={res?._id}>
                  <ReservationHistory key={res._id} res={res} />
                </Fragment>
              ))}
            </tbody>
          </Table>
          <div className="acc_paginationBtns">
            <Pagination
              total={totalItemsPendingD}
              itemsPerPage={item_per_page}
              currentPage={currentPageD}
              onPageChange={(page) => setCurrentPageD(page)}
            />
          </div>
        </form>

      </div>
    );
  }
}

export default Reservation;
