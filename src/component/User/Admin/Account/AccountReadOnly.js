import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React, { useState } from 'react';
import './Accounts.css'
const AccountReadOnly = ({ acc, handleEditClick, handleDeleteClick }) => {
    // const count = 0
    const [visibleDel, setVisibleDel] = useState(false);

    return (<tr>
        <td>{acc.role}</td>
        <td>{acc.lastName}</td>
        <td>{acc.firstName}</td>
        <td>{acc.middleInitial.toUpperCase()}</td>
        <td>{acc.email}</td>
        <td>{acc.phoneNumber}</td>
        <td>{acc.address}</td>
        <td>
            <button type='button' className='genButton' onClick={(event) => handleEditClick(event, acc)}>Edit</button>
            <button type='button' className='genButton' onClick={() => setVisibleDel(true)}>Delete</button>

            <CModal alignment="center" visible={visibleDel} onClose={() => setVisibleDel(false)}>
                <CModalHeader onClose={() => setVisibleDel(false)}>
                    <CModalTitle>Confirm Delete</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to delete these details?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleDel(false)}>
                        No
                    </CButton>
                    <CButton style={{ backgroundColor: '#04AA6D', borderColor: '#04AA6D' }} onClick={() => handleDeleteClick(acc._id, acc.email)}>Yes</CButton>
                </CModalFooter>
            </CModal>
        </td>
    </tr>)
};

export default AccountReadOnly;
