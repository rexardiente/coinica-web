import React, { useEffect } from "react";
import styles from "./Wallet.module.scss";
import { BtnSolid } from "../Btn";
import WithdrawalConfirmation from "./WithdrawalConfirmation";
import DepositConfirmation from "./DepositConfirmation";
import { translate } from "helpers/translate";

type Props = {
  isGameInitialized: boolean;
  isLoading: boolean;
  betStatus: number;
  stake: number;
  balance: number;
  onTransfer: () => void;
  onHilo: () => void;
  onWithdraw: () => void;
  onDeposit: (amount: number) => void;
  showWithdrawConfirmation: boolean;
  toggleWithdrawConfirmation: () => void;
  showDepositConfirmation: boolean;
  toggleDepositConfirmation: () => void;
  currency: string;
  hiLoResult: number;
};

const Wallet = (props: Props) => {
  const {
    isGameInitialized,
    isLoading,
    betStatus,
    stake,
    balance,
    onTransfer,
    onHilo,
    onWithdraw,
    onDeposit,
    showWithdrawConfirmation,
    toggleWithdrawConfirmation,
    showDepositConfirmation,
    toggleDepositConfirmation,
    currency,
    hiLoResult,
  } = props;

  const fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(4) : 0;
  };

  const disableZeroBal = (val: number) => {
    return Math.ceil(val) === 0;
  };

  const stakeDisplay = hiLoResult === 3 && betStatus === 1 ? 0 : stake;
  const hilo_balance = balance >= 1 ? balance : 0;
  const stakeEmpty = stake < 1 ? true : false;

  useEffect(() => {
  }, [stake]);


  return (
    <div className={styles.container}>
      <WithdrawalConfirmation
        isLoading={isLoading}
        show={showWithdrawConfirmation}
        onHide={toggleWithdrawConfirmation}
        onWithdrawToken={onWithdraw}
        amount={balance}
      />
      <DepositConfirmation
        currency={currency}
        isLoading={isLoading}
        show={showDepositConfirmation}
        onHide={toggleDepositConfirmation}
        onDepositToken={onDeposit}
      />
      <div className={styles.wrapper}>
        <div className={styles.winsBalWrapper} title={String(stake)}>
          <span>{translate("mj.gameplay.wallet.stake")}</span>
          <span>{fixedVal(stakeDisplay)}</span>
        </div>
        <BtnSolid
          isDisabled={disableZeroBal(stakeDisplay) || !Boolean(betStatus)}
          containerClass={styles.btnTransfer}
          onClick={onTransfer}
          label={translate("mj.gameplay.wallet.transfer") as unknown as string}
          labelClass={styles.btnLabel}
        />
        <BtnSolid
          isDisabled={
            !Boolean(betStatus) ||
            (disableZeroBal(stakeDisplay) && disableZeroBal(hilo_balance))
          }
          onClick={onHilo}
          label={translate("mj.gameplay.wallet.play_hilo") as unknown as string}
          labelClass={styles.btnLabel}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.winsBalWrapper} title={String(balance)}>
          <span>{translate("mj.gameplay.wallet.balance")}</span>
          <span>{fixedVal(balance) || 0}</span>
        </div>
        <BtnSolid
          isDisabled={disableZeroBal(hilo_balance) || !stakeEmpty}
          containerClass={styles.btnWithdraw}
          onClick={toggleWithdrawConfirmation}
          label={translate("mj.gameplay.wallet.withdraw") as unknown as string}
          labelClass={styles.btnLabel}
        />
        <BtnSolid
          isDisabled={!isGameInitialized}
          onClick={toggleDepositConfirmation}
          label={translate("mj.gameplay.wallet.deposit") as unknown as string}
          labelClass={styles.btnLabel}
        />
      </div>
    </div>
  );
};

export default Wallet;
