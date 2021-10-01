import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() => ({
  depositBtn: {
    color: '#ffffff',
    padding: '10px 15px',
    background: '#1785EB',
    width: '180px',
    height: '50px'
  },
}));

type Props = {
  dispatch: Function;
  walletExt?: any;
  currency: string;
  walletAddress: string;
  walletMemo: string;
  platform: any;
  isServerUp: () => Promise<boolean>;
  depositAmount: number;
};

const MetamaskDeposit = ({
  dispatch,
  walletExt,
  currency,
  walletAddress, 
  isServerUp,
  platform,
  depositAmount
}: Props) => {
  const classes = useStyles();
  const EGS_address = walletAddress
  const { toWei } = Web3.utils;
  const { account_address } = walletExt
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState("");
  const [isDepositError, setDepositError] = useState(false);
  const [modalState, setModalState] = useState(false);
  const { walletConfig } = platform;
  const tokenContractAddress = walletConfig?.tokenContractAddress;
  const txExplorerUrl = walletConfig?.txExplorerUrl;

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
      <div className={styles.depositBtnContainer}>
        <Button
          className={classes.depositBtn}
          variant="contained"
          disabled={loading}
          onClick={() => depositHandler()}
        >
          {loading ? translate("account_settings.balance_screen.metamask_deposit.depositing") : translate("account_settings.balance_screen.metamask_deposit.deposit")}
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ walletExt, platform }) => ({ walletExt, platform });
export default connect(mapStateToProps)(MetamaskDeposit);
