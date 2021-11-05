import React from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import { BtnOkay, CancelSound } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type DepositSuccessfulProps = {
  depositSuccessfulState: boolean;
  showDepositSuccessful: Function;
  txId: any;
  setTxId: Function;
  ghost_quest: any;
}

const DepositSuccessful = ({ depositSuccessfulState, showDepositSuccessful, txId, setTxId, ghost_quest }:DepositSuccessfulProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })

  if (!depositSuccessfulState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Background} alt="" />
        <div className={styles.contentsError}>
          <div className={styles.textsContainerError}>
            <h4 className="mb-4">Your deposit request  was sucessful.</h4>
            <h4>Amount of deposit</h4>
            <h4 className="text-right">1 Token</h4>

            <h4>TxID:
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
              playCancel()
              showDepositSuccessful(false)
              setTxId(null)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(DepositSuccessful);
