import axios from "axios";

const GAS_TRACKER_URL = "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
const etherKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const params = { 
  apikey : etherKey
}

export const gasTracker = () => {
  return axios.get(GAS_TRACKER_URL , {params});
}