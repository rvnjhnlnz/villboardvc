import React, { useState } from 'react';
import './Accounts.css'
import moment from 'moment'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
const AccountEditable = ({acc, editUserData, handleEditUserChange, handleCancelClick, handleEditFormSubmit }) => {
    const [visible, setVisible] = useState(false);

    return (
        <tr>
            <td>
                <select name="role" id="role" onChange={handleEditUserChange} value={editUserData.role}>
                    <option value="admin">Admin</option>
                    <option value="homeowners">Homeowner</option>
                    <option value="security">Security</option>
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
                    value={editUserData.middleInitial}
                >
                </input>
            </td>
            <td>
                <input
                disabled
                    type="text"
                    required="required"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleEditUserChange}
                    value={editUserData.email}
                >
                </input>
            </td>
            {/*<td>
                <button type='button' className='genButton' onClick={(e) => {
                    e.preventDefault(); setVisible(true);
                }}>Edit</button>
                <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>New Password</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                    <div className='output-box'>
                        <input
                            type="text"
                            required="required"
                            placeholder="Enter your current password"
                            name="email"
                            onChange={handleEditUserChange}
                            value={editUserData.password}>
                        </input>
                        <input
                            type="text"
                            required="required"
                            placeholder="Enter your new password"
                            name="email"
                            onChange={handleEditUserChange}
                            value={editUserData.newPass}>
                        </input>
                    </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="success" >Agree</CButton>
                    </CModalFooter>
                </CModal>
            </td>*/}
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
            <td>{moment(acc.createdAt).format('lll')}</td>
            <td>
                <button type="submit" className='genButton' onClick={handleEditFormSubmit}>Save</button>
                <button type="submit" className='genButton' onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
};

export default AccountEditable;
