import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Modal from 'react-modal'
import './visitor.css'
import { useHistory } from "react-router-dom";
import Logo from '../../images/background.png'
import { decodeToken, useJwt } from "react-jwt";
import { Redirect, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { saveAs } from 'file-saver'
import {Helmet} from "react-helmet";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
function VisitorForm() {
    /*const [temp, setTemp] = useState("");
    */

    const [vName, setvName] = useState("");
    const [vEmail, setvEmail] = useState("");
    const [vAddress, setvAddress] = useState("");
    const [vHomeowner, setvHomeowner] = useState("");
    const [vHPhoneNumber, setvHPhoneNumber] = useState("");
    const [vHEmail, setvHEmail] = useState("");
    const [vHaddress, setvHaddress] = useState("");
    const [vPurpose, setvPurpose] = useState("");

    const [checked, setChecked] = useState(false);
    const [termsChecked, settermsChecked] = useState(true);
    const [vModal, setvModal] = useState(false);
    const [termsModal, setTermsModal] = useState(false);

    const [vName_errormessage, vName_Seterrormessage] = useState('');
    const [vEmail_errormessage, vEmail_Seterrormessage] = useState('');
    const [vAddress_errormessage, vAddress_Seterrormessage] = useState('');
    const [vHomeowner_errormessage, vHomeowner_Seterrormessage] = useState('');
    const [vHPhoneNumber_errormessage, setvHPhoneNumber_Seterrormessage] = useState("");
    const [vHEmail_errormessage, setvHEmail_Seterrormessage] = useState("");
    const [vHaddress_errormessage, vHaddress_Seterrormessage] = useState('');
    const [vPurpose_errormessage, vPurpose_Seterrormessage] = useState('');
    const [vTerms_errormessage, vTerms_Seterrormessage] = useState('');

    const [visible, setVisible] = useState(false);




    let history = useHistory();
    // Changing the URL only when the user
    // changes the input

    // Updating the input word when user
    // click on the generate button

    //testing
    const [visible2, setVisible2] = useState(false);
    const [word, setWord] = useState("");
    const [qrCode, setQrCode] = useState("");
    
    useEffect(() => {
        setQrCode
            (`http://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(word)}`);
    }, [JSON.stringify(word)]);

    const location = useLocation();

    const useQueryString = () => {
        const location = useLocation();
        return new URLSearchParams(location.search);
    }
    const queryString = useQueryString();
    const randomNumber = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    const [referenceNumber, setNum] = useState(randomNumber.toString());

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const click = () => {
        setNum(randomNumberInRange(1000000, 9999999));
    };

    function toQrCode(){
        vTerms_Seterrormessage('');
        const data = {
            fullName: vName,
            emailV: vEmail,
            address: vAddress,
            personVisit: vHomeowner,
            contactHomeOwner: vHPhoneNumber,
            emailHomeOwner: vHEmail,
            homeOwnerAddress: vHaddress,
            purpose: vPurpose,
            referenceNumber: referenceNumber,
        };
        console.log(data);
        const isValid = validate();
        if(isValid){
            setVisible2(!visible2)
        console.log(referenceNumber);
        let encoded = base64_encode(`${referenceNumber}`);
        console.log(encoded)
        setWord(`https://villboard-23c49.web.app/Thankyou/?refNum=${encoded}`);
            axios.post('addVisitor', data).then(res => {
                console.log(res);
                console.log(word);
                // Swal.fire({
                //     icon: 'success',
                //     title: "Successful! \n Please wait and check your email for admin's approval to visit. Thank you!",
                //     confirmButtonText: 'Ok',
                // }).then((result) => {
                //     /* Read more about isConfirmed, isDenied below */
                //     if (result.isConfirmed) {
                //         history.push("/");
                //     }
                // })

            }).catch(err => {
                console.log(err);
            });
        }
    }

    function thankyou(){
        Swal.fire({
                    icon: 'success',
                    title: "Successful! \n Please wait and check your email for admin's approval to visit. Thank you!",
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push("/");
                    }
                })
    }
    //
    const validate = () => {
        let isValid = true;
        let nError, eError, aError, hError, vaError, vheError, vhpError, pError, checkedError = "";
        if (!vName) {
            nError = 'Please Enter your Full Name'
            isValid = false;
            console.log('1')
        }
        else if (typeof vName !== "undefined") {
            var pattern = new RegExp(/[^A-Za-z]+/gi);
            if (!pattern.test(vName)) {
                nError = 'Please Enter your valid full name'
                isValid = false;
            }
        }
        if (!vEmail) {
            eError = 'Please Enter your Email Address'
            isValid = false;
            console.log('2')
        }
        else if (typeof vEmail !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(vEmail)) {
                eError = 'Please enter valid email address.'
                isValid = false;
                console.log('Email');
            }
        }

        if (!vAddress) {
            aError = 'Please Enter your Address'
            isValid = false;
            console.log('3')
        }
        else if (typeof vAddress !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(vAddress)) {

                aError = 'Please enter valid address.'
                isValid = false;
                console.log('Address');
            }
        }

        if (!vHomeowner) {
            hError = "Please Enter the existing Homeowner's name"
            isValid = false;
            console.log('4')
        }
        else if (typeof vHomeowner !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(vHomeowner)) {
                hError = "Please Enter the valid Homeowner's name"
                isValid = false;
                console.log("Homeowner's name");
            }
        }
        if (!vHPhoneNumber) {
            vhpError = "Please Enter the existing Homeowner's Contact Number"
            isValid = false;
            console.log('5')
        }
        else if (typeof vHPhoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(vHPhoneNumber)) {
                vhpError = "Please Enter the valid Homeowner's Contact Number"
                isValid = false;
                console.log("Homeowner's ph");
            }
        }


        if (!vHaddress) {
            vaError = "Please Enter the existing Homeowner's address"
            isValid = false;
            console.log('6')
        }
        else if (typeof vHaddress !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(vHaddress)) {
                vaError = "Please Enter the existing Homeowner's address"
                isValid = false;
                console.log("Homeowner's address");
            }
        }

        if (!vPurpose) {
            pError = "Please Enter your purpose"
            isValid = false;
            console.log('6')
        }
        else if (typeof vPurpose !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(vPurpose)) {
                pError = "Please Enter your purpose"
                isValid = false;
                console.log("Purpose");
            }
        }

        if (checked == false) {
            checkedError = "Please read the terms and conditions to enable and check the checkbox"
            isValid = false;
            console.log('C')
        }
        else if(checked == true){
            checkedError = ""
        }

        if (nError || eError || aError || hError || vaError || vheError || vhpError || pError || checkedError) {
            vName_Seterrormessage(nError);
            vEmail_Seterrormessage(eError);
            vAddress_Seterrormessage(aError);
            vHomeowner_Seterrormessage(hError);
            vHaddress_Seterrormessage(vaError);
            vPurpose_Seterrormessage(pError);
            vTerms_Seterrormessage(checkedError);
            setvHPhoneNumber_Seterrormessage(vhpError)
            setvHEmail_Seterrormessage(vheError)
            return isValid;
        }
        return isValid;
    }

    function handleSubmit(e) {
        Swal.fire({
                icon: 'success',
                title: "Successful! \n Please wait and check your email for admin's approval to visit. Thank you!",
                confirmButtonText: 'Ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push("/");
                }
            })
    }
    const isChecked = () => {
        setChecked(!checked);
        console.log(checked);
    }
    function close(e) {
        e.preventDefault()
        setVisible(false);
        settermsChecked(!termsChecked);
    }
    function openModal() {

        const data = {
            fullName: vName,
            emailV: vEmail,
            address: vAddress,
            personVisit: vHomeowner,
            homeOwnerAddress: vHaddress,
            purpose: vPurpose,
        };
        const isValid = validate();
        if (isValid) {
            setvModal(true);
            setWord(data);
        }
    }
    const decodedToken = decodeToken(localStorage.getItem('token'));
    if (decodedToken) {
        return (
            <Redirect to={'/'} />
        )
    }
    else {
        return (
            <div class="v_container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Visitor | Villboard</title>
            </Helmet>
                <div>
                    <form className="v_form">
                        <header className="visitor_logo"><img src={Logo} /></header>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vName} onChange={(e) => setvName(e.target.value.replace(/[^A-Za-z\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vName_errormessage}
                            </div>
                            <label className="visit_label">Full Name:</label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vEmail} onChange={(e) => setvEmail(e.target.value.replace(/[^A-Z-a-z0-9_.@-\s]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vEmail_errormessage}
                            </div>
                            <label className="visit_label">Email:</label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vAddress} onChange={(e) => setvAddress(e.target.value.replace(/[^A-Z-a-z0-9!@#_.,\s]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vAddress_errormessage}
                            </div>
                            <label className="visit_label">Address:</label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vHomeowner} onChange={(e) => setvHomeowner(e.target.value.replace(/[^A-Za-z0-9\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vHomeowner_errormessage}
                            </div>
                            <label className="visit_label">Homeowner's Full name: </label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vHPhoneNumber} onChange={(e) => setvHPhoneNumber(e.target.value.replace(/[^0-9+]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vHPhoneNumber_errormessage}
                            </div>
                            <label className="visit_label">Homeowner's Contact Number:</label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                /* value={vHEmail} onChange={(e) => (e.target.value.replace(/[^A-Z-a-z0-9_.@-]+/, ""))} */ />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vHEmail_errormessage}
                            </div>
                            <label className="visit_label">Homeowner's Landline:</label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vHaddress} onChange={(e) => setvHaddress(e.target.value.replace(/[^A-Z-a-z0-9!@#_.,\s]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vHaddress_errormessage}
                            </div>
                            <label className="visit_label">Homeowner's Address: </label>
                        </div>
                        <div className="visitor_input-field">
                            <input type="text" className="form-control"
                                value={vPurpose} onChange={(e) => setvPurpose(e.target.value.replace(/[^A-Za-z\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vPurpose_errormessage}
                            </div>
                            <label className="visit_label">Purpose: </label>
                        </div>
                        <div className="visitor_check-field">
                            <input type="checkbox"
                                className="visitor_terms"
                                disabled={termsChecked}
                                onChange={isChecked}
                            />
                            <a onClick={() => setVisible(!visible)} className="visitor_link">Terms and Conditions</a>
                            <>
                                <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
                                    <CModalHeader>
                                        <CModalTitle>Terms and Conditions</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <p>Please read these Terms and Conditions of Use carefully. <br></br>
                                        </p>
                                        <p>Villboard application and our website <a href="https://villboard-23c49.web.app/">https://villboard-23c49.web.app/</a>
                                        the application is operated by the Villa Cares – sta. rosa laguna your access to and use of the service 
                                        is conditioned on your acceptance and compliance with these terms. 
                                        These terms apply to all visitors, homeowners who access our mobile and web application.</p>
                                        <h4>Privacy Policy</h4>
                                        <p>Villboard app understands that the security of your personal information is extremely important, and it is committed to respecting your privacy and safeguarding your personal data.</p>
                                        <p>Your Name, Home address, e-mail address, contact information and other information from which your identity is apparent or can be reasonably and directly ascertained.
                                         Personal data collected shall be used by the company and only within the mobile application, and web server. By default, user’s </p>
                                        <p>personal information is only shown for the user itself. It will be discretion of the user to make personal information visible to other user as well within the application.
                                         Only the person in charge in handling the admin side of the Application and Web will be the one who can be able to see your personal information.
                                         But in QR code you get when you registered your PET and/or VEHICLE, your information will be seen by someone who scanned the QR Code. </p>
                                        <p>They govern and apply to your access and use of the services offered through the VillBoard Application. 
                                        By accessing or using the VillBoard Application or the Village website, you agree to comply with and be bound by all the Terms and Conditions described below. 
                                        If you do not agree to these Terms and Conditions, you are not authorized to use the VillBoard Application.
                                        Your right to use the VillBoard Application will need to be approved by the Company and the Company may remove your right to use the 
                                        VillBoard Application at any time by revoking your Validly Issued Login. </p>
                                        <h4>Data Privacy</h4>
                                        <p>VillBoard is committed to protecting your right to privacy. 
                                        We give utmost importance to data protection wherein all personal information shall be handled with confidentiality and security. Thus,
                                         VillBoard commits to ensure that all personal data obtained either manually or electronically. 
                                         The Information Collected will be stored in remote third-party database (MongoDB) which is securely stored as per their privacy policy
                                        MongoDB., Inc. is committed in protecting your privacy. We only collect your personal information with your knowledge and permission
                                        . All data gathered will be used for the purpose of sending information, updates. </p>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="success" onClick={close}>Agree</CButton>
                                    </CModalFooter>
                                </CModal>
                            </>
                        </div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {vTerms_errormessage}
                        </div>
                    </form>
                    <div className="visitor_input-field">
                        {/*testing */}
                        <input type="submit" value='SUBMIT' className="visitor_submitBtn" onClick={toQrCode} />
                        <CModal alignment="center" scrollable visible={visible2} onClose={() => setVisible2(false)}>
                            <CModalHeader closeButton = {false}>
                                <CModalTitle>Visitors Digital Pass</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className="output-box">
                                    <img src={qrCode} alt="" />
                                    <h2>You may show your QR Code to the guard to identify your identity and for contact tracing</h2>
                                    <a href={qrCode}  download/>
                                        <button type="button"onClick={() =>  saveAs(qrCode, 'image.jpg')}>Download</button>
                                </div>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="success" onClick={thankyou}>Okay</CButton>
                            </CModalFooter>
                        </CModal>
                        {/*testing */}
                    </div>

                </div>
            </div>
        );
    }

}

export default VisitorForm