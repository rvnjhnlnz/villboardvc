import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'

const Confirmation = ({vis, header, content, onClick}) => {
    const [visible, setVisible] = useState(false)
    setVisible(vis)
    return (
        <>
            {/* <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton> */}
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Confirm Edit</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to edit these details?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        No
                    </CButton>
                    <CButton color="primary" onClick={onClick}>Yes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Confirmation