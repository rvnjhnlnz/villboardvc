import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React, { useState } from 'react';
// import Confirmation from '../../../../util/confirmation';
import './Accounts.css'
const AccountEditable = ({ editUserData, handleEditUserChange, handleCancelClick, handleEditFormSubmit }) => {
    const options = [
        {
            label: "Admin",
            value: "admin",
        },
        {
            label: "Homeowners",
            value: "homeowners",
        },
    ];

    const [visible, setVisible] = useState(false)
    const [selectVal, setSelectVal] = useState(editUserData?.role)

    return (
        <tr>
            <td>
                {/*<select name="role" id="role" onChange={handleEditUserChange} value = {editUserData.role}>
                    <option value="Admin">Admin</option>
                    <option value="homeowners">Homeowner</option>
                    <option value="Security">Security</option>
                </select>*/}
                <select value={selectVal} onChange={(e)=>setSelectVal(e.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your Last name"
                    name="lastName"
                    onChange={handleEditUserChange}
                    value={editUserData.lastName}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your First name"
                    name="firstName"
                    onChange={handleEditUserChange}
                    value={editUserData.firstName}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your Middle Initial"
                    name="middleInitial"
                    onChange={handleEditUserChange}
                    value={editUserData.middleInitial.toUpperCase()}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleEditUserChange}
                    value={editUserData.email}
                >
                </input>
            </td>
            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    onChange={handleEditUserChange}
                    value={editUserData.phoneNumber}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your address"
                    name="address"
                    onChange={handleEditUserChange}
                    value={editUserData.address}
                >
                </input>
            </td>
            <td>
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Confirm Edit</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to edit these details?</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            No
                        </CButton>
                        <CButton style={{ backgroundColor: '#04AA6D', borderColor: '#04AA6D' }} onClick={handleEditFormSubmit}>Yes</CButton>
                    </CModalFooter>
                </CModal>
                <button type="submit" className='genButton' onClick={(e) => { e.preventDefault(); setVisible(true) }}>Save</button>
                <button type="submit" className='genButton' onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
};

export default AccountEditable;
