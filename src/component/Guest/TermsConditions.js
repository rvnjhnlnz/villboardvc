import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormTextarea, CFormInput } from '@coreui/react';
function TermsConditions() {
    const [visible, setVisible] = useState(true);
    let history = useHistory();
    function thankyou(e){
        e.preventDefault();
        history.push('/');
    }
    return (
        <div class="v_container">
            <div class="thankyou_c">
                <>
                    <CModal scrollable visible={visible}>
                        <CModalHeader closeButton = {false}>
                            <CModalTitle>Terms and Conditions</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <p>Please read these Terms and Conditions of Use carefully. <br></br>
                            </p>
                            <p>Villboard application and our website <a href="https://villboard-23c49.web.app/">https://villboard-23c49.web.app/</a>
                                the application is operated by the Villa Cares – sta. rosa laguna your access to and use of the service
                                is conditioned on your acceptance and compliance with these terms.
                                These terms apply to all visitors, homeowners who access our mobile and web application.</p>
                            <h4>Privacy Policy</h4>
                            <p>Villboard app understands that the security of your personal information is extremely important, and it is committed to respecting your privacy and safeguarding your personal data.</p>
                            <p>Your Name, Home address, e-mail address, contact information and other information from which your identity is apparent or can be reasonably and directly ascertained.
                                Personal data collected shall be used by the company and only within the mobile application, and web server. By default, user’s </p>
                            <p>personal information is only shown for the user itself. It will be discretion of the user to make personal information visible to other user as well within the application.
                                Only the person in charge in handling the admin side of the Application and Web will be the one who can be able to see your personal information.
                                But in QR code you get when you registered your PET and/or VEHICLE, your information will be seen by someone who scanned the QR Code. </p>
                            <p>They govern and apply to your access and use of the services offered through the VillBoard Application.
                                By accessing or using the VillBoard Application or the Village website, you agree to comply with and be bound by all the Terms and Conditions described below.
                                If you do not agree to these Terms and Conditions, you are not authorized to use the VillBoard Application.
                                Your right to use the VillBoard Application will need to be approved by the Company and the Company may remove your right to use the
                                VillBoard Application at any time by revoking your Validly Issued Login. </p>
                            <h4>Data Privacy</h4>
                            <p>VillBoard is committed to protecting your right to privacy.
                                We give utmost importance to data protection wherein all personal information shall be handled with confidentiality and security. Thus,
                                VillBoard commits to ensure that all personal data obtained either manually or electronically.
                                The Information Collected will be stored in remote third-party database (MongoDB) which is securely stored as per their privacy policy
                                MongoDB., Inc. is committed in protecting your privacy. We only collect your personal information with your knowledge and permission
                                . All data gathered will be used for the purpose of sending information, updates. </p>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="success" onClick={(e) => thankyou(e)}>Agree</CButton>
                        </CModalFooter>
                    </CModal>
                </>
            </div>
        </div>
    )
}

export default TermsConditions