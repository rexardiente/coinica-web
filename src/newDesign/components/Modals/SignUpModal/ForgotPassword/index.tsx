import { useState } from "react";
import { Modal, Box, Typography, Fade, withStyles, Theme, InputBase, createStyles, alpha, Button} from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./ForgotPassword.module.scss";
import {toast} from "react-toastify";
import { ResetPassword } from "services/api/server/multi_currency_api";


type Props = {
  open: boolean;
  handleClose: Function
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3.5),
      },
    },
    input: {
      marginTop: '20px',
      marginBottom: '10px',
      direction: 'ltr',
      color: "white",
      borderRadius: 10,
      position: "relative",
      backgroundColor: "#0E141F",
      fontSize: 16,
      width: "100%",
      padding: "14px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      },
    },
  })
)(InputBase);

const ForgotPassword = ({open,handleClose}:Props) => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    toast.info(translate("forgot.password.email.msg"));
    ResetPassword(email);
  }

    return (
      <Modal
        open={open}
        onClose={() => handleClose()}
        className={`${styles.modal}`}
      >
        <Fade in={open}>
          <Box component="div" className={`${styles.modal_content}`}>
            <Typography variant="h4" align="center" gutterBottom>
              {translate("forgot.password.title")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {translate("forgot.password.instruction")}
            </Typography>
            <BootstrapInput
              id="bootstrap-input"
              value={email}
              onChange={handleEmail}
              placeholder={"Email Address"}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
            >
              {translate("forgot.password.title")}
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
}

export default ForgotPassword;