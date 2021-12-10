import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  FormControl,
  IconButton,
  Select,
  MenuItem,
  Avatar,
  Typography,
  Menu,
  withStyles,
  MenuProps,
} from "@material-ui/core";
import { Menu as MenuIcon, ArrowDropDown } from "@material-ui/icons";
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
    case "BTC":
      return <BTC />;
    case "ETH":
      return <ETH />;
    case "USDC":
      return <USDC />;
    default:
      return null;
  }
};

const StyledMenu = withStyles({
  paper: {
    width: "150px",
    backgroundColor: "#242D41",
    color: "#1785EB",
    borderRadius: "0px",
    top: "70px !important",
    boxShadow:
      "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%) !important",
    right: '0 !important',
    marginLeft: 'auto',
    "& li": {
      padding: "10px 0px 10px 20px",
      alignItems: "center",
      fontWeight: "bolder",
      "& img": {
        height: "20px",
        width: "20px",
        marginRight: "10px",
      },
    },
  },
})((props: MenuProps) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    transformOrigin={{ vertical: "top", horizontal: "center" }}
    {...props}
  />
));

const LoggedIn = (props) => {
  const history = useHistory();
  const { account, accountBalance, selectedCurrency } = props?.platform;
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [balanceAvailable, setBalanceAvailable] = useState(() => {
    if (accountBalance.id !== null) {
      const arr = accountBalance.wallet;
      const coins = arr.map((a) => {
        return a.symbol;
      });
      return coins;
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
        const arr = accountBalance.wallet;
        const coins = arr.map((a) => {
          return a.symbol;
        });
        return coins;
      }
    });
  }, [accountBalance]);

  const logoutUser = () => {
    handleMenuClose();
    props.setLogoutModal(true);
  };

  const setSelectedCurrency = (currency) => {
    props.dispatch(setCurrency(currency));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
            className={styles.select_coin}
          >
            {accountBalance &&
            accountBalance.wallet &&
            balanceAvailable &&
            balanceAvailable.length
              ? balanceAvailable.map((currency, index) => {
                  var coin = accountBalance.wallet.find(
                    (x) => x.symbol === currency
                  );
                  var sCurrency = currency;
                  return (
                    <MenuItem
                      className={styles.coinMenu}
                      key={sCurrency + index}
                      value={sCurrency}
                    >
                      {getSymbol(sCurrency)}{" "}
                      {coin !== null
                        ? truncate(coin.amount, 6)
                        : (0).toFixed(6)}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
      ) : null}

      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className={`${styles.user_menu_button}`}
      >
        <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" />
        <Typography className={`${styles.username}`}>{username}</Typography>
        <ArrowDropDown />
      </Button>
      <StyledMenu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* <MenuItem>{translate("header.dropdown.hello")} {`, ${username}`}</MenuItem> */}
        <MenuItem onClick={() => history.push("/account/balance/deposit")}>
          <img src={assets.wallet} />
          {translate("header.dropdown.balance")}
        </MenuItem>
        <MenuItem onClick={() => history.push("/account/settings")}>
          <img src={assets.settings} />
          {translate("header.dropdown.settings")}
        </MenuItem>
        <MenuItem onClick={() => logoutUser()}>
          <img src={assets.logout} />
          {translate("header.dropdown.logout")}
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

const NotLoggedIn = ({ handleSignUpModalOpen }) => {
  return (
      <Button
        variant="text"
        color="primary"
        className={`${styles.login_button}`}
        onClick={() => handleSignUpModalOpen()}
      >
        {translate("header.login")}
      </Button>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      padding: 0,
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
      [theme.breakpoints.up(768)]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      height: "70px",
      padding: 0,
      justifyContent: "space-between",
      [theme.breakpoints.down(768)]: {
        paddingLeft: "5px",
      },
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
  platform: any;
  walletExt?: any;
  dispatch: Function;
  totalRegisteredUser: number;
};

const Header = (props: props) => {
  const history = useHistory();
  const classes = useStyles();
  const [logoutState, setLogoutModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  // const { userAccount } = props.scatter;
  const { account, entryModalState } = props.platform;
  const { dispatch } = props;

  const setShowSignupModal = (state) => {
    if (typeof dispatch === "function") {
      dispatch(setEntryModalState(state));
    }
  };

  const handleSignUpModalOpen = () => {
    dispatch(setEntryModalState(true));
    // setOpenSignupModal(true);
  };
  const handleSignUpModalClose = () => {
    dispatch(setEntryModalState(false));
    // setOpenSignupModal(false);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModal(false);
  };

  return (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      {
        <SignupModal
          openModal={entryModalState}
          handleSignUpModalOpen={handleSignUpModalOpen}
          handleSignUpModalClose={handleSignUpModalClose}
        />
      }
      {<LogoutModal show={logoutState} setLogoutModal={setLogoutModal} />}
      <Toolbar className={clsx(classes.toolbar)}>
        {/* {!props.mini ? (
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
                alt="logo"
                className={`${styles.logo}`}
              />
            </Link>
          </div>
        ) : (
          <div></div>
        )} */}
        {/* <FormGroup className={`${styles.switch}`}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={props.mini}
                onChange={() => props.handleNavType()}
                size='small'
              />
            }
            label={"mini"}
            labelPlacement='top'
          />
        </FormGroup> */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => props.handleDrawerToggle()}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        {/* <Button
          variant="text"
          color="primary"
          className={`${styles.stake_button}`}
          onClick={() => history.push("/staking")}
        >
          {translate("header.stake")}
        </Button>
        <Box border="1px solid #57688D" height="38px" margin="0 10px" /> */}
        <div className={styles.totalRegistered}>
          Registered users: {props.totalRegisteredUser}
        </div>
        {account ? (
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
