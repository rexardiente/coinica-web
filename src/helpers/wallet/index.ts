const walletConfig = {
  development: {
    network: "ropsten",
    gasLimits: {
      eth: 500000,
      token: 500000,
    },
    tokenContractAddress: {
      usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    },
    txExplorerUrl: "https://ropsten.etherscan.io/tx",
  },
  production: {
    network: "", //mainnet
    gasLimits: {
      eth: 21000,
      token: 100000,
    },
    tokenContractAddress: {
      usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    txExplorerUrl: "https://etherscan.io/tx",
  },
};

export function walletNetwork() {
  if (process.env.REACT_APP_WALLET_NETWORK === "mainnet") {
    return walletConfig.production;
  }
  return walletConfig.development;
}
