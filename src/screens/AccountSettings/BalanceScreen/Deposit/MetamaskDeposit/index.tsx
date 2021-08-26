import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3"
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import AlertModal from "../../AlertModal";
import {
  sendTransaction,
  ethEnabled,
  disableETH
} from "services/wallet/metamaskProvider";
import styles from "../Deposit.module.scss";
import { depositETH, depositUSDC } from "services/wallet/deposit";
import { setWalletLogout } from "redux/wallet/wallet_actions";
import { translate } from "helpers/translate";

type Props = {
  dispatch: Function;
  walletExt?: any;
  currency: string;
  walletAddress: string;
  walletMemo: string;
  platform: any;
  isServerUp: () => Promise<boolean>;
};

const MetamaskDeposit = ({ dispatch, walletExt, currency, walletAddress, isServerUp, platform }: Props) => {
  const EGS_address = walletAddress
  const { toWei } = Web3.utils;
  const { account_address } = walletExt
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState("");
  const [isDepositError, setDepositError] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [depositAmount, setDepositAmount] = useState(1);
  const { walletConfig: { tokenContractAddress, txExplorerUrl } } = platform;

  useEffect(() => {
    setDepositAmount(0)

  }, [currency])

  const depositAmountHandler = (e) => {
    const { value } = e.target
    setDepositAmount(value)
  }

  const depositHandler = async () => {
    if (!account_address) {
      toast.warning(translate("account_settings.balance_screen.metamask_deposit.deposit_handler.no_account_detected"))
      return
    }

    const amount = +depositAmount
    if (amount <= 0) {
      toast.warning(translate("account_settings.balance_screen.metamask_deposit.deposit_handler.invalid_amount"))
      return
    }

    const response = await isServerUp();
    if (!response) {
      toast.error(translate("account_settings.balance_screen.metamask_deposit.deposit_handler.cant_deposit"));
      return;
    }

    switch (currency) {
      case 'USDC':
        setLoading(true)

        if (await ethEnabled()) {
          const encodedAbi = window?.web3?.eth?.abi.encodeFunctionCall({
            name: 'transfer',
            type: 'function',
            inputs: [{
              type: 'address',
              name: '_to'
            }, {
              type: 'uint256',
              name: '_value'
            }]
          }, [EGS_address, `${(+amount) * 1000000}`]);

          const params = [
            {
              from: account_address.toLowerCase(),
              to: tokenContractAddress.usdc,
              data: encodedAbi,
              // gas: <GAS LIMIT HERE>
            }
          ]

          console.log({ params })

          sendTransaction(params, (txResponse) => {
            setTxId(txResponse)
            setDepositError(false)
            setModalState(true)

            const isDisabled = disableETH()
            console.log({ isDisabled })
            if (isDisabled) {
              dispatch(setWalletLogout(null))
            }

            setLoading(false)
            console.log({ txResponse });

            depositUSDC({
              tx_hash: txResponse,
              issuerAddress: params[0].from,
              recipientAddress: EGS_address,
              amount,
            });

          }, (err) => {
            setTxId("")
            setDepositError(true)
            setModalState(true)
            toast.error(err.message || err.stack || translate("account_settings.balance_screen.metamask_deposit.deposit_handler.user_denied_transaction"))

            setLoading(false)
            console.log({ txError: err })
          })
        } else {
          toast.error(translate("account_settings.balance_screen.metamask_deposit.deposit_handler.metamask_error"))
          setLoading(false)
        }
        break;

      case 'ETH':
        setLoading(true);
        const parsedValue = parseFloat(toWei((amount + ""), 'ether')).toString(16)
        const params = [
          {
            from: account_address.toLowerCase(),
            to: EGS_address,
            value: parsedValue,
            // gas: <GAS LIMIT HERE>
          },
        ]

        console.log({ params })
        sendTransaction(params, (txResponse) => {
          setTxId(txResponse)
          setDepositError(false)
          setModalState(true)

          const isDisabled = disableETH()
          console.log({ isDisabled })
          if (isDisabled) {
            dispatch(setWalletLogout(null))
          }

          setLoading(false)
          console.log({ txResponse });

          depositETH({
            tx_hash: txResponse,
            issuerAddress: params[0].from,
            recipientAddress: EGS_address,
            amount,
          });

        }, (err) => {
          setTxId("")
          setDepositError(true)
          setModalState(true)
          toast.error(err.message || err.stack || translate("account_settings.balance_screen.metamask_deposit.deposit_handler.user_denied_transaction"))

          setLoading(false)
          console.log({ txError: err })
        })

        break;
      default:
        break;
    }
  }

  return (
    <>
      <AlertModal
        txId={txId}
        isDeposit={true}
        isError={isDepositError}
        show={modalState}
        setShow={setModalState}
        txExplorerUrl={txExplorerUrl}
      />
      <div className={styles.stepTwo}>
        <Form>
          {/* <Form.Group>
            <Form.Label>
              <span className={styles.numberCircle}>2</span> EGS Address
            </Form.Label>
            <Form.Control
              className="px-4 font-weight-bold"
              plaintext
              readOnly
              defaultValue={walletAddress}
            />
          </Form.Group> */}

          <Row>
            <Form.Group>
              <Col className="no-gutters">
                <Form.Label>
                  <span className={styles.numberCircle}>2</span> {translate("account_settings.balance_screen.metamask_deposit.amount")}
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>{currency}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    min={1}
                    value={depositAmount}
                    onChange={depositAmountHandler}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

          </Row>

          <Button
            className="btn-egs-primary"
            disabled={loading}
            onClick={() => depositHandler()}
          >
            {loading ? translate("account_settings.balance_screen.metamask_deposit.depositing") : translate("account_settings.balance_screen.metamask_deposit.deposit")}
          </Button>
        </Form>
      </div>
      <hr className={styles.divider} />
      <div className={styles.note}>
        <h5>{translate("account_settings.balance_screen.metamask_deposit.note.title")}</h5>
        <p>
          {translate("account_settings.balance_screen.metamask_deposit.note.content.one.a")}<span className={styles.currency}>{currency}</span>
          {translate("account_settings.balance_screen.metamask_deposit.note.content.one.b")}
        </p>
        <p>
          {translate("account_settings.balance_screen.metamask_deposit.note.content.two.a")}{" "}
          <span className={styles.currency}>{currency}</span> {translate("account_settings.balance_screen.metamask_deposit.note.content.two.b")}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = ({ walletExt, platform }) => ({ walletExt, platform });
export default connect(mapStateToProps)(MetamaskDeposit);
