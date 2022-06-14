import React, { useEffect, useMemo, useState, Fragment } from "react";
import "./Accounts.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import TableHeader from "../Header";
// import { decodeToken, useJwt } from "react-jwt";
import AccountReadOnly from "./AccountReadOnly";
import AccountPending from "./AccountPending";
import AccountEditable from "./AccountEditable";
import Pagination from "../PaginationCom";
import Search from "../Search";
import ReactExport from 'react-data-export'
import { decodeToken } from "react-jwt";
import { CChart } from '@coreui/react-chartjs';
import moment from 'moment'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const Accounts = () => {
  const decodedToken = decodeToken(localStorage.getItem('token'));
  const [usersList, setUsersList] = useState([]);
  const [usersListP, setUsersListP] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editUserdata, setEditUserData] = useState({
    role: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const Dataset = [{
    columns: [
      { title: "Role", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Middle Initial", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
      { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
    ],
    data: usersList.map((data) => [
      { value: data.role, style: { font: { sz: "14" } } },
      { value: data.lastName, style: { font: { sz: "14" } } },
      { value: data.firstName, style: { font: { sz: "14" } } },
      { value: data.middleInitial, style: { font: { sz: "14" } } },
      { value: data.email, style: { font: { sz: "14" } } },
      { value: data.phoneNumber, style: { font: { sz: "14" } } },
      { value: data.address, style: { font: { sz: "14" } } },
    ])
  }
  ]


  const handleEditClick = (event, acc) => {
    event.preventDefault();
    setEditContactId(acc._id);

    const formValues = {
      role: acc.role,
      lastName: acc.lastName,
      firstName: acc.firstName,
      middleInitial: acc.middleInitial,
      email: acc.email,
      phoneNumber: acc.phoneNumber,
      address: acc.address,
    };

    setEditUserData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editUserdata };
    newFormData[fieldName] = fieldValue;

    setEditUserData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editContactId,
      role: editUserdata.role,
      lastName: editUserdata.lastName,
      firstName: editUserdata.firstName,
      middleInitial: editUserdata.middleInitial,
      email: editUserdata.email,
      phoneNumber: editUserdata.phoneNumber,
      address: editUserdata.address,
      passowrd: editUserdata.password
    };

    const newEditUser = [...usersList];
    const index = usersList.findIndex((acc) => acc._id === editContactId);
    newEditUser[index] = editedUser;

    var UpdateRole = {
      email: editUserdata.email,
      newrole: editUserdata.role,
    };

    var UpdateFn = {
      email: editUserdata.email,
      newfirstname: editUserdata.firstName,
    };
    var UpdateLn = {
      email: editUserdata.email,
      newlastname: editUserdata.lastName,
    };
    var UpdateMi = {
      email: editUserdata.email,
      newmiddleinitial: editUserdata.middleInitial,
    };
    var UpdateAdd = {
      email: editUserdata.email,
      newaddress: editUserdata.address,
    };
    var UpdatePh = {
      email: editUserdata.email,
      newphonenumber: editUserdata.phoneNumber,
    };
    console.log(UpdateRole)
    axios
      .post("changeRole", UpdateRole)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("changeFirstname", UpdateFn)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("changeLastname", UpdateLn)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("changeMiddleinitial", UpdateMi)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("changeAddress", UpdateAdd)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("changePhonenumber", UpdatePh)
      .then((res) => {
        console.log(res);
        setUsersList(newEditUser);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditContactId(null);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (ContactId, accountemail) => {
    const newUser = [...usersList];

    const index = usersList.findIndex((acc) => acc._id === ContactId);
    var deleteUser = {
      email: accountemail,
    };
    axios
      .post("deleteDataUser", deleteUser)
      .then((res) => {
        console.log(res);
        newUser.splice(index, 1);
        setUsersList(newUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptDecline = (acc, header) => {
    // event.preventDefault();
    const userLP = [...usersListP]; //pedning

    const index = usersListP.findIndex((ac) => ac._id === acc._id);
    var verdict = "declined";

    if (header === "Confirm Accept") verdict = "approved";
    else verdict = "declined";

    axios
      .post("approveDeclineAccount", {
        account: acc,
        verdict,
      })
      .then((res) => {
        userLP.splice(index, 1);
        setUsersListP(userLP);
        console.log(res.data);
        if (verdict === "approved") {
          const userL = [...usersList, res.data]; // existing
          setUsersList(userL);
        }
      })
      .catch((err) => console.log(err));
  };

  const [totalItems, setTotalItems] = useState(0);
  const [totalItemsPending, setTotalItemsPending] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [search, setSearch] = useState("");
  const [searchP, setSearchP] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sortingPending, setSortingPending] = useState({ field: "", order: "" });
  const item_per_page = 5;

  const headers = [
    { name: "Role", field: "role", sortable: true },
    { name: "Last Name", field: "lastName", sortable: true },
    { name: "First Name", field: "firstName", sortable: true },
    { name: "Middle Initial", field: "middleInitial", sortable: true },
    { name: "Email", field: "email", sortable: true },
    //{ name: "Password", field: "password", sortable: false },
    { name: "Phone Number", field: "phoneNumber", sortable: true },
    { name: "Address", field: "address", sortable: true },
    { name: "Timestamp", sortable: false },
    { name: "Actions", sortable: false },
  ];

  const accountD = useMemo(() => {
    let account = usersList;
    if (search) {
      account = account.filter(
        (acc) =>
          acc.role.toLowerCase().includes(search.toLowerCase()) ||
          acc.lastName.toLowerCase().includes(search.toLowerCase()) ||
          acc.firstName.toLowerCase().includes(search.toLowerCase()) ||
          acc.middleInitial.toLowerCase().includes(search.toLowerCase()) ||
          acc.email.toLowerCase().includes(search.toLowerCase()) ||
          acc.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
          acc.address.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(account.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      account = account.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return account.slice(
      (currentPage - 1) * item_per_page,
      (currentPage - 1) * item_per_page + item_per_page
    );
  }, [usersList, currentPage, search, sorting]);

  const accountP = useMemo(() => {
    let account = usersListP;
    if (searchP) {
      account = account.filter(
        (acc) =>
          acc.status.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.role.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.lastName.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.firstName.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.middleInitial.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.email.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.phoneNumber.toLowerCase().includes(searchP.toLowerCase()) ||
          acc.address.toLowerCase().includes(searchP.toLowerCase())
      );
    }
    setTotalItemsPending(account.length);
    if (sortingPending.field) {
      const reversed = sortingPending.order === "asc" ? 1 : -1;
      account = account.sort(
        (a, b) => reversed * a[sortingPending.field].localeCompare(b[sortingPending.field])
      );
    }
    return account.slice(
      (currentPagePending - 1) * item_per_page,
      (currentPagePending - 1) * item_per_page + item_per_page
    );
  }, [usersListP, currentPagePending, searchP, sortingPending]);

  const pheaders = [
    { name: "Status", field: "status", sortable: true },
    // { name: "Role", field: "role", sortable: true },
    { name: "Last Name", field: "lastName", sortable: true },
    { name: "First Name", field: "firstName", sortable: true },
    { name: "Middle Initial", field: "middleInitial", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Phone Number", field: "phoneNumber", sortable: true },
    { name: "Address", field: "address", sortable: true },
    { name: "Actions", sortable: false },
  ];
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let approveData = [];
    let declineData = [];
    axios
      .post("postUserinfo")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          if (dataObj.status === 'approved') {
            approveData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
          }
          else if (dataObj.status === 'declined') {
            declineData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
          }
        }
        const counts1 = {};
        approveData.forEach((x) => {
          counts1[x] = (counts1[x] || 0) + 1;
        });
        const counts2 = {};
        declineData.forEach((x) => {
          counts2[x] = (counts2[x] || 0) + 1;
        });
        setChartData(
          {
            labels: Object.keys(counts1),
            datasets: [
              {
                label: 'Total number of Accounts',
                backgroundColor: '#f87979',
                data: Object.values(counts1),
              },
            ],
          });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(approveData, declineData);
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    };
    function uniqueArrays(array) {
      var uniqueArray = [];

      for (var i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
        }
      }
      return uniqueArray;
    }
    const fetchPosts = async () => {
      axios
        .post("postUserinfo", {
          headers: headers,
        })
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          const existing = res.data.filter((acc) => acc.status !== "Pending");
          setUsersList(existing);
          const pending = res.data.filter((acc) => acc.status === "Pending");
          setUsersListP(pending);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    };
    fetchPosts();
    chart();
  }, []);


  return (
    <div className="accounts-container">
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
        <h3>Pending Accounts</h3>
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
            {/* ito yung sa approval nila pero ififilter pa gamit yung status ng account. */}
            {accountP.reverse().map((acc) => (
              <Fragment key={acc?._id}>
                <AccountPending
                  acc={acc}
                  key={acc._id}
                  // usersList={usersList}
                  handleAcceptDecline={handleAcceptDecline}
                />
              </Fragment>
            ))}
            {/* accountP.reverse().map((acc) => (
                        <tr>
                        <td>NO DATA</td>
                        <td>{acc.role}</td>
                        <td>{acc.lastName}</td>
                        <td>{acc.firstName}</td>
                        <td>{acc.middleInitial}</td>
                        <td>{acc.email}</td>
                        <td>{acc.phoneNumber}</td>
                        <td>{acc.address}</td>
                        <td>
                                <button type='button' className='genButton' >Accept</button>
                                <button type='button' className='genButton' >X</button>
                                </td>
                                </tr>
                            ))} */}
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
        <h3>Existing Accounts</h3>
      </div>
      <div className="vis_inputs">
        <Search
          onSearch={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        {usersList.length !== 0 ? (
          <ExcelFile
            filename={"Accounts(" + date + ")"}
            element={<button type="button" className="btn btn-success float-right m-1">Export Data</button>}>
            <ExcelSheet dataSet={Dataset} name="Homeowner Accounts" />
          </ExcelFile>
        ) : null}
      </div>
      <form>
        <Table striped bordered hover responsive className="accounts_table">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {accountD.map((acc) => (
              <Fragment key={acc._id}>
                {editContactId === acc._id ? (
                  <AccountEditable
                    key={acc._id}
                    acc={acc}
                    editUserData={editUserdata}
                    handleEditUserChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <AccountReadOnly
                    key={acc._id}
                    acc={acc}
                    usersList={usersList}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
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
};

export default Accounts;
