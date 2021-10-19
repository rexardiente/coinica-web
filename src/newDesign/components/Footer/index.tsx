import React, {useState} from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import styles from "./Footer.module.scss";
import { Box, Modal, Fade, Typography, Backdrop, Paper } from "@material-ui/core";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () =>{
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleTermsClose = () => {
    setOpenTerms(false);
  }

  const handlePrivacyClose = () => {
    setOpenPrivacy(false);
  }

    return (
      <>
      <Modal
        open={openTerms}
        onClose={handleTermsClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        closeAfterTransition
        className={`${styles.modal}`}
      >
        <Fade in={openTerms}>
          <Paper elevation={3} className={`${styles.modal_content}`}>
            <TermsOfUse closeModal={handleTermsClose} />
          </Paper>
        </Fade>
      </Modal>
      <Modal
        open={openPrivacy}
        onClose={handlePrivacyClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        closeAfterTransition
        className={`${styles.modal}`}
      >
        <Fade in={openPrivacy}>
          <Paper elevation={3} className={`${styles.modal_content}`}>
            <PrivacyPolicy closeModal={handlePrivacyClose}/>
          </Paper>
        </Fade>
      </Modal>
      <Box className={`${styles.coinica_footer}`}>
        <Typography align='center' variant='subtitle2' paragraph>
          <a className={`${styles.modal_link}`} onClick={() => setOpenTerms(true)}>Terms of Use</a> | <a className={`${styles.modal_link}`} onClick={() => setOpenPrivacy(true)}>Privacy Policy</a>
          <br/>
          <i>2020-2021 EOS game store, All rights reserved</i>
        </Typography>
      </Box>
      </>
    );
};

export default Footer;