import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import Modal from 'react-modal'
import ClearIcon from '@material-ui/icons/Clear';
function Guide() {
    const [g_modalIsOpen, g_setModalIsOpen] = useState(false);
    return (
        <div>
            <div className="con-header">
                <h1><b>Emergency and Guidelines</b></h1>
            </div>
            <section class="guide">
                <div class="row">
                    <div class="guide-col">
                        <h1><b>RULES AND REGULATIONS</b></h1>
                        <h5>A-1. Vehicle and Road Policy</h5>
                        <h5>A-2. Visitors</h5>
                        <h5>A-3. Stray Animals</h5>
                        <h5>A-4. Noice Nuisance</h5>
                        <h5>A-5. Solid Waste Management System</h5>
                        <h5>A-6. Neglect of Duty of Security Officers</h5>
                        <a onClick={() => g_setModalIsOpen(true)}>Read More</a>
                        <Modal isOpen={g_modalIsOpen}
                            className="g_modalContainer"
                            shouldCloseOnOverlayClick={false}
                            onRequestClose={() => g_setModalIsOpen(false)}>
                            <a class="g_button" onClick={() => g_setModalIsOpen(false)}><ClearIcon fontSize='large' /></a>
                            <div class='g_modal'>
                                <h4>IMPLEMENTATION OF DEED OF RESTRICTION, BOARD RESOLUTIONS AND OTHER POLICIES FOR SECURITY, SAFETY, CLEANLINESS AND OTHER PURPOSES</h4>
                                <h5>A-1. Vehicle and Road Policy</h5>
                                <p>1. Vehicles without VCEVHOA, Inc. sticker unless otherwise specified in The Revised
                                    Guidelines on the issue and Use of Vehicle Sticker shall not be allowed to enter and pass through the village.</p>
                                <p>2. As a general policy, ambulant vendors and peddlers of any merchandise shall not be allowed to enter nor pass through the village unless with approval of the VCEV Board of Directors</p>
                                <p>3. Security officers shall strictly implement The Revised guidelines on the issuance and Use of VCEVHOA Inc. Vehicle Stickers</p>
                                <p>4 All motorcycle riders should remove their helmet and all closed vans are subject for inspection upon the entry of both gates 1 and gate 2 to properly identify the visitors coming in and out inside the village.</p>
                                <p>5. Minors are not allowed / permitted to drive within the roads of the Vila Caceres unless accompanied / supervised by an adult Minors caught driving a vehicle without any accompanying adult shall be brought back to their residence and their parents shall be served a written reprimand on the first offense. Succeeding offenses shall be subject to penalty charges amounting to P500.00 and P1,000.00 thereafter, which shall be carried over to form part of the monthly assessment / dues of the concerned homeowner.</p>
                                <p>6. No vehicle shall be allowed to park at main roads. Homeowners with vehicles hjexceeding their house carport are advised to park at the nearest Interior roads Schedule of parking at the interior roads are the following a. 1 to 15" of the month-at the left side of interior roads b 16 31" of the month - at the right side of interior roads</p>
                                <p>7. Double parking is strictly prohibited. </p>
                                <p>8. Smoke belching is strictly prohibited.</p>
                                <p>9. All bicycles entering both gates shall be required to be registered and logged
                                    into the record of security. The owner should get a control tag containing a control number to identify that the bicycle has already been registered at the security log book. The owner should return this tag upon exit: otherwise the bike
                                    shall be placed on hold for further verification 10. All motorcycles with open mufflers in the village are prohibited to enter in the VC village effective May, 2016. Violators will be penalized
                                    </p>
                                <p>1st offense - Php 1,000 </p>
                                <p>2nd offense - Php 2,000</p>
                                <p>3rd offense - Confiscation of Vehicle sticker and total banning in the village</p>
                                <p>10. All motorcycles with open mufflers in the Village are prohibited to enter in the VC village effective May, 2016. Violators will be penalized.</p>
                                <p>1st offense - Php 1,000 </p>
                                <p>2nd offense - Php 2,000</p>
                                <p>3rd offense - Confiscation of Vehicle sticker and total banning in the village</p>
                                <p>11. January 16 of the year, all Home/Lot owners without VCEVHAI Vehicle Sticker are allowed to ENTER at GATE 2 ONLY and can EXIT on both gates. After a month of non-compliance, they will be required to surrender their valid ID to the guard on duty at gate 2 upon entry.</p>
                            </div>
                        </Modal>
                    </div>
                    <div class="guide-col">
                        <img src="http://trinities.org/blog/wp-content/uploads/follow-the-rules.jpg" />
                    </div>
                </div>
                <div class="row">
                    <div class="guide-col">
                        <img src="https://www.herald-union.com/wp-content/uploads/2018/10/Emergency-number_help-telephone.jpg" />
                    </div>
                    <div class="guide-col">
                        <h1><b>Emergency Hotlines</b></h1>
                        <p>Brgy. Balibago: 534-5566 837-5068 0937-379-6611 0937-401-0009</p>
                        <p>Brgy. Dila: 535-3252 0937-401-0009 0923-745-9335 0937-379-6611</p>
                        <p>Brgy. Dila: 535-3252 0937-401-0009 0923-745-9335 0937-379-6611</p>
                        <p>City Hall: 530-0015</p>
                        <p>PNP Hotline: 302-9928 837-6501</p>
                        <p>Fire Station: 534-1291 502-5410</p>
                        <p>Community Hospital: 534-4571</p>
                        <p>Sta. Rosa Hospital: 508-0915 508-2715 508-2705 508-2752</p>
                        <p>MDRRMC: 534-9999 534-9876</p>
                        <p>Red-Cross Chapter: 501-1114 557-1800</p>
                        <p>DSWD / MSWD: 530-0015 </p>
                        <p>MERALCO 16211 631-111 0917-551-6211 0920-971-6211 0925-771-6211</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Guide
