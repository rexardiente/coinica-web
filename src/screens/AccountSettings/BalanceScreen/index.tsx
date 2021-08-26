import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import BalanceRoutes from "./routes";
import BalanceHeader from "./BalanceHeader";
import { GetServerStatus } from "services/api/server/platform";

const LIST_OF_CURRENCY = [
  // { symbol: "btc", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  // { symbol: "eos", name: "EOS" },
  { symbol: "USDC", name: "USD Coin" },
  // { symbol: "more...", name: "more..." },
];

const BalanceScreen = () => {
  const location = useLocation();

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

  return (
    <>
      <BalanceHeader routeKey={defaultRouteKey()} />
      <Switch>
        {BalanceRoutes.map((route) => {
          return (
            <Route
              exact={route.exact}
              key={route.key}
              path={route.path}
              component={(props) => (
                <route.component listOfCurrency={LIST_OF_CURRENCY} isServerUp={isServerUp} {...props} />
              )}
            />
          );
        })}
      </Switch>
    </>
  );
};
export default BalanceScreen;
