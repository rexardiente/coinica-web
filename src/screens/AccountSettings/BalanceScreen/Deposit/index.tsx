import React, { useState } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import {
  setWalletSuccess,
  setWalletError,
  setAccountAddress,
  setChainId,
  setBalance,
} from "redux/wallet/wallet_actions";
import {
  sendTransaction,
  getProvider,
  getAccounts,
  getBalance,
  getChainId,
  onAccountChange,
  onChainChange,
  ethEnabled,
} from "services/wallet/metamaskProvider";
// import GenerateAddress from "./GenerateAddress";
import MetamaskDeposit from "./MetamaskDeposit";
import Exchange from "./Exchange";
import DropdownCurrency from "components/DropdownCurrency";
import styles from "./Deposit.module.scss";
import { translate } from "helpers/translate";

type Currency = {
  name: string;
  symbol: string;
};

type Props = {
  listOfCurrency: Array<Currency>;
  walletExt: any;
  platform: any;
  dispatch: Function;
  isServerUp: () => Promise<boolean>;
};

const NoMetaMaskFoundMessage = () => {
  return (
    <span>
      {translate("account_settings.balance_screen.deposit.no_metamask_found_message.one")}
      {' '}
      <a
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-weight-bold"
      >
        {translate("account_settings.balance_screen.deposit.no_metamask_found_message.two")}
      </a>
    </span>
  )
}

const displayAccountAddress = (account_address) => {
  const tempAdd = account_address;
  const firstEight = tempAdd.slice(0, 8)
  const lastEight = tempAdd.slice(-8)
  return `${firstEight}...${lastEight}`
}

const Deposit = ({ listOfCurrency, walletExt, dispatch, isServerUp, platform }: Props) => {
  const [loading, setLoading] = useState(false);
  const { wallet, chainId, account_address, balance } = walletExt;
  const [currency, setCurrency] = useState<string | null>("USDC");
  const [exchangeDepositAddress, setExchangeDepositAddress] = useState("");
  const { fromWei } = Web3.utils;
  const { walletConfig } = platform;

  const handleSelectedCurrency = (val: string | null) => {
    setCurrency(val);
  };

  const handleExchangeDepositAddress = () => {
    //TODO: intergrate api for exchanging coin
    setExchangeDepositAddress("sampleExchangeAddress0x27378DKj$56bn2");
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      dispatch(setAccountAddress(null))
      toast.warning('No metamask account detected');
    } else if (accounts[0] !== account_address) {
      dispatch(setAccountAddress(accounts[0]))

      /**
       * GET ETH BALANCE
       */
      getBalance([accounts[0], 'latest'], (weiBalance) => {
        const etherBalance = fromWei(weiBalance, 'ether')
        dispatch(setBalance(etherBalance))
      }, err => {
        console.log({ getBalance: err })
      })

      /**
       * GET USDC BALANCE
       */
    }
  }

  const connectWallet = async () => {
    if (account_address !== null) return

    try {
      setLoading(true)
      const provider = await getProvider()
      if (provider) {
        if (provider !== window.ethereum) {
          toast.error(`Can't connect to MetaMask. Do you have multiple wallets installed?`);
        } else {
          if (!(await ethEnabled())) {
            return
          }

          dispatch(setWalletSuccess(provider))

          /********************************************/
          /* Handle chain (network) and chainChanged  */
          /********************************************/
          getChainId([], (response) => {
            console.log({ getChainId: response })
            dispatch(setChainId(response))
          }, (err) => {
            console.log({ getChainIdErr: err })
            toast.warning('No chain id found')
            dispatch(setChainId(null))
          })

          /*******************************/
          /* Access the user's accounts  */
          /*******************************/
          getAccounts([], accounts => {
            handleAccountsChanged(accounts)
          }, err => {
            console.log({ getAccountsErr: err })
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              toast.error('Please connect to MetaMask')
            } else {
              toast.error('Error occured in connecting to MetaMask')
              console.error({ getAccountsError: err });
            }
          })

          onAccountChange(handleAccountsChanged)
          onChainChange(() => {
            window.location.reload();
          })
        }
      } else {
        toast.error(NoMetaMaskFoundMessage, { autoClose: false })
        dispatch(setWalletError(true))
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      dispatch(setWalletError(err || true))
    }
  }

  const renderDepositFunction = () => {
    switch (currency) {
      case "ETH":
      case "USDC":
        return (
          <MetamaskDeposit
            currency={currency}
            walletAddress="0xc04f52d7a8d1251c927d33e6da90d6ef3f5327a1"
            walletMemo="johnDoe34"
            isServerUp={isServerUp}
          />
        );
      case "more...":
        return (
          <Exchange
            depositAddress={exchangeDepositAddress}
            getDepositAddress={handleExchangeDepositAddress}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.container}>
      {walletConfig.network && <Alert variant={'primary'}>{translate("account_settings.balance_screen.deposit.header.info")}</Alert>}

      <div className={styles.stepOne}>
        <h6>
          <span className={styles.numberCircle}>1</span> {translate("account_settings.balance_screen.deposit.connect_wallet.label")}
        </h6>
      </div>
      <div>
        <span id="header-wallet-btn" className="badge badge-primary hover-cursor" onClick={() => connectWallet()}>
          {
            loading
              ? translate("account_settings.balance_screen.deposit.connect_wallet.button.loading")
              : wallet !== null && account_address !== null
                ? displayAccountAddress(account_address)
                : translate("account_settings.balance_screen.deposit.connect_wallet.label")
          }
        </span>
        {/* {
          wallet !== null && account_address !== null ? (
            <span id="header-wallet-btn" className="badge badge-warning text-white hover-cursor mt-2">
              Logout
            </span>
          ) : null
        } */}
        {
          wallet !== null && account_address !== null ? (
            <div className="mt-2">
              {translate("account_settings.balance_screen.deposit.account_balance.reminder")}
              <div className="d-flex justify-content-between">
                <span>ETH</span>
                <span>{balance || 0}</span>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span>USDC</span>
                <span>{balance || 0}</span>
              </div> */}
            </div>
          ) : null
        }
      </div>

      <div className={styles.stepTwo}>
        <h6>
          <span className={styles.numberCircle}>2</span> {translate("account_settings.balance_screen.deposit.select_currency.label")}
        </h6>
      </div>

      <div className={styles.dropDownCurrency}>
        <DropdownCurrency
          listCurrency={listOfCurrency}
          selectedCurrency={currency}
          onSelectCurrency={handleSelectedCurrency}
        />
      </div>
      {renderDepositFunction()}
    </div>
  );
};


const mapStateToProps = ({ walletExt, platform }) => ({ walletExt, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
