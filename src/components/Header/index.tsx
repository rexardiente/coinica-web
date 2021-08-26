import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { toast } from "react-toastify";
// import * as Icon from "react-bootstrap-icons";
import {
  // Tooltip,
  // OverlayTrigger,
  Dropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { BTC, ETH, USDC } from "components/CurrencySymbols";
// import { translate } from "../../helpers";
import truncate from "helpers/numbers/truncate";
import { setEntryModalState, setCurrency } from "redux/platform/platform_action";
import * as assets from "./Assets";
import "./TopNav.scss";
import { translate } from "helpers/translate";

const SignupModal = React.lazy(() => import("../Modals/SignupModal"));
const LogoutModal = React.lazy(() => import("../Modals/LogoutModal"));

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

const Brand = ({ isSideBarCollapsed }) => {
  const centerLogo = isSideBarCollapsed ? "mx-auto" : "";
  return (
    <Link to="/" id="brand" className={centerLogo}>

      <img src={assets.logo} width={40} height={40} alt="logo" className="logo w-auto" />
      {/* <span className="text-light text-decoration-none">
        {translate("header.brand")}
      </span> */}
    </Link>
  );
}

// const poolUpdate = () => {
//   return (
//     <span className="d-inline-block align-top text-white" id="recent-update">
//       <OverlayTrigger
//         placement="bottom"
//         delay={{ show: 250, hide: 400 }}
//         overlay={<Tooltip id="button-tooltip">Showing recent updates</Tooltip>}
//       >
//         <Icon.QuestionCircle className="text-secondary" />
//       </OverlayTrigger>
//       <small className="ml-2 text-warning">
//         Johndoe receives 3,000 multiplier payout.
//       </small>
//     </span>
//   );
// }

const NavbarToggle = ({ toggled, handleToggleSidebar }) => {
  return (
    <button
      className="btn btn-outline-light navbar-toggler"
      onClick={() => handleToggleSidebar(!toggled)}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

const LoggedIn = (props) => {
  const history = useHistory()
  const { account, accountBalance, selectedCurrency } = props?.platform
  const [username, setUsername] = useState('')
  const [balanceAvailable, setBalanceAvailable] = useState(() => {
    if (accountBalance.id !== null) {
      const arr = Object.keys(accountBalance);
      const filteredArr = arr.filter(val => val !== "id");
      return filteredArr;
    }
  })

  useEffect(() => {
    if (account) {
      setUsername(account.username)
    }
  }, [account])

  useEffect(() => {
    setBalanceAvailable(() => {
      if (accountBalance.id !== null) {
        const arr = Object.keys(accountBalance);
        const filteredArr = arr.filter(val => val !== "id");
        return filteredArr;
      }
    })
  }, [accountBalance])

  const logoutUser = () => {
    props.setLogoutModal(true)
  };

  const setSelectedCurrency = (currency) => {
    props.dispatch(setCurrency(currency))
  }

  return (
    <ul className="navbar-nav ml-md-auto mt-md-0 d-flex align-items-center flex-row">
      {
        accountBalance.id !== null ? (
          <Dropdown id="avatar-dropdown" drop="down" className="mx-2">
            <Dropdown.Toggle id="header-dropdowns-btn">
              <span className="mr-2">
                {getSymbol(selectedCurrency)}
              </span>
              <span className="mr-2">
                {accountBalance && accountBalance.id !== null ? truncate((accountBalance[selectedCurrency].amount), 6) : (0).toFixed(6)}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "220px" }}>
              {
                accountBalance && balanceAvailable && balanceAvailable.length ? balanceAvailable.map((currency) => (
                  <Dropdown.Item
                    key={currency}
                    style={{ display: 'flex' }}
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    <div className="d-flex justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <div className="d-flex mr-2">
                          {getSymbol(currency)}
                        </div>
                        <div>
                          {
                            accountBalance[currency] !== null
                              ? truncate((accountBalance[currency].amount), 6)
                              : (0).toFixed(6)
                          }
                        </div>
                      </div>
                      <div>
                        {(currency + "").toUpperCase()}
                      </div>
                    </div>
                  </Dropdown.Item>
                )) : null
              }
            </Dropdown.Menu>
          </Dropdown>
        ) : null
      }
      <li className="nav-item d-flex align-items-center">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
          className="rounded-circle z-depth-0 mx-2"
          alt="avatar"
          height="35"
        />
        <span className="text-white">{username}</span>
        <Dropdown id="avatar-dropdown">
          <Dropdown.Toggle id="avatar-dropdown-btn" />
          <Dropdown.Menu>
            <Dropdown.Item>
             {translate("header.dropdown.hello")} {`, ${username}`}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => history.push("/account/balance/deposit")}>{translate("header.dropdown.balance")}</Dropdown.Item>
            <Dropdown.Item onClick={() => history.push("/account/settings")}>{translate("header.dropdown.settings")}</Dropdown.Item>
            <Dropdown.Item onClick={() => logoutUser()}>{translate("header.dropdown.logout")}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      {/* <li className="nav-item dropdown d-sm-block d-md-none">
        <button
          className="btn btn-primary w-100 nav-link mt-3"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          data-target="#smallerscreenmenu"
          aria-expanded="false"
          aria-controls="smallerscreenmenu"
        >
          {translate("header.menu")}
        </button>
        <div
          className="dropdown-menu bg-dark"
          aria-labelledby="smallerscreenmenu"
        >
          <Link to="/" className="dropdown-item text-white">
            {translate("header.dashboard")}
          </Link>
          <Link to="#" className="dropdown-item text-white">
            {translate("header.rewards")}
          </Link>
          <Link to="/leaderboard" className="dropdown-item text-white">
            {translate("header.leader.board")}
          </Link>
          <Link to="#" className="dropdown-item text-white">
            {translate("header.profile")}
          </Link>
          <Link to="#" className="dropdown-item text-white">
            {translate("header.notifications")}
          </Link>
          <Link to="#" className="dropdown-item text-white">
            {translate("header.faqs")}
          </Link>
        </div>
      </li> */}
    </ul>
  );
}

const NotLoggedIn = ({ setShowSignupModal }) => {
  return (
    <ul className="navbar-nav ml-md-auto">
      <li className="nav-item">
        <span
          className="btn btn-sm btn-warning nav-link text-uppercase"
          onClick={() => setShowSignupModal(true)}
        >
          {translate("header.signup")}
        </span>
      </li>
    </ul>
  );
}

interface TopNavProps {
  scatter?: any;
  platform?: any;
  walletExt?: any;
  dispatch?: Function;
  handleToggleSidebar: Function;
  toggled: boolean;
  collapsed: boolean;
}

const TopNav = (props: TopNavProps) => {
  // const [signupModal, setShowSignupModal] = useState(false)
  const [logoutState, setLogoutModal] = useState(false)
  const { userAccount } = props.scatter;
  const { account, entryModalState } = props.platform;
  const { dispatch, collapsed } = props
  const setShowSignupModal = (state) => {
    if (typeof dispatch === "function") {
      dispatch(setEntryModalState(state))
    }
  }
  return (
    <nav className="nav navbar navbar-expand-lg bg-dark btm-box-shadow d-flex justify-content-between w-100 fixed-top">
      {
        <SignupModal showModal={entryModalState} setShowModal={setShowSignupModal} />
      }
      {
        <LogoutModal show={logoutState} setLogoutModal={setLogoutModal} />
      }
      <NavbarToggle toggled={props.toggled} handleToggleSidebar={props.handleToggleSidebar} />
      <Brand isSideBarCollapsed={collapsed} />

      <div id="navbarNavDropdown">
        {
          userAccount || account ? (
            <LoggedIn {...props} setLogoutModal={setLogoutModal} />
          ) : (
            <NotLoggedIn setShowSignupModal={setShowSignupModal} />
          )
        }
      </div>
    </nav>
  );
}

const mapStateToProps = ({ scatter, platform, walletExt }) => ({ scatter, platform, walletExt });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
