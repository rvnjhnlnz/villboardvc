import React from 'react';
import './Accounts.css'
const AccountEditable = ({ editUserData, handleEditUserChange, handleCancelClick, handleEditFormSubmit }) => {
    const options = [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Homeowners",
          value: "homeowners",
        },
      ];
    return (
        <tr>
            <td>
                {/*<select name="role" id="role" onChange={handleEditUserChange} value = {editUserData.role}>
                    <option value="Admin">Admin</option>
                    <option value="homeowners">Homeowner</option>
                    <option value="Security">Security</option>
                </select>*/}
                <select value={editUserData.role}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your Last name"
                    name="lastName"
                    onChange={handleEditUserChange}
                    value={editUserData.lastName}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your First name"
                    name="firstName"
                    onChange={handleEditUserChange}
                    value={editUserData.firstName}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your Middle Initial"
                    name="middleInitial"
                    onChange={handleEditUserChange}
                    value={editUserData.middleInitial}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleEditUserChange}
                    value={editUserData.email}
                >
                </input>
            </td>
            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    onChange={handleEditUserChange}
                    value={editUserData.phoneNumber}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your address"
                    name="address"
                    onChange={handleEditUserChange}
                    value={editUserData.address}
                >
                </input>
            </td>
            <td>
                <button type="submit" className='genButton' onClick={handleEditFormSubmit}>Save</button>
                <button type="submit" className='genButton' onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
};

export default AccountEditable;
