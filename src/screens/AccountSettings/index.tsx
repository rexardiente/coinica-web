import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Location, History } from "history";
import { Row, Container, Col, Image, ListGroup } from "react-bootstrap";
import SettingsRoutes from "./routes";
import NotFound from "../NotFound";
import Header from "./Header";
import styles from "./AccountSetting.module.scss";
import { translate } from "helpers/translate";

import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const DISABLED_TABS = ["Bonuses", "Transaction"]

interface StyledTabProps {
  label: string;
}

const HeaderTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#405680',
      textTransform: 'none',
      minWidth: 72,
      fontWeight: 'normal',
      marginRight: theme.spacing(4),
      '&:hover': {
        color: '#1785EB',
        opacity: 1,
      },
      '&$selected': {
        color: '#1785EB',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#1785EB',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
    disabled={DISABLED_TABS.includes(props?.label)}
  />
));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  headerContainer: {
    background: 'transparent',
  },
}));

const HeaderTabs = withStyles({
  root: {
    borderBottom: '2px solid #405680',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const getTabLabel = (value) => {
  switch(value) {
    case 0:
      return "Balance";
    case 1:
      return "Bonuses";
    case 2:
      return "Transaction";
    case 3:
      return "Settings";
    default:
      return "Balance";
  }
}

const getInitialTab = (path) => {
  switch (path) {
    case '/account/balance/deposit':
    case '/account/balance/withdraw':
      return 0;
    case '/account/bonuses':
      return 1;
    case '/account/transaction':
      return 2;
    case '/account/settings':
      return 3;
    default:
      return 0;
  }
}

const AccountSetting = ({ platform, dispatch }) => {
  const location = useLocation<Location>();
  const history = useHistory<History>();
  const pathname = location.pathname;
  const { account, accountBalance } = platform;
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(getInitialTab(pathname));

  //Redirect to deposit as default view for Balance
  useEffect(() => {
    if (pathname === "/account/balance") {
      history.replace("/account/balance/deposit");
    }
    setSelectedTab(getInitialTab(pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
    const route = getTabLabel(newValue)
    history.push(`/account/${(route + '').toLowerCase()}`)
  };

  return (
    <Switch>
      {SettingsRoutes.map((route) => {
        return (
          <Route
            exact={route.exact}
            key={route.key}
            path={route.path}
            component={(props) => (
              <Container fluid style={{ background: '#161E2F', height: '100%' }}>
                <Row className={`${styles.headerTabsContainer}`}>
                  <div className={classes.root}>
                    <div className={classes.headerContainer}>
                      <HeaderTabs value={selectedTab} onChange={handleChange} aria-label="Header Tabs">
                        <HeaderTab label="Balance" />
                        <HeaderTab label="Bonuses" />
                        <HeaderTab label="Transaction" />
                        <HeaderTab label="Settings" />
                      </HeaderTabs>
                    </div>
                  </div>
                </Row>
                <Row className={`${styles.settingsContainer}`}>
                  <div className={`${styles.settingsContent} h-100`}>
                    <h5 className={styles.tabLabel}>{getTabLabel(selectedTab)}</h5>
                    <route.component {...props} />  
                  </div>
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
export default connect(mapStateToProps)(AccountSetting);
