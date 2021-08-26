import { AxiosCoinswitch as API } from "Config";

export const GetCoins = (data) => {
  return API.post("/multi-currency/v1/coins", {})
}

export const GetSupportedPairs = ({ coin_symbol }) => {
  return API.post("/multi-currency/v1/supported-pairs", { coin_symbol })
}

export const GetSupportedDepositCoins = ({ coin_symbol }) => {
  return API.post("/multi-currency/v1/supported-deposit-coins", { coin_symbol })
}

export const GetLimits = ({ depositCoin, destinationCoin }) => {
  return API.post("/multi-currency/v1/supported-deposit-coins", { depositCoin, destinationCoin })
}

export const GenerateOffer = ({ depositCoin, destinationCoin, depositCoinAmount }) => {
  return API.post("/multi-currency/v1/generate-offer", { depositCoin, destinationCoin, depositCoinAmount })
}

export const CreateOrder = ({ transaction }) => {
  return API.post("/multi-currency/v1/make-order", { transaction })
}

export const GetOrderStatus = ({ orderId }) => {
  return API.post("/multi-currency/v1/order", { orderId })
}

export const GetAllOrderStatus = ({ start, count, userRefId }) => {
  return API.post("/multi-currency/v1/orders", { start, count, userRefId })
}
