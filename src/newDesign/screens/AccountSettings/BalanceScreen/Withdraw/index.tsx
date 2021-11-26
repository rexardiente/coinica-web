import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Web3 from "web3";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { toast } from "react-toastify";
import DropdownCurrency from "components/DropdownCurrency";
import AlertModal from "../AlertModal";
import { withdrawETH, withdrawUSDC } from "services/wallet/withdraw";
import styles from "./Withdraw.module.scss";
import { translate } from "helpers/translate";

const { toWei, fromWei } = Web3.utils;

const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`

const useStyles = makeStyles(() => ({
  withdrawBtn: {
    color: '#ffffff',
    padding: '10px 15px',
    background: '#1785EB',
    width: '180px',
    height: '50px'
  },
}));

type Currency = {
  name: string;
  symbol: string;
};

type Props = {
  listOfCurrency: Array<Currency>;
  isServerUp: () => Promise<boolean>;
};

type ReduxState = {
  platform: { walletConfig: any }
}

const Withdraw = ({ listOfCurrency, isServerUp }: Props) => {
  const classes = useStyles();
  const [fetchingGas, setFetchingGas] = useState({ state: false, isError: false })
  const [gasPrice, setGasPrice] = useState<any>("")
  const [estimatedGasFee, setEstimatedGasFee] = useState<any>(0)
  const [modalState, setModalState] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isWithdrawError, setWithdrawError] = useState(false)
  const [txId, setTxId] = useState("")
  const [currency, setCurrency] = useState<string | null>("ETH");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [requiredMemo, setRequiredMemo] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const { walletConfig } = useSelector((state: ReduxState) => state.platform)
  const gasLimits = walletConfig?.gasLimits;
  const txExplorerUrl = walletConfig?.txExplorerUrl;

  const walletMemoWhiteList = ["eos"];

  useEffect(() => {
    setRecipientAddress("")
    setAmount("")
    setFetchingGas({ state: true, isError: false })

    axios.get(GAS_PRICE_URL)
      .then(({ data }) => {
        if (data) {
          const gasLimit = currency === "ETH" ? gasLimits.eth : gasLimits.token;
          const weiGasPrice = toWei(data.result.ProposeGasPrice, "gwei");
          const ethGasPrice = fromWei(weiGasPrice, "ether");
          const estimateMaxGasPrice = (+ethGasPrice) * gasLimit;
          console.log({ weiGasPrice, ethGasPrice, estimateMaxGasPrice })
          setGasPrice(weiGasPrice)
          setEstimatedGasFee(estimateMaxGasPrice?.toFixed(4) || 0)
        } else {
          setGasPrice("")
          setEstimatedGasFee(0)
        }
        setFetchingGas({ state: false, isError: false })
      })
      .catch((e) => {
        setGasPrice("")
        setEstimatedGasFee(0)
        setFetchingGas({ state: false, isError: true })
      })
  }, [currency])

  const handleRecipient = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setRecipientAddress(value);
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    console.log({ TYPE_OF_VALUE: typeof value })
    setAmount(value);
  };

  const handleMemo = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setMemo(value);
  };

  const toggleNoMemo = (e: ChangeEvent<HTMLInputElement>) => {
    setRequiredMemo(e.target.checked);
  };

  const handleSubmit = async () => {
    if (!gasPrice) {
      toast.error(translate("account_settings.balance_screen.withdraw.note.no_gas_price"))
      return
    }

    const response = await isServerUp();
    if (!response) {
      toast.error(translate("account_settings.balance_screen.withdraw.note.cant_withdraw"));
      return;
    }

    setTxId("")
    setLoading(true)
    setWithdrawError(false)
    setModalState(false)

    if (currency === "ETH") {
      console.log('withdrawing ETH with params: ', { address: recipientAddress, amount, gasPrice })
      withdrawETH({ recipientAddress, amount, gasPrice })
        .then((response) => {
          const { data } = response
          setTxId(data?.tx_hash)
          console.log({ ETH_wthdraw_response: response })
        }).catch((error) => {
          setWithdrawError(true)
          console.log({ ETH_wthdraw_error: error })
        }).finally(() => {
          setLoading(false)
          setModalState(true)
        })
    } else if (currency === "USDC") {
      console.log('withdrawing USDC with params: ', { address: recipientAddress, amount, gasPrice })
      withdrawUSDC({ recipientAddress, amount, gasPrice })
        .then((response) => {
          const { data } = response
          setTxId(data?.tx_hash)
          console.log({ USDC_wthdraw_response: response })
        }).catch((error) => {
          setWithdrawError(true)
          console.log({ USDC_wthdraw_error: error })
        }).finally(() => {
          setLoading(false)
          setModalState(true)
        })
    }
  };

  const handleSelectedCurrency = (val: string | null) => {
    setCurrency(val);
  };

  const getClassAsterisk = (inputValue: string | number) => {
    return !inputValue ? styles.asterisk : undefined;
  };

  return (
    <div className={styles.container}>
      <AlertModal
        txId={txId}
        isDeposit={false}
        isError={isWithdrawError}
        show={modalState}
        setShow={setModalState}
        txExplorerUrl={txExplorerUrl}
      />

      <div>
        <p style={{ color: '#9DC8EF', margin: '30px 0 0 0' }}>I want to withdraw</p>
        <div className={styles.stepOne}>
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
            onChange={handleAmount}
          />
          <DropdownCurrency
            listCurrency={listOfCurrency}
            selectedCurrency={currency}
            onSelectCurrency={handleSelectedCurrency}
          />
        </div>
      </div>

      <div>
        <p style={{ color: '#9DC8EF', margin: '30px 0 0 0' }}>
          {translate("account_settings.balance_screen.withdraw.recipient")}
          <span className={styles.currency}>{currency}</span>{" "}
          {translate("account_settings.balance_screen.withdraw.address")}
        </p>
        <div className={styles.stepTwo}>
          <TextField
            label={translate("account_settings.balance_screen.withdraw.address")}
            type="text"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#FFFF', textTransform: 'capitalize' },
            }}
            style={{
              width: '400px',
              background: '#0E131F',
              borderRadius: '5px'
            }}
            onChange={handleRecipient}
          />
        </div>
        {
          fetchingGas.state ? (
            <CircularProgress style={{ width: "2rem", height: "2rem" }} />
          ) : (
            <p style={{ color: '#9DC8EF', margin: '10px 0 0 0' }}>
              {translate("account_settings.balance_screen.withdraw.transaction_fee")}: {estimatedGasFee} ETH
            </p>
          )
        }
      </div>


      <div className={styles.withdrawBtnContainer}>
        <Button
          className={classes.withdrawBtn}
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? translate("account_settings.balance_screen.withdraw.withdrawing") : translate("account_settings.balance_screen.withdraw.withdraw")}
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
