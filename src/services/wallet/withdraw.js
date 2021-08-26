import { AxiosServerApi as API } from "Config";
import { getHeaderParams } from "services/auth";

export const withdrawETH = ({ recipientAddress, amount, gasPrice }) => {
  const config = {
    headers: getHeaderParams(),
  };
  return API.post(
    "/donut/api/v1/account/coin/withdraw",
    {
      receiver: {
        address: recipientAddress.toLowerCase(),
        currency: "ETH",
        amount,
      },
      fee: gasPrice,
    },
    config
  );
};

export const withdrawUSDC = ({ recipientAddress, amount, gasPrice }) => {
  const config = {
    headers: getHeaderParams(),
  };
  return API.post(
    "/donut/api/v1/account/coin/withdraw",
    {
      receiver: {
        address: recipientAddress.toLowerCase(),
        currency: "USDC",
        amount,
      },
      fee: gasPrice,
    },
    config
  );
};
