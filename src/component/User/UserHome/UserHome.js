/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react'
import './styles.css'
import avatar from '../../../images/Avatar.jpg'
// import post from '../../../images/court.jpg'
import WhatsHappening from './WhatsHappening'
import { decodeToken } from "react-jwt";
import Modal from 'react-modal'
import axios from 'axios'
import Suggestion from '../Admin/Suggestions'
import Visitor from '../Admin/Visitor'
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment'
import Swal from 'sweetalert2'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormTextarea, CFormInput } from '@coreui/react';
import { useHistory } from "react-router-dom";
function UserHome() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    const [openModal, setOpenmodal] = useState(false);
    const [caption, setCaption] = useState('');
    const [postCategory, setpostCategory] = useState('Events');
    const [photoUrl, setphotoUrl] = useState(null);

    const [caption_errormessage, caption_Seterrormessage] = useState('');
    const [photoUrl_errormessage, photoUrl_Seterrormessage] = useState('');
    // const [email, setEmail] = useState(decodedToken.email);

    const [visible, setVisible] = useState(false)
    
    const email = decodedToken.email;

    const [postFilter, setPostFilter] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            axios.post('postAnnouncement')
                .then(res => {
                    console.log(res);
                    setPosts(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchData();
    }, []);
    function handleSelect(e) {
        console.log(e.target.value);
        setpostCategory(e.target.value);
    }
    function handleFile(e) {
        console.log(e.target.files[0]);
        const filename = e.target.files[0].name;
        var pattern = new RegExp(/(\.[^.]*)$/);
        const extension = filename.split(pattern);
        console.log(extension)
        if (extension[1] == ".jpg" || extension[1] == ".png" || extension[1] == ".jpeg") {
            setphotoUrl(e.target.files[0]);
            photoUrl_Seterrormessage('');
        }
        else {
            photoUrl_Seterrormessage("Please upload image file. ex: .jpeg .png .jpg ")
        }
    }

    const validate = () => {
        let isValid = true;
        let cError, pError = "";


        if (!caption) {
            cError = "Please enter caption"
            isValid = false;
            console.log('no caption');
        }
        else if (typeof caption !== "undefined") {
            var pattern = new RegExp(/[A-Za-z0-9.,!?]+/);
            if (!pattern.test(caption)) {
                cError = "Please enter valid caption"
                isValid = false;
                console.log('caption has specific characters')
            }
        }

        if (photoUrl === null) {
            pError = "Please upload image file. "
            isValid = false;
        }

        if (cError || pError) {
            caption_Seterrormessage(cError)
            photoUrl_Seterrormessage(pError)

            return isValid;
        }
        return isValid;
    }
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('postCaption', caption);
        fd.append('postCategory', postCategory);
        fd.append('postPicture', photoUrl);
        fd.append('email', email)


        const isValid = validate();

        if (isValid) {
            setVisible(false);

            axios.post('addPost', fd).then(res => {
                console.log('successfull');
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Your post is been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(err => {
                console.log(err);
            });
            setCaption('');
            setphotoUrl(null);
            caption_Seterrormessage('');

        }

    }
    function close() {
        setCaption('');
        setphotoUrl(null);
        caption_Seterrormessage('');
        photoUrl_Seterrormessage('');
        setVisible(false);
    }
    function handleFilter(e) {
        console.log(e.target.value);
        setPostFilter(e.target.value);
    }

    const [visible1, setVisible1] = useState(true);
    let history = useHistory();
    function thankyou(){
        setVisible1(false);
        localStorage.clear();
        history.push("/");
    }
    const displayPosts = posts.filter((val) => {

        if (postFilter === "") {
            return val
        } else if (val.postCategory.toLowerCase().includes(postFilter.toLowerCase())) {
            return val;
        }
    }).reverse().map((obj) => {
        return <div className="home_post" key={obj._id}>
            <div className="home_avatar">
                <img src={decodedToken.photoUrlProfile} alt='Avatar' />
            </div>
            <div className="home_pbody">
                <div className="home_pheader">
                    <div className="home_pheadertext">
                        <h3>
                            <span className="home_headerspecial">
                                Admin
                            </span>
                            <span className="home_headerspecial">
                                {obj.postCategory}
                            </span>
                            <span className="home_headerspecial">
                                {moment(obj.updatedAt).format('lll')}
                            </span>
                        </h3>
                    </div>
                    <div className="home_headerdescription">
                        <p>{obj.postCaption}</p>
                    </div>
                </div>
                <img src={obj.photoUrl} alt='post' />
            </div>
        </div>
    })
    if (decodedToken.role === "admin") {
        return (
            <div className="admin_home">
                <div className="home_feed">
                    <div className="home_fHeader">
                        <select className="form-control1" onChange={(e) => handleFilter(e)}>
                            <option value="">All Posts</option>
                            <option value="Events">Events</option>
                            <option value="Announcement">Announcement</option>
                        </select>
                        <button className="home_submitBtn" onClick={() => setVisible(true)}>Add a Post</button>
                        <>
                            <CModal size='lg' alignment="center" visible={visible} onClose={() => setVisible(false)}>
                                <CModalHeader>
                                    <CModalTitle>Post an Announcement or Events</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <span>Caption:</span>
                                    <CForm>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            label="Example textarea"
                                            rows="3"
                                            text="Must be 8-20 words long."
                                            value={caption} onChange={(e) => setCaption(e.target.value.replace(/[^A-Z-a-z0-9\s!?"':;@#_.&*()=-]+/, ""))}
                                        ></CFormTextarea>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {caption_errormessage}
                                        </div>
                                        <div className="uh_input-field">
                                            <select onChange={(e) => { handleSelect(e) }} className="form-control">
                                                <option value="Events">Events</option>
                                                <option value="Announcement">Announcement</option>
                                            </select>

                                            <label className="upload_label">Category</label>
                                        </div>
                                        Upload Image:
                                        <CFormInput type="file" id="formFile" label="Upload File:" onChange={(e) => handleFile(e)} />
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {photoUrl_errormessage}
                                        </div>
                                    </CForm>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="secondary" onClick={close}>
                                        Close
                                    </CButton>
                                    <CButton color="success" onClick={handleSubmit}>Save changes</CButton>
                                </CModalFooter>
                            </CModal>
                        </>
                    </div>
                    {displayPosts}
                </div>
                <WhatsHappening />
            </div>
        );
    }
    else if (decodedToken.role === "homeowners") {
        return (
            <div className='v_container'>
            <CModal size="lg" alignment="center" visible={visible1}>
                <CModalHeader closeButton = {false}>
                    <CModalTitle>Visitors</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <h2>Hi {decodedToken.firstName}, Please install the application  to use it's features. Thank you.</h2>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={thankyou} >Close</CButton>
                </CModalFooter>
            </CModal>
            </div>
        )
    }
    else if (decodedToken.role === "security") {
        return (
            <div className="admin_home1">
                <div>
                    <Suggestion />
                    <Visitor />
                </div>
            </div>
        )
    }
}

export default UserHome


