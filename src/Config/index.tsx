import { Api, JsonRpc } from "eosjs";
import ScatterJS from "scatterjs-core";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only
import { TextEncoder, TextDecoder } from "text-encoding";
import axios from "axios";

// development flag
export const IS_DEV = process.env.REACT_APP_IS_DEV === "true" ? true : false;
// export const IS_DEV = true

//
const name = process.env.REACT_APP_NAME;
const protocol = IS_DEV
  ? process.env.REACT_APP_EOS_PROTOCOL_DEVELOPMENT
  : process.env.REACT_APP_EOS_PROTOCOL;
const host = IS_DEV
  ? process.env.REACT_APP_EOS_HOST_DEVELOPMENT
  : process.env.REACT_APP_EOS_HOST;
const chainId = IS_DEV
  ? process.env.REACT_APP_EOS_CHAIN_ID_DEVELOPMENT
  : process.env.REACT_APP_EOS_CHAIN_ID;
const port = IS_DEV
  ? parseInt(process.env.REACT_APP_EOS_PORT_DEVELOPMENT as string, 10)
  : parseInt(process.env.REACT_APP_EOS_PORT as string, 10);
const contractName = IS_DEV
  ? process.env.REACT_APP_EOS_CONTRACT_NAME_DEVELOPMENT
  : process.env.REACT_APP_EOS_CONTRACT_NAME;
const GQContractName = IS_DEV
  ? process.env.REACT_APP_EOS_GQ_CONTRACT_NAME_DEVELOPMENT
  : process.env.REACT_APP_EOS_GQ_CONTRACT_NAME;
const MJContractName = IS_DEV
  ? process.env.REACT_APP_EOS_MJ_CONTRACT_NAME_DEVELOPMENT
  : process.env.REACT_APP_EOS_MJ_CONTRACT_NAME;

// Token must be save securely.
const defaultPrivateKey = process.env.REACT_APP_EOS_PRIVATE_KEY as string; // wallet account privatekey
const eosServer = `${protocol}://${host}:${port}`;
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc(eosServer, {}); // {} default fetch.
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

const Eos = {
  name,
  rpc: rpc,
  api: api,
  contractName,
  GQContractName,
  MJContractName,
};

const Network = ScatterJS.Network.fromJson({
  blockchain: "eos",
  protocol,
  host,
  port,
  chainId,
});

const ServerAPI = {
  assets_url: process.env.REACT_APP_EOS_ASSETS_URL,
  protocol: process.env.REACT_APP_EOS_PROTOCOL_SERVER_API,
  host: process.env.REACT_APP_EOS_HOST_SERVER_API,
  ws_url: process.env.REACT_APP_WEB_SOCKET_URL
};

const AxiosMultiCurrency = axios.create({
  baseURL: `${ServerAPI.protocol}://${ServerAPI.host}`,
});
AxiosMultiCurrency.defaults.headers.post["Content-Type"] = "application/json";

// Main base url of server api
const AxiosServerApi = axios.create({
  baseURL: `${ServerAPI.protocol}://${ServerAPI.host}`,
});
AxiosServerApi.defaults.headers.post["Content-Type"] = "application/json";

console.log({ ServerAPI, AxiosMultiCurrency })

export {
  Eos,
  Network,
  ServerAPI,
  AxiosMultiCurrency,
  AxiosServerApi,
};
