import React, { useState, useEffect} from 'react';
import './Accounts.css'
import moment from 'moment'
import axios from 'axios'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
const AccountReadOnly = ({ acc, handleEditClick, handleDeleteClick }) => {
     const [visible, setVisible] = useState(false);
     const [petData, setPetData] = useState([]);
     const [carData, setCarData] = useState([]);
     const [familyData, setFamilyData] = useState([]);
    // const car = [];
    // const [cars, setCars] = useState([]);
    // const family = [];
    // const [families, setFamilies] = useState([]);
    const [pets, setPets] = useState([]);
    // function sample() {
    //     setVisible(!visible);
    //     console.log(acc);
    //     for (const object of acc.carField) {
    //         car.push(object);
    //     }
    //     setCars(car);
    //     for (const object of acc.familyField) {
    //         family.push(object);
    //     }
    //     setFamilies(family);
    //     for (const object of acc.petField) {
    //         pet.push(object);
    //     }
    //     setPets(pet);
    // }
    const pet = [];
    const car = [];
    const fam = [];
    const [accountPet, setAccountPet] = useState([]);
    const [accountCar, setAccountCar] = useState([]);
    const [accountFam, setAccountFam] = useState([]);
    useEffect(() => {
        const fetchPets = async () => {
            axios.post('postPet')
                .then(res => {
                    setPetData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        const fetchCar = async () => {
            axios.post('postCar')
            .then(res => {
                setCarData(res.data);
            }).catch(err => {
                console.log(err);
            })
        };
        const fetchFamily = async () => {
            axios.post('postFamily')
            .then(res => {
                setFamilyData(res.data);
            }).catch(err => {
                console.log(err);
            })
        };
        fetchFamily();
        fetchPets();
        fetchCar();
    }, []);
    function sample() {
        setVisible(!visible);
        for(const object of petData){
            if(object.userId === acc._id){
                pet.push(object)
            }
        }
        setAccountPet(pet);
        for(const object of carData){
            if(object.userId === acc._id){
                car.push(object)
            }
        }
        setAccountCar(car);
        for(const object of familyData){
            if(object.userId === acc._id){
                fam.push(object)
            }
        }
        setAccountFam(fam);
    };

return (<>
    <tr onClick={sample}>
        {acc.role !== "homeowners" ? (null) : <td>-</td>}
        <td>{acc.lastName}</td>
        <td>{acc.firstName}</td>
        <td>{acc.middleInitial.toUpperCase()}</td>
        <td>{acc.email}</td>
        <td>{acc.phoneNumber.replace(/^0+/, "+63")}</td>
        <td>{acc.address}</td>
        {/* <td>{moment(acc.updatedAt).format('MM-YYYY')}</td> */}
        {acc.role !== "admin" ? (
            <td>{moment(acc.createdAt).format('lll')}</td>
        ) : null}
        {acc.role !== "admin" ? (
            <td>
                <button type='button' className='genButton' onClick={(event) => handleEditClick(event, acc)}>Edit</button>
                {/* <button type='button' className='genButton' onClick={(event) => handleDeleteClick(acc._id, acc.email)}>Delete</button> */}
            </td>
        ) : null}
    </tr>
    <>
        <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <CModalTitle>{acc.lastName}, {acc.firstName} {acc.middleInitial.toUpperCase()}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div>
                        <div>
                            <span>Cars:</span>
                            {accountCar.map((val, i) => {
                                return (
                                    <>
                                        <li key={i}>{val.vehicleModel} - {val.plateNumber}</li>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <span>Family Members:</span>
                            {accountFam.map((val, i) => {
                                return (
                                    <>
                                        <li key={i}>{val.aLastName}, {val.aFirstName} - {val.Member}</li>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                        <span>Pets:</span>
                        {accountPet.map((val, i) => {
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
