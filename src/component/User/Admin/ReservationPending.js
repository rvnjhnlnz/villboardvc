import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from "@coreui/react";
  import moment from "moment";
  import "./Reservation.css";
  import React, { useState } from "react";
  import { height } from "@mui/system";
  
  const ReservationPending = ({ res, handleAcceptDecline }) => {
    const [visible, setVisible] = useState(false);
    const [reason, setReason] = useState(" ")
    const [deets, setDeets] = useState({
      header: "",
      content: "",
      onClick: null,
    });
  
    return (
      <tr>
        <td>{res?.rFirstName}</td>
        <td>{res?.rLastName}</td>
        <td>{res?.rPhoneNumber}</td>
        <td>{res?.venue}</td>
        <td>{res?.reservationTime}</td>
        <td>{moment(res?.reservationDate).format("lll")}</td>
        <td>{moment(res?.createdAt).format("lll")}</td>
        <td>
          <button
            type="button"
            className="genButton"
            onClick={(e) => {
              e.preventDefault();
              setDeets({
                header: "Confirm Accept",
                content: "Are you sure you want to accept this reservation?",
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
                  handleAcceptDecline(res, deets.header, reason);
                }}
              >
                Yes
              </CButton>
            </CModalFooter>
          </CModal>
        </td>
      </tr>
    );
  };
  
  export default ReservationPending;
  