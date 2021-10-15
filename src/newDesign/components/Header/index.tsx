import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, FormGroup, FormControlLabel, FormControl, Switch, IconButton, Select, MenuItem, Avatar, Typography, Menu } from "@material-ui/core";
import { Menu as MenuIcon, ArrowDropDown } from "@material-ui/icons"
import styles from "./Header.module.scss";
import { translate } from "helpers/translate";
import {
  setEntryModalState,
  setCurrency,
} from "redux/platform/platform_action";
import truncate from "helpers/numbers/truncate";
import { BTC, ETH, USDC } from "components/CurrencySymbols";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as assets from "./Assets";

const LogoutModal = React.lazy(() => import("../Modals/Logout"));
const SignupModal = React.lazy(() => import("../Modals/SignUpModal"));


declare global {
  interface Window {
    web3: any;
  }
}

const getSymbol = (symbol) => {
  switch (symbol) {
    case 'btc': return <BTC />
    case 'eth': return <ETH />
    case 'usdc': return <USDC />
    default: return null
  }
}

const LoggedIn = (props) => {
  const history = useHistory();
  const { account, accountBalance, selectedCurrency } = props?.platform;
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [balanceAvailable, setBalanceAvailable] = useState(() => {
    if (accountBalance.id !== null) {
      const arr = Object.keys(accountBalance);
      const filteredArr = arr.filter(val => val !== "id");
      return filteredArr;
    }
  });

  useEffect(() => {
    if (account) {
      setUsername(account.username);
    }
  }, [account]);

  useEffect(() => {
    setBalanceAvailable(() => {
      if (accountBalance.id !== null) {
        const arr = Object.keys(accountBalance);
        const filteredArr = arr.filter(val => val !== "id");
        return filteredArr;
      }
    })
  }, [accountBalance]);

  const logoutUser = () => {
    handleMenuClose();
    props.setLogoutModal(true);
  };

  const setSelectedCurrency = (currency) => {
    props.dispatch(setCurrency(currency));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value : unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className={`${styles.logged_in}`}>
      {accountBalance.id !== null ? (
        <FormControl variant="outlined">
          <Select
            value={selectedCurrency}
            onChange={handleSelectChange}
            className={`${styles.select_coin}`}
          >
            {accountBalance && balanceAvailable && balanceAvailable.length
              ? balanceAvailable.map((currency,index) => (
                  <MenuItem key={currency + index} value={currency}>
                    {getSymbol(currency)}{" "}
                    {accountBalance[currency] !== null
                      ? truncate(accountBalance[currency].amount, 6)
                      : (0).toFixed(6)}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      ) : null}

      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className={`${styles.user_menu}`}
      >
        <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" />
        <Typography variant="subtitle1" className={`${styles.username}`}>
          {username}
        </Typography>
        <ArrowDropDown />
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>{translate("header.dropdown.hello")} {`, ${username}`}</MenuItem>
        <MenuItem onClick={() => history.push("/account/balance/deposit")}>{translate("header.dropdown.balance")}</MenuItem>
        <MenuItem onClick={() => history.push("/account/settings")}>{translate("header.dropdown.settings")}</MenuItem>
        <MenuItem onClick={() => logoutUser()}>{translate("header.dropdown.logout")}</MenuItem>
      </Menu>
    </div>
  );
};

const NotLoggedIn = ({handleSignUpModalOpen}) => {
  return (
    <div>
      <Button
        variant="text"
        color="primary"
        className={`${styles.login_button}`}
        onClick={() => handleSignUpModalOpen()}
      >
        {translate("header.login")}
      </Button>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#1785EB",
      backgroundColor: "#242D41",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 5,
    },
    hide: {
      display: "none",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      justifyContent: 'space-between'
    },
  })
);

type props = {
  open: boolean;
  // handleDrawerOpen: Function;
  handleDrawerToggle: Function;
  mini: boolean;
  handleNavType: Function;
  scatter?: any;
  platform?: any;
  walletExt?: any;  
  dispatch?: Function;
};

const Header = (props: props) => {
  const classes = useStyles();
  const [logoutState, setLogoutModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const { userAccount } = props.scatter;
  const { account, entryModalState } = props.platform;
  const { dispatch } = props;
  const setShowSignupModal = (state) => {
    if (typeof dispatch === "function") {
      dispatch(setEntryModalState(state));
    }
  };
  const handleSignUpModalOpen = () => {
    setOpenSignupModal(true);
  };
  const handleSignUpModalClose = () => {
    setOpenSignupModal(false);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModal(false);
  }
  return (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      {
        <SignupModal openModal={openSignupModal} handleSignUpModalOpen={handleSignUpModalOpen} handleSignUpModalClose={handleSignUpModalClose} />
      }
      {
        <LogoutModal show={logoutState} setLogoutModal={setLogoutModal} />
      }
      <Toolbar className={clsx(classes.toolbar)}>
        {!props.mini ? (
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => props.handleDrawerToggle()}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img
                src={assets.logo}
                // width={40}
                height={40}
                alt="logo"
                className={`${styles.logo}`}
              />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <FormGroup style={{ paddingLeft: "60px" }}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={props.mini}
                onChange={() => props.handleNavType()}
              />
            }
            label={"Mini"}
          />
        </FormGroup>
        {userAccount || account ? (
          <LoggedIn {...props} setLogoutModal={setLogoutModal} />
        ) : (
          <NotLoggedIn handleSignUpModalOpen={handleSignUpModalOpen} />
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ scatter, platform, walletExt }) => ({
  scatter,
  platform,
  walletExt,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Header);
