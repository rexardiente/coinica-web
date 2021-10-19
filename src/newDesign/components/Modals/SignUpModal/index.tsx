import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Modal, Fade, Backdrop, Paper, Tabs, Tab, AppBar, Box, Typography} from "@material-ui/core";
import * as assets from "./Assets";
import styles from "./SignupModal.module.scss";
import {translate} from "helpers/translate";
import Login from "./Login";
import Signup from "./Signup";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type Props = {
 openModal: boolean;
 handleSignUpModalOpen: Function;
 handleSignUpModalClose: Function;
}

const SignUpModal = ({openModal, handleSignUpModalClose} : Props) => {

  const [value, setValue] = useState(0);
  const [resetPassword, requestResetPassword] = useState(false)
  const [tabKey, setTabKey] = useState<any>('signup')

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

    return (
      <Modal
        open={openModal}
        onClose={() => handleSignUpModalClose()}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        closeAfterTransition
        className={`${styles.modal}`}
      >
        <Fade in={openModal}>
          <Paper elevation={3} className={`${styles.modal_content}`}>
            <Box className={`${styles.logo_container}`}>
              <img src={assets.logo} className={`${styles.logo}`} />
            </Box>
            <AppBar position="static" color="transparent" className={`${styles.appbar}`}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label={translate("header.login")} {...a11yProps(0)} className={`${styles.tab}`} />
                <Tab label={translate("header.signup")} {...a11yProps(1)} className={`${styles.tab}`} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis="x"
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir="rtl">
                <Login setTabKey={setTabKey} requestResetPassword={requestResetPassword} handleSignUpModalClose={handleSignUpModalClose} />
              </TabPanel>
              <TabPanel value={value} index={1} dir="rtl">
                <Signup setTabKey={setTabKey} handleSignUpModalClose={handleSignUpModalClose} />
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </Fade>
      </Modal>
    );
};

export default SignUpModal;