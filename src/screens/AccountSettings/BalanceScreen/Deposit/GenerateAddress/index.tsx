import React from "react";
import CopyCode from "components/CopyCode";
import styles from "../Deposit.module.scss";
import { translate } from "helpers/translate";

type Props = {
  currency: string;
  walletAddress: string;
  walletMemo: string;
};

const GenerateAddress = ({ currency, walletAddress, walletMemo }: Props) => {
  const walletMemoWhiteList = ["eos"];

  const renderLabelCopy = (label?: any) => {
    return (
      <div className={styles.labelCopy}>
        {translate("account_settings.balance_screen.generate_address.your")} <span className={styles.currency}>{currency}</span> {translate("account_settings.balance_screen.generate_address.deposit")} {label}
      </div>
    );
  };
  return (
    <>
      <div className={styles.stepTwo}>
        <h6>
          <span className={styles.numberCircle}>2</span> {translate("account_settings.balance_screen.generate_address.copy_or_qr")}
        </h6>

        <div className={styles.copyCurrency}>
          {renderLabelCopy(translate("account_settings.balance_screen.generate_address.address"))}
          <CopyCode
            code={walletAddress}
            copyElemId="copy-code-address"
            headerTitle={renderLabelCopy(translate("account_settings.balance_screen.generate_address.address"))}
          />
        </div>
        {currency && walletMemoWhiteList.includes(currency) && (
          <div className={styles.copyMemo}>
            {renderLabelCopy(translate("account_settings.balance_screen.generate_address.memo"))}
            <CopyCode
              code={walletMemo}
              copyElemId="copy-code-memo"
              headerTitle={renderLabelCopy(translate("account_settings.balance_screen.generate_address.memo"))}
              modalDialogClassQrCode={styles.modalDialogMemo_qrCode}
            />
          </div>
        )}
      </div>
      <hr className={styles.divider} />
      <div className={styles.note}>
        <h5>{translate("account_settings.balance_screen.generate_address.note.title")}</h5>
        <p>
          {translate("account_settings.balance_screen.generate_address.note.content.one.a")}<span className={styles.currency}>{currency}</span>{translate("account_settings.balance_screen.generate_address.note.content.one.b")}
        </p>
        <p>
          {translate("account_settings.balance_screen.generate_address.note.content.two.a")}{" "}
          <span className={styles.currency}>{currency}</span> {translate("account_settings.balance_screen.generate_address.note.content.two.b")}
        </p>
      </div>
    </>
  );
};

export default GenerateAddress;
