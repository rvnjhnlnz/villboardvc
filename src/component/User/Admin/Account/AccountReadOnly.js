import React, { useState } from 'react';
import './Accounts.css'
import moment from 'moment'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
const AccountReadOnly = ({ acc, handleEditClick, handleDeleteClick }) => {
    const [visible, setVisible] = useState(false);
    const car = [];
    const [cars, setCars] = useState([]);
    const family = [];
    const [families, setFamilies] = useState([]);
    const pet = [];
    const [pets, setPets] = useState([]);
    function sample() {
        setVisible(!visible);
        console.log(acc);
        for (const object of acc.carField) {
            car.push(object);
        }
        setCars(car);
        for (const object of acc.familyField) {
            family.push(object);
        }
        setFamilies(family);
        for (const object of acc.petField) {
            pet.push(object);
        }
        setPets(pet);
    }
    return (<>
        <tr onClick={sample}>
            {acc.role !== "homeowners" ? (null) : <td>-</td>}
            <td>{acc.lastName}</td>
            <td>{acc.firstName}</td>
            <td>{acc.middleInitial.toUpperCase()}</td>
            <td>{acc.email}</td>
            <td>{acc.phoneNumber}</td>
            <td>{acc.address}</td>
            {/* <td>{moment(acc.updatedAt).format('MM-YYYY')}</td> */}
            {acc.role !== "admin" ? (
                <td>{moment(acc.createdAt).format('lll')}</td>
            ) : null}
            {acc.role !== "admin" ? (
                <td>
                    <button type='button' className='genButton' onClick={(event) => handleEditClick(event, acc)}>Edit</button>
                    <button type='button' className='genButton' onClick={(event) => handleDeleteClick(acc._id, acc.email)}>Delete</button>
                </td>
            ) : null}
        </tr>
        <>
            <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Sample</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <div>
                            <span>Cars:</span>
                            {cars.map((val, i) => {
                                return (
                                    <>
                                        <li key={i}>{val.vehicleModel} - {val.plateNumber}</li>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <span>Family Members:</span>
                            {families.map((val, i) => {
                                return (
                                    <>
                                        <li key={i}>{val.aLastName}, {val.aFirstName}</li>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                        <span>Pets:</span>
                        {pets.map((val, i) => {
                            return (
                                <>
                                    <li key={i}>{val.petName}, {val.petBreed}</li>
                                </>
                            )
                        })}
                        </div>
                    </div>
                </CModalBody>

            </CModal>
        </>
    </>)
};

export default AccountReadOnly;
