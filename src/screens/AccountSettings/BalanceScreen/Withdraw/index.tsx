import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Web3 from "web3";
import { makeStyles } from '@material-ui/core/styles';
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { XCircle } from "react-bootstrap-icons";
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
  const { walletConfig: { gasLimits, txExplorerUrl } } = useSelector((state: ReduxState) => state.platform)

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
            styles={{ marginLeft: '-7px' }}
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
            <Spinner animation="border" />
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
  
      {/* <div className={styles.stepOne}>
        <h6>
          <span className={styles.numberCircle}>1</span> {translate("account_settings.balance_screen.withdraw.select_currency")}
        </h6>
      </div>

      <div className={styles.dropDownCurrency}>
        <DropdownCurrency
          listCurrency={listOfCurrency}
          selectedCurrency={currency}
          onSelectCurrency={handleSelectedCurrency}
        />
      </div> */}
      {/* <div className={styles.stepTwo}>
        <h6>
          <span className={styles.numberCircle}>2</span> {translate("account_settings.balance_screen.withdraw.fill_your")}{" "}
          <span className={styles.currency}>{currency}</span> {translate("account_settings.balance_screen.withdraw.address_and_amount")}
        </h6>

        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRecipient">
              <Form.Label className={getClassAsterisk(recipientAddress)}>
                {translate("account_settings.balance_screen.withdraw.recipient")}<span className={styles.currency}>{currency}</span>{" "}
                {translate("account_settings.balance_screen.withdraw.address")}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={recipientAddress}
                  onChange={handleRecipient}
                  isInvalid={isInvalid}
                />
                {recipientAddress && (
                  <InputGroup.Append>
                    <Button
                      className="d-flex align-items-center"
                      variant="outline-secondary"
                      onClick={() => setRecipientAddress("")}
                    >
                      <XCircle />
                    </Button>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </Form.Group>

            {currency && walletMemoWhiteList.includes(currency) && (
              <Form.Group controlId="formMemo">
                <Form.Label className={getClassAsterisk(memo)}>
                  <span className={styles.currency}>{currency}</span> {translate("account_settings.balance_screen.withdraw.withdrawal_memo")}
                </Form.Label>
                <span className={styles.noMemo}>
                  <label htmlFor="formNoMemo">{translate("account_settings.balance_screen.withdraw.no_memo")}</label>
                  <input
                    id="formNoMemo"
                    type="checkbox"
                    onChange={toggleNoMemo}
                  />
                </span>
                <InputGroup>
                  <Form.Control
                    required={!requiredMemo}
                    value={memo}
                    onChange={handleMemo}
                    isInvalid={isInvalid}
                    disabled={requiredMemo}
                  />
                  {memo && (
                    <InputGroup.Append>
                      <Button
                        className="d-flex align-items-center"
                        variant="outline-secondary"
                        onClick={() => setMemo("")}
                      >
                        <XCircle />
                      </Button>
                    </InputGroup.Append>
                  )}
                </InputGroup>
              </Form.Group>
            )}

            <Form.Group controlId="formAmount">
              <Form.Label className={getClassAsterisk(amount)}>
                {translate("account_settings.balance_screen.withdraw.amount")}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  value={amount}
                  onChange={handleAmount}
                  isInvalid={isInvalid}
                />
                {amount && (
                  <InputGroup.Append>
                    <Button
                      className="d-flex align-items-center"
                      variant="outline-secondary"
                      onClick={() => setAmount("")}
                    >
                      <XCircle />
                    </Button>
                  </InputGroup.Append>
                )}
              </InputGroup>
              <Form.Text className={`py-2 ${fetchingGas.isError ? "text-danger" : ""}`}>
                {
                  fetchingGas.state ? (
                    <Spinner animation="border" />
                  ) : (
                    <>{translate("account_settings.balance_screen.withdraw.transaction_fee")} : {estimatedGasFee} ETH</>
                  )
                }
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-primary" disabled={loading}>
              {loading ? translate("account_settings.balance_screen.withdraw.withdrawing") : translate("account_settings.balance_screen.withdraw.withdraw")}
            </Button>
          </Form>
        </div>
      </div> */}
    </div>
  );
};

export default Withdraw;
