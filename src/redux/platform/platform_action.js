export const PLATFORM_TYPES = {
  //USER ACCOUNT
  SET_ACCOUNT_SUCCESS: "PLATFORM/SET_ACCOUNT_SUCCESS",
  SET_ACCOUNT_FAILED: "PLATFORM/SET_ACCOUNT_FAILED",
  LOGOUT_ACCOUNT: "LOGOUT_ACCOUNT",
  SET_ENTRY_MODAL_STATE: "SET_ENTRY_MODAL_STATE",
  SET_USER_BALANCE: "PLATFORM/SET_USER_BALANCE",
  SET_CURRENCY: "PLATFORM/SET_CURRENCY",
  RESET_REDUX: "PLATFORM/RESET_REDUX",
  WALLET_CONFIG: "PLATFORM/WALLET_CONFIG",
  SET_LANGUAGE_LOCALE: "PLATFORM/SET_LANGUAGE_LOCALE",
  SET_GAME_LIST: "PLATFORM/SET_GAME_LIST",
  SET_GENRE_LIST: "PLATFORM/SET_GENRE_LIST",
};

export const setPlatformAccountSuccess = (data) => ({
  type: PLATFORM_TYPES.SET_ACCOUNT_SUCCESS,
  payload: { data },
});

export const setPlatformAccountFailed = (error) => ({
  type: PLATFORM_TYPES.SET_ACCOUNT_FAILED,
  payload: { error },
});

export const logoutPlatformAccount = () => ({
  type: PLATFORM_TYPES.LOGOUT_ACCOUNT,
  payload: {}
})

export const setEntryModalState = (state) => ({
  type: PLATFORM_TYPES.SET_ENTRY_MODAL_STATE,
  payload: { state }
})

export const setUserBalance = (state) => ({
  type: PLATFORM_TYPES.SET_USER_BALANCE,
  payload: { state }
})

export const setCurrency = (currency) => ({
  type: PLATFORM_TYPES.SET_CURRENCY,
  payload: { currency }
})

export const resetRedux = (state) => ({
  type: PLATFORM_TYPES.RESET_REDUX,
  payload: { state }
})

export const setWalletConfig = (config) => ({
  type: PLATFORM_TYPES.WALLET_CONFIG,
  payload: { config }
})

export const setLanguage = (lang) => ({
  type: PLATFORM_TYPES.SET_LANGUAGE_LOCALE,
  payload: { lang }
})

export const setGameList = (list) => ({
  type: PLATFORM_TYPES.SET_GAME_LIST,
  payload: { list }
})

export const setGenreList = (list) => ({
  type: PLATFORM_TYPES.SET_GENRE_LIST,
  payload: { list }
})
