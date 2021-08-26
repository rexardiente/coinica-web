export const WALLET_ACTIONS = {
  SET_WALLET_SUCCESS: "WALLET/SET_WALLET_SUCCESS",
  SET_WALLET_LOGOUT: "WALLET/SET_WALLET_LOGOUT",
  SET_WALLET_ERROR: "WALLET/SET_WALLET_ERROR",
  SET_ACCOUNT_ADDRESS: "WALLET/SET_ACCOUNT_ADDRESS",
  SET_CHAIN_ID: "WALLET/SET_CHAIN_ID",
  SET_BALANCE: "WALLET/SET_BALANCE"
};

export const setWalletSuccess = (payload) => ({
  type: WALLET_ACTIONS.SET_WALLET_SUCCESS,
  payload
});

export const setWalletLogout = (payload) => ({
  type: WALLET_ACTIONS.SET_WALLET_LOGOUT,
  payload
});

export const setWalletError = (payload) => ({
  type: WALLET_ACTIONS.SET_WALLET_ERROR,
  payload
});

export const setAccountAddress = (payload) => ({
  type: WALLET_ACTIONS.SET_ACCOUNT_ADDRESS,
  payload
})

export const setChainId = (payload) => ({
  type: WALLET_ACTIONS.SET_CHAIN_ID,
  payload
})

export const setBalance = (payload) => ({
  type: WALLET_ACTIONS.SET_BALANCE,
  payload
})
