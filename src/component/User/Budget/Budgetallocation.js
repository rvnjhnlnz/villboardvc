import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './styles.css'
import basketball from '../../../images/basketball.jpg'
import gym from '../../../images/gym.jpg'
import chapel from '../../../images/chapel.jpg'
import swimming from '../../../images/swimming.jpg'
Modal.setAppElement('#root')
function Budgetallocation() {
    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    


    return (

        <div className="ba_main">
            <div className="ba-header">
                <h1><b>Budget Allocation</b></h1>
            </div>

            <div className="ba_card">

                <div className="ba_image">
                    <img src={basketball} />
                </div>
                <div className="ba_title">
                    <h1>Basketball</h1>
                </div>
                <div className="ba_des">
                    <p>₱100,000</p>
                    <button className="ba_btn" onClick={() => setModalIsOpen(true)}>Read More...</button>
                    <Modal isOpen={modalIsOpen} 
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen(false)}>
                    <div class='ba-modal'>
                    <h2> Budget Allocation</h2>
                            <button class="mod_button" onClick={() => setModalIsOpen(false)}>Close</button>
                        </div>
                    </Modal>
                </div>
            </div>

            <div className="ba_card">

                <div className="ba_image">
                    <img src={gym} />
                </div>
                <div className="ba_title">
                    <h1>Gym Facilities</h1>
                </div>
                <div className="ba_des">
                    <p>₱200,000</p>
                    <button className="ba_btn">Read More...</button>
                </div>
            </div>

            <div className="ba_card">

                <div className="ba_image">
                    <img src={chapel} />
                </div>
                <div className="ba_title">
                    <h1>Chapel Facilities</h1>
                </div>
                <div className="ba_des">
                    <p>₱100,000</p>
                    <button className="ba_btn">Read More...</button>
                </div>
            </div>

            <div className="ba_card">

                <div className="ba_image">
                    <img src={swimming} />
                </div>
                <div className="ba_title">
                    <h1>Swimming Pools</h1>
                </div>
                <div className="ba_des">
                    <p>₱300,000</p>
                    <button className="ba_btn">Read More...</button>
                </div>
            </div>
            </div>   

            )
}

            export default Budgetallocation