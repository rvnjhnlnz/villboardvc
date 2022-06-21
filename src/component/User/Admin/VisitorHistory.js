import moment from 'moment'
import React from 'react'
import axios from 'axios';
import { decodeToken, useJwt } from "react-jwt";

const VisitorHistory = ({res, handleEditFormSubmit}) => {
    const decodedToken = decodeToken(localStorage.getItem('token'));
    function timeO(e){
        e.preventDefault();
         const data = {
            referenceNumber: res.referenceNumber,
        };
        axios.post('changeTimeOut', data).then(res => {
            console.log(res);
            // Swal.fire({
            //     icon: 'success',
            //     title: "Successful! \n Please wait and check your email for admin's approval to visit. Thank you!",
            //     confirmButtonText: 'Ok',
            // }).then((result) => {
            //     /* Read more about isConfirmed, isDenied below */
            //     if (result.isConfirmed) {
            //         history.push("/");
            //     }
            // })

        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <tr>
            <td>{res.referenceNumber}</td>
            <td>{moment(res.createdAt).format('lll')}</td>
            {decodedToken.role === "admin" ?
             (res.timeOut === "inVillage" ? (<td>Still in Village</td>) : (<td>{moment(res.updatedAt).format('lll')}</td>)):(res.timeOut === "inVillage" ? (<td><button className='genButton' onClick={(e) => { handleEditFormSubmit(res,e)}}>Time Out</button> </td>)
                : (<td>{moment(res.updatedAt).format('lll')}</td>)
            )}
            <td>{res.fullName}</td>
            <td>{res.emailV}</td>
            <td>{res.address}</td>
            <td>{res.personVisit}</td>
            <td>{res.contactHomeOwner}</td>
            <td>{res.telHomeOwner}</td>
            <td>{res.homeOwnerAddress}</td>
            <td>{res.purpose}</td>
            
        </tr>
    )
}

export default VisitorHistory