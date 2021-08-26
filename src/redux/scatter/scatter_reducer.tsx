import { w3cwebsocket as WebsocketClient } from "websocket";
import { toast } from "react-toastify";
import { ServerAPI } from "../../Config";
import { SCATTER_ACTIONS } from './scatter_actions';

// declare global {
//   interface Window {
//     gqWS:any;
//   }
// }

// let socket = new WebsocketClient(`ws://${ServerAPI.host}:${ServerAPI.port}/ws`)
// window.gqWS = socket

// socket.onopen = function(e) {
//   console.log('ws for ghostquest connection established')
//   setInterval(() => {
//     const isOpen = e?.currentTarget?.readyState === 1
//     if (isOpen) {
//       const msg = JSON.stringify({ message: "connection_reset" })
//       socket.send(msg)
//     }
//   }, 90000)
// }

// socket.onmessage = function(event) {
//   let data = event?.data || null
//   if (data) {
//     data = JSON.parse(data)
//     console.log('GQ ws event triggered: ', { response: data?.response, event })
//   }
// }

// socket.onclose = function() {
//   console.log('ws for ghostquest connection closed')
// }

// socket.onerror = function(event) {
//   toast.error('websocket connection error')
//   console.log('ws error occured', event)
// }

const INITIAL_STATE = {
  UUID: null,
  scatter: null,
  connected: false,
  connectionError: false,
  loggedIn: false,
  loginFailed: false,
  userAccount: null,
  balance: '0.0000  EOS'
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCATTER_ACTIONS.CONNECTED:
      return { ...state, connected: true, connectionError: false, scatter: action.payload };
    case SCATTER_ACTIONS.CONNECTION_ERROR:
      return { ...state, connectionError: true };
    case SCATTER_ACTIONS.LOGGED_IN:
      const username = action.payload?.accounts[0]?.name
      // const subscribe = JSON.stringify({
      //   id: username,
      //   message: 'subscribe'
      // })
      // if (window.gqWS) {
      //   window.gqWS.send(subscribe)
      // }
      return { ...state, loggedIn: true, loginFailed: false, userAccount: action.payload };
    case SCATTER_ACTIONS.LOGIN_ERROR:
      return { ...state, loggedIn: false, loginFailed: true, userAccount: null };
    case SCATTER_ACTIONS.LOGGED_OUT:
      return { ...state, loggedIn: false, loginFailed: false, userAccount: null };
    case SCATTER_ACTIONS.UPDATE_TOKEN_BALANCE:
      return { ...state, balance: action.payload };
    case SCATTER_ACTIONS.UPDATE_USER_UUID:
      return { ...state, UUID: action.payload }
    default:
      return state;
  }
};

export default reducer;
