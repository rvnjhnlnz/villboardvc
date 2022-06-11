import React, { useState, useEffect } from 'react'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useHistory } from "react-router-dom";
function Thankyou() {
  const location = useLocation();
  const useQueryString = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  }
  const [referenceNumber, setReferenceNumber] = useState('')
  const queryString = useQueryString();
  useEffect(() => {
    setReferenceNumber(queryString.get('refNum'))
    console.log(referenceNumber)
  }, []);
  const [visible, setVisible] = useState(true);
  let history = useHistory();
  function close(){
    history.push("/");
  }
  return (
    <div class="v_container">
      <div class="thankyou_c">
        <CModal size="lg" alignment="center" visible={visible}>
          <CModalHeader>
            <CModalTitle>Visitors</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <div>
          <h2>Thank you so much for sending us a heads up on your visit with Villa Caceres</h2>
          <h5>{`Reference Number is ${base64_decode(referenceNumber)}`}</h5>
          </div>
          
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={close}>Close</CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  )
}

export default Thankyou