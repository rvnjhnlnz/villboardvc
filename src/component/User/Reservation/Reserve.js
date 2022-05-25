import React, { Fragment, useState } from 'react'
import axios from 'axios'
import './styles.css'
import { decodeToken } from "react-jwt";
// import { Link, useHistory, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
// import logo from '../../../images/background.png'
// import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

function Reserve({ history }) {
    // const [r_modalIsOpen, r_setModalIsOpen] = useState(false);
    const decodedToken = decodeToken(localStorage.getItem('token'))
    const [rFirstName, setrFirstName] = useState('');
    const [rLastName, setrLastName] = useState('');
    const [rAddress, setrAddress] = useState('');
    const [rPhoneNumber, setrPhoneNumber] = useState('');
    const [rVenue, setrVenue] = useState('Clubhouse');
    // const[rtimeStarted, setrtimeStarted] = useState('');
    // const[rtimeEnded, setrtimeEnded] = useState('');
    const [rTime, setrTime] = useState('8:00am - 12:00pm');
    const [rDate, setrDate] = useState(new Date());

    function handleSelect(e) {
        console.log(e.target.value);
        setrVenue(e.target.value);
    }
    function handleTime(e) {
        console.log(e.target.value);
        setrTime(e.target.value);
    }
    // let history = useHistory();
    function handleSubmit() {
        console.log(decodedToken)
        const data = {
            rFirstName: rFirstName,
            rLastName: rLastName,
            rAddress: rAddress,
            rPhoneNumber: rPhoneNumber,
            venue: rVenue,
            reservationTime: rTime,
            reservationDate: rDate,
            userId: decodedToken._id
        }
        console.log(data)
        axios.post('addReservation', data).then(res => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Successfully Registered, Wait to validate your reservation',
                confirmButtonText: 'Ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    // history.push("/");
                }
            })
        }).catch(err => {
            console.log(err);
        });

    }
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div class="dr_container">
                <div className="dr_wrapper">
                    <form className="reserve_form">
                        <div class="dr_logo">
                        </div>
                        <div class="title">
                            Reservation
                        </div>
                        <div className="reserve_input-field">
                            <select className="form-control" onChange={(e) => { handleSelect(e) }}>
                                <option value="Clubhouse">Clubhouse</option>
                                <option value="Volleyball Court">Volleyball Court</option>
                                <option value="Basketball Court">Basketball Court</option>
                                <option value="Swimming Pool">Swimming Pool</option>
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">Amenities</label>
                        </div>
                        {/* <div > */}
                        <Fragment>
                            <KeyboardDatePicker className='keyDate'
                                variant="inline"
                                inputVariant="outlined"
                                label="Date"
                                format="MM/DD/YYYY" autoOk={true}
                                value={rDate}
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => setrDate(date)}
                                disablePast={true}
                                placeholder='MM/DD/YYYY'
                            />

                        </Fragment>
                        {/* <DatePicker/> */}
                        {/* <input type="date" className="form-control" name="number" id="date" placeholder="Date"
                            onChange={(e) => setrDate(e.target.value)}
                        /> */}
                        {/* <div style={{ fontSize: 12, color: "red" }}> */}

                        {/* </div> */}
                        {/* <label className="reserve_label">Date</label> */}
                        {/* </div> */}
                        <div className="reserve_input-field">
                            <select className="form-control" onChange={(e) => { handleTime(e) }}>
                                <option value="8:00am - 12:00pm">8:00am - 12:00pm</option>
                                <option value="1:00pm - 4:00pm">1:00pm - 4:00pm</option>
                                <option value="5:00pm - 8:00pm">5:00pm - 8:00pm</option>
                                <option value="9:00pm - 12:00am">9:00pm - 12:00am</option>
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">Amenities</label>
                        </div>
                        <div className="reserve_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setrFirstName(e.target.value)} name="firstName" />
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">First Name</label>
                        </div>
                        <div className="reserve_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setrLastName(e.target.value)} name="lastName" />
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">Last Name</label>
                        </div>
                        <div className="reserve_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setrAddress(e.target.value)} name="address" />
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">Address</label>
                        </div>
                        <div className="reserve_input-field">
                            <input type="number" className="form-control"
                                onChange={(e) => setrPhoneNumber(e.target.value)} name="phoneNumber" />
                            <div style={{ fontSize: 12, color: "red" }}>

                            </div>
                            <label className="reserve_label">Phone Number</label>
                        </div>



                    </form>
                    <div className="">
                        <input type="submit" value='SUBMIT' className="reserve_submitBtn" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default Reserve