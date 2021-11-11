import react from 'react';
import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import logo from '../../../images/background.png'
import Modal from 'react-modal'
import { decodeToken } from "react-jwt";
import Swal from 'sweetalert2/dist/sweetalert2.js'
function Upload() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    const [ut_modalIsOpen, ut_setModalIsOpen] = useState(false);
    const [ut_firstname, setFirstName] = useState('');
    const [ut_lastname, setLastName] = useState('');
    const [ut_address, setAddress] = useState('');
    const [ut_phoneNumber, setPhoneNumber] = useState('');
    const [ut_refnumber, setRefnumber] = useState('');
    const [ut_typeTransaction, setTypeTransaction] = useState('Gcash');
    const [ut_proofPayment, setProofPayment] = useState(null);

    const [utchecked, setChecked] = useState(false);
    const [uttermsChecked, settermsChecked] = useState(true);
    const [utModal, setvModal] = useState(false);
    const [uttermsModal, setTermsModal] = useState(false);

    const [ut_firstname_errormassage, ut_firstname_Seterrormessage] = useState('');
    const [ut_lastname_errormessage, ut_lastname_Seterrormessage] = useState('');
    const [ut_email_errormessage, ut_email_Seterrormessage] = useState('');
    const [ut_address_errormessage, ut_address_Seterrormessage] = useState('');
    const [ut_phoneNumber_errormessage, ut_phoneNumber_Seterrormessage] = useState('');
    const [ut_refnumber_errormessage, ut_refnumber_Seterrormessage] = useState('');
    const [ut_typeTransaction_errormessage, ut_typeTransaction_Seterrormessage] = useState('');
    const [ut_proofPayment_errormessage, ut_proofPayment_Seterrormessage] = useState('');

    const validate = () => {
        let isValid = true;
        let fnError, lnError, adError, emError, pnError, rfError, ttError, ppError = "";

        if (!ut_firstname) {
            
            fnError = 'Please Enter your First Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof ut_firstname!== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(ut_firstname)) {
                
                fnError = 'Please Enter your valid first name'
                isValid = false;
                console.log('First Name');
            }
        }


        if (!ut_lastname){
            lnError = 'Please Enter your First Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof ut_lastname!== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(ut_lastname)) {
                fnError = 'Please Enter your valid last name'
                isValid = false;
                console.log('Last Name');
            }
        }

	

        if (!ut_address) {
            adError = 'Please Enter your Address'
            isValid = false;
            console.log('3')
        }
        else if (typeof ut_address!== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(ut_address)) {
                
                adError = 'Please enter valid address.'
                isValid = false;
                console.log('Address');
            }
        }

       if (!ut_phoneNumber) {
            pnError = "Please enter your Phone Number"
            isValid = false;
            console.log('PN');
        }
        else if (typeof ut_phoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(ut_phoneNumber )) {
                pnError = "Invalid Phone Number"
                isValid = false;
                console.log('pn1')
            }
        }
        
       if (!ut_refnumber) {
            rfError = "Please enter valid Reference Number"
            isValid = false;
            console.log('PN');
        }
        else if (typeof ut_refnumber !== "undefined") {
            var pattern = new RegExp(/\d+/);
            if (!pattern.test(ut_refnumber)) {
                pnError = "Please enter valid reference number"
                isValid = false;
                console.log('Invalid Reference Number')
            }
        }
	if(ut_proofPayment == null){
		ppError = "No file Found"
                isValid = false;
                console.log('No file Found')
	} 
        if (fnError || lnError || adError || emError  || pnError || rfError || ttError || ppError) {
            ut_firstname_Seterrormessage(fnError);
	        ut_lastname_Seterrormessage(lnError);
            ut_address_Seterrormessage(adError);
            ut_email_Seterrormessage(emError);
            ut_phoneNumber_Seterrormessage(pnError);
            ut_refnumber_Seterrormessage(rfError);
            ut_typeTransaction_Seterrormessage(ttError);
            ut_proofPayment_Seterrormessage(ppError);
            return isValid;
        }
        return isValid;
    }


    function handleFile(e) {
        console.log(e.target.files);
        console.log(e.target.files[0]);
        setProofPayment(e.target.files[0]);
    }
    function handleSelect(e) {
        console.log(e.target.value);
        setTypeTransaction(e.target.value);
    }
    let history = useHistory();
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('uFirstName', ut_firstname);
        fd.append('uLastName', ut_lastname);
        fd.append('uAddress', ut_address);
        fd.append('email', decodedToken.email);
        fd.append('uPhoneNumber', ut_phoneNumber);
        fd.append('refNumber', ut_refnumber);
        fd.append('typeTransaction', ut_typeTransaction);
        fd.append('proofPayment', ut_proofPayment);
        const isValid = validate();
        if(isValid){
        axios.post('addPayment', fd).then(res => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Successfully Submitted. Wait to validate your proof of payment',
                confirmButtonText: 'Save',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push('/');
                } 
              })
        }).catch(err => {
            console.log(err);
        });
    }
    }  //<Navbar/>
    return (
        <div class="ut_container">
            <div className="ut_wrapper">
                <form className="v_form">
                    <div class="ut_logo">
                    </div>
                    <div class="title">
                        Upload Transaction
                    </div>
                    <div className="upload_input-field">
                        <input type="text" className="form-control"
                            name="firstName" value={ut_firstname} onChange={(e) => setFirstName(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                                {ut_firstname_errormassage}
                        </div>
                        <label className="upload_label">First Name</label>
                    </div>
                    <div className="upload_input-field">
                        <input type="text" className="form-control"
                            name="lastName" value={ut_lastname} onChange={(e) => setLastName(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                                {ut_lastname_errormessage}
                        </div>
                        <label className="upload_label">Last Name</label>
                    </div>
                    <div className="upload_input-field">
                        <input type="text" className="form-control"
                            name="address" value={ut_address} onChange={(e) => setAddress(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ut_address_errormessage}
                        </div>
                        <label className="upload_label">Address</label>
                    </div>
                    <div className="upload_input-field">
                        <input type="number" className="form-control"
                            name="phoneNumber" value={ut_phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ut_phoneNumber_errormessage}
                        </div>
                        <label className="upload_label">Phone Number</label>
                    </div>
                    <div className="upload_input-field">
                        <input type="number" className="form-control"
                            name="refNumber" value={ut_refnumber} onChange={(e) => setRefnumber(e.target.value)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ut_refnumber_errormessage}
                        </div>
                        <label className="upload_label">Reference Number</label>
                    </div>
                    <div className="upload_input-field">
                        <select onChange={(e) => { handleSelect(e) }} className="form-control">
                            <option value="Gcash">Gcash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                        <div style={{ fontSize: 12, color: "red" }}>
                        </div>
                        <label className="upload_label">Mode of Payment</label>
                    </div>
                    <div className="upload_input-field">
                        <input type="file" className="form-control1" onChange={(e) => handleFile(e)} />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {ut_proofPayment_errormessage}
                        </div>
                        <label className="upload_label">Upload File</label>
                    </div>
                </form>
                <div className="">
                    <input type="submit" value='SUBMIT' className="upload_submitBtn" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Upload