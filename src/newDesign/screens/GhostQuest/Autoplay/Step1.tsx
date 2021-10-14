import React from "react";
import { toast } from "react-toastify";
import styles from "./Autoplay.module.scss";
import {
  BTN_10_ACTIVE,
  BTN_10_INACTIVE,
  BTN_50_ACTIVE,
  BTN_50_INACTIVE,
  BTN_100_ACTIVE,
  BTN_100_INACTIVE,
  BTN_NEXT,
} from "../Assets";

type Step1Props = {
  setStep: Function
  battleLimit: number
  setBattleLimit: Function
}

const Step1 = ({ setStep, battleLimit, setBattleLimit }:Step1Props) => {

  const proceedStep2 = () => {
    if (battleLimit === 0) {
      toast.warn('Please set your battle limit')
      return
    }
    setStep(2)
  }

  return (
    <div className={styles.settingContent}>
      <div className={styles.battleLimit}>
        <div className="w-100">
          <h4>
            Step 1: Battle Limit
          </h4>
        </div>
        <div className="w-100 mt-4 mb-5" style={{ fontSize: '1.3rem' }}>
          The battle limit below appplies to all ghosts used in autoplay
        </div>
        <div className={`pt-4 ${styles.btnContainer}`}>
          <div>
            {
              battleLimit === 10 ? (
                <img src={BTN_10_ACTIVE} alt="10" className="hover-cursor" />
              ) : (
                <img src={BTN_10_INACTIVE} alt="10" className="hover-cursor" onClick={() => setBattleLimit(10)} />
              )
            }
          </div>
          <div>
            {
              battleLimit === 50 ? (
                <img src={BTN_50_ACTIVE} alt="50" className="hover-cursor" />
              ) : (
                <img src={BTN_50_INACTIVE} alt="50" className="hover-cursor" onClick={() => setBattleLimit(50)} />
              )
            }
          </div>
          <div>
            {
              battleLimit === 100 ? (
                <img src={BTN_100_ACTIVE} alt="100" className="hover-cursor" />
              ) : (
                <img src={BTN_100_INACTIVE} alt="100" className="hover-cursor" onClick={() => setBattleLimit(100)} />
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.btnNext}>
        <img src={BTN_NEXT} alt="Next" className="hover-cursor" onClick={() => proceedStep2()} />
      </div>
    </div>
  )
}

export default Step1;
