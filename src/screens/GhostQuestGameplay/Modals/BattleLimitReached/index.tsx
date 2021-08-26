import React from "react";
import {
  ModalBtnCancel,
} from "../../../GhostQuest/Assets";
import {
  ModalBG,
  FacebookBtn,
  TwitterBtn,
} from "../../Assets";
import styles from "../ModalStyles.module.scss";

type BattleLimitReachedProps = {
  modalBattleLimit: boolean;
  showModalBattleLimit: Function;
}

const BattleLimitReached = ({ modalBattleLimit, showModalBattleLimit }:BattleLimitReachedProps) => {
  if (!modalBattleLimit) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={ModalBtnCancel} alt="Cancel" className={`hover-cursor ${styles.closeBtn} `} onClick={() => showModalBattleLimit(false)} />
        <img src={ModalBG} alt="" />
        <div className={styles.contentsBattleLimit}>
          <div className={styles.textsContainerBattleLimit}>
            <h4 className="mb-4">You reached battle limit</h4>
            <div className={styles.BattleLimitWinnings}>
              <span>Your winnings</span>
              <div className="d-flex justify-content-between">
                <span>
                  Owned life:
                </span>
                <span>
                  101 EOS
                </span>
              </div>
            </div>
            <div className={styles.BattleLimitWinnings}>
              <span>Charge</span>
              <div className="d-flex justify-content-between">
                <span>
                  Battle:
                </span>
                <span>
                  -3.3 EOS
                </span>
              </div>
            </div>
            <div className={styles.BattleLimitWinnings}>
              <span>Total Amount</span>
              <div className="d-flex justify-content-between">
                <span>
                  {/* Battle: */}
                </span>
                <span>
                  95.5 EOS
                </span>
              </div>
            </div>
            <div className="text-left">
              <h4>TxID:
                {' '}
                <span className="hover-cursor" style={{ color: 'blue', textDecoration: 'underline' }}>sampleTxId123</span>
              </h4>
            </div>
            <div className="text-left">
              <span>
                It will take a few minutes for the 
                results of the transfer to be reflected.
              </span>
            </div>
          </div>

          <div>
            <img src={FacebookBtn} alt="Facebook" className="hover-cursor mr-4" />
            <img src={TwitterBtn} alt="Twitter" className="hover-cursor" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleLimitReached;
