import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import styles from "../AccountSetting.module.scss";
import { translate } from "helpers/translate";

const RouteDict = {
  'AccountBalance': 'balance',
  'AccountSetting': 'settings',
  'Transactions': 'transactions'
}

const getClassName = (key, activeKey) => {
  if (key === activeKey) return styles.activeItem;
  return styles.inactiveItem;
}

const Header = (props) => {
  const routeKey = props?.routeKey
  const [activeKey, setActiveKey] = useState<string | null>(RouteDict[routeKey])
  const history = useHistory()
  return (
    <Nav
      activeKey={activeKey as string}
      className="flex-column"
      onSelect={(selectedKey) => {
        setActiveKey(selectedKey)
        history.push(`/account/${selectedKey}`)
      }}
    >
      <Nav.Item>
        <Nav.Link
          className={getClassName('balance', activeKey)}
          eventKey="balance"
        >
          {translate("account_settings.header.nav.balance.title")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="bonuses" disabled>{translate("account_settings.header.nav.bonuses.title")}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={getClassName('transactions', activeKey)}
          eventKey="transactions"
        >
          {translate("account_settings.header.nav.transactions.title")}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={getClassName('settings', activeKey)}
          eventKey="settings"
        >
          {translate("account_settings.header.nav.settings.title")}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Header;
