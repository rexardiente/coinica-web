import React , { useState } from "react";
import styles from "./Signup.module.scss";
import { FormControl, InputLabel, InputBase, Grid, FormControlLabel, Checkbox, Button, Divider, Typography, Box, InputAdornment, IconButton } from "@material-ui/core";
import { withStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
import { InfoOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { translate } from "helpers/translate";

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

interface State {
  username: string;
  password: string;
  code: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  terms: boolean;
  loading: boolean;
  isSigningIn: boolean;
  submitSuccess: string;
  submitErr: string;
  err: boolean;
}

const Signup = () => {

  // const history = useHistory();
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
  // const { formatMessage } = useIntl();

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

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
    return (
      <Grid container spacing={4}>
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
              id="bootstrap-input"
              value={username}
              onChange={usernameHandler}
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
              type={showPass ? 'text' : 'password'}
              value={passObj.password}
              onChange={passwordHander}
              defaultValue=""
              id="bootstrap-input"
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
              type={showPass ? 'text' : 'password'}
              value={passObj.password2}
              onChange={passwordHander}
              id="bootstrap-input"
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
          <Button variant="contained" color="primary" size="large">
            {translate("signup.create.account")}
          </Button>
        </Grid>
      </Grid>
    );
};

export default Signup;