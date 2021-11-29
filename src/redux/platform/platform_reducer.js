import { PLATFORM_TYPES } from "./platform_action";
import { deleteHeaderParams } from "services/auth";

const INITIAL_STATE = {
  account: null,
  error: null,
  entryModalState: false, // signup & login modal,
  accountBalance: {
    btc: null,
    eth: null,
    id: null,
    usdc: null,
  },
  selectedCurrency: "USDC",
  walletConfig: null,
  language: "en",
  gameList: [],
  genreList: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case PLATFORM_TYPES.SET_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: { ...state.account, ...payload.data },
      };
    case PLATFORM_TYPES.SET_ACCOUNT_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case PLATFORM_TYPES.LOGOUT_ACCOUNT:
      deleteHeaderParams();
      return { ...INITIAL_STATE, language: state.language };
    case PLATFORM_TYPES.RESET_REDUX:
      return { ...INITIAL_STATE, language: state.language };
    case PLATFORM_TYPES.SET_ENTRY_MODAL_STATE:
      return {
        ...state,
        entryModalState: payload.state || false,
      };
    case PLATFORM_TYPES.SET_USER_BALANCE:
      const updatedState = {
        ...state,
        accountBalance: { ...state.balance, ...payload.state },
      };
      return updatedState;
    case PLATFORM_TYPES.SET_CURRENCY:
      const { currency } = payload;
      return {
        ...state,
        selectedCurrency: currency,
      };
    case PLATFORM_TYPES.WALLET_CONFIG:
      const { config } = payload;
      return {
        ...state,
        walletConfig: config
      }
    case PLATFORM_TYPES.SET_LANGUAGE_LOCALE:
      const { lang } = payload;
      return {
        ...state,
        language: lang
      }
    case PLATFORM_TYPES.SET_GAME_LIST:
      return {
        ...state,
        gameList: payload?.list
      }
    case PLATFORM_TYPES.SET_GENRE_LIST:
      return {
        ...state,
        genreList: payload?.list
      }
    default:
      return state;
  }
};

export default reducer;
