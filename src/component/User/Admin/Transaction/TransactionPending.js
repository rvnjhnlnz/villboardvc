import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import moment from 'moment'
const TransactionPending = ({ tr, handleAcceptDecline }) => {

    const [visible, setVisible] = useState(false);
    const [deets, setDeets] = useState({
        header: "",
        content: "",
        onClick: null,
    });
    return (
        <tr>
            <td>{tr.pPending.toUpperCase()}</td>
            <td>{tr.uLastName}</td>
            <td>{tr.uFirstName}</td>
            <td>{tr.uAddress}</td>
            <td>{tr.uPhoneNumber}</td>
            <td>{tr.refNumber}</td>
            <td>{tr.typeTransaction}</td>
            <td>{moment(tr.updatedAt).format('lll')}</td>
            <td><a href={tr.photoUrl}>Click to Download</a>
            </td>
            <td>
                <button type='button' className='genButton' onClick={(e) => {
                    e.preventDefault();
                    setDeets({ header: 'Confirm Accept', content: 'Are you sure you want to accept this payment details?' }); setVisible(true);
                }}>Accept</button>
                <button type='button' className='genButton' onClick={(e) => {
                    e.preventDefault();
                    setDeets({ header: 'Confirm Decline', content: 'Are you sure you want to decline this payment details?' }); setVisible(true);
                }}>Decline</button>
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>{deets.header}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>{deets.content}</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            No
                        </CButton>
                        <CButton style={{ backgroundColor: '#04AA6D', borderColor: '#04AA6D' }} onClick={(e) => { handleAcceptDecline(tr, deets.header) }}>Yes</CButton>
                    </CModalFooter>
                </CModal>
            </td>
        </tr>
    )
}

export default TransactionPending