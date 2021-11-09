import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Error';
import BalanceRoutes from "./routes";
import BalanceHeader from "./BalanceHeader";
import { GetServerStatus } from "services/api/server/platform";
import { GetUserWalletBalance } from "services/api/server/platform";
import { setUserBalance } from "redux/platform/platform_action";
import { translate } from "helpers/translate";
import truncate from "helpers/numbers/truncate";
import styles from "../AccountSetting.module.scss";

// assets
import BTC_ICON from "assets/imgs/btc_icon.png";
import ETH_ICON from "assets/imgs/eth_icon.png";
import USDC_ICON from "assets/imgs/usdc_icon.png";

const LIST_OF_CURRENCY = [
  // { symbol: "btc", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  // { symbol: "eos", name: "EOS" },
  { symbol: "USDC", name: "USD Coin" },
  // { symbol: "more...", name: "more..." },
];

const BalanceScreen = ({ dispatch, platform }) => {
  const location = useLocation();
  const { account, accountBalance, walletConfig } = platform;

  const defaultRouteKey = () => {
    const defaultRoute = BalanceRoutes.find(
      (route) => route.path === location.pathname
    );

    return defaultRoute ? defaultRoute.key : "";
  };

  const isServerUp = async () => {
    try {
      const response = await GetServerStatus();
      if (response.data === "ok") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (accountBalance.id === null) {
      getBalance()
    }
  }, [])

  const getBalance = useCallback(async () => {
    try {
      const { data } = await GetUserWalletBalance();
      if (data) {
        dispatch(setUserBalance(data))
      }
    } catch (e) {
      // do nothing
    }
  }, [account]);

  const getNoteMessage = (key) => {
    if (walletConfig && walletConfig.network) {
      switch (key) {
        case 'AccountBalanceDeposit':
          return (
            <div className={styles.info_message}>
              <span>
                <WarningIcon fontSize="large" style={{ color: "#FAD720", marginRight: '10px' }} />
                {translate("account_settings.balance_screen.deposit.header.info")}
              </span>
              <ul>
                <li>
                  -
                  {translate("account_settings.balance_screen.metamask_deposit.note.content.one")}
                </li>
                <li>
                  -
                  {translate("account_settings.balance_screen.metamask_deposit.note.content.two")}
                </li>
              </ul>
            </div>
          )
        case 'AccountBalanceWithdraw':
          return (
            <div className={styles.info_message}>
              <span>
                <WarningIcon fontSize="large" style={{ color: "#FAD720", marginRight: '10px' }} />
                {translate("account_settings.balance_screen.deposit.header.info")}
              </span>
              <ul>
                <li>
                  -
                  {translate("account_settings.balance_screen.withdraw.note.content")}
                </li>
              </ul>
            </div>
          )
        default:
          return null;
      }
    }
  }

  return (
    <>
      <Switch>
        {BalanceRoutes.map((route) => {
          return (
            <Route
              exact={route.exact}
              key={route.key}
              path={route.path}
              component={(props) => (
                <Grid container spacing={2}>
                  <Grid item sm={12} md={4}>
                    <div className={`${styles.settingsSideNav}`}>
                      <div className="text-left">
                        <div className={styles.balanceTitle}>
                          <h5> {translate("account_settings.side_nav.balance.title")}</h5>
                          <div className="hover-cursor mt-1">
                            <RefreshIcon onClick={getBalance}/>
                          </div>
                        </div>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                          <Box key="btc"
                            style={{
                              background: 'transparent',
                              padding: "10px",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <img className="mr-2" src={BTC_ICON} alt="BTC" />
                                <div>BTC</div>
                              </div>
                              <div>
                                {
                                  accountBalance && accountBalance.btc !== null
                                  ? truncate((accountBalance.btc.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </Box>
                          <Box key="eth"
                            style={{
                              background: 'transparent',
                              padding: "10px",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <img className="mr-2" src={ETH_ICON} alt="ETH" />
                                <div>ETH</div>
                              </div>
                              <div>
                                {
                                  accountBalance && accountBalance.eth !== null
                                  ? truncate((accountBalance.eth.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </Box>
                          <Box key="usdc"
                            style={{
                              background: 'transparent',
                              padding: "10px",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">  
                                <img className="mr-2" src={USDC_ICON} alt="USDC" />
                                <div>USDC</div>
                              </div>
                              <div>
                                {
                                  accountBalance && accountBalance.usdc !== null
                                  ? truncate((accountBalance.usdc.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </div>
                    </div>
                    {/* <div className="my-4">
                      <Header {...route} routeKey={route.key} />
                    </div> */}
                  </Grid >
                  <Grid item sm={12} md={8}>
                    <div className={styles.deposit_withdraw_container}>
                      <BalanceHeader routeKey={defaultRouteKey()} />
                      {getNoteMessage(route.key)}
                      <route.component listOfCurrency={LIST_OF_CURRENCY} isServerUp={isServerUp} {...props} />
                    </div>
                  </Grid >
                </Grid>
              )}
            />
          );
        })}
      </Switch>
    </>
  );
};
const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(BalanceScreen);
