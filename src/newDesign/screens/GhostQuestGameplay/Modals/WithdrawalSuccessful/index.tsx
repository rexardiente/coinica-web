import React from "react";
import { ServerAPI } from "Config";
import { BtnOkay } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type WithdrawalSuccessfulProps = {
  WithdrawalSuccessfulState: boolean;
  showWithdrawalSuccessful: Function;
  charData: any;
  txId: any;
  setTxId: Function;
}

const WithdrawalSuccessful = ({
  charData,
  WithdrawalSuccessfulState,
  showWithdrawalSuccessful,
  txId,
  setTxId,
}:WithdrawalSuccessfulProps) => {
  if (!WithdrawalSuccessfulState) return null

  let house_edge = 0
  let final_prize = 0;
  const init_prize = charData?.character_life || 0;

  if (charData?.battle_count < 21) {
    house_edge = init_prize * 0.06;
  } else if (charData?.battle_count > 20 && charData?.battle_count < 41) {
    house_edge = init_prize * 0.07;
  } else if (charData?.battle_count > 40 && charData?.battle_count < 61) {
    house_edge = init_prize * 0.08;
  } else if (charData?.battle_count > 60 && charData?.battle_count < 81) {
    house_edge = init_prize * 0.09;
  } else {
    house_edge = init_prize * 0.1;
  }

  final_prize = init_prize - house_edge;

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Background} alt="" />
        <div className={styles.contentsError}>
          <div className={styles.textsContainerError}>
            <h4 className="mb-3">Your withdrawal request  was sucessful.</h4>

            <div className="d-flex justify-content-between">
              <h5>Owned life:</h5>
              <h5>{`${init_prize.toFixed(4)} token`}</h5>
            </div>

            <div className="d-flex justify-content-between">
              <h5>Amount of fees:</h5>
              <h5>{`${house_edge.toFixed(4)} token`}</h5>
            </div>

            <div className="d-flex justify-content-between">
              <h5>Amount of withdrawal:</h5>
              <h5>{`${+final_prize.toFixed(4)} token`}</h5>
            </div>

            <h4 className="mt-2">TxID:
              {' '}
              <span className="hover-cursor" style={{ color: 'blue', textDecoration: 'underline' }}>
                {txId ? (txId + '').substr(txId?.length - 12) : ''}
              </span>
            </h4>
            <p>It will take a few minutes for the results of the transfer to be reflected.</p>
          </div>

          <img
            src={BtnOkay}
            alt=""
            className="hover-cursor"
            onClick={() => {
              showWithdrawalSuccessful(false)
              setTxId(null)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default WithdrawalSuccessful;
