import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React, { useState } from 'react';
import './Accounts.css'
const AccountPending = ({ acc, handleAcceptDecline }) => {
    // const count = 0

    const [visible, setVisible] = useState(false)
    const [deets, setDeets] = useState({ header: '', content: '', onClick: null })
    // const [submitAccnt, setSubmitAccnt] = useState();

    // const handleAccept = ( acc, header) => {
    //     // event.preventDefault();

    //     if(header === 'Confirm Accept') {
    //         console.log(acc)
    //     } else {
    //         console.log('asdsddsa')
    //     }
    // }
    return (<tr>
        <td>{acc.status.toUpperCase()}</td>
        {/* <td>{acc.role}</td> */}
        <td>{acc.lastName}</td>
        <td>{acc.firstName}</td>
        <td>{acc.middleInitial.toUpperCase()}</td>
        <td>{acc.email}</td>
        <td>{acc.phoneNumber}</td>
        <td>{acc.address}</td>
        <td>
            <button type='button' className='genButton' onClick={(e) => {
                e.preventDefault();
                setDeets({ header: 'Confirm Accept', content: 'Are you sure you want to accept this account?' }); setVisible(true);
            }}>Accept</button>
            <button type='button' className='genButton' onClick={(e) => {
                e.preventDefault();
                setDeets({ header: 'Confirm Decline', content: 'Are you sure you want to decline this account?' }); setVisible(true);
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
                    <CButton style={{ backgroundColor: '#04AA6D', borderColor: '#04AA6D' }} onClick={(e) => { handleAcceptDecline(acc, deets.header) }}>Yes</CButton>
                </CModalFooter>
            </CModal>
        </td>
    </tr>)
};

export default AccountPending;