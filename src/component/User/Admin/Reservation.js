import React, { useState, useEffect, useMemo, Fragment } from "react";
import "./Reservation.css";
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from "react-router-dom";
import TableHeader from "./Header";
import Pagination from "./PaginationCom";
import Search from "./Search";
import axios from "axios";
import ReactExport from 'react-data-export'
import moment from 'moment'
// import useFullPageLoader from "../../../reducers/useFullPageLoader";
// import PaginationCom from './PaginationCom';
// import Modal from 'react-modal'
import Table from "react-bootstrap/Table";
import ReservationPending from "./ReservationPending";
import ReservationHistory from "./ReservationHistory";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function Reservation() {
  const [reservation, setReservationData] = useState([]);
  const [pendingReservation, setPendingReservation] = useState([]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const Dataset = [{
    columns: [
        { title: "Status", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Venue", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Reservation Time", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Reservation Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Timestamp", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
        { title: "Reason", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
    ],
    data: reservation.map((data) => [
        {value: data.rPending, style: {font: {sz: "14"}}},
        {value: data.rFirstName, style: {font: {sz: "14"}}},
        {value: data.rLastName, style: {font: {sz: "14"}}},
        {value: data.rPhoneNumber, style: {font: {sz: "14"}}},
        {value: data.venue, style: {font: {sz: "14"}}},
        {value: data.reservationTime, style: {font: {sz: "14"}}},
        {value: moment(data.reservationDate).format('ll'), style: {font: {sz: "14"}}},
        {value: moment(data.updatedAt).format('lll'), style: {font: {sz: "14"}}},
        {value: data.reason, style: {font: {sz: "14"}}},
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

  const item_per_page = 10;
  //   const approve = "APPROVED";
  const headers = [
    { name: "Status", field: "rPending", sortable: true },
    { name: "First Name", field: "rFirstName", sortable: true },
    { name: "Last Name", field: "rLastName", sortable: true },
    { name: "Phone Number", field: "rPhoneNumber", sortable: true },
    { name: "Venue", field: "venue", sortable: true },
    { name: "Reservation\nTime", field: "reservationTime", sortable: true },
    { name: "Reservation\nDate", field: "reservationDate", sortable: true },
    { name: "Timestamp", field: "timestamp", sortable: false },
    { name: "Reason", field: "reason", sortable: true },
  ];
  const pheaders = [
    { name: "Status", field: "rPending", sortable: true },
    { name: "First Name", field: "rFirstName", sortable: true },
    { name: "Last Name", field: "rLastName", sortable: true },
    { name: "Phone Number", field: "rPhoneNumber", sortable: true },
    { name: "Venue", field: "venue", sortable: true },
    { name: "Reservation\nTime", field: "reservationTime", sortable: true },
    { name: "Reservation\nDate", field: "reservationDate", sortable: true },
    { name: "Actions", field: "", sortable: false },
  ];
  const preserveD = useMemo(() => {
    let reserve = pendingReservation;

    if (searchP) {
      reserve = reserve.filter(
        (acc) =>
          acc.rFirstName.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.rLastName.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.rPhoneNumber.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.venue.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.reservationTime.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.reservationDate.toLowerCase().includes(searchP.toLowerCase())
      );
    }

    setTotalItemsPending(reserve.length);
    console.log(reserve.length);
    if (sortingPending.field) {
      const reversed = sortingPending.order === "asc" ? 1 : -1;
      reserve = reserve.sort(
        (a, b) =>
          reversed *
          a[sortingPending.field].localeCompare(b[sortingPending.field])
      );
    }
    return reserve.slice(
      (currentPagePending - 1) * item_per_page,
      (currentPagePending - 1) * item_per_page + item_per_page
    );
  }, [pendingReservation, searchP, sortingPending, currentPagePending]);

  const reserveD = useMemo(() => {
    let reserve = reservation;
    // if (approve) {
    //     reserve = reserve.filter(
    //         acc =>
    //             acc.rPending.toLowerCase().includes(approve.toLowerCase())
    //     )
    if (search) {
      reserve = reserve.filter(
        (acc) =>
          acc.rPending.toLowerCase().includes(search.toLowerCase()) ||
          acc.rFirstName.toLowerCase().includes(search.toLowerCase()) ||
          acc.rLastName.toLowerCase().includes(search.toLowerCase()) ||
          acc.rPhoneNumber.toLowerCase().includes(search.toLowerCase()) ||
          acc.venue.toLowerCase().includes(search.toLowerCase()) ||
          acc.reservationTime.toLowerCase().includes(search.toLowerCase()) ||
          acc.reservationDate.toLowerCase().includes(search.toLowerCase())
          //acc.timestamp.toLowerCase().includes(search.toLowerCase())
      );
    }
    // }
    setTotalItems(reserve.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      reserve = reserve.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return reserve.slice(
      (currentPage - 1) * item_per_page,
      (currentPage - 1) * item_per_page + item_per_page
    ).reverse();
  }, [reservation, currentPage, search, sorting]);

  const handleAcceptDecline = (res, header, reason) => {
    // event.preventDefault();
    const userLP = [...pendingReservation]; //pedning

    const index = pendingReservation.findIndex((ac) => ac._id === res._id);
    var verdict = "declined";

    if (header === "Confirm Accept") verdict = "approved";
    else verdict = "declined";

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

  const decodedToken = decodeToken(localStorage.getItem("token"));
  if (!decodedToken || decodedToken.role === "homeowners") {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className="accounts-container">
        <div className="card-header">
          <h3>Pending Reservations</h3>
        </div>
        <div className="vis_inputs">
          <Search
            onSearch={(val) => {
              setSearchP(val);
              setCurrentPagePending(1);
            }}
          />
           
        </div>
        <form>
          <Table striped bordered hover responsive className="accounts_table">
            <TableHeader
              headers={pheaders}
              onSorting={(field, order) => setSortingPending({ field, order })}
            />
            <tbody>
              {preserveD.map((res) => (
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
          <h3>Reservation History</h3>
        </div>
        
        <form>
          <div className="vis_inputs">
            <Search
              onSearch={(val) => {
                setSearch(val);
                setCurrentPage(1);
              }}
            />
            {reservation.length !== 0 ? (
                         <ExcelFile 
                         filename= {"Reservations(" +date+")"}
                         element={<button type="button" className="btn btn-success float-right m-1">Export to Excel</button>}>
                             <ExcelSheet dataSet={Dataset} name="Homeowner Reservations"/>
                         </ExcelFile>
                    ): null}  
          </div>
          <Table striped bordered hover responsive className="accounts_table">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {reserveD.map((res) => (
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
      </div>
    );
  }
}

export default Reservation;
