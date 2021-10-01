import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';
import styles from "./TransactionsScreen.module.scss";
import { GetTransactionHistory } from "services/api/server/platform";
import moment from "moment";
import { translate } from "helpers/translate";

type SettingsProps = {
  platform: any;
  dispatch: Function;
};

interface transactionData {
  txHash: string;
  id: string;
  currency: string;
  txType: string;
  data: {
    blockHash: string;
    blockNumber: number;
    chainId: any;
    condition: any;
    creates: any;
    from: string;
    gas: number;
    gasPrice: number;
    hash: string;
    input: string;
    nonce: number;
    publicKey: any;
    raw: any;
    standardV: any;
    to: string;
    transactionIndex: string;
    value: string;
    type: string;
    v: string;
    r: string;
    s: string
  };
  createdAt: string
}

const TransactionsScreen = ({ platform, dispatch }: SettingsProps) => {
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  const [transactions, setTransactions] = useState<Array<transactionData>>();


  useEffect(() => {
    GetTransactionHistory()
      .then(res => {
        console.log('res', res.data);
        setTransactions(res.data);
        console.log('transactions', transactions);
      })
      .catch(err => {
        console.log('error getting transactions', err);
      });
  }, []);


  console.log('transactions', transactions);

  return (
    <div className={styles.accountSettingsContainer}>
      <Box className={`justify-content-center`}>
        <h3 className={`${styles.userInfoHeader} px-3 py-2`}>{translate("account_settings.transactions_screen.title")}</h3>
      </Box>
      <div className="pt-5">
        <table className="table table-borderless">
          <thead>
            <th>#</th>
            <th>{translate("account_settings.transactions_screen.table.header.date_and_time")}</th>
            <th>{translate("account_settings.transactions_screen.table.header.type")}</th> {/* DEPOSIT/WITHDRAW */}
            <th>{translate("account_settings.transactions_screen.table.header.currency")}</th>
            <th>{translate("account_settings.transactions_screen.table.header.amount")}</th>
            <th>{translate("account_settings.transactions_screen.table.header.hash")}</th>
          </thead>
          <tbody>
            {transactions ?
              transactions.map((transaction, index) => {
                const date = new Date(transaction.createdAt);
                console.log('date', date);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{moment(transaction.createdAt).format("MMM D YYYY")} {moment(transaction.createdAt).format("h:m A")}</td>
                    <td>{transaction.txType}</td>
                    <td>{transaction.currency}</td>
                    <td>{transaction.data.value}</td>
                    <td><a href={`https://etherscan.io/tx/${transaction.txHash}`} target={"_blank"} rel="noopener noreferrer">{transaction.data.hash.substring(0, 5)}...</a></td>
                  </tr>
                )
              })
              :
              ""
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
