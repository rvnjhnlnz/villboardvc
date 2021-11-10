import React, { useState, useEffect } from 'react'
import './styles.css'
import avatar from '../../../images/Avatar.jpg'
import post from '../../../images/court.jpg'
import WhatsHappening from './WhatsHappening'
import { decodeToken } from "react-jwt";
import Modal from 'react-modal'
import axios from 'axios'
function UserHome() {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    const [openModal, setOpenmodal] = useState(false);
    const [caption, setCaption] = useState('');
    const [postCategory, setpostCategory] = useState('');
    const [photoUrl, setphotoUrl] = useState(null);
    const [email, setEmail] = useState(decodedToken.email);

    const[posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            axios.post('postVisitor')
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
        console.log(e.target.files);
        console.log(e.target.files[0]);
        setphotoUrl(e.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('postCaption', caption);
        fd.append('postCategory', postCategory);
        fd.append('postPicture', photoUrl);
        fd.append('email',email)

        axios.post('addPost', fd).then(res => {
            console.log(res);
            alert("Post successful");
        }).catch(err => {
            console.log(err);
        });
    }

    const displayPosts = posts.map((obj) => {
        return <div className="home_post">
        <div className="home_avatar">
            <img src={avatar} />
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
                    </h3>
                </div>
                <div className="home_headerdescription">
                    <p>{obj.postCaption}</p>
                </div>
            </div>
            <img src={obj.photoUrl} />
        </div>
    </div>
    })
    if (decodedToken.role === "admin") {
        return (
            <div className="admin_home">
                <div className="home_feed">
                    <div className="home_fHeader">
                        <select className="form-control1">
                            <option value="-">All Posts</option>
                            <option value="Events">Events</option>
                            <option value="Annoucements">Announcements</option>
                        </select>
                        <button className="home_submitBtn" onClick={() => setOpenmodal(true)}>Add a Post</button>
                        <Modal isOpen={openModal}
                            className="uh_modalContainer"
                            shouldCloseOnOverlayClick={false}
                            onRequestClose={() => setOpenmodal(false)}>
                            <a class="uh_addbutton" onClick={() => setOpenmodal(false)}>X</a>
                            <div class='uh_modal'>
                                <form className="uh_form">
                                    <div class="ut_logo">
                                    </div>
                                    <div className="uh_input-field">
                                        <input type="text" className="form-control"
                                            name="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                                        <div style={{ fontSize: 12, color: "red" }}>

                                        </div>
                                        <label className="upload_label">Caption</label>
                                    </div>
                                    <div className="uh_input-field">
                                        <select onChange={(e) => { handleSelect(e) }} className="form-control">
                                        <option value="Events">Events</option>
                                        <option value="Annoucements">Announcements</option>
                                        </select>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                        </div>
                                        <label className="upload_label">Mode of Payment</label>
                                    </div>
                                    <div className="uh_input-field">
                                        <input type="file" className="form-controlfile" onChange={(e) => handleFile(e)} />
                                        <div style={{ fontSize: 12, color: "red" }}>

                                        </div>
                                        <label className="upload_label">Upload File</label>
                                    </div>
                                    <div className="image_container">
                                    </div>
                                    <div className="upload_input-field">
                                        <input type="submit" onClick={handleSubmit} value='SUBMIT' className="upload_submitBtn" />
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                    {displayPosts}
                </div>
                <WhatsHappening />
            </div>
        );
    }
    else if (decodedToken.role === "homeowners") {
        return (
            <div className="admin_home">
                <div className="home_feed">
                    <div className="home_fHeader">
                        <h3>Home</h3>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Go to Admin Building to Vaccine
                                        Schedule: 10am to 5pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Go to Admin Building to Vaccine
                                        Schedule: 10am to 5pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home_post">
                        <div className="home_avatar">
                            <img src={avatar} />
                        </div>
                        <div className="home_pbody">
                            <div className="home_pheader">
                                <div className="home_pheadertext">
                                    <h3>Arvin John Lanuza
                                        <span className="home_headerspecial">
                                            Admin
                                        </span>
                                    </h3>
                                </div>
                                <div className="home_headerdescription">
                                    <p>
                                        Ready for Reservations to use our Basketball court
                                    </p>
                                </div>
                            </div>
                            <img src={post} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default UserHome


