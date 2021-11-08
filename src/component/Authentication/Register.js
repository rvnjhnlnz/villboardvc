import React, { useState } from 'react';
import axios from 'axios'
import './Register.css'
import Navbar from '../Navbar/Navbar';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import Modal from 'react-modal'
import { signup } from '../../actions/auth'
import ClearIcon from '@material-ui/icons/Clear';
import Logo from '../../images/background.png'
import Swal from 'sweetalert2/dist/sweetalert2.js'
function Register() {

    const [firstName, setFirstName] = useState('');
    const [fnError, setfnError] = useState('');
    const [middleInitial, setmiddleInitial] = useState('');
    const [mnError, setmnError] = useState('');
    const [lastName, setlastName] = useState('');
    const [lnError, setlnError] = useState('');
    const [address, setaddress] = useState('');
    const [aError, setaError] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [pnError, setpnError] = useState('');
    const [email, setemail] = useState('');
    const [eError, seteError] = useState('');
    const [password, setpassword] = useState('');
    const [pError, setpError] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    const [cpError, setcpError] = useState('');
    const [checkedError, setcheckedError] = useState('');
    const [checked, setchecked] = useState(false);
    const [rModal, setrModal] = useState(false);
    const [termsChecked, settermsChecked] = useState(true);
    const validate = () => {
        let eError, pError, fnError, mnError, lnError, aError, pnError, cpError, checkedError = "";
        let isValid = true;

        if (!firstName) {
            fnError = "Please enter your First Name"
            isValid = false;
            console.log('FN');
        }
        else if (typeof firstName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(firstName)) {
                fnError = "Please enter valid first name"
                isValid = false;
                console.log('fn1')
            }
        }
        if (!middleInitial) {
            mnError = "Please enter your Middle Initial"
            isValid = false;
            console.log('MI');
        }
        else if (typeof middleInitial !== "undefined") {
            var pattern = new RegExp(/^[a-zA-Z]{1}$/);
            if (!pattern.test(middleInitial)) {
                mnError = "Please enter your first letter of your middle name"
                isValid = false;
                console.log('mn1')
            }
        }
        if (!lastName) {
            lnError = "Please enter your Last Name"
            isValid = false;
            console.log('LN');
        }
        else if (typeof lastName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(lastName)) {
                lnError = "Please enter valid last name"
                isValid = false;
                console.log('ln1')
            }
        }
        if (!address) {
            aError = "Please enter your Home Address"
            isValid = false;
            console.log('HA');
        }
        else if (typeof address !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(address)) {
                aError = "Please enter valid address"
                isValid = false;
                console.log('ha1')
            }
        }
        if (!phoneNumber) {
            pnError = "Please enter your Phone Number"
            isValid = false;
            console.log('PN');
        }
        else if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(phoneNumber)) {
                pnError = "Please enter valid phone number"
                isValid = false;
                console.log('pn1')
            }
        }
        if (!email) {
            eError = "Please enter your email Address"
            isValid = false;
            console.log('E')
        }
        else if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                eError = "Please enter valid email address."
                isValid = false;
                console.log('e1')
            }
        }
        if (!password) {
            pError = "Please enter your password"
            isValid = false;
            console.log('P')
        }

        if (!confirmPass) {
            cpError = "Please enter your password"
            isValid = false;
            console.log('P')
        }
        if (password !== confirmPass) {
            cpError = "Those Passwords didn't match. Try Again"
            isValid = false;
        }
        if (!checked) {
            checkedError = "Please read the terms and conditions to enable and check the checkbox"
            isValid = false;
            console.log('C')
        }
        if (fnError || mnError || lnError || aError || pnError || eError || pError || cpError || checkedError) {
            setfnError(fnError)
            setmnError(mnError)
            setlnError(lnError)
            setaError(aError)
            setpnError(pnError)
            seteError(eError)
            setpError(pError)
            setcpError(cpError)
            setcheckedError(checkedError)
            return isValid;
        }
        return isValid;
    }
    function openModal(e) {
        e.preventDefault()
        setrModal(true);
    }

    function closeModal(e) {
        e.preventDefault()
        setrModal(false);
        settermsChecked(false);
    }
    let history = useHistory();
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        const data = {
            firstName: firstName,
            middleInitial: middleInitial,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        }
        if (isValid) {
            Swal.fire({
                icon: 'success',
                title: 'Register Successful!!',
                confirmButtonText: 'Save',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post('addUser', data).then(res => {
                        console.log(data);
                        history.push('/Login');
                    }).catch(err => {
                        console.log(err);
                    });
                } 
              })
            
        }
    }
    const isChecked = () => {
        setchecked(true);
    }
    return (
        <div>
            <div className="r_wrapper">
                <div class="r_container">
                    <header className="r_logo"><img src={Logo} /></header>
                    <form>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setFirstName(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {fnError}
                            </div>
                            <label className="r_label">First Name</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setmiddleInitial(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {mnError}
                            </div>
                            <label className="r_label">Middle Initial</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setlastName(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {lnError}
                            </div>
                            <label className="r_label">Last Name</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setaddress(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {aError}
                            </div>
                            <label className="r_label">Address</label>
                        </div>
                        <div className="register_input-field">
                            <input type="number" className="form-control"
                                onChange={(e) => setphoneNumber(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {pnError}
                            </div>
                            <label className="r_label">Phone Number</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                                onChange={(e) => setemail(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {eError}
                            </div>
                            <label className="r_label">Email Address</label>
                        </div>
                        <div className="register_input-field">
                            <input type="password" className="form-control"
                                onChange={(e) => setpassword(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {pError}
                            </div>
                            <label className="r_label">Password</label>
                        </div>
                        <div className="register_input-field">
                            <input type="password" className="form-control"
                                onChange={(e) => setconfirmPass(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {cpError}
                            </div>
                            <label className="r_label">Confirm Password</label>
                        </div>

                        <div className="register_check-field">
                            <input type="checkbox"
                                className="register_terms"
                                disabled={termsChecked}
                                onChange={isChecked}
                            />
                            <a onClick={openModal} className="register_link">Terms and Conditions</a>
                            <Modal isOpen={rModal}
                                className="r_modalContainer"
                                shouldCloseOnOverlayClick={false}
                                onRequestClose={!rModal}>
                                <div class='register_modal'>
                                    <h3>Villa Caceres</h3>
                                    <h4>Terms and Conditions</h4>
                                    <h5>Last Updated: </h5>
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
                                    <a onClick={closeModal} className="register_closeModal">Accept</a>
                                </div>
                            </Modal>
                        </div>
                        <br />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {checkedError}
                        </div>
                        <div className="register_input-field">
                            <input onClick={handleSubmit} type="submit" value='Register' className="register_submitBtn" />
                        </div>
                    </form>
                    <div className="signup">
                        Do you have an existing Account? <a href="/Login">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register