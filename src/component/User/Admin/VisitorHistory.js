import moment from 'moment'
import React from 'react'

const VisitorHistory = ({res}) => {
    return (
        <tr>
            <td>{res.fullName}</td>
            <td>{res.emailV}</td>
            <td>{res.address}</td>
            <td>{res.personVisit}</td>
            <td>{res.contactHomeOwner}</td>
            <td>{res.emailHomeOwner}</td>
            <td>{res.homeOwnerAddress}</td>
            <td>{res.purpose}</td>
            <td>{moment(res.updatedAt).format('lll')}</td>
            <td>{res.referenceNumber}</td>
        </tr>
    )
}

export default VisitorHistory