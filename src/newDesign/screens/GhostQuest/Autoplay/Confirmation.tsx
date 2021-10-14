import React from "react";
// import { toast } from "react-toastify";
import { BTN_BACK, BTN_START_AUTOPLAY } from "../Assets";
import styles from "./Autoplay.module.scss";

type ConfirmationProps = {
  setStep: Function;
  battleLimit: number;
  summonSetting: number;
  stopParameters: any;
}

const Confirmation = ({ setStep, battleLimit, summonSetting, stopParameters }:ConfirmationProps) => {
  const { max_number_of_ghosts, reach_max_balance, reach_min_balance } = stopParameters

  const proceedAutoplay = () => {
    // conditions
    alert('Start autoplay!')
  }

  return (
    <div className={styles.settingContent}>
      <div className={styles.confirmation}>
        <div className="w-100">
          <h4>
            Confirmation
          </h4>
        </div>
        <div className="w-100 mt-4 mb-4" style={{ fontSize: '1.2rem' }}>
          <div className="d-flex justify-content-between">
            <span>Battle limit:</span>
            <span>{ battleLimit || 'No data' }</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Auto summon setting:</span>
            <span>{summonSetting || 'No data' }</span>
          </div>
          <div className="text-left">
            Stop points
          </div>
          {
            max_number_of_ghosts.isSelected && max_number_of_ghosts.value !== 0 && (
              <div className="d-flex justify-content-between pl-3">
                <span>Max number of ghosts:</span>
                <span>{`${max_number_of_ghosts.value}`}</span>
              </div>
            )
          }
          {
            reach_max_balance.isSelected && reach_max_balance.value !== 0 && (
              <div className="d-flex justify-content-between pl-3">
                <span>Reach max balance:</span>
                <span>{`${reach_max_balance.value}`}</span>
              </div>
            )
          }
          {
            reach_min_balance.isSelected && reach_min_balance.value !== 0 && (
              <div className="d-flex justify-content-between pl-3">
                <span>Reach min balance:</span>
                <span>{`${reach_min_balance.value}`}</span>
              </div>
            )
          }
        </div>
        <div className="w-100 mt-4 mb-5 text-left" style={{ fontSize: '1rem' }}>
          Important notice: <br />
          There is a degree of risk involved 
          when enabling autoplay. 
          User-defined parameters are subject 
          to malfunction. It is advised that 
          users proceed with caution.
        </div>
      </div>
      <div className={styles.btnBack}>
        <img src={BTN_BACK} alt="Back" className="hover-cursor" onClick={() => setStep(3)} />
      </div>
      <div className={styles.btnConfirm}>
        <img src={BTN_START_AUTOPLAY} alt="Confirm" className="hover-cursor" onClick={() => proceedAutoplay()} />
      </div>
    </div>
  )
}

export default Confirmation;
