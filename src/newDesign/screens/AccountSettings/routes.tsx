import Balance from "./BalanceScreen";
import Setting from "./SettingScreen";
import Transactions from "./TransactionsScreen";

const routes = [
  {
    key: "AccountSetting",
    exact: true,
    path: "/account/settings",
    component: Setting,
  },
  {
    key: "AccountBalance",
    exact: false,
    path: "/account/balance",
    component: Balance,
  },
  {
    key: "Transactions",
    exact: false,
    path: "/account/transactions",
    component: Transactions,
  }
];

export default routes;
