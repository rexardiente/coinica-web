import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { translate } from "helpers/translate";
import styles from "./SettingsScreen.module.scss";

// assets
import AvatarPlaceholder from "assets/imgs/avatar_placeholder.png";

const UserInformation = React.lazy(() =>import("./UserInformationComponent"));
const Security = React.lazy(() =>import("./SecurityComponent"));

const useStyles = makeStyles(() => ({
  avatar: {
    width: '150px',
    height: '150px',
    marginBottom: '10px'
  },
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

type SettingsProps = {
  platform: any;
  dispatch: Function;
};

const SettingsScreen = ({ platform, dispatch }: SettingsProps) => {
  const classes = useStyles();
  const username = platform?.account?.username
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);

  return (
    <>
      <div className={styles.accountSettingsContainer}>
        <div className={styles.userInfo}>
          <Avatar className={classes.avatar} alt="User icon" src={AvatarPlaceholder} />
          <Typography variant="h6">
            {username}
          </Typography>
          {/* <Button className={classes.button} variant="contained">
            Update Profile Picture
          </Button> */}
        </div>
      </div>

      <Typography className={styles.subHeader} variant="h5">
        {translate("account_settings.setting_screen.account_settings")}
      </Typography>
      <div className={styles.accountSettingsContainer}>
        <div className={styles.settingsContent}>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">
                {translate("account_settings.setting_screen.email_address.title")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <UserInformation showModal={showConfirmEmailModal} setShow={setShowConfirmEmailModal} />
            </Grid>
          </Grid>
        </div>
        <div className={styles.settingsContent}>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">
                {translate("account_settings.setting_screen.password.title")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Security />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
