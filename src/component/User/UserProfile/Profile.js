import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { decodeToken, useJwt } from "react-jwt";
import first from '../../../images/dog.jpg'
import dogqr from '../../../images/qr-dog.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import sample from '../../../images/sample.jpg'
import sample1 from '../../../images/sample1.jpg'
import dog from '../../../images/dog1.jpg'
import dog1 from '../../../images/dog2.jpg'
import car from '../../../images/car1.jpg'
import car1 from '../../../images/car.jpg'
import qr from '../../../images/qrcode.png'
import Modal from 'react-modal'
import BorderColorIcon from '@material-ui/icons/BorderColor';

function Profile() {
    const decodedToken = decodeToken(localStorage.getItem('token'))
    let valid;
    //Modals
    const [ep_modalIsOpen, ep_setModalIsOpen] = useState(false);
    const [pass_modalIsOpen, pass_setModalIsOpen] = useState(false);
    const [house_modalIsOpen, house_setModalIsOpen] = useState(false);

    //Error or successful messages.
    const [fn_errormessage, fn_Seterrormessage] = useState('');
    const [mi_errormessage, mi_Seterrormessage] = useState('');
    const [ln_errormessage, ln_Seterrormessage] = useState('');
    const [a_errormessage, a_Seterrormessage] = useState('');
    const [p_errormessage, p_Seterrormessage] = useState('');
    //Variables
    const [password, setPassword] = useState('')
    const [newPass, setNewPass] = useState('')
    const [firstName, setFirstName] = useState(decodedToken.firstName)
    const [middleInitial, setMiddleInitial] = useState(decodedToken.middleInitial)
    const [lastName, setLastName] = useState(decodedToken.lastName)
    const [address, setAddress] = useState(decodedToken.address)
    const [phoneNumber, setphoneNumber] = useState(decodedToken.phoneNumber)


    const [petData, setPetData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            axios.post('postPet')
                .then(res => {
                    console.log(res);
                    setPetData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchPosts();
    }, []);
    const pet = petData.map((obj) => {
        return <div class="profilecard-single">
            <div>
                <h1>{obj.petName}</h1>
                <span>{obj.petBreed}</span>
            </div>
            <div>
                <span class="las la-user"></span>
            </div>
        </div>
    })
    function changepass() {
        var newData = {
            email: decodedToken.email,
            password: password,
            newpass: newPass
        }
        axios.post('changepass', newData).then(res => {
            console.log(res);
            alert("update successful");

        }).catch(err => {
            console.log(err);
        })
    }
    function validationFirstName() {
        let isValid = true;
        if (!firstName) {
            console.log('Please enter your first name. ')
            fn_Seterrormessage((prevState) => 'Please enter your first name');
            isValid = false;
        }
        else if (firstName !== decodedToken.firstName) {
            var pattern = new RegExp(/^[aA-zZ\s]+$/);
            if (!pattern.test(firstName)) {
                console.log('Please enter your valid first name');
                fn_Seterrormessage((prevState) => 'Please enter your valid first name');
                isValid = false;
            }
        }
        console.log(isValid)
        return isValid;
    }
    function changefirstname() {
        var newData = {
            email: decodedToken.email,
            newfirstname: firstName
        }
        const fnValid = validationFirstName();
        if (fnValid) {
            axios.post('changeFirstname', newData).then(res => {
                console.log(res);
                alert("update successful");
            }).catch(err => {
                console.log(err);
            })
        }
    }
    function validationMiddleinitial() {
        let isValid = true;
        if (!middleInitial) {
            console.log('Please enter your middle initial ')
            mi_Seterrormessage((prevState) => 'Please enter your middle initial ');
            isValid = false;
        }
        else if (typeof middleInitial !== "undefined") {
            var pattern = new RegExp(/^[a-zA-Z]{1}$/);
            if (!pattern.test(middleInitial)) {
                console.log('Please enter your valid middle initial');
                mi_Seterrormessage((prevState) => 'Please enter your valid middle initial');
                isValid = false;
            }
        }
        console.log(isValid)
        return isValid;
    }
    function changeMiddleinitial() {
        var newData = {
            email: decodedToken.email,
            newmiddleinitial: middleInitial
        }
        const miValid = validationMiddleinitial();
        if (miValid) {
            mi_Seterrormessage((prevState) => '');
            axios.post('changeMiddleinitial', newData).then(res => {
                console.log(res);
                alert("update successful");

            }).catch(err => {
                console.log(err);
            })
        }
    }
    function validationLastName() {
        let isValid = true;
        if (!lastName) {
            console.log('Please enter your Last Name ')
            ln_Seterrormessage((prevState) => 'Please enter your Last Name ');
            isValid = false;
        }
        else if (typeof lastName !== "undefined") {
            var pattern = new RegExp(/^[aA-zZ\s]+$/);
            if (!pattern.test(lastName)) {
                console.log('Please enter your valid Last Name');
                ln_Seterrormessage((prevState) => 'Please enter your valid Last Name');
                isValid = false;
            }
        }
        console.log(isValid)
        return isValid;
    }
    function changeLastName() {
        var newData = {
            email: decodedToken.email,
            newlastname: lastName
        }
        const lnValid = validationLastName();
        if (lnValid) {
            axios.post('changeLastname', newData).then(res => {
                console.log(res);
                alert("update successful");

            }).catch(err => {
                console.log(err);
            })
        }
    }
    function validationAddress() {
        let isValid = true;
        if (!address) {
            console.log('Please enter your Address ')
            a_Seterrormessage((prevState) => 'Please enter your Address ');
            isValid = false;
        }
        else if (typeof address !== "undefined") {
            var pattern = new RegExp(/^[A-Za-z0-9,. _]*[A-Za-z0-9,.][A-Za-z0-9,. _]*$/);
            if (!pattern.test(address)) {
                console.log('Please enter your valid Address');
                a_Seterrormessage((prevState) => 'Please enter your valid Address');
                isValid = false;
            }
        }
        console.log(isValid)
        return isValid;
    }
    function changeAddress() {
        var newData = {
            email: decodedToken.email,
            newaddress: address
        }
        const aValid = validationAddress();
        if (aValid) {
            axios.post('changeAddress', newData).then(res => {
                console.log(res);
                alert("update successful");

            }).catch(err => {
                console.log(err);
            })
        }
    }

    function validationPhoneNumber() {
        let isValid = true;
        if (!phoneNumber) {
            console.log('Please enter your phone number ')
            p_Seterrormessage((prevState) => 'Please enter your phone number ');
            isValid = false;
        }
        else if (typeof phoneNumber !== "undefined") {
            var pattern = new RegExp(/^(09|\+639)\d{9}$/);
            if (!pattern.test(phoneNumber)) {
                console.log('Please enter your valid phone number');
                p_Seterrormessage((prevState) => 'Please enter your valid phone number');
                isValid = false;
            }
        }
        console.log(isValid)
        return isValid;
    }

    function changeProfile() {
        var updateFirstname = {
            email: decodedToken.email,
            newfirstname: firstName
        }
        var updateMiddleInitial = {
            email: decodedToken.email,
            newmiddleinitial: middleInitial
        }
        var updateLastName = {
            email: decodedToken.email,
            newlastname: lastName
        }
        var updateAddress = {
            email: decodedToken.email,
            newaddress: address
        }
        var updatePhoneNumber = {
            email: decodedToken.email,
            newphonenumber: phoneNumber
        }
        const fnValid = validationFirstName();
        const miValid = validationMiddleinitial();
        const lnValid = validationLastName();
        const aValid = validationAddress();
        const pValid = validationPhoneNumber();
        if (fnValid && miValid && lnValid && aValid && pValid) {
            fn_Seterrormessage((prevState) => '');
            axios.post('changeFirstname', updateFirstname).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            mi_Seterrormessage((prevState) => '');
            axios.post('changeMiddleinitial', updateMiddleInitial).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            ln_Seterrormessage((prevState) => '');
            axios.post('changeLastname', updateLastName).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            a_Seterrormessage((prevState) => '');
            axios.post('changeAddress', updateAddress).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            p_Seterrormessage((prevState) => '');
            axios.post('changePhonenumber', updatePhoneNumber).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <div>
            <div className="p_header">
                <h1><b>User Profile</b></h1>
            </div>
            <div className="p_container">
                <div className="p_wrapper">
                    <form className="p_form">
                        <div class="p_title">
                            <a onClick={() => ep_setModalIsOpen(true)} className="p_editprofile">Edit Profile</a>
                            <Modal isOpen={ep_modalIsOpen}
                                className="p_addmodalContainer"
                                shouldCloseOnOverlayClick={false}
                                onRequestClose={() => ep_setModalIsOpen(false)}>
                                <a class="p_addbutton" onClick={() => ep_setModalIsOpen(false)}><ClearIcon fontSize='large' /></a>
                                <div class='p_addmodal'>
                                    <div class="c_wrapper">
                                        <div className="c_logo"></div>
                                        <div class="title">
                                            Edit Profile
                                        </div>
                                        <div class="ownInfo">
                                        </div>
                                        <form className="form" onSubmit={() => house_setModalIsOpen(false)}>
                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
                                                {fn_errormessage}
                                            </div>
                                            <div class="inputfield">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" defaultValue={decodedToken.firstName}
                                                    onChange={(e) => { setFirstName(e.target.value) }} name="firstName" />
                                            </div>
                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
                                                {mi_errormessage}
                                            </div>
                                            <div class="inputfield">
                                                <label>Middle Initial</label>
                                                <input type="text" className="form-control" defaultValue={decodedToken.middleInitial}
                                                    onChange={(e) => { setMiddleInitial(e.target.value) }} name="middleInitial" />
                                            </div>
                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
                                                {ln_errormessage}
                                            </div>
                                            <div class="inputfield">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" defaultValue={decodedToken.lastName}
                                                    onChange={(e) => { setLastName(e.target.value) }} name="lastName" />
                                            </div>
                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
                                                {a_errormessage}
                                            </div>
                                            <div class="inputfield">
                                                <label>Address</label>
                                                <input type="text" className="form-control" defaultValue={decodedToken.address}
                                                    onChange={(e) => { setAddress(e.target.value) }} name="Relationship" />
                                            </div>
                                            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
                                                {p_errormessage}
                                            </div>
                                            <div class="inputfield">
                                                <label>Phone Number</label>
                                                <input type="text" className="form-control" defaultValue={decodedToken.phoneNumber}
                                                    onChange={(e) => { setphoneNumber(e.target.value) }} name="address" />
                                            </div>
                                            <div class="inputfield">
                                                <label>Email Address</label>
                                                <input type="email" className="form-control"
                                                    disabled name="email" />
                                            </div>

                                        </form>
                                        <div class="inputfield">
                                            <input type="submit" value="Submit" class="btn" onClick={changeProfile} />
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <div className="p_uDetails">
                            <div className="p_text">

                                <span className="details">First Name:</span>
                                <span className="p_data">{decodedToken.firstName}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Middle Initial:</span>
                                <span className="p_data">{decodedToken.middleInitial}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Last Name:</span>
                                <span className="p_data">{decodedToken.lastName}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Address:</span>
                                <span className="p_data">{decodedToken.address}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Phone Number:</span>
                                <span className="p_data">{decodedToken.phoneNumber}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Email:  </span>
                                <span className="p_data">{decodedToken.email}</span>
                            </div>
                            <div className="p_text">
                                <span className="details">Password: <a onClick={() => pass_setModalIsOpen(true)}>Change Password</a>
                                    <Modal isOpen={pass_modalIsOpen}
                                        className="p_modalContainer"
                                        shouldCloseOnOverlayClick={false}
                                        onRequestClose={() => pass_setModalIsOpen(false)}>
                                        <div class='p_modal'>
                                            <a class="p_buttonX" onClick={() => pass_setModalIsOpen(false)}><ClearIcon fontSize='large' /></a>
                                            <h2>Update Password</h2>
                                            <form>
                                                <div className="p_input">
                                                    <input type="password" placeholder=" Old Password"
                                                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                                </div>
                                                <div className="p_input">
                                                    <input type="password" placeholder="New Password"
                                                        value={newPass} onChange={(e) => { setNewPass(e.target.value) }} />
                                                </div>
                                            </form>
                                            <div class="p_input">
                                                <button class="p_btn" onClick={changepass}>Submit</button>
                                            </div>
                                        </div>
                                    </Modal></span>
                                <span className="p_data"></span>
                            </div>
                        </div>
                        <div className="p_button">
                            <a onClick={() => house_setModalIsOpen(true)} className="p_addBtn">Add a Household / Family Member</a>
                            <Modal isOpen={house_modalIsOpen}
                                className="p_addmodalContainer"
                                shouldCloseOnOverlayClick={false}
                                onRequestClose={() => house_setModalIsOpen(false)}>
                                <a class="p_addbutton" onClick={() => house_setModalIsOpen(false)}><ClearIcon fontSize='large' /></a>
                                <div class='p_addmodal'>
                                    <div class="c_wrapper">
                                        <div className="c_logo"></div>
                                        <div class="title">
                                            Relative / Household
                                        </div>
                                        <form className="form" onSubmit={() => house_setModalIsOpen(false)}>
                                            <div class="inputfield">
                                                <label>First Name</label>
                                                <input type="text" className="form-control"
                                                    name="firstName" />
                                            </div>

                                            <div class="inputfield">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control"
                                                    name="lastName" />
                                            </div>
                                            <div class="inputfield">
                                                <label>Phone Number</label>
                                                <input type="text" className="form-control"
                                                    name="address" />
                                            </div>
                                            <div class="inputfield">
                                                <label>Email Address</label>
                                                <input type="email" className="form-control"
                                                    name="email" />
                                            </div>
                                            <div class="inputfield">
                                                <label>Relationship</label>
                                                <input type="text" className="form-control"
                                                    name="Relationship" />
                                            </div>
                                            <div class="inputfield terms">
                                                <label class="check">
                                                    <input type="checkbox" required />
                                                    <span class="checkmark"></span>
                                                </label>
                                                <p><b>Agreed to terms and conditions</b></p>
                                            </div>
                                            <div class="inputfield">
                                                <input type="submit" value="Submit" class="btn" />
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <div class="profile_cards">
                            <h3>Pets: </h3>
                            {pet}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
