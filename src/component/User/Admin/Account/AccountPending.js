import React, { useState } from 'react';
import './Accounts.css'
const AccountPending = ({acc,handleAccept,handleDisapproved}) => {
    const count = 0
    return (<tr>
        <td>{acc.role}</td>
        <td>{acc.lastName}</td>
        <td>{acc.firstName}</td>
        <td>{acc.middleInitial}</td>
        <td>{acc.email}</td>
        <td>{acc.phoneNumber}</td>
        <td>{acc.address}</td>
        <td>
            <button type='button' className='genButton' >Accept</button>
            <button type='button' className='genButton' >X</button>
        </td>
        </tr>)
};

export default AccountPending;
