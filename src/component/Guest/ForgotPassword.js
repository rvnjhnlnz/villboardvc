import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import './visitor.css'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormTextarea, CFormInput } from '@coreui/react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
function ForgotPassword() {
    const [visible,setVisible] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [conPassword,setconPassword] = useState("");
    const [new_errormessage, new_Seterrormessage] = useState('');
    const [con_errormessage, con_Seterrormessage] = useState('');
    const [show,setShow] = useState('password');
    let history = useHistory();
    const validate = () => {
        let isValid = true;
        let nError, cError= "";

        if (!newPassword) {
            nError = 'Please Enter your Password'
            isValid = false;
            console.log('1')
        }
        if (newPassword !== conPassword) {
            cError = "Passwords didn't match"
            isValid = false;
            console.log('1')
        }
        if (nError || cError ) {
            new_Seterrormessage(nError);
            con_Seterrormessage(cError);
            return isValid;
        }
        return isValid;
    }
    function handleClick(){
        if(show === 'text'){
            setShow('password');
        }
        else{
            setShow('text')
        }
    }
    function thankyou(e){
        e.preventDefault();
        const valid = validate();
        if(valid){
            new_Seterrormessage("");
            con_Seterrormessage("");
            Swal.fire({
                icon: 'success',
                title: "Your password changed successfully",
                confirmButtonText: 'Ok',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push("/");
                }
            })
        }    
    }
  return (
    <div class="v_container">
            <div class="thankyou_c">
                <>
                    <CModal alignment='center' scrollable visible={visible}>
                        <CModalHeader closeButton = {false}>
                            <CModalTitle>Terms and Conditions</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        <div>
                        <div className="visitor_input-field">
                            <input type={show}  className="form-control"
                               value={newPassword}  onChange={(e) => setNewPassword(e.target.value)}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {new_errormessage}
                            </div>
                            <label className="visit_label">New Password: </label>
                        </div>
                        <div className="visitor_input-field">
                            <input type={show} className="form-control"
                                value={conPassword} onChange={(e) => setconPassword(e.target.value)} />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {con_errormessage}
                            </div>
                            <label className="visit_label">Confirm Password:</label>
                        </div>
                        <div className="showHide">
                        <span onClick={handleClick}>{show === 'text' ? 'Hide' : 'Show'}</span>
                        </div>
                        </div>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="success" onClick={(e) => thankyou(e)}>Confirm</CButton>
                        </CModalFooter>
                    </CModal>
                </>
            </div>
        </div>
  )
}

export default ForgotPassword