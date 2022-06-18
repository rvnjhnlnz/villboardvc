import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import moment from 'moment'
const TransactionPending = ({ tr, handleAcceptDecline }) => {

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [reason, setReason] = useState(" ")
    const [deets, setDeets] = useState({
        header: "",
        content: "",
        onClick: null,
    });
    function opendeclinereason() {
        setVisible(false);
        setVisible1(true);
    }
    return (
        <tr>
            <td>{tr.uLastName}</td>
            <td>{tr.uFirstName}</td>
            <td>{tr.uAddress}</td>
            <td>{tr.uPhoneNumber}</td>
            <td>{tr.refNumber}</td>
            <td>{tr.typeTransaction}</td>
            <td>{moment(tr.createdAt).format('lll')}</td>
            <td><a href={tr.photoUrl}>Click to Download</a></td>
            <td>
          <button
            type="button"
            className="genButton"
            onClick={(e) => {
              e.preventDefault();
              setDeets({
                header: "Confirm Accept",
                content: 'Are you sure you want to accept this payment details?',
              });
              setVisible(true);
            }}
          >
            Accept
          </button>
          <button
            type="button"
            className="genButton"
            onClick={(e) => {
              e.preventDefault();
              setDeets({
                header: "Confirm Decline",
                content: "Are you sure you want to decline this reservation?",
              });
              setVisible(true);
            }}
          >
            Decline
          </button>
          <CModal 
            alignment="center"
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>{deets.header}</CModalTitle>
            </CModalHeader>
            <CModalBody style={deets.header === "Confirm Decline" ? {height: '200px'} : {height: '80px'}}>
              {deets.header === "Confirm Decline" ? <>
                <p>Please enter reason of decline</p>
                <div className="login_input-field">
                  <textarea style={{width: '100%'}} rows='3' value={reason} onChange={e => setReason(e.target.value)} />
                  <label className="l_label">Reason</label>
                </div>
              </> : <p>{deets.content}</p>}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                No
              </CButton>
              <CButton
                style={{ backgroundColor: "#04AA6D", borderColor: "#04AA6D" }}
                onClick={(e) => {
                  handleAcceptDecline(tr, deets.header, reason);
                }}
              >
                Yes
              </CButton>
            </CModalFooter>
          </CModal>
        </td>
        </tr>
    )
}

export default TransactionPending