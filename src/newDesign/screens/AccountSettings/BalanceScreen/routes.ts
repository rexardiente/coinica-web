import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const routes = [
  {
    key: "AccountBalanceDeposit",
    exact: true,
    path: "/account/balance/deposit",
    component: Deposit,
  },
  {
    key: "AccountBalanceWithdraw",
    exact: true,
    path: "/account/balance/withdraw",
    component: Withdraw,
  },
];

export default routes;
