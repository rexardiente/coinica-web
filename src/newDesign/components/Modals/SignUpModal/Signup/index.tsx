import React , { useState } from "react";
import { connect } from "react-redux";
import styles from "./Signup.module.scss";
import { FormControl, InputLabel, InputBase, Grid, FormControlLabel, Checkbox, Button, Divider, Typography, Box, InputAdornment, IconButton } from "@material-ui/core";
import { withStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
import { InfoOutlined, Visibility, VisibilityOff, HighlightOff } from "@material-ui/icons";
import { translate } from "helpers/translate";
import { useHistory } from "react-router-dom";
import {
  setPlatformAccountSuccess,
  setPlatformAccountFailed,
  setUserBalance,
} from "redux/platform/platform_action";
import {
  GetUserAccountById,
  GetUserWalletBalance,
} from "services/api/server/platform";
import {
  multi_currency_sign_up,
  multi_currency_sign_in,
  multi_currency_set_token,
} from "services/api/server/multi_currency_api";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { GoToAddEmail } from "../Login";

const randomUser = () => {
  const length = 7;
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
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

type SignUpProps = {
  setTabKey: Function;
  platform: any;
  dispatch: Function;
};

const SignUp = ({
  setTabKey,
  platform,
  dispatch,
}: SignUpProps) => {

  const history = useHistory();
  const [username, setUsername] = useState(randomUser());
  const [code, setCode] = useState("");
  const [passObj, setPassword] = useState({
    password: "",
    password2: "",
  });
  const [terms, setTerms] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setSigningIn] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [err, setErr] = useState(false);
  const { formatMessage } = useIntl();

  const updateWalletBalance = async () => {
    try {
      const { data } = await GetUserWalletBalance();
      dispatch(setUserBalance(data));
    } catch (error) {
      console.error(error);
    }
  };

  const usernameHandler = (e) => {
    const { value } = e.target;
    setUsername(value);
    if (submitErr) {
      setSubmitErr("");
    }
    if (submitSuccess) {
      setSubmitSuccess("");
    }
  };
  const passwordHander = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passObj,
      [name]: value,
    });
    if (err) {
      setErr(false);
    }
  };
  const validateForm = () => {
    if (passObj.password !== passObj.password2) {
      setErr(true);
      return false;
    }
    return true;
  };
  const automaticSignInUser = async ({ username, password }) => {
    try {
      setSigningIn(true);
      const {
        data: { id, token },
      } = await multi_currency_sign_in({ username, password });
      multi_currency_set_token({ CLIENT_TOKEN: token, CLIENT_ID: id });
      await updateWalletBalance();

      const user = await GetUserAccountById(id);
      if (user.data) {
        const { username, email, is_verified } = user.data;
        toast.success(`${formatMessage({ id: "signup.msg.welcome" })} ${username || email}!`);

        if (!email && !is_verified) {
          toast.info(GoToAddEmail(history), { autoClose: false });
        }

        dispatch(setPlatformAccountSuccess(user.data));
        dispatch(setPlatformAccountFailed(null));
      }
    } finally {
      setLoading(false);
      setSigningIn(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const parameters = { username, password: passObj.password } as any;
        if (code !== "") {
          parameters.referred_by = code;
        }
        const data = await multi_currency_sign_up(parameters);
        if (data?.status === 201 && data?.statusText === "Created") {
          setSubmitErr("");
          setSubmitSuccess(formatMessage({ id: "signup.msg.success" }));
          setUsername("");
          setCode("");
          setPassword({
            password: "",
            password2: "",
          });
          automaticSignInUser({ username, password: passObj.password });
        } else {
          throw new Error(formatMessage({ id: "signup.msg.error" }));
        }
      } catch (e: any) {
        setSubmitSuccess("");
        if (
          e?.response?.status === 409 &&
          e?.response?.statusText === "Conflict"
        ) {
          setSubmitErr(formatMessage({ id: "signup.msg.username.exist" }));
        } else {
          setSubmitErr(formatMessage({ id: "signup.msg.server.error" }));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
    return (
      <form onSubmit={handleSignUp}>
        <Grid container spacing={4}>
          {submitErr && (
            <Grid item xs={12} className={`${styles.error_message}`}>
              {submitErr}
            </Grid>
          )}
          {submitSuccess && (
            <Grid item xs={12} className={`${styles.success_message}`}>
              {submitSuccess}
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={`${styles.label}`}
              >
                {translate("signup.username")}
              </InputLabel>
              {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
              <BootstrapInput
                required
                id="bootstrap-input"
                value={username}
                onChange={usernameHandler}
                endAdornment={
                  username !== "" ? (
                    <InputAdornment
                      position="end"
                      className={`${styles.adornment_element}`}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setUsername("")}
                        onMouseDown={() => setUsername("")}
                        edge="end"
                      >
                        <HighlightOff />
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ""
                  )
                }
              />
              <Box display="flex" className={`${styles.important}`} pt={"10px"}>
                <Typography variant="caption" component="text" gutterBottom>
                  {translate("signup.important", {
                    strong: (content) => <strong>{content}</strong>,
                  })}
                </Typography>
                <InfoOutlined />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={`${styles.label}`}
              >
                {translate("signup.password")}
              </InputLabel>
              {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
              <BootstrapInput
                name="password"
                type={showPass ? "text" : "password"}
                value={passObj.password}
                onChange={passwordHander}
                defaultValue=""
                id="bootstrap-input"
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={`${styles.adornment_element}`}
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={`${styles.label}`}
              >
                {translate("signup.confirm.password")}
              </InputLabel>
              {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
              <BootstrapInput
                name="password2"
                type={showPass ? "text" : "password"}
                value={passObj.password2}
                onChange={passwordHander}
                id="bootstrap-input"
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={`${styles.adornment_element}`}
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                className={`${styles.label}`}
              >
                {translate("signup.referral")}
              </InputLabel>
              {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
              <BootstrapInput
                id="bootstrap-input"
                name="code"
                value={code}
                onChange={(e) => setCode(e?.target?.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                className={`${styles.agreement_label}`}
                value="start"
                control={<Checkbox className={`${styles.agreement}`} />}
                label={translate("signup.agreement")}
                labelPlacement="start"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider className={`${styles.divider}`} />
          </Grid>
          <Grid
            item
            justifyContent="center"
            xs={12}
            className={`${styles.signup_submit} center-content`}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              type="submit"
            >
              {isSigningIn
                ? translate("signup.signing.in")
                : loading
                ? translate("signup.creating.account")
                : translate("signup.create.account")}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
