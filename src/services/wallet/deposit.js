import { AxiosServerApi as API } from "Config";
import { getHeaderParams } from "services/auth";

export const depositETH = ({
  tx_hash,
  recipientAddress,
  issuerAddress,
  amount,
}) => {
  const config = {
    headers: getHeaderParams(),
  };
  return API.post(
    "/donut/api/v1/account/coin/deposit",
    {
      tx_hash: tx_hash,
      issuer: { address: issuerAddress, currency: "ETH", amount },
      receiver: { address: recipientAddress, currency: "ETH", amount },
    },
    config
  );
};

export const depositUSDC = ({
  tx_hash,
  recipientAddress,
  issuerAddress,
  amount,
}) => {
  const config = {
    headers: getHeaderParams(),
  };
  return API.post(
    "/donut/api/v1/account/coin/deposit",
    {
      tx_hash: tx_hash,
      issuer: { address: issuerAddress, currency: "USDC", amount },
      receiver: { address: recipientAddress, currency: "USDC", amount },
    },
    config
  );
};
