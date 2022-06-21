import moment from 'moment'
import React from 'react'
import axios from 'axios';
const VisitorInVillage = ({ res, handleEditFormSubmit }) => {
    return (
        <tr>
            <td>{res.referenceNumber}</td>
            <td>{res.fullName}</td>
            <td>{res.emailV}</td>
            <td>{res.address}</td>
            <td>{res.personVisit}</td>
            <td>{res.contactHomeOwner}</td>
            <td>{res.telHomeOwner}</td>
            <td>{res.homeOwnerAddress}</td>
            <td>{res.purpose}</td>
            <td>{moment(res.createdAt).format('lll')}</td>
            {res.role === "admin" ?
             (<td>Still in village</td>):(
                res.timeOut === "inVillage" ? (<td><button onClick={(e) => { handleEditFormSubmit(res,e)}}>Time Out</button> </td>)
                : (<td>{moment(res.updatedAt).format('lll')}</td>)
            )}
        </tr>
    )
}

export default VisitorInVillage