import React, { useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Row, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ResetPasswordModal from "../Modal/ResetPasswordModal";
import { translate } from "helpers/translate";

const useStyles = makeStyles(() => ({
  button: {
    background: '#31699C',
    color: '#DEEFFF',
    fontSize: '10px',
    marginTop: '10px',
    '&:hover': {
      background: '#31699C'
    }
  }
}));

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
  const classes = useStyles();
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
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClick}
      >
        {translate("account_settings.setting_screen.security.reset_password.button")}
      </Button>
      <ChangePasswordModal email={email} showModal={showChangePasswordModal} hideModal={toggleHideModal}/>
    </Row>
  )
  
}

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(SecurityComponent);
