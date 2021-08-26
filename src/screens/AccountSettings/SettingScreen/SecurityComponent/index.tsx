import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ResetPasswordModal from "../Modal/ResetPasswordModal";
import { translate } from "helpers/translate";

const ChangePasswordModal = ({email = '', showModal = false, hideModal}) => {
  return(
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("account_settings.setting_screen.security.reset_password.modal.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResetPasswordModal UserEmail={email} hideModal={hideModal} />
      </Modal.Body>
    </Modal>
  )
}

const SecurityComponent = ({platform, dispatch}) => {
  let email = '';

  if(platform.account !== null){
    email = platform.account.email
  }

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const toggleShowModal = () => {
    setShowChangePasswordModal(true);
  }

  const toggleHideModal = () =>{
    setShowChangePasswordModal(false);
  }

  const handleClick = () => {
      if(email === '' ){
        toast.error(translate("account_settings.setting_screen.security.reset_password.toast.error"));
      }else{
        toggleShowModal();
      }
  }

  return(
    <Row noGutters={true}>
      <Button variant="btn btn-egs-outline-primary" type="button" onClick={handleClick}>{translate("account_settings.setting_screen.security.reset_password.button")}</Button>
      <ChangePasswordModal email={email} showModal={showChangePasswordModal} hideModal={toggleHideModal}/>
    </Row>
  )
  
}

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(SecurityComponent);
