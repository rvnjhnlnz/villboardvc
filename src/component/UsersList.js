import React, { useEffect, useState } from 'react'
import axios from 'axios'
function UsersList() {
    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        axios.post('postUserinfo')
        .then(res=>{
            console.log(res);
            setUsersList(res.data)
        }).catch(err =>{
            console.log(err);
        })
    },[])

    const usersdata = usersList.map((obj)=>{
        return <tr>
            <td>{obj.email}</td>
            <td>{obj.password}</td>
            <td>{obj.firstName}</td>
            <td>{obj.lastName}</td>
            <td>{obj.middleInitial}</td>
            <td>{obj.address}</td>
            <td>{obj.phoneNumber}</td>
        </tr>
    })
    return (
        <div>
            <h1>UsersList</h1>
            <table className = "table table-dark">
                <thead>
                    <tr>
                        <th>email</th>
                        <th>password</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>middleInitial</th>
                        <th>address</th>
                        <th>phoneNumber</th>
                    </tr>
                </thead>
                <tbody>
                    {usersdata}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList
