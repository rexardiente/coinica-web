import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styles from "./Header.module.scss";
import * as assets from "./Assets";


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
      marginRight: 36,
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
  mini: boolean;
  handleNavHidden: Function;
}

const Header = ({open, handleDrawerToggle, mini, handleNavHidden}:props) =>{
  const classes = useStyles();
  const theme = useTheme();

    return (
      <AppBar
      position="fixed"
      className={clsx(classes.appBar)}
    >
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerToggle()}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" noWrap>
          <img src={assets.logo} width={40} height={40} alt="logo" className="logo w-auto" />
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch color="primary" checked={mini} onChange={() => handleNavHidden()} />}
            label={'Mini'}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
    );
};

export default Header;