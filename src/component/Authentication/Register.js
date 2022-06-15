import React, { useState } from 'react';
import axios from 'axios'
import './Register.css'
import Navbar from '../Navbar/Navbar';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import Modal from 'react-modal'
import { signup } from '../../actions/auth'
import ClearIcon from '@material-ui/icons/Clear';
import Logo from '../../images/background.png'
import eye from '../../images/eye.png'
import Swal from 'sweetalert2'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import {Helmet} from "react-helmet";
        
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
    const [pnError, setpnError] = useState('Enter a phone starts with 09');
    const [email, setemail] = useState('');
    const [eError, seteError] = useState('');
    const [password, setpassword] = useState('');
    const [pError, setpError] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    const [cpError, setcpError] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoError, setphotoError] = useState('Upload a file type(.jpg, .png, .jpeg)');
    const [checkedError, setcheckedError] = useState('');
    const [checked, setchecked] = useState(false);
    const [rModal, setrModal] = useState(false);
    const [termsChecked, settermsChecked] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);

    const [visible, setVisible] = useState(false);

    const validate = () => {
        let eError, pError, fnError, mnError, lnError, aError, pnError, cpError, photoerror, checkedError = "";
        let isValid = true;

        if (!firstName) {
            fnError = "Please enter your First Name"
            isValid = false;
        }
        else if (typeof firstName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(firstName)) {
                fnError = "Please enter valid first name"
                isValid = false;
            }
        }
        if (!middleInitial) {
            mnError = "Please enter your Middle Initial"
            isValid = false;
        }
        else if (typeof middleInitial !== "undefined") {
            var pattern = new RegExp(/^[a-zA-Z0-9]{0,3}$/);
            if (!pattern.test(middleInitial)) {
                mnError = "Please enter your first letter of your middle name (Maximum 2 letters)"
                isValid = false;
            }
        }
        if (!lastName) {
            lnError = "Please enter your Last Name"
            isValid = false;
        }
        else if (typeof lastName !== "undefined") {
            var pattern = new RegExp(/[A-Za-z]+/);
            if (!pattern.test(lastName)) {
                lnError = "Please enter valid last name"
                isValid = false;
            }
        }
        if (!address) {
            aError = "Please enter your Home Address"
            isValid = false;
        }
        else if (typeof address !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(address)) {
                aError = "Please enter valid address"
                isValid = false;
            }
        }
        if (!phoneNumber) {
            pnError = "Please enter your Phone Number (Starts with 09)"
            isValid = false;
        }
        else if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09)\d{9}$/);
            if (!pattern.test(phoneNumber)) {
                pnError = "Please enter valid phone number consists of 11 digits (Starts with 09)"
                isValid = false;
            }
        }
        if (!email) {
            eError = "Please enter your email Address"
            isValid = false;
        }
        else if (typeof email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                eError = "Please enter valid email address."
                isValid = false;
            }
        }
        if (!password) {
            pError = "Please enter your password"
            isValid = false;
        }
        else if (typeof password !== "undefined") {
            var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/);
            if (!pattern.test(password)) {
                pError = "Minimum 8 characters, at least 1 letter, and 1 number:"
                isValid = false;
            }
        }
        if (!confirmPass) {
            cpError = "Please enter your password"
            isValid = false;
        }
        else if (typeof password !== "undefined") {
            var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/);
            if (!pattern.test(password)) {
                cpError = "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number:"
                isValid = false;
            }
        }
        if (password !== confirmPass) {
            cpError = "Those Passwords didn't match. Try Again"
            isValid = false;
        }
        if(photo === null){
            photoerror = "Please upload image file. ex: .jpeg .png .jpg"
            isValid = false;
        }
        if (!checked) {
            checkedError = "Please read the terms and conditions to enable and check the checkbox"
            isValid = false;
            console.log('C')
        }
        if (fnError || mnError || lnError || aError || pnError || eError || pError || cpError || photoerror || checkedError) {
            setfnError(fnError)
            setmnError(mnError)
            setlnError(lnError)
            setaError(aError)
            setpnError(pnError)
            seteError(eError)
            setpError(pError)
            setcpError(cpError)
            setphotoError(photoerror)
            setcheckedError(checkedError)
            return isValid;
        }
        return isValid;
    }
    function openModal(e) {
        e.preventDefault()
        setrModal(true);
    }

    function close(e) {
        e.preventDefault()
        setVisible(false);
        settermsChecked(false);
    }
    function handleFile(e) {
        if(e.target.files[0] == null){
            setphotoError("Please upload image file. ex: .jpeg .png .jpg ")
        }
        else if(e.target.files[0] !== null){
            const filename = e.target.files[0].name;
            var pattern = new RegExp(/(\.[^.]*)$/);
            const extension = filename.split(pattern);
            console.log(extension)
            if (extension[1] == ".jpg" || extension[1] == ".png" || extension[1] == ".jpeg") {
                setPhoto(e.target.files[0]);
                setphotoError('');
            }
            else {
                setphotoError("Please upload image file. ex: .jpeg .png .jpg ")
            }
        }
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    let history = useHistory();
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        const data = {
            profilePicture: photo,
            firstName: firstName,
            middleInitial: middleInitial,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        }
        const fd = new FormData();
        fd.append('profilePicture', photo);
        fd.append('firstName', firstName);
        fd.append('middleInitial', middleInitial);
        fd.append('lastName', lastName);
        fd.append('address', address);
        fd.append('phoneNumber', phoneNumber);
        fd.append('email', email);
        fd.append('password', password);
        if (isValid) {
            axios.post('addUser', fd).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: "Register Successful! \n Please wait for the admin's approval",
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        history.push('/Login');
                    }
                })
            }).catch(err => {
                console.log(err);
            });
        }
        
    }
    const isChecked = () => {
        setchecked(!checked);
    }
    return (
        <div>
            <div className="r_wrapper">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register | Villboard</title>
            </Helmet>
                <div class="r_container">
                    <header className="r_logo"><img src={Logo} /></header>
                    <form>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                            value={firstName} onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z\s]+/gi,""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {fnError}
                            </div>
                            <label className="r_label">First Name</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                              value={middleInitial} onChange={(e) => setmiddleInitial(e.target.value.replace(/[^A-Za-z\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {mnError}
                            </div>
                            <label className="r_label">Middle Initial</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                             value={lastName}   onChange={(e) => setlastName(e.target.value.replace(/[^A-Za-z.\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {lnError}
                            </div>
                            <label className="r_label">Last Name</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                              value={address}  onChange={(e) => setaddress(e.target.value.replace(/[^A-Za-z0-9.,\s]+/gi, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {aError}
                            </div>
                            <label className="r_label">Address</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control" 
                             value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value.replace(/[^0-9+]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {pnError}
                            </div>
                            <label className="r_label">Phone Number</label>
                        </div>
                        <div className="register_input-field">
                            <input type="text" className="form-control"
                              value={email}  onChange={(e) => setemail(e.target.value.replace(/[^A-Z-a-z0-9_.@-]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {eError}
                            </div>
                            <label className="r_label">Email Address</label>
                        </div>
                        <div className="register_input-field">
                            <input type={passwordShown ? "text" : "password"} className="form-control"
                             value={password}   onChange={(e) => setpassword(e.target.value.replace(/[^A-Z-a-z0-9!@#_.]+/, ""))} />

                            <div style={{ fontSize: 12, color: "red" }}>
                                {pError}
                            </div>
                            <label className="r_label">Password</label>
                        </div>
                        <div className="register_input-field">
                            <input type={passwordShown ? "text" : "password"} className="form-control"
                               value={confirmPass} onChange={(e) => setconfirmPass(e.target.value.replace(/[^A-Z-a-z0-9!@#_.]+/, ""))} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {cpError}
                            </div>
                            <label className="r_label">Confirm Password</label>
                        </div>
                        <div>
                            <input type="checkbox"
                                className="r_showpassword"
                                onChange={togglePasswordVisiblity}
                            />
                            <span>Show Password</span>
                        </div>
                        <div className="register_input-field">
                            <input type="file" className="form-control1"
                                onChange={(e) => handleFile(e)} accept="image/png, image/jpeg" />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {photoError}
                            </div>
                            <label className="r_label">Upload File</label>
                        </div>

                        <div className="register_check-field">
                            <input type="checkbox"
                                className="register_terms"
                                disabled={termsChecked}
                                onChange={isChecked}
                            />
                            <a onClick={() => setVisible(!visible)} className="register_link">Terms and Conditions</a>
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