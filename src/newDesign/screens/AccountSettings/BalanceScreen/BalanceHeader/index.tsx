import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { History } from "history";
import { translate } from "helpers/translate";

type Props = {
  routeKey: string;
};

const RouteDict = {
  AccountBalanceDeposit: "deposit",
  AccountBalanceWithdraw: "withdraw",
  AccountBalanceBuy: "buy",
  AccountBalanceHistory: "history",
};

interface StyledTabProps {
  label: any;
}

const HeaderTabs = withStyles({
  root: {
    borderBottom: '2px solid #405680',
    marginBottom: '2rem'
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const HeaderTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#405680',
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
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

const BalanceHeader = (props: Props) => {
  const routeKey = props.routeKey;
  const activeKey = RouteDict[routeKey];
  console.log({ activeKey })
  const history = useHistory<History>();
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        history.push(`/account/balance/deposit`);
        break;
      case 1:
        history.push(`/account/balance/withdraw`);
        break;
      default:
        break;
    }
  };

  const selectedTabIndex = activeKey === "deposit" ? 0 : 1
  // const withdrawLabel = translate("account_settings.balance_screen.balance_header.nav.deposit")
  // const depositLabel = translate("account_settings.balance_screen.balance_header.nav.withdraw")

  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <HeaderTabs value={selectedTabIndex} onChange={handleChange} aria-label="Header Tabs">
          <HeaderTab label={translate("account_settings.balance_screen.balance_header.nav.deposit")} />
          <HeaderTab label={translate("account_settings.balance_screen.balance_header.nav.withdraw")} />
        </HeaderTabs>
      </div>
    </div>
  );
};

export default BalanceHeader;
