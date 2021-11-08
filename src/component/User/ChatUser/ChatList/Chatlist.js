import './Chatlist.css'
import Chatlistitems from './Chatlistitems'
import React, { Component } from 'react'
import Modal from 'react-modal'
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios'
import { decodeToken, useJwt } from "react-jwt";

export class Chatlist extends Component {
    allChatUsers = [
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            id: 1,
            name: "Tim Hover",
            active: true,
            isOnline: true,
        },
        {
            image:
                "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
            id: 2,
            name: "Ayub Rossi",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
            id: 3,
            name: "Hamaad Dejesus",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
            id: 4,
            name: "Eleni Hobbs",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
            id: 5,
            name: "Elsa Black",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
            id: 6,
            name: "Kayley Mellor",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
            id: 7,
            name: "Hasan Mcculloch",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
            id: 8,
            name: "Autumn Mckee",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
            id: 9,
            name: "Allen Woodley",
            active: false,
            isOnline: true,
        },
        {
            image: "https://pbs.twimg.com/profile_images/770394499/female.png",
            id: 10,
            name: "Manpreet David",
            active: false,
            isOnline: true,
        },
    ];
    constructor(props) {
        super(props);
        this.state = {
            allChats: this.allChatUsers,
        };
    }
    openModal = () => {
        this.setState({
            scModal: true
        })
    }
    closeModal = () => {
        this.setState({
            scModal: false
        })
    }
    state = {
        opName: '',
        suggestion: '',
        scModal: false,
    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            aName: this.state.opName,
            suggestions: this.state.suggestion,

        };
        axios.post('addSuggestion', data).then(res => {
            console.log(res);
            alert("Suggestion successful");
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const decodedToken = decodeToken(localStorage.getItem('token'));
        if (decodedToken.role === "admin") {
            return (
                <div class="chatlist_main">
                    <div class="chatlist_dropdown">
                        <button class="chatlist_dropbtn"><i class="las la-plus"></i></button>
                        <div class="dropdown-content">
                            <a href="#">New Conversation</a>
                        </div>
                    </div>
                    <div class="chatlist_heading">
                        <h2>Chats</h2>
                        <button class="chatlist_btn1">
                            <i class="las la-ellipsis-h"></i>
                        </button>
                    </div>
                    <div class="chatlist_search">
                        <div class="search_wrap">
                            <input type="text" placeholder="Search Here" required />
                            <button class="search_btn">
                                <i class="las la-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="chatlist_items">
                        {this.state.allChats.map((item, index) => {
                            return (
                                <Chatlistitems
                                    name={item.name}
                                    key={item.id}
                                    animationDelay={index + 1}
                                    active={item.active ? "active" : ""}
                                    isOnline={item.isOnline ? "active" : ""}
                                    image={item.image}
                                />
                            )
                        })}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="chatlist_main">
                    <div class="chatlist_dropdown">
                        <button class="chatlist_dropbtn"><i class="las la-plus"></i></button>
                        <div class="dropdown-content">
                            <a href="#">New Conversation</a>
                            <a onClick={this.openModal}>New Suggestion</a>
                        </div>
                    </div>
                    <Modal isOpen={this.state.scModal}
                        className="sc_modalContainer"
                        disableAutoFocus={true}
                        shouldCloseOnOverlayClick={false}
                        onRequestClose={this.state.rModal = false}
                        onClose={this.closeModal}>
                        <div class='sc_modal'>
                            <a class="sc_buttonX" onClick={this.closeModal}><ClearIcon fontSize='large' /></a>
                            <form className="form">
                                <label>Name: (Optional)</label>
                                <div class="inputfield">
                                    <input type="text" className="form-control"
                                        value={this.pName} onChange={e => this.state.opName = e.target.value} />
                                </div>
                                <label>Suggestion/Complaint</label>
                                <div class="inputfield">
                                    <textarea rows='4' className="form-control"
                                        value={this.suggestion} onChange={e => this.state.suggestion = e.target.value} />
                                </div>
                                <div class="inputfield">
                                    <input type="submit" value="Submit" class="btn" onClick={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <div class="chatlist_heading">
                        <h2>Chats</h2>
                        <button class="chatlist_btn1">
                            <i class="las la-ellipsis-h"></i>
                        </button>
                    </div>
                    <div class="chatlist_search">
                        <div class="search_wrap">
                            <input type="text" placeholder="Search Here" required />
                            <button class="search_btn">
                                <i class="las la-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="chatlist_items">
                        {this.state.allChats.map((item, index) => {
                            return (
                                <Chatlistitems
                                    name={item.name}
                                    key={item.id}
                                    animationDelay={index + 1}
                                    active={item.active ? "active" : ""}
                                    isOnline={item.isOnline ? "active" : ""}
                                    image={item.image}
                                />
                            )
                        })}
                    </div>
                </div>
            );
        }
    }
}
export default Chatlist