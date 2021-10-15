import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./Login.module.scss";
import { FormControl, TextField, Button, Box, Grid, Typography, Divider, InputBase, InputLabel, InputAdornment, IconButton } from "@material-ui/core";
import { Theme, withStyles, createStyles, alpha } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { translate } from "helpers/translate";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { setUserBalance } from "redux/platform/platform_action";
import {
  GetUserAccountById,
  GetUserWalletBalance,
} from "services/api/server/platform";
import {
  multi_currency_sign_in,
  multi_currency_set_token,
} from "services/api/server/multi_currency_api";
import {
  setPlatformAccountSuccess,
  setPlatformAccountFailed,
} from "redux/platform/platform_action";
import { toast } from "react-toastify";


const SIGN_IN_USER = ({ username, password }) => {
  return multi_currency_sign_in({ username, password });
};

const GET_USER_DATA = (id) => {
  return GetUserAccountById(id);
};

export const GoToAddEmail = (history) => {
  return (
    <span>
      {translate("signup.msg.add.email", {
        span: (content) => (
          <span
            className="text-warning text-bold"
            onClick={() => history.push("/account/settings")}
          >
            {content}
          </span>
        ),
      })}
    </span>
  );
};

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3.5),
      },
    },
    input: {
      direction: 'ltr',
      color: "white",
      borderRadius: 10,
      position: "relative",
      backgroundColor: "#0E141F",
      fontSize: 16,
      width: "100%",
      padding: "14px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: "Roboto",
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      },
    },
  })
)(InputBase);

type LoginProps = {
  platform: any;
  setTabKey: Function;
  requestResetPassword: Function;
  dispatch: Function;
  handleSignUpModalClose: Function;
};

const Login = ({
  platform,
  requestResetPassword,
  dispatch,
  handleSignUpModalClose
}: LoginProps) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const { formatMessage } = useIntl();

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getBalance = async () => {
    try {
      const { data } = await GetUserWalletBalance();
      if (data) {
        dispatch(setUserBalance(data));
      }
    } catch (e) {
      // do nothing
    }
  };

  const usernameHandler = (e) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setUsername(value);
  };
  const passwordHander = (e) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { id, token },
      } = await SIGN_IN_USER({ username, password });
      multi_currency_set_token({ CLIENT_TOKEN: token, CLIENT_ID: id });

      const user = await GET_USER_DATA(id);
      getBalance();
      if (user.data) {
        const { username, email, is_verified } = user.data;
        toast.success(
          `${formatMessage({ id: "signup.msg.welcome" })} ${username || email}!`
        );

        if (!email && !is_verified) {
          toast.info(GoToAddEmail(history), { autoClose: false });
        }

        dispatch(setPlatformAccountSuccess(user.data));
        dispatch(setPlatformAccountFailed(null));
        handleSignUpModalClose();
      }
    } catch (e: any) {
      if (
        e?.response?.status === 401 &&
        e?.response?.statusText === "Unauthorized" &&
        (e?.response?.config?.url + "").includes("account") === false
      ) {
        dispatch(
          setPlatformAccountFailed(formatMessage({ id: "login.msg.invalid" }))
        );
        setInvalid(true);
      } else {
        dispatch(
          setPlatformAccountFailed(formatMessage({ id: "login.msg.error" }))
        );
      }
    } finally {
      setLoading(false);
    }
  };

    return (
      <>
        <Typography className={`${styles.error}`}>{platform.error}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink className={`${styles.label}`}>
                  {translate("login.username")}
                </InputLabel>
                <BootstrapInput
                  id="bootstrap-input"
                  value={username}
                  onChange={usernameHandler}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  htmlFor="standard-adornment-password"
                  className={`${styles.label}`}
                >
                  {translate("login.password")}
                </InputLabel>
                <BootstrapInput
                  id="standard-adornment-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={passwordHander}
                  className={`${styles.password_field}`}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      className={`${styles.password_visibility}`}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              className={`${styles.login_submit} center-content`}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
              >
                {translate("login.button")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Login);
