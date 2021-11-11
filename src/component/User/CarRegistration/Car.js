
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
import { decodeToken, useJwt } from "react-jwt";
import './style.css'
import { Link, useHistory, useLocation } from 'react-router-dom';

function Car() {
    const decodedToken = decodeToken(localStorage.getItem('token'))
    const [cfirstName, setfirstName] = useState('');
    const [clastName, setlastName] = useState('');
    const [caddress, setAddress] = useState('');
    const [cphoneNumber, setPhoneNumber] = useState('');
    const [vehicleModel, setvehicleModel] = useState('');
    const [plateNumber, setplateNumber] = useState('');
    const [cpemail, setppemail] = useState(decodedToken.email);
    
    const [cfirstName_errormassage, cfirstname_Seterrormessage] = useState('');
    const [clastName_errormessage, clastname_Seterrormessage] = useState('');
    const [caddress_errormessage, caddress_Seterrormessage] = useState('');
    const [pemail_errormessage, cemail_Seterrormessage] = useState('');
    const [cphoneNumber_errormessage, cphoneNumber_Seterrormessage] = useState('');
    const [vehicleModel_errormessage, vehicleModel_Seterrormessage] = useState('');
    const [plateNumber_errormessage, plateNumber_Seterrormessage] = useState('');

    const [word, setWord] = useState([]);
    const [qrCode, setQrCode] = useState("");
    const [cModal, setcModal] = useState(false);
    let history = useHistory();
    useEffect(() => {
        setQrCode
            (`http://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(word)}`);
    }, [JSON.stringify(word)]);


    const validate = () => {
        let isValid = true;
        let cfnError, clnError, cadError, cpError, cvmError, cpnError = "";

        if (!cfirstName) {

            cfnError = 'Please Enter your First Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof cfirstName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(cfirstName)) {

                cfnError = 'Please Enter your valid first name'
                isValid = false;
                console.log('First Name');
            }
        }

        if (!clastName) {
            clnError = 'Please Enter your Last Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof clastName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(clastName)) {

                clnError = 'Please Enter your valid last name'
                isValid = false;
                console.log('Last Name');
            }
        }

        if (!caddress) {

            cadError = 'Please Enter your Address'
            isValid = false;
            console.log('3')
        }
        else if (typeof caddress !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(caddress)) {

                cadError = 'Please enter valid address.'
                isValid = false;
                console.log('Address');
            }
        }

        if (!cphoneNumber) {
            cpError = "Please enter your Phone Number"
            isValid = false;
            console.log('PN');
        }
        else if (typeof cphoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(cphoneNumber)) {
                cpError = "Invalid Phone Number"
                isValid = false;
                console.log('pn1')
            }
        }

        if (!vehicleModel) {
            cvmError = "Please Enter model of your vehicle"
            isValid = false;
            console.log('1')
        }
        else if (typeof vehicleModel !== "undefined") {
            var pattern = new RegExp(/[^A-Za-z0-9]+/);
            if (!pattern.test(vehicleModel)) {

                cvmError = 'Please Enter valid model of your vehicle'
                isValid = false;
                console.log('First Name');
            }
        }


        if (!plateNumber) {
            cpnError = "Please Enter your plate number"
            isValid = false;
            console.log('1')
        }
        else if (typeof plateNumber !== "undefined") {
            var pattern = new RegExp(/^[^+_=/*?@#$%&()'"|â„;:{}.,`~<>}{][^\\]{1,20}$/);
            if (!pattern.test(plateNumber)) {
                cpnError = 'Please Enter your valid plate number'
                isValid = false;
                console.log('First Name');
            }
        }
       
        if (cfnError || clnError || cadError || cpError || cvmError || cpnError) {
            cfirstname_Seterrormessage(cfnError);
            clastname_Seterrormessage(clnError);
            caddress_Seterrormessage(cadError);
            cphoneNumber_Seterrormessage(cpError);
            vehicleModel_Seterrormessage(cvmError);
            plateNumber_Seterrormessage(cpnError);
            return isValid;
        }
        return isValid;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = {
            cFirstName: cfirstName,
            cLastName: clastName,
            cAddress: caddress,
            cPhoneNumber: cphoneNumber,
            vehicleModel: vehicleModel,
            plateNumber: plateNumber,
            email: cpemail,
        };
            console.log(data);
            axios.post('addCar', data).then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Registered',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/");
                    } 
                  })
            }).catch(err => {
                console.log(err);
            });
        
    }
    function openModal() {

        const data = {
            cFirstName: cfirstName,
            cLastName: clastName,
            cAddress: caddress,
            cPhoneNumber: cphoneNumber,
            vehicleModel: vehicleModel,
            plateNumber: plateNumber,
            email: cpemail,
        };
        const isValid = validate();
        if(isValid){
            setcModal(true);
            setWord(data);
        }
    }
    return (
        <div class="car_container">
            <div className="car_wrapper">
                <form className="car_form">
                    <div class="car_logo">
                    </div>
                    <div class="title">
                        Vehicle Registration
                    </div>
                    <div className="car_input-field">
                        <input type="text" className="form-control" value={cfirstName} onChange={(e) => setfirstName(e.target.value)}
                            name="firstName" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {cfirstName_errormassage}
                        </div>
                        <label className="car_label">First Name</label>
                    </div>
                    <div className="car_input-field">
                    <input type="text" className="form-control" value={clastName} onChange={(e) => setlastName(e.target.value)}
                            name="lastName" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {clastName_errormessage}
                        </div>
                        <label className="car_label">Last Name</label>
                    </div>
                    <div className="car_input-field">
                    <input type="text" className="form-control" value={caddress} onChange={(e) => setAddress(e.target.value)}
                            name="address" />
                        <div style={{ fontSize: 12, color: "red" }}>
                        {caddress_errormessage}
                        </div>
                        <label className="car_label">Address</label>
                    </div>
                    <div className="car_input-field">
                    <input type="number" className="form-control" value={cphoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                            name="phonenumber" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {cphoneNumber_errormessage}
                        </div>
                        <label className="car_label">Phone Number</label>
                    </div>
                    <div class="car_ownInfo">
                        <h5>Vehicle Information</h5>
                    </div>
                    <div className="car_input-field">
                        <input type="text" className="form-control" value={vehicleModel} onChange={(e) => setvehicleModel(e.target.value)}
                            name="phonenumber" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {vehicleModel_errormessage}
                        </div>
                        <label className="car_label">Car Model</label>
                    </div>
                    <div className="car_input-field">
                    <input type="text" className="form-control" value={plateNumber} onChange={(e) => setplateNumber(e.target.value)}
                            name="plateNumber" />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {plateNumber_errormessage}
                        </div>
                        <label className="car_label">Plate Number</label>
                    </div>
                </form>
                    <div className="">
                        <input type="submit" value='SUBMIT' className="car_submitBtn" onClick={openModal} />
                    </div>
                    <Modal isOpen={cModal}
                        className="visitor_modalContainer"
                        shouldCloseOnOverlayClick={false}
                        onRequestClose={() => setcModal(false)}>
                        <div class='v_modal'>
                            <h2>Visitors Digital Pass</h2>
                            <div className="output-box">
                                <img src={qrCode} alt="" />
                                <h2>You may show your QR Code to the guard to identify your identity and for contact tracing</h2>
                                <a href={qrCode} download="QRCode">
                                    <button type="button">Download</button>
                                    <button type="button" onClick={handleSubmit}>Ok</button>
                                </a>
                            </div>
                        </div>
                    </Modal>
            </div>
        </div>
    )
}

export default Car