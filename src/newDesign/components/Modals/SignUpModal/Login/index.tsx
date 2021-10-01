import React, { useState } from "react";
import styles from "./Login.module.scss";
import { FormControl, TextField, Button, Box, Grid, Typography, Divider, InputBase, InputLabel, InputAdornment, IconButton } from "@material-ui/core";
import { Theme, withStyles, createStyles, alpha } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { translate } from "helpers/translate";




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
  setShowModal: Function;
};

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  isInvalid: boolean;
}

const Login = (
// {
//   platform,
//   setTabKey,
//   requestResetPassword,
//   dispatch,
//   setShowModal,
// }: LoginProps
) => {
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    isInvalid: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
              className={`${styles.label}`}
            >
              {translate("login.username")}
            </InputLabel>
            {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
            <BootstrapInput 
              id="bootstrap-input" 
              value={values.username}
              onChange={handleChange('username')}
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
            {/* <InputBase defaultValue="" id="bootstrap-input" className={`${styles.input_field}`} /> */}
            <BootstrapInput 
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              className={`${styles.password_field}`}
              endAdornment={
                <InputAdornment position="end" className={`${styles.password_visibility}`}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } 
            />
          </FormControl>
        </Grid>
        <Grid
          item
          justifyContent="center"
          xs={12}
          className={`${styles.login_submit} center-content`}
        >
          <Button variant="contained" color="primary" size="large">
            {translate("login.button")}
          </Button>
        </Grid>
      </Grid>
    );
};

export default Login;