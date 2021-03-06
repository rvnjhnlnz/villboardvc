import moment from 'moment'
import React from 'react'

const ReservationHistory = ({res}) => {
    return (
        <tr>
            {/* <td>{res.rPending.toUpperCase()}</td> */}
            <td>{res.rFirstName}</td>
            <td>{res.rLastName}</td>
            <td>{res.rPhoneNumber}</td>
            <td>{res.venue}</td>
            <td>{res.reservationTime}</td>
            <td>{moment(res.reservationDate).format('ll')}</td>
            <td>{moment(res.createdAt).format('lll')}</td>
            <td>{moment(res.updatedAt).format('lll')}</td>
            {res.rPending !== "approved" ? (
                <td>{res.reason}</td>
        ) : null}
        </tr>
    )
}

export default ReservationHistory