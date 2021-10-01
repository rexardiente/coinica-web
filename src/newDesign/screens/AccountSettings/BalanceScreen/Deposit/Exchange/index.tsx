import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import DropDownCurrency from "components/DropdownCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import CopyCode from "components/CopyCode";
import styles from "../Deposit.module.scss";
import { translate } from "helpers/translate";

const LIST_RECEIVE_CURRENCY = [
  { symbol: "btc", name: "Bitcoin" },
  { symbol: "eth", name: "Ethereum" },
  { symbol: "eos", name: "EOS" },
];

const TEMP_COINSWITCH_SUPPORTED_CURRENCY = [
  { symbol: "bnb", name: "Binance coin" },
  { symbol: "xrp", name: "Ripple" },
  { symbol: "doge", name: "Doge coin" },
];

type Props = {
  depositAddress: string;
  getDepositAddress: () => void;
};

const Exchange = ({ depositAddress, getDepositAddress }: Props) => {
  const [receiveCurrency, setReceiveCurrency] = useState<string | null>("btc");
  const [depositCurrency, setDepositCurrency] = useState<string | null>("bnb");

  const handleSelectedReceive = (val: string | null) => {
    setReceiveCurrency(val);
  };
  const handleSelectedDeposit = (val: string | null) => {
    setDepositCurrency(val);
  };

  return (
    <>
      <div className={styles.stepTwo}>
        <h6>
          <span className={styles.numberCircle}>2</span> {translate("account_settings.balance_screen.deposit.exchange.select_currency.title")}
        </h6>

        <div className={styles.exchangeForm}>
          <div className={styles.exchangeReceive}>
            <div className={styles.exchangeReceiveLabel}>
              {translate("account_settings.balance_screen.deposit.exchange.select_currency.to_receive")}
            </div>
            <DropDownCurrency
              containerClass={styles.dropDownExchange}
              listCurrency={LIST_RECEIVE_CURRENCY}
              selectedCurrency={receiveCurrency}
              onSelectCurrency={handleSelectedReceive}
            />
          </div>
          <div className={styles.exchangeIcon}>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </div>
          <div className={styles.exchangeDeposit}>
            <div className={styles.exchangeDepositLabel}>
              {translate("account_settings.balance_screen.deposit.exchange.select_currency.re_deposit")}
              <span className={styles.depositFee}>({translate("account_settings.balance_screen.deposit.exchange.fee")}: 0)</span>
            </div>
            <DropDownCurrency
              containerClass={styles.dropDownExchange}
              listCurrency={TEMP_COINSWITCH_SUPPORTED_CURRENCY}
              selectedCurrency={depositCurrency}
              onSelectCurrency={handleSelectedDeposit}
            />
            <div className={styles.depositLimit}>
              <span>{translate("account_settings.balance_screen.deposit.exchange.min")}: 0.00</span>
              <span>{translate("account_settings.balance_screen.deposit.exchange.max")}: 0.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stepThree}>
        <h6>
          <span className={styles.numberCircle}>3</span> {translate("account_settings.balance_screen.deposit.get_you_address")}
        </h6>
        <div className={styles.copyCurrency}>
          <div className={styles.labelCopy}>
            <span className={styles.currency}>{depositCurrency}</span> {translate("account_settings.balance_screen.deposit.deposit_address")}
          </div>
          <CopyCode
            code={depositAddress}
            copyElemId="copy-code-address"
            headerTitle={translate("account_settings.balance_screen.deposit.deposit_address")}
            showQrCode={false}
          />
        </div>
        <div>
          <Button onClick={getDepositAddress}>{translate("account_settings.balance_screen.deposit.get_address")}</Button>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.note}>
        <h5>{translate("account_settings.balance_screen.deposit.note.title")}</h5>
        <p>
          {translate("account_settings.balance_screen.deposit.note.content.one.a")}<span className={styles.currency}>{depositCurrency}</span>{" "}
          {translate("account_settings.balance_screen.deposit.note.content.one.b")}
        </p>
        <p>
          {translate("account_settings.balance_screen.deposit.note.content.two.a")}{" "}
          <span className={styles.currency}>{depositCurrency}</span>. {translate("account_settings.balance_screen.deposit.note.content.two.b")}
        </p>
      </div>
    </>
  );
};

export default Exchange;
