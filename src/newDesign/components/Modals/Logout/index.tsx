import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { removeLoginHistory } from "redux/scatter/scatter_actions";
import { loggedOut } from "redux/scatter/scatter_actions";
import { logoutPlatformAccount } from "redux/platform/platform_action";
import { multi_currency_sign_out } from "services/api/server/multi_currency_api";
import { translate } from "helpers/translate";
import { useIntl } from "react-intl";
import { Modal, Button, Typography, Box, Divider, FormControl, Fade } from "@material-ui/core";
import styles from "./Logout.module.scss";
import { ShowChartRounded } from "@material-ui/icons";

type PassSetProps = {
    loggingOut: boolean;
    setLogoutModal: Function;
    handleLogout: Function;
};
const PasswordSet = ({
    loggingOut,
    setLogoutModal,
    handleLogout,
  }: PassSetProps) => {
    const handleLogoutSubmit = () => {
      handleLogout();
    };
    return (
      <Box className={`${styles.logout_check}`}>
        <Typography variant='h6' align="center">
          {translate("logout.confirmation.title")}
        </Typography>
        <Box m={3}>
          <Button variant="contained" color='secondary' onClick={() => handleLogoutSubmit()}>
            {loggingOut
              ? translate("logout.loading.button")
              : translate("logout.title")}
          </Button>
          <Button
            variant="contained"
            className={`${styles.cancel_button}`}
            onClick={() => setLogoutModal(false)}
          >
            {translate("logout.cancel.button")}
          </Button>
        </Box>
      </Box>
    );
  };

type LogoutProps = {
    scatter?: any;
    platform?: any;
    dispatch: Function;
    show: boolean;
    setLogoutModal: Function; // Logout Modal
  };
  const LogoutWithoutPassword = ({
    scatter,
    platform,
    dispatch,
    show,
    setLogoutModal,
  }: LogoutProps) => {
    const { account } = platform;
    const { userAccount } = scatter;
    const [loggingOut, setLogoutLoading] = useState(false);
    const [error, setError] = useState(false);
    const { formatMessage } = useIntl();
  
    const handleLogout = async () => {
      setLogoutLoading(true);
      if (account) {
        try {
          const LOGOUT_DATA = await multi_currency_sign_out();
          if (
            LOGOUT_DATA?.status === 202 &&
            LOGOUT_DATA?.statusText === "Accepted"
          ) {
            dispatch(logoutPlatformAccount());
            setLogoutModal(false);
          } else {
            throw new Error(formatMessage({ id: "logout.msg.error" }));
          }
        } catch (e) {
          setError(true);
        } finally {
          setLogoutLoading(false);
        }
      } else if (userAccount) {
        const scatterData = scatter?.scatter;
        if (!scatterData) return;
        scatterData.logout().then(() => {
          setLogoutLoading(false);
          setLogoutModal(false);
          if (dispatch) {
            removeLoginHistory();
            dispatch(loggedOut());
            toast.success("Logged out successfully");
          }
        });
      }
    };

    return (
      <Modal open={show} onClose={() => setLogoutModal(false)}>
        <Fade in={show}>
          <div className={`${styles.logout_modal}`}>
            <Typography variant="h4" align="center" className={`${styles.title}`}>
              {translate("logout.title")}
            </Typography>
            <Divider />
            <PasswordSet
              loggingOut={loggingOut}
              setLogoutModal={setLogoutModal}
              handleLogout={handleLogout}
            />
          </div>
        </Fade>
      </Modal>
    );

  };

const mapStateToProps = ({ scatter, platform }) => ({ scatter, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutWithoutPassword);