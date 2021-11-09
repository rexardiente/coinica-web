import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import moment from "moment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from "./TransactionsScreen.module.scss";
import { GetTransactionHistory } from "services/api/server/platform";
import { ethEnabled } from "services/wallet/metamaskProvider";
import { translate } from "helpers/translate";

const IS_MAINNET = process.env.REACT_APP_IS_MAINNET === "true";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    background: "#242D41",
    borderRadius: "5px 5px 0px 0px",
  },
  tableCell: {
    color: "#FFFFFF",
  }
});

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

const getStatus = (bool) => {
  if (bool) {
    return { status: "Success", color: "#3BFF00" }
  } else {
    return { status: "Failed", color: "#FF0000" }
  }
}

const TransactionsScreen = ({ platform, dispatch }: SettingsProps) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<any>({})
  const [transactions, setTransactions] = useState<Array<transactionData>>();

  const getStatuses = async(txs) => {
    console.log({ txs })
    if (await ethEnabled()) {
      txs.map(tx => {
        if (window?.web3?.eth) {
          window?.web3?.eth.getTransactionReceipt(tx?.txHash)
          .then(result => {
            setStatuses(prevData => {
              return {
                ...prevData,
                [tx?.txHash]: result?.status
              }
            })
          })
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true);
    GetTransactionHistory()
      .then(res => {
        if (res?.data && res?.data.length > 0) {
          getStatuses(res?.data)
          setTransactions(res?.data);
          console.log('transactions', res?.data);
        }
      })
      .catch(err => {
        console.log('error getting transactions', err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <div className={styles.accountSettingsContainer}>
      {loading ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper} className={classes.table} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  #
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.date_and_time")}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.type")}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.currency")}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.amount")}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.hash")}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {translate("account_settings.transactions_screen.table.header.status")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions ?
                transactions.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row" className={classes.tableCell}>
                      {idx + 1}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {moment(tx.createdAt).format("MMM D YYYY")} {moment(tx.createdAt).format("h:m A")}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {tx.txType}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {tx.currency}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {tx?.data?.value}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      <a href={`https://${IS_MAINNET ? "" : "ropsten."}etherscan.io/tx/${tx.txHash}`} target={"_blank"} rel="noopener noreferrer">
                        {tx?.data?.hash.substring(0, 7)}...
                      </a>
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell} style={{ color: getStatus(statuses[tx.txHash]).color }}>
                      {statuses[tx.txHash] !== null ? getStatus(statuses[tx.txHash]).status :  <CircularProgress />}
                    </TableCell>
                  </TableRow>
                )) : ""
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
