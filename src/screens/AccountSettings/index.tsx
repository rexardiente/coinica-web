import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Location, History } from "history";
import { Row, Container, Col, Image, ListGroup } from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { run as runHolder } from "holderjs/holder";
import truncate from "helpers/numbers/truncate";
import SettingsRoutes from "./routes";
import NotFound from "../NotFound";
import Header from "./Header";
import { GetUserWalletBalance } from "services/api/server/platform";
import { setUserBalance } from "redux/platform/platform_action";
import styles from "./AccountSetting.module.scss";
import { translate } from "helpers/translate";

const AccountSetting = ({ platform, dispatch }) => {
  const { account, accountBalance } = platform;
  const location = useLocation<Location>();
  const history = useHistory<History>();

  //Redirect to deposit as default view for Balance
  useEffect(() => {
    if (location.pathname === "/account/balance") {
      history.replace("/account/balance/deposit");
    }
    runHolder({
      images: '.profile-image-holder',
      bg: 'black',
      theme: 'gray'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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

  useEffect(() => {
    runHolder({
      images: '.profile-image-holder',
      bg: 'black',
      theme: 'gray'
    });
  }, [accountBalance])

  useEffect(() => {
    if (accountBalance.id === null) {
      getBalance()
    }
  }, [])

  return (
    <Switch>
      {SettingsRoutes.map((route) => {
        return (
          <Route
            exact={route.exact}
            key={route.key}
            path={route.path}
            component={(props) => (
              <Container fluid>
                <Row className={`${styles.settingsContainer}`}>
                  <Col sm={"12"} md={"4"} lg={"3"}>
                    <div className={`${styles.settingsSideNav}`}>
                      <div>
                        <Image
                          src={"holder.js/200x200?theme=gray"}
                          className="profile-image-holder mb-2 h-100"
                          roundedCircle
                          fluid
                        />
                        <h3 className="mb-4">{account ? account.username : 'User'}</h3>
                      </div>
                      <div className="text-left">
                        <div className="d-flex justify-content-between">
                          <h5> {translate("account_settings.side_nav.balance.title")}</h5>
                          <div className="hover-cursor mt-1">
                            <ArrowCounterclockwise onClick={getBalance}/>
                          </div>
                        </div>
                        <ListGroup>
                          <ListGroup.Item key="btc">
                            <div className="d-flex justify-content-between">
                              <div>BTC</div>
                              <div>
                                {
                                  accountBalance && accountBalance.btc !== null
                                  ? truncate((accountBalance.btc.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item key="eth">
                            <div className="d-flex justify-content-between">
                              <div>ETH</div>
                              <div>
                                {
                                  accountBalance && accountBalance.eth !== null
                                  ? truncate((accountBalance.eth.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item key="usdc">
                            <div className="d-flex justify-content-between">
                              <div>USDC</div>
                              <div>
                                {
                                  accountBalance && accountBalance.usdc !== null
                                  ? truncate((accountBalance.usdc.amount), 6)
                                  : (0).toFixed(6)
                                }
                              </div>
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                    <div className="my-4">
                      <Header {...route} routeKey={route.key} />
                    </div>
                  </Col>
                  <Col sm={"12"} md={"8"} lg={"9"}>
                    <div className={`${styles.settingsContent} pt-5 h-100`}>
                      <route.component {...props} />  
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
          />
        );
      })}
      <Route
        path="*"
        component={(props) => (
          <div className="col py-3">
            <NotFound {...props} />
          </div>
        )}
      />
    </Switch>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps)(AccountSetting);
