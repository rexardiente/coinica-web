import React, { useState } from "react";
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
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
    <Modal
      open={showModal}
      onClose={hideModal}
      style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      }}
    >
      <Box
        style={{
          width: "500px",
          padding: '4rem 3rem',
          backgroundColor: `var(--bg-less-dark-color)`,
          borderRadius: '10px'
        }}
      >
        <h3 style={{ color: "#fff" }}>
          {translate("account_settings.setting_screen.security.reset_password.modal.title")}
        </h3>
        <ResetPasswordModal UserEmail={email} hideModal={hideModal} />
      </Box>
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
      alert("email not found, please login first")
      toast.error(translate("account_settings.setting_screen.security.reset_password.toast.error"));
    }else{
      toggleShowModal();
    }
  }

  return(
    <Box>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClick}
      >
        {translate("account_settings.setting_screen.security.reset_password.button")}
      </Button>
      <ChangePasswordModal email={email} showModal={showChangePasswordModal} hideModal={toggleHideModal}/>
    </Box>
  )
  
}

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(SecurityComponent);
