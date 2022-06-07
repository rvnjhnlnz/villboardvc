import React, { useState,useEffect } from 'react'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { Redirect, Link, useLocation } from 'react-router-dom';
function Thankyou() {
const location = useLocation();
    const useQueryString = () => {
        const location = useLocation();
        return new URLSearchParams(location.search);
    }
    const[referenceNumber, setReferenceNumber] = useState('')
    const queryString = useQueryString();
    useEffect(() => {
        setReferenceNumber(queryString.get('refNum'))
        console.log(referenceNumber)
    }, []);
    
  return (
    <div>
    <h2>Thank you</h2>
    <h5>{`Reference Number is ${base64_decode(referenceNumber)}`}</h5>
    </div>
  )
}

export default Thankyou