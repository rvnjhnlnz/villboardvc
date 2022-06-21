import React, { useEffect, useMemo, useState, Fragment, useRef } from "react";
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
import { Helmet } from "react-helmet";
import { CFormSelect } from '@coreui/react';
import { addDays } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import format from 'date-fns/format'
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Redirect } from 'react-router-dom';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import "react-datepicker/dist/react-datepicker.css";

const EXTENSIONS = ['xlsx', 'xls', 'csv']
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const isSameOfAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOfAfter)
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

const Accounts = () => {
  const decodedToken = decodeToken(localStorage.getItem('token'));
  const [usersList, setUsersList] = useState([]);
  const [usersListP, setUsersListP] = useState([]);
  const [usersListA, setUsersListA] = useState([]);
  const [usersListS, setUsersListS] = useState([]);
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
  const [totalItemsH, setTotalItemsH] = useState(0);
  const [currentPageH, setCurrentPageH] = useState(1);
  const [totalItemsS, setTotalItemsS] = useState(0);
  const [currentPageS, setCurrentPageS] = useState(1);
  const [totalItemsA, setTotalItemsA] = useState(0);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [searchH, setSearchH] = useState("");
  const [searchA, setSearchA] = useState("");
  const [searchS, setSearchS] = useState("");
  const [searchP, setSearchP] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sortingPending, setSortingPending] = useState({ field: "", order: "" });
  const [sortingS, setSortingS] = useState({ field: "", order: "" });
  const [sortingA, setSortingA] = useState({ field: "", order: "" });
  const item_per_page = 8;

  const [categoryH, setCategoryH] = useState("Last Name");

  function pendingC(e) {
    setCategoryP(e.target.value);
    setStartDateP(null);
    setendDateP(null)
  }

  function homeownerC(e) {
    setCategoryH(e.target.value);
    setStartDate(null);
    setendDate(null)
  }
  function securityC(e) {
    setCategoryS(e.target.value);
    setStartDateS(null);
    setendDateS(null)
  }
  function adminC(e) {
    setCategoryA(e.target.value);
    setStartDateA(null);
    setendDateA(null)
  }
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [open, setOpen] = useState(false)
  const refOne = useRef(null);
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      console.log(startDate)
    }
  }
  const headers = [
    { name: "Role" },
    { name: "Last Name", field: "lastName", sortable: true },
    { name: "First Name", field: "firstName", sortable: true },
    { name: "Middle Initial", field: "middleInitial", sortable: true },
    { name: "Email", field: "email", sortable: true },
    //{ name: "Password", field: "password", sortable: false },
    { name: "Phone Number", field: "phoneNumber", sortable: true },
    { name: "Address", field: "address", sortable: true },
    { name: "Registered Date", field: "createdAt", sortable: true },
    { name: "Actions", sortable: false },
  ];
  const sHeaders = [
    { name: "Last Name", field: "lastName", sortable: true },
    { name: "First Name", field: "firstName", sortable: true },
    { name: "Middle Initial", field: "middleInitial", sortable: true },
    { name: "Email", field: "email", sortable: true },
    //{ name: "Password", field: "password", sortable: false },
    { name: "Phone Number", field: "phoneNumber", sortable: true },
    { name: "Address", field: "address", sortable: true },
    { name: "Registered Date", field: "createdAt", sortable: true },
    { name: "Actions", sortable: false },
  ];
  const aheaders = [
    // { name: "Role", field: "role", sortable: true },
    { name: "Last Name", field: "lastName", sortable: true },
    { name: "First Name", field: "firstName", sortable: true },
    { name: "Middle Initial", field: "middleInitial", sortable: true },
    { name: "Email", field: "email", sortable: true },
    //{ name: "Password", field: "password", sortable: false },
    { name: "Phone Number", field: "phoneNumber", sortable: true },
    { name: "Address", field: "address", sortable: true },
  ];

  const homeowners = useMemo(() => {
    let account = usersList;
    let existing = account.filter((acc) => acc.role === "homeowners");
    if (categoryH == "Last Name") {
      if (searchH) {
        existing = existing.filter((acc) => acc.lastName.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "First Name") {
      if (searchH) {
        existing = existing.filter((acc) => acc.firstName.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "Middle Initial") {
      if (searchH) {
        existing = existing.filter((acc) => acc.middleInitial.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "Email") {
      if (searchH) {
        existing = existing.filter((acc) => acc.email.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "Phone Number") {
      if (searchH) {
        existing = existing.filter((acc) => acc.phoneNumber.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "Address") {
      if (searchH) {
        existing = existing.filter((acc) => acc.address.toLowerCase().includes(searchH.toLowerCase()))
      }
    }
    else if (categoryH == "Registered Date") {
      if (startDate) {
        existing = existing.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDate));
      }
      if (endDate) {
        existing = existing.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDate), 'day'));
      }
    }
    setTotalItemsH(existing.length);
    if (sorting.field) {

      const reversed = sorting.order === "asc" ? 1 : -1;
      existing = existing.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return existing.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [usersList, currentPageH, searchH, startDate, endDate, sorting]);

  const [categoryS, setCategoryS] = useState("Last Name");
  const [startDateS, setStartDateS] = useState(null);
  const [endDateS, setendDateS] = useState(null);
  const Security = useMemo(() => {
    let account = usersList.filter((acc) => acc.role === "security");
    if (categoryS == "Last Name") {
      if (searchS) {
        account = account.filter((acc) => acc.lastName.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "First Name") {
      if (searchS) {
        account = account.filter((acc) => acc.firstName.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "Middle Initial") {
      if (searchS) {
        account = account.filter((acc) => acc.middleInitial.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "Email") {
      if (searchS) {
        account = account.filter((acc) => acc.email.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "Phone Number") {
      if (searchS) {
        account = account.filter((acc) => acc.phoneNumber.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "Address") {
      if (searchS) {
        account = account.filter((acc) => acc.address.toLowerCase().includes(searchS.toLowerCase()))
      }
    }
    else if (categoryS == "Registered Date") {
      if (startDateS) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateS));
      }
      if (endDateS) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateS), 'day'));
      }
    }
    setTotalItemsS(account.length);
    if (sortingS.field) {
      const reversed = sortingS.order === "asc" ? 1 : -1;
      account = account.sort(
        (a, b) => reversed * a[sortingS.field].localeCompare(b[sortingS.field])
      );
    }
    return account.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [usersList, currentPageS, searchS, startDateS, endDateS, sortingS]);

  const [categoryA, setCategoryA] = useState("Last Name");
  const [startDateA, setStartDateA] = useState(null);
  const [endDateA, setendDateA] = useState(null);
  const admin = useMemo(() => {
    let account = usersList.filter((acc) => acc.role === "admin");;
    if (categoryA == "Last Name") {
      if (searchA) {
        account = account.filter((acc) => acc.lastName.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "First Name") {
      if (searchA) {
        account = account.filter((acc) => acc.firstName.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "Middle Initial") {
      if (searchA) {
        account = account.filter((acc) => acc.middleInitial.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "Email") {
      if (searchA) {
        account = account.filter((acc) => acc.email.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "Phone Number") {
      if (searchA) {
        account = account.filter((acc) => acc.phoneNumber.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "Address") {
      if (searchA) {
        account = account.filter((acc) => acc.address.toLowerCase().includes(searchA.toLowerCase()))
      }
    }
    else if (categoryA == "Registered Date") {
      if (startDateA) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateA));
      }
      if (endDateA) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateA), 'day'));
      }
    }
    setTotalItemsA(account.length);
    if (sortingA.field) {
      const reversed = sortingA.order === "asc" ? 1 : -1;
      account = account.sort(
        (a, b) => reversed * a[sortingA.field].localeCompare(b[sortingA.field])
      );
    }
    return account.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [usersList, currentPageA, searchA, startDateA, endDateA, sortingA]);


  const [categoryP, setCategoryP] = useState(null);
  const [startDateP, setStartDateP] = useState(null);
  const [endDateP, setendDateP] = useState(null);
  const accountP = useMemo(() => {
    let account = usersListP;
    if (categoryP == "Last Name") {
      if (searchP) {
        account = account.filter((acc) => acc.lastName.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "First Name") {
      if (searchP) {
        account = account.filter((acc) => acc.firstName.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Middle Initial") {
      if (searchP) {
        account = account.filter((acc) => acc.middleInitial.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Email") {
      if (searchP) {
        account = account.filter((acc) => acc.email.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Phone Number") {
      if (searchP) {
        account = account.filter((acc) => acc.phoneNumber.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Address") {
      if (searchP) {
        account = account.filter((acc) => acc.address.toLowerCase().includes(searchP.toLowerCase()))
      }
    }
    else if (categoryP == "Registered Date") {
      if (startDateP) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateP));
      }
      if (endDateP) {
        account = account.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateP), 'day'));
      }
    }
    setTotalItemsPending(account.length);
    if (sortingPending.field) {
      const reversed = sortingPending.order === "asc" ? 1 : -1;
      account = account.sort(
        (a, b) => reversed * a[sortingPending.field].localeCompare(b[sortingPending.field])
      );
    }
    return account.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [usersListP, currentPagePending, searchP, startDateP, endDateP, sortingPending]);


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

  const [month, set5month] = useState()
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let approveData = [];
    let declineData = [];
    const myArray = [{
      date: "2022-02-01",
      vat_percentages: {
        21: 92.31
      },
      total: 0
    }, {
      date: "2022-03-01",
      vat_percentages: {
        21: 21.24
      },
      total: 0
    }, {
      date: "2022-04-01",
      vat_percentages: {
        21: 47.41
      },
      total: 0
    }, {
      date: "2022-05-01",
      vat_percentages: {
        21: 47.41
      },
      total: 0
    }, {
      date: "2022-6-01",
      vat_percentages: {
        21: 47.41
      },
      total: 0
    }]

    axios
      .post("postUserinfo")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          if (dataObj.status === 'approved' && dataObj.role === 'homeowners' && moment(dataObj.createdAt).isSameOrAfter("2022-02-01", 'month')) {
            //if(moment(myArray[dataObj]).format('MMMM-YYYY') === moment(dataObj.createdAt).format('MMMM-YYYY')){
            const index = myArray.findIndex(acc => moment(acc.date).format("MMMM-YYYY") === moment(dataObj.createdAt).format("MMMM-YYYY"));
            myArray[index].total += 1;
            //const index = myArray.findIndex(acc => acc.id === employee.id);
            //approveData.push(moment(dataObj.createdAt).format('MMMM-YYYY'));
          }
        }
        const counts1 = {};
        approveData.forEach((x) => {
          counts1[x] = (counts1[x] || 0) + 1;
        });
        setChartData(
          {
            labels: myArray.map((x) => moment(x.date).format('MMMM-YYYY')),
            datasets: [
              {
                label: 'Total number of Accounts',
                backgroundColor: 'green',
                borderColor: 'rgba(104,195,163,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(147,250,165,1)',
                hoverBorderColor: 'rgba(104,195,163,1)',
                data: myArray.map((x) => x.total),
              },
            ],
          });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(approveData, declineData);
  };
  const options = {
    maintainAspectRatio: false
  }
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
    const fetchPosts = async () => {
      axios
        .post("postUserinfo", {
          headers: headers,
        })
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);

          const pending = res.data.filter((acc) => acc.status === "Pending");
          setUsersListP(pending);
          const existing = res.data.filter((acc) => acc.status !== "Pending");
          setUsersList(existing);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    };
    const masterList = async () => {
      axios
        .post("postMasterList", {
          headers: headers,
        })
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          setMasterListData(res.data.reverse());
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    };
    masterList();
    fetchPosts();
    chart();
    document.addEventListener("keydown", hideOnEscape, true);
  }, []);

  const [masterListData, setMasterListData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mFirstName, setmFirstName] = useState("");
  const [mLastName, setmLastName] = useState("");
  const [mEmail, setmEmail] = useState("");
  const [mAddress, setmAddress] = useState("");
  const [mPhoneNumber1, setmPhoneNumber1] = useState("");
  const [mPhoneNumber2, setmPhoneNumber2] = useState("");
  const [mTelNumber, setmTelNumber] = useState("");
  const [headFamily, setheadFamily] = useState("");
  const [subFamily, setsubFamily] = useState("");
  const [subPhoneNumber, setsubPhoneNumber] = useState("");


  function addMaster() {
    const data = {
      mFirstName: mFirstName,
      mLastName: mLastName,
      mEmail: mEmail,
      mAddress: mAddress,
      mPhoneNumber1: mPhoneNumber1,
      mPhoneNumber2: mPhoneNumber2,
      mTelNumber: mTelNumber,
      headFamily: headFamily,
      subFamily: subFamily,
      subPhoneNumber: subPhoneNumber,
    };
    const addData = [...masterListData, data];
    axios.post('addMasterList', data).then(res => {
      console.log(res);
      setVisible(!visible);
      setMasterListData(addData);
    }).catch(err => {
      console.log(err);
    });
  }
  function MasterC(e) {
    setCategoryM(e.target.value);
    setStartDateM(null);
    setendDateM(null)
  }

  const [searchM, setSearchM] = useState("");
  const [categoryM, setCategoryM] = useState("First Name");
  const [startDateM, setStartDateM] = useState(null);
  const [endDateM, setendDateM] = useState(null);
  const [currentPageM, setCurrentPageM] = useState(1);
  const [totalItemsM, setTotalItemsM] = useState(0);
  const [sortingM, setSortingM] = useState({ field: "", order: "" });
  const mheaders = [
    { name: "First Name", field: "mFirstName", sortable: true },
    { name: "Last Name", field: "mLastName", sortable: true },
    { name: "Email", field: "mEmail", sortable: true },
    { name: "Address", field: "mAddress", sortable: true },
    { name: "Phone Number #1", field: "mPhoneNumber1", sortable: true },
    { name: "Phone Number #2", field: "mPhoneNumber2", sortable: true },
    { name: "Telephone Number", field: "mTelNumber", sortable: true },
    { name: "Head Family", field: "headFamily", sortable: true },
    { name: "Sub Family", field: "subFamily", sortable: true },
    { name: "Sub Phone Number", field: "subPhoneNumber", sortable: true },
  ];


  const masterList = useMemo(() => {
    let master = masterListData;
    if (categoryM == "First Name") {
      if (searchM) {
        master = master.filter((acc) => acc.mFirstName.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Last Name") {
      if (searchM) {
        master = master.filter((acc) => acc.mLastName.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Email") {
      if (searchM) {
        master = master.filter((acc) => acc.mEmail.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Address") {
      if (searchM) {
        master = master.filter((acc) => acc.mAddress.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Phone Number") {
      if (searchM) {
        master = master.filter((acc) => acc.phoneNumber.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Address") {
      if (searchM) {
        master = master.filter((acc) => acc.address.toLowerCase().includes(searchM.toLowerCase()))
      }
    }
    else if (categoryM == "Registered Date") {
      if (startDateM) {
        master = master.filter((acc) => moment(acc.createdAt).isSameOrAfter(startDateM));
      }
      if (endDateM) {
        master = master.filter((acc) => moment(acc.createdAt).isSameOrBefore(moment(endDateM), 'day'));
      }
    }
    setTotalItemsM(master.length);
    if (sortingM.field) {
      const reversed = sortingM.order === "asc" ? 1 : -1;
      master = master.sort(
        (a, b) => reversed * a[sortingM.field].localeCompare(b[sortingM.field])
      );
    }
    return master.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }, [masterListData, currentPageM, searchM, startDateM, endDateM, sortingM]);

  function masterClose() {
    setmFirstName("");
    setmLastName("");
    setmEmail("");
    setmAddress("");
    setmPhoneNumber1("");
    setmPhoneNumber2("");
    setmTelNumber("");
    setheadFamily("");
    setsubFamily("");
    setsubPhoneNumber("");
    setVisible(false);

  }
    if (!decodedToken || decodedToken.role === "homeowners") {
        return (
            <Redirect to={'/'} />
        );
    }
    else{
      return (
    
        <div className="accounts-container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Accounts | Villboard</title>
          </Helmet>
          <div className="accounts-charts">
            <CChart
              className="chartMenu"
              type="bar"
              data={chartData}
              labels="months"
              height={70}
              options={options}
            />
          </div>
          {/* Master's List */}
          <div className="card-header">
            <h3>Master's List</h3>
          </div>
          <div className="account_inputs">
            {categoryM === 'Registered Date' ? (
              <div className="accI_horizontal">
                <h4>From: </h4>
                <DatePicker maxDate={moment().toDate()} selected={startDateM} className="datePicker" onChange={(date) => {
                  setStartDateM(date);
                  setCurrentPageM(1);
                }} />
                <h4>To: </h4>
                <DatePicker maxDate={moment().toDate()} minDate={moment(startDateM).toDate()} selected={endDateM} className="datePicker" onChange={(date) => {
                  setendDateM(date);
                  setCurrentPageM(1);
                }} />
              </div>
            ) : <Search
              onSearch={(val) => {
                setSearchM(val);
                setCurrentPageM(1);
              }}
            />}
            <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { MasterC(e) }}>
              <option value="First Name">First Name</option>
              <option value="Last Name">Last Name</option>
              <option value="Email">Email</option>
              <option value="Address">Address</option>
              <option value="Phone Number1">Phone Number #1</option>
              <option value="Phone Number2">Phone Number #2</option>
              <option value="Telephone Number">Telephone Number</option>
              <option value="Head Family">Head Family</option>
              <option value="Sub Family">Sub Family</option>
              <option value="Sub Phone Number">Sub Phone Number</option>
              {/* <option value="Registered Date">Registered Date</option> */}
            </CFormSelect>
            <button type="button" className="excelBtn" onClick={() => setVisible(!visible)}>Add Data</button>
              
            <>
              <CModal alignment="center" scrollable visible={visible} onClose={masterClose}>
                <CModalHeader>
                  <CModalTitle>Add Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mFirstName} onChange={(e) => setmFirstName(e.target.value.replace(/[^A-Za-z\s]+/gi, ""))} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">First Name:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mLastName} onChange={(e) => setmLastName(e.target.value.replace(/[^A-Za-z\s]+/gi, ""))} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Last Name:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mEmail} onChange={(e) => setmEmail(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Email:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mAddress} onChange={(e) => setmAddress(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Address:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mPhoneNumber1} onChange={(e) => setmPhoneNumber1(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Phone Number:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mPhoneNumber2} onChange={(e) => setmPhoneNumber2(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">2nd Phone Number(Optional):</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={mTelNumber} onChange={(e) => setmTelNumber(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Telephone Number:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={headFamily} onChange={(e) => setheadFamily(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Head Family name:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={subFamily} onChange={(e) => setsubFamily(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Sub Family name:</label>
                  </div>
                  <div className="visitor_input-field">
                    <input type="text" className="form-control"
                      value={subPhoneNumber} onChange={(e) => setsubPhoneNumber(e.target.value)} />
                    <div style={{ fontSize: 12, color: "red" }}>
                      { }
                    </div>
                    <label className="visit_label">Sub Phone Number:</label>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton color="success" onClick={addMaster}>Agree</CButton>
                </CModalFooter>
              </CModal>
            </>
          </div>
          <form>
            <Table striped bordered hover responsive className='accounts_table'>
              <TableHeader headers={mheaders} onSorting={(field, order) => setSortingM({ field, order })} />
              <tbody>
                {masterList.slice(
                  (currentPageM - 1) * item_per_page,
                  (currentPageM - 1) * item_per_page + item_per_page
                ).map(ms => (
                  <tr key={ms._id}>
                    <td>{ms.mFirstName.replace(/^a-z+/, (c) => c.toUpperCase())}</td>
                    <td>{ms.mLastName}</td>
                    <td>{ms.mEmail}</td>
                    <td>{ms.mAddress}</td>
                    <td>{ms.mPhoneNumber1.replace(/^0+/, "+63")}</td>
                    <td>{ms.mPhoneNumber2.replace(/^0+/, "+63")}</td>
                    <td>{ms.mTelNumber}</td>
                    <td>{ms.headFamily}</td>
                    <td>{ms.subFamily}</td>
                    <td>{ms.subPhoneNumber.replace(/^0+/, "+63")}</td>
                    {/* <td>{moment(ms.createdAt).format('lll')}</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="acc_paginationBtns">
              <Pagination
                total={totalItemsM}
                itemsPerPage={item_per_page}
                currentPage={currentPageM}
                onPageChange={page => setCurrentPageM(page)}
              />
            </div>
          </form>
          {/* Pending */}
          <div className="card-header">
            <h3>Pending</h3>
          </div>
          <div className="account_inputs">
            {categoryP === 'Registered Date' ? (
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
              <option value="Middle Initial">Middle Initial</option>
              <option value="Email">Email</option>
              <option value="Phone Number">Phone Number</option>
              <option value="Address">Address</option>
              <option value="Registered Date">Registered Date</option>
            </CFormSelect>
          </div>
          <form>
            <Table striped bordered hover responsive className="accounts_table">
              <TableHeader
                headers={pheaders}
                onSorting={(field, order) => setSortingPending({ field, order })}
              />
              <tbody>
                {/* ito yung sa approval nila pero ififilter pa gamit yung status ng account. */}
                {accountP.slice(
                  (currentPageM - 1) * item_per_page,
                  (currentPageM - 1) * item_per_page + item_per_page
                ).map((acc) => (
                  <Fragment key={acc?._id}>
                    <AccountPending
                      acc={acc}
                      key={acc._id}
                      // usersList={usersList}
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
          {/*Homeowners*/}
          <div className="card-header">
            <h3>Homeowners</h3>
          </div>
          <div className="account_inputs">
            {categoryH === 'Registered Date' ? (
              <div className="accI_horizontal">
                <h4>From: </h4>
                <DatePicker maxDate={moment().toDate()} selected={startDate} className="datePicker" onChange={(date) => {
                  setStartDate(date);
                  setCurrentPageH(1);
                }} />
                <h4>To: </h4>
                <DatePicker maxDate={moment().toDate()} minDate={moment(startDate).toDate()} selected={endDate} className="datePicker" onChange={(date) => {
                  setendDate(date);
                  setCurrentPageH(1);
                }} />
              </div>
            ) : <Search
              onSearch={(val) => {
                setSearchH(val);
                setCurrentPageH(1);
              }}
            />}
            <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { homeownerC(e) }}>
              <option value="Last Name">Last Name</option>
              <option value="First Name">First Name</option>
              <option value="Middle Initial">Middle Initial</option>
              <option value="Email">Email</option>
              <option value="Phone Number">Phone Number</option>
              <option value="Address">Address</option>
              <option value="Registered Date">Registered Date</option>
            </CFormSelect>
            {usersList.length !== 0 ? (
              <ExcelFile
                filename={"Accounts(" + date + ")"}
                element={<button type="button" className="excelBtn">Export Data</button>}>
                <ExcelSheet dataSet={[{
                  columns: [
                    { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Middle Initial", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                  ],
                  data: homeowners.map((data) => [
                    { value: data.lastName, style: { font: { sz: "14" } } },
                    { value: data.firstName, style: { font: { sz: "14" } } },
                    { value: data.middleInitial, style: { font: { sz: "14" } } },
                    { value: data.email, style: { font: { sz: "14" } } },
                    { value: data.phoneNumber, style: { font: { sz: "14" } } },
                    { value: data.address, style: { font: { sz: "14" } } },
                    { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                  ])
                }
                ]} name="Homeowner Accounts" />
              </ExcelFile>
            ) : null}
          </div>
          <form className="accounts_form">
            <Table striped bordered hover responsive className="accounts_table">
              <TableHeader
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {homeowners.slice(
                  (currentPageH - 1) * item_per_page,
                  (currentPageH - 1) * item_per_page + item_per_page
                ).map((acc) => (
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
                total={totalItemsH}
                itemsPerPage={item_per_page}
                currentPage={currentPageH}
                onPageChange={(page) => setCurrentPageH(page)}
              />
            </div>
          </form>
          {/*Security*/}
          <div className="card-header">
            <h3>Security</h3>
          </div>
          <div className="account_inputs">
            {categoryS === 'Registered Date' ? (
              <div className="accI_horizontal">
                <h4>From: </h4>
                <DatePicker maxDate={moment().toDate()} selected={startDateS} className="datePicker" onChange={(date) => {
                  setStartDateS(date);
                  setCurrentPageS(1);
                }} />
                <h4>To: </h4>
                <DatePicker maxDate={moment().toDate()} minDate={moment(startDateS).toDate()} selected={endDateS} className="datePicker" onChange={(date) => {
                  setendDateS(date);
                  setCurrentPageS(1);
                }} />
              </div>
            ) : <Search
              onSearch={(val) => {
                setSearchS(val);
                setCurrentPageS(1);
              }}
            />}
            <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { securityC(e) }}>
              <option value="Last Name">Last Name</option>
              <option value="First Name">First Name</option>
              <option value="Middle Initial">Middle Initial</option>
              <option value="Email">Email</option>
              <option value="Phone Number">Phone Number</option>
              <option value="Address">Address</option>
              <option value="Registered Date">Registered Date</option>
            </CFormSelect>
            {Security.length !== 0 ? (
              <ExcelFile
                filename={"Accounts(" + date + ")"}
                element={<button type="button" className="excelBtn">Export Data</button>}>
                <ExcelSheet dataSet={[{
                  columns: [
                    { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Middle Initial", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                  ],
                  data: Security.map((data) => [
                    { value: data.role, style: { font: { sz: "14" } } },
                    { value: data.lastName, style: { font: { sz: "14" } } },
                    { value: data.firstName, style: { font: { sz: "14" } } },
                    { value: data.middleInitial.toUpperCase(), style: { font: { sz: "14" } } },
                    { value: data.email, style: { font: { sz: "14" } } },
                    { value: data.phoneNumber, style: { font: { sz: "14" } } },
                    { value: data.address, style: { font: { sz: "14" } } },
                    { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                  ])
                }
                ]} name="Homeowner Accounts" />
              </ExcelFile>
            ) : null}
          </div>
          <form>
            <Table striped bordered hover responsive className="accounts_table">
              <TableHeader
                headers={sHeaders}
                onSorting={(field, order) => setSortingS({ field, order })}
              />
              <tbody>
                {Security.slice(
                  (currentPageS - 1) * item_per_page,
                  (currentPageS - 1) * item_per_page + item_per_page
                ).map((acc) => (
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
                total={totalItemsS}
                itemsPerPage={item_per_page}
                currentPage={currentPageS}
                onPageChange={(page) => setCurrentPageS(page)}
              />
            </div>
          </form>
          {/*Admin*/}
          <div className="card-header">
            <h3>Admin Accounts</h3>
          </div>
          <div className="account_inputs">
    
            {categoryA === 'Registered Date' ? (
              <div className="accI_horizontal">
                <h4>From: </h4>
                <DatePicker maxDate={moment().toDate()} selected={startDateA} className="datePicker" onChange={(date) => {
                  setStartDateA(date);
                  setCurrentPageA(1);
                }} />
                <h4>To: </h4>
                <DatePicker maxDate={moment().toDate()} minDate={moment(startDateA).toDate()} selected={endDateA} className="datePicker" onChange={(date) => {
                  setendDateA(date);
                  setCurrentPageA(1);
                }} />
              </div>
            ) : <Search
              onSearch={(val) => {
                setSearchA(val);
                setCurrentPageA(1);
              }}
            />}
            <CFormSelect size="lg" className="cat_select" aria-label="Large select example" onChange={(e) => { adminC(e) }}>
              <option value="">Open this Category</option>
              <option value="Last Name">Last Name</option>
              <option value="First Name">First Name</option>
              <option value="Middle Initial">Middle Initial</option>
              <option value="Email">Email</option>
              <option value="Phone Number">Phone Number</option>
              <option value="Address">Address</option>
            </CFormSelect>
            {/* {usersList.length !== 0 ? (
              <ExcelFile
                filename={"Accounts(" + date + ")"}
                element={<button type="button" className="btn btn-success float-right m-1">Export Data</button>}>
                <ExcelSheet dataSet={[{
                  columns: [
                    { title: "Role", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Last Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "First Name", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Middle Initial", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Email", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Phone Number", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Address", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                    { title: "Registered Date", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                  ],
                  data: homeowners.map((data) => [
                    { value: data.role, style: { font: { sz: "14" } } },
                    { value: data.lastName, style: { font: { sz: "14" } } },
                    { value: data.firstName, style: { font: { sz: "14" } } },
                    { value: data.middleInitial, style: { font: { sz: "14" } } },
                    { value: data.email, style: { font: { sz: "14" } } },
                    { value: data.phoneNumber, style: { font: { sz: "14" } } },
                    { value: data.address, style: { font: { sz: "14" } } },
                    { value: moment(data.createdAt).format('lll'), style: { font: { sz: "14" } } },
                  ])
                }
                ]} name="Homeowner Accounts" />
              </ExcelFile>
            ) : null} */}
          </div>
          <form>
            <Table striped bordered hover responsive className="accounts_table">
              <TableHeader
                headers={aheaders}
                onSorting={(field, order) => setSortingA({ field, order })}
              />
              <tbody>
                {admin.slice(
                  (currentPageA - 1) * item_per_page,
                  (currentPageA - 1) * item_per_page + item_per_page
                ).map((acc) => (
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
                total={totalItemsA}
                itemsPerPage={item_per_page}
                currentPage={currentPageA}
                onPageChange={(page) => setCurrentPageA(page)}
              />
            </div>
          </form>
        </div>
      );
    }
};

export default Accounts;
