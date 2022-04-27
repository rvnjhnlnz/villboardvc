import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import moment from "moment";
import React, { useState } from "react";

const ReservationPending = ({ res, handleAcceptDecline }) => {
  const [visible, setVisible] = useState(false);
  const [deets, setDeets] = useState({
    header: "",
    content: "",
    onClick: null,
  });

  return (
    <tr>
      <td>{res?.rPending.toUpperCase()}</td>
      <td>{res?.rFirstName}</td>
      <td>{res?.rLastName}</td>
      <td>{res?.rPhoneNumber}</td>
      <td>{res?.venue}</td>
      <td>{res?.reservationTime}</td>
      <td>{moment(res?.reservationDate).format("ll")}</td>
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
          <CModalBody>{deets.content}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              No
            </CButton>
            <CButton
              style={{ backgroundColor: "#04AA6D", borderColor: "#04AA6D" }}
              onClick={(e) => {
                handleAcceptDecline(res, deets.header);
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
