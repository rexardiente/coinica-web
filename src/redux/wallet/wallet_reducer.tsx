import { WALLET_ACTIONS } from "./wallet_actions";

const INITIAL_STATE = {
  wallet: null,
  balance: 0,
  chainId: null,
  account_address: null,
  error: null,
};
const reducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case WALLET_ACTIONS.SET_WALLET_SUCCESS:
      return {
        ...state,
        wallet: payload,
      };
    case WALLET_ACTIONS.SET_WALLET_LOGOUT:
      return {
        wallet: null,
        balance: 0,
        chainId: null,
        account_address: null,
        error: null,
      };
    case WALLET_ACTIONS.SET_WALLET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case WALLET_ACTIONS.SET_ACCOUNT_ADDRESS:
      return {
        ...state,
        account_address: payload
      }
    case WALLET_ACTIONS.SET_CHAIN_ID:
      return {
        ...state,
        chainId: payload
      }
    case WALLET_ACTIONS.SET_BALANCE:
      return {
        ...state,
        balance: payload
      }
    default:
      return state;
  }
};

export default reducer;
