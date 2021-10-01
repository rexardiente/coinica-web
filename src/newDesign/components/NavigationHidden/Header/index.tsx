import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./Header.module.scss";
import * as assets from "./Assets";
import { translate } from "helpers/translate";



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#1785EB',
      backgroundColor: '#242D41',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 10,
    },
    hide: {
      display: 'none',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

type props = {
  open: boolean;
  // handleDrawerOpen: Function;
  handleDrawerToggle: Function;
  mini : boolean
  handleNavMini: Function;
  handleSignUpModalOpen: Function;
}

const Header = ({open, handleDrawerToggle, mini, handleNavMini, handleSignUpModalOpen}:props) =>{
  const classes = useStyles();
  const theme = useTheme();

    return (
      <AppBar
      position="fixed"
      className={clsx(classes.appBar)}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerToggle()}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Link to='/'>
        <img src={assets.logo} width={40} height={40} alt="logo" className="logo w-auto" />
        </Link>
        <FormGroup>
          <FormControlLabel
            control={<Switch color="primary" checked={mini} onChange={() => handleNavMini()} />}
            label={'Mini'}
          />
        </FormGroup>
        <Button variant="text" color="primary" className={`${styles.login_button}`} onClick={() => handleSignUpModalOpen()}>{translate("header.login")}</Button>
      </Toolbar>
    </AppBar>
    );
};

export default Header;