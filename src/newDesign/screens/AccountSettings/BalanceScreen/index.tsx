import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Error';
import StarsIcon from '@material-ui/icons/Stars';
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
  const [coins, setCoins] = useState({
    ETH : 0,
    BTC : 0,
    USDC : 0,
  })

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

  const updateCoins = () => {
    var wallet = accountBalance.wallet;
    var update = {
      ETH : 0,
      BTC : 0,
      USDC: 0,
    }
    if(wallet){
      wallet.map(c => {
        if(update.hasOwnProperty(c.symbol)){
          update[c.symbol] = c.amount;
        }
      });

      setCoins(update);
    }
  }

  useEffect(() => {
    if (accountBalance.id === null) {
      getBalance();
    }else{
      console.log('update local balance');
      updateCoins();
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
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <div className={`${styles.settingsSideNav}`}>
                      <div className="text-left">
                        <div className={styles.balanceTitle}>
                          <h5> {translate("account_settings.side_nav.balance.title")}</h5>
                          <div className="hover-cursor mt-1">
                            <RefreshIcon onClick={getBalance}/>
                          </div>
                        </div>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                        <Box key="usdc"
                            style={{
                              background: 'transparent',
                              padding: "10px",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">  
                                {/* <img className="mr-2" src={USDC_ICON} alt="USDC" /> */}
                                <StarsIcon style={{fontSize:'2.8em'}} />
                                <div>TOKEN</div>
                              </div>
                              <div>
                                {
                                  coins.USDC.toFixed(6)
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
                                  coins.ETH.toFixed(6)
                                }
                              </div>
                            </div>
                          </Box>
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
                                  coins.BTC.toFixed(6)
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
                  <Grid item xs={12} sm={12} md={12} lg={8}>
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
