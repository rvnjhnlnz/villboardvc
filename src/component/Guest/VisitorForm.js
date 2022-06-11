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
        setWord(`http://localhost:3000/Thankyou/?refNum=${encoded}`);
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

        if (!vHEmail) {
            vheError = "Please Enter the existing Homeowner's Email"
            isValid = false;
            console.log('5')
        }
        else if (typeof vHEmail !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(vHEmail)) {
                vheError = "Please Enter the valid Homeowner's Email"
                isValid = false;
                console.log("Homeowner's email");
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

        if (!checked) {
            checkedError = "Please read the terms and conditions to enable and check the checkbox"
            isValid = false;
            console.log('C')
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
        setChecked(true);
    }
    function close(e) {
        e.preventDefault()
        setVisible(false);
        settermsChecked(false);
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
                            <label className="visit_label">Person to visit: (Homeowner's Full Name) </label>
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
                                value={vHEmail} onChange={(e) => setvHEmail(e.target.value.replace(/[^A-Z-a-z0-9_.@-]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {vHEmail_errormessage}
                            </div>
                            <label className="visit_label">Homeowner's Email:</label>
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
                                        <p>Please read the terms and conditions before using our mobile application which is
                                            Villboard app and our website <a href="">www.villboardapp.com</a> the application is operated by the
                                            Villa Cares – sta. rosa laguna your access to and
                                            use of the service is conditioned on your acceptance and compliance with these terms.
                                            These terms apply to all visitors, homeowners who access our mobile and web application.
                                        </p>
                                        <p>By accessing or using the service you agree to be bound by these terms.
                                            If you disagree with any part of the terms, you may not access the service.</p>
                                        <h4>Privacy Policy</h4>
                                        <p>Villboard app understands that the security of your personal information is extremely important, and it is committed to respecting your privacy and safeguarding your personal data.</p>
                                        <p>The Villboard collect your personal information to upon registration so you can have access to the application “Personal Information” may include the following:</p>
                                        <p>1. Your [including family members, friends, beneficiaries, attorneys, attorneys-in-fact,
                                            shareholders, beneficial owners, members, representatives who contact the Company or may be
                                            contacted by the Company, whenever applicable and relevant (collectively, the “Related Person/s”]
                                            name, gender, birthday, marital status, nature of work, employment status/employer, social security/tax
                                            identification number, home address, e-mail address, contact information and other information
                                            from which your identity is apparent or can be reasonably and directly ascertained;</p>
                                        <p>2. Certain technical information, such us, but not limited to, IP addresses, internet
                                            browser used, and web pages accessed, your login information and Information about your
                                            visit to our websites including the full Uniform Resource Locators (URL) clickstream to, t
                                            hrough and from our websites (including date and time), products you viewed or searched for,
                                            pages you accessed, page response times, download errors, lengths of visits to certain pages,
                                            page interaction information (such as scrolling, clicks and mouse-overs), and methods used to
                                            browse away from the page.</p>
                                        <p>3. Information collected about your participation in our promotions and competitions or attendance
                                            at our events as provided in your application forms, recordings you or we have made, details of your
                                            guests in connection with any promotions and competitions you have entered or won, or other information
                                            related to your attendance at events, including any access assistance requirements you may have.</p>
                                        <p>4. Information about your use of our chat rooms, message boards, social media pages or other
                                            interactive forums including any comments, photos, videos or other information that you post online.</p>
                                        <p>5. Correspondence with you including any feedback, complaints and comments from you via telephone,
                                            email or records of any online, paper or in-person correspondence and interactions between us.
                                            If you have communicated with us by phone, we will collect details of the phone number you used to
                                            call us, and any information collected via a call recording; and</p>
                                        <p>6. Anti-fraud information relating to your situation, your creditworthiness or any criminal or
                                            fraudulent activities, provided to us by you or third parties.</p>
                                        <h4>Your Concent</h4>
                                        <p>By using the Company website, mobile applications, and other online services, you are consenting to the
                                            collection, generation, use, processing, storage, retention and disclosure of your Personal Information
                                            by the Company. </p>
                                        <p>In addition, there to, and with respect to Personal Information you disclosed or supplied about/from Related</p>
                                        <p>Person/s, it shall be your duty and responsibility to:</p>
                                        <p>1. To inform said Related Person/s of the purpose/s for which his/her/their
                                            Personal Information have been disclosed or supplied to the Company for collection and processing ;</p>
                                        <p>2. Obtain the necessary consent of said Related Person/s for the disclosure,
                                            collection and processing of his/her/their Personal Information.</p>
                                        <p>3. To inform the that such consent from said Related Person/s have been obtained</p>
                                        <h4>Use of Personal Information</h4>
                                        <p>The Company shall use your Personal Information for the following purposes: to provide you with
                                            details and information regarding our products and services; to process your availment/purchase of
                                            our products and/or services,  to conduct billing processing and other business transactions; to
                                            provide and manage products and services you have requested; to communicate effectively with you;
                                            to monitor activities and record our correspondence with you; to provide you with marketing materials;
                                            to understand our customers, and to develop and tailor our products and services; to run our promotions
                                            and competitions and our events; to prevent fraud; to conduct certain checks on you, such as KYC and
                                            credit checks; to improve and administer our websites, and to ensure that content is relevant; to
                                            reorganize or make changes to our business and to comply with legal and regulatory obligations.</p>
                                        <p>The Company may disclose your Personal Information to affiliates which means our third party partners,
                                            their subsidiaries, its ultimate holding company and its subsidiaries who may use it in connection with any
                                            of the purposes set out above. We will also share your personal data with third party service providers (such
                                            as providers of marketing, IT or administrative services) who may process it on our behalf for any of the
                                            purposes set out above. The Company may also disclose your Personal Information under any of the following
                                            circumstances: (i) required by law or by court decisions/processes; (ii) for information, update and marketing
                                            purposes; and (iii) for research purposes.</p>
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
                        <CModal scrollable visible={visible2} onClose={() => setVisible2(false)}>
                            <CModalHeader>
                                <CModalTitle>Visitors Digital Pass</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className="output-box">
                                    <img src={qrCode} alt="" />
                                    <h2>You may show your QR Code to the guard to identify your identity and for contact tracing</h2>
                                    <a href={qrCode} download="QRCode">
                                        <button type="button">Download</button>
                                    </a>
                                </div>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="success" onClick={thankyou}>Agree</CButton>
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
