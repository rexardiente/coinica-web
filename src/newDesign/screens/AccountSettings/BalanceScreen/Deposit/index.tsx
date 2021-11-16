import React, { useState } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() => ({
  connectWalletBtn: {
    color: '#ffffff',
    padding: '10px 15px',
    background: '#1785EB'
  },
}));

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
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { wallet, chainId, account_address, balance } = walletExt;
  const [currency, setCurrency] = useState<string | null>("USDC");
  const [exchangeDepositAddress, setExchangeDepositAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const { fromWei } = Web3.utils;

  const depositAmountHandler = (e) => {
    const { value } = e.target
    setDepositAmount(value)
  }

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
            depositAmount={depositAmount}
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
      <div className={styles.stepOne}>
        <h4>
          {translate("account_settings.balance_screen.deposit.connect_wallet.label")}
        </h4>
      </div>
      <div>
        <Button className={classes.connectWalletBtn} variant="contained" onClick={() => connectWallet()}>
          {
            loading
              ? translate("account_settings.balance_screen.deposit.connect_wallet.button.loading")
              : wallet !== null && account_address !== null
                ? displayAccountAddress(account_address)
                : translate("account_settings.balance_screen.deposit.connect_wallet.btn.label")
          }
        </Button>
        {
          wallet !== null && account_address !== null ? (
            <div className={styles.walletBalance}>
              <span>
                {translate("account_settings.balance_screen.deposit.account_balance.reminder")}
              </span>
              <div className="d-flex justify-content-between w-50">
                <span>ETH</span>
                <span>{(+balance).toFixed(4) || 0}</span>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span>USDC</span>
                <span>{balance || 0}</span>
              </div> */}
            </div>
          ) : null
        }
      </div>

      <div>
        <p style={{ color: '#9DC8EF', margin: '30px 0 0 0' }}>I want to deposit</p>
        <div className={styles.stepTwo}>
          <TextField
            label={translate("account_settings.balance_screen.metamask_deposit.amount")}
            type="number"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#FFFF' },
            }}
            style={{
              background: '#0E131F',
              borderRadius: '5px'
            }}
            onChange={depositAmountHandler}
          />
          <DropdownCurrency
            listCurrency={listOfCurrency}
            selectedCurrency={currency}
            onSelectCurrency={handleSelectedCurrency}
          />
        </div>
      </div>
      {renderDepositFunction()}
    </div>
  );
};


const mapStateToProps = ({ walletExt, platform }) => ({ walletExt, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
