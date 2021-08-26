import axios from "axios";

const BASE_URL = "https://ethgasstation.info/api/ethgasAPI.json";
const API_KEY = process.env.DEFIPULSE_API_KEY;

export const getETHGasPrice = () => {
  return axios.get(BASE_URL,{params:{'api-key':API_KEY}});
}