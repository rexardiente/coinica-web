import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import Nav from "react-bootstrap/Nav";
import styles from "./BalanceHeader.module.scss";
import { translate } from "helpers/translate";

type Props = {
  routeKey: string;
};

const getClassName = (key, activeKey) => {
  if (key === activeKey) return styles.activeItem;
  return styles.inactiveItem;
};

const RouteDict = {
  AccountBalanceDeposit: "deposit",
  AccountBalanceWithdraw: "withdraw",
  AccountBalanceBuy: "buy",
  AccountBalanceHistory: "history",
};

const BalanceHeader = (props: Props) => {
  const routeKey = props.routeKey;
  const [activeKey, setActiveKey] = useState<string | null>(
    RouteDict[routeKey]
  );
  const history = useHistory<History>();

  return (
    <Nav
      className={`${styles.containerNav} justify-content-center`}
      activeKey={activeKey}
      onSelect={(selectedKey) => {
        setActiveKey(selectedKey);
        history.push(`/account/balance/${selectedKey}`);
      }}
    >
      <Nav.Item>
        <Nav.Link
          eventKey="deposit"
          className={getClassName("deposit", activeKey)}
        >
          {translate("account_settings.balance_screen.balance_header.nav.deposit")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="withdraw"
          className={getClassName("withdraw", activeKey)}
        >
          {translate("account_settings.balance_screen.balance_header.nav.withdraw")}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default BalanceHeader;
