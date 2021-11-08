import react from 'react';
import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import logo from '../../../images/background.png'
import { decodeToken, useJwt } from "react-jwt";
function Dog() {
    const decodedToken = decodeToken(localStorage.getItem('token'))

    const [pfirstName, setfirstName] = useState('');
    const [plastName, setlastName] = useState('');
    const [paddress, setAddress] = useState('');

    const [pphoneNumber, setPhoneNumber] = useState('');
    const [ppetname, setpetname] = useState('');
    const [ppetbreed, setpetbreed] = useState('');
    const [ppetgender, setpetgender] = useState('Male');
    const [ppemail, setppemail] = useState(decodedToken.email);


    const [pfirstname_errormassage, pfirstname_Seterrormessage] = useState('');
    const [plastname_errormessage, plastname_Seterrormessage] = useState('');
    const [paddress_errormessage, paddress_Seterrormessage] = useState('');
    const [pemail_errormessage, pemail_Seterrormessage] = useState('');
    const [pphoneNumber_errormessage, pphoneNumber_Seterrormessage] = useState('');
    const [ppetname_errormessage, ppetname_Seterrormessage] = useState('');
    const [ppetbreed_errormessage, ppetbreed_Seterrormessage] = useState('');



    const validate = () => {
        let isValid = true;
        let pfnError, plnError, padError, pemError, ppnError, ppbError, ppetError = "";

        if (!pfirstName) {

            pfnError = 'Please Enter your First Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof pfirstName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(pfirstName)) {

                pfnError = 'Please Enter your valid first name'
                isValid = false;
                console.log('First Name');
            }
        }

        if (!plastName) {
            plnError = 'Please Enter your Last Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof plastName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(plastName)) {

                plnError = 'Please Enter your valid last name'
                isValid = false;
                console.log('Last Name');
            }
        }

        if (!paddress) {

            padError = 'Please Enter your Address'
            isValid = false;
            console.log('3')
        }
        else if (typeof paddress !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(paddress)) {

                padError = 'Please enter valid address.'
                isValid = false;
                console.log('Address');
            }
        }

        if (!pphoneNumber) {
            ppnError = "Please enter your Phone Number"
            isValid = false;
            console.log('PN');
        }
        else if (typeof pphoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(pphoneNumber)) {
                ppnError = "Invalid Phone Number"
                isValid = false;
                console.log('pn1')
            }
        }

        if (!ppetname) {
            ppetError = "Please Enter your pet's Name"
            isValid = false;
            console.log('1')
        }
        else if (typeof ppetname !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(ppetname)) {

                ppetError = 'Please Enter valid Name'
                isValid = false;
                console.log('First Name');
            }
        }


        if (!ppetbreed) {
            ppbError = "Please Enter your Pet's Breed"
            isValid = false;
            console.log('1')
        }
        else if (typeof ppetbreed !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(ppetbreed)) {

                ppbError = 'Please Enter your valid first name'
                isValid = false;
                console.log('First Name');
            }
        }

        if (pfnError || plnError || padError || pemError || ppnError || ppbError || ppetError) {
            pfirstname_Seterrormessage(pfnError);
            plastname_Seterrormessage(plnError);
            paddress_Seterrormessage(padError);
            pemail_Seterrormessage(pemError);
            pphoneNumber_Seterrormessage(ppnError);
            ppetbreed_Seterrormessage(ppbError);
            ppetname_Seterrormessage(ppetError);
            return isValid;
        }
        return isValid;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = {
            pFirstName: pfirstName,
            pLastName: plastName,
            pAddress: paddress,
            pPhoneNumber: pphoneNumber,
            petName: ppetname,
            petBreed: ppetbreed,
            email: ppemail,
        };
        const isValid = validate();
        if (isValid) {
            console.log(data);
            axios.post('addPet', data).then(res => {
                console.log(res);
                alert("pet successful");
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div class="pet_container">
            <div className="pet_wrapper">
                <form className="pet_form">
                    <div class="pet_logo">
                    </div>
                    <div class="title">
                        Pet Registration
                    </div>
                    <div className="pet_input-field">
                        <input type="text" className="form-control" value={pfirstName} onChange={(e) => setfirstName(e.target.value)}
                            name="firstName" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {pfirstname_errormassage}
                        </div>
                        <label className="pet_label">First Name</label>
                    </div>
                    <div className="pet_input-field">
                        <input type="text" className="form-control" value={plastName} onChange={(e) => setlastName(e.target.value)}
                            name="lastName" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {plastname_errormessage}
                        </div>
                        <label className="pet_label">Last Name</label>
                    </div>
                    <div className="pet_input-field">
                        <input type="text" className="form-control" value={paddress} onChange={(e) => setAddress(e.target.value)}
                            name="address" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {paddress_errormessage}
                        </div>
                        <label className="pet_label">Address</label>
                    </div>

                    <div className="pet_input-field">
                        <input type="number" className="form-control" value={pphoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                            name="phoneNumber" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {pphoneNumber_errormessage}
                        </div>
                        <label className="pet_label">Phone Number</label>
                    </div>
                    <div class="pet_ownInfo">
                        <h5>Pet  Information</h5>
                    </div>
                    <div className="pet_input-field">
                        <input type="text" className="form-control" value={ppetname} onChange={(e) => setpetname(e.target.value)}
                            name="petName" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ppetname_errormessage}
                        </div>
                        <label className="pet_label">Pet Name</label>
                    </div>
                    <div className="pet_input-field">
                        <input type="text" className="form-control" value={ppetbreed} onChange={(e) => setpetbreed(e.target.value)}
                            name="petBreed" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ppetbreed_errormessage}
                        </div>
                        <label className="pet_label">Pet Breed</label>
                    </div>

                    <div className="pet_input-field">
                        <input type="submit" value='SUBMIT' className="pet_submitBtn" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dog
