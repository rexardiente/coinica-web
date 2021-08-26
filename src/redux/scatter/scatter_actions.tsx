export const SCATTER_ACTIONS = {
  CONNECTED: 'SCATTER/CONNECTED',
  CONNECTION_ERROR: 'SCATTER/ERRORS/CONNECTION_ERROR',

  LOGGED_IN: 'SCATTER/LOGGED_IN',
  LOGIN_ERROR: 'SCATTER/ERRORS/LOGIN_ERROR',
  LOGGED_OUT: 'SCATTER/LOGGED_OUT',

  UPDATE_TOKEN_BALANCE: 'UPDATE_TOKEN_BALANCE',
  UPDATE_USER_UUID: 'UPDATE_USER_UUID',
};

export const setLoginHistory = () => localStorage.setItem('lastScatterLoginAt', new Date().getTime() + '');
export const loginHistoryExists = () => !!localStorage.getItem("lastScatterLoginAt");
export const removeLoginHistory = () => localStorage.removeItem('lastScatterLoginAt');

export const connectedScatter = (payload) => ({ type: SCATTER_ACTIONS.CONNECTED, payload });
export const connectionError = () => ({ type: SCATTER_ACTIONS.CONNECTION_ERROR });

export const logInSuccess = (payload) => ({ type: SCATTER_ACTIONS.LOGGED_IN, payload });
export const loginError = () => ({ type: SCATTER_ACTIONS.LOGIN_ERROR });
export const loggedOut = () => ({ type: SCATTER_ACTIONS.LOGGED_OUT });

export const updateTokenBalance = (payload) => ({ type: SCATTER_ACTIONS.UPDATE_TOKEN_BALANCE, payload })
export const updateUserUUD = (payload) => ({ type: SCATTER_ACTIONS.UPDATE_USER_UUID, payload })
