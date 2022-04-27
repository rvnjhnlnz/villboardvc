import React, { useState, useEffect, useMemo, Fragment } from "react";
import "./Reservation.css";
import { decodeToken, useJwt } from "react-jwt";
import { Redirect } from "react-router-dom";
import TableHeader from "./Header";
import Pagination from "./PaginationCom";
import Search from "./Search";
import axios from "axios";
// import useFullPageLoader from "../../../reducers/useFullPageLoader";
// import PaginationCom from './PaginationCom';
// import Modal from 'react-modal'
import Table from "react-bootstrap/Table";
import ReservationPending from "./ReservationPending";
import ReservationHistory from "./ReservationHistory";
function Reservation() {
  const [reservation, setReservationData] = useState([]);
  const [pendingReservation, setPendingReservation] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .post("http://localhost:5000/postReservation")
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
    { name: "Timestamp", field: "timestamp", sortable: true },
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
        // acc.timestamp.toLowerCase().includes(search.toLowerCase())
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
    );
  }, [reservation, currentPage, search, sorting]);

  const handleAcceptDecline = (res, header) => {
    // event.preventDefault();
    const userLP = [...pendingReservation]; //pedning

    const index = pendingReservation.findIndex((ac) => ac._id === res._id);
    var verdict = "declined";

    if (header === "Confirm Accept") verdict = "approved";
    else verdict = "declined";

    axios
      .post("http://localhost:5000/approveDeclineReservation", {
        reserveItem: res,
        verdict,
        // email: res.user_reservation.email
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
