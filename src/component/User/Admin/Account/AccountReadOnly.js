import React, { useState } from 'react';
import './Accounts.css'
import moment from 'moment'
const AccountReadOnly = ({acc,handleEditClick,handleDeleteClick}) => {
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
            <button type='button' className='genButton' onClick={(event) => handleEditClick(event,acc)}>Edit</button>
            <button type='button' className='genButton' onClick={(event) => handleDeleteClick(acc._id,acc.email)}>Delete</button>
        </td>
        </tr>)
};

export default AccountReadOnly;
