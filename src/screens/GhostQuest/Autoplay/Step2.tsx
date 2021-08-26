import React from "react";
import { toast } from "react-toastify";
import styles from "./Autoplay.module.scss";
import {
  BTN_1_ACTIVE,
  BTN_1_INACTIVE,
  BTN_10_ACTIVE,
  BTN_10_INACTIVE,
  BTN_50_ACTIVE,
  BTN_50_INACTIVE,
  BTN_NEXT,
  BTN_BACK,
} from "../Assets";

type Step2Props = {
  setStep: Function
  summonSetting: number
  setSummonSetting: Function
}

const Step2 = ({ setStep, summonSetting, setSummonSetting }:Step2Props) => {

  const inputHandler = (e) => {
    const inputVal = +e.target.value

    if (inputVal <= 0) {
      setSummonSetting(0)
      return
    }

    if (inputVal > 50) {
      setSummonSetting(50)
      return
    }

    setSummonSetting(inputVal)
  }

  const proceedToStep3 = () => {
    if (summonSetting <= 0 || summonSetting > 50) {
      toast.warn('Please set your summon setting')
      return
    }

    setStep(3)
  }

  return (
    <div className={styles.settingContent}>
      <div className={styles.summonTime}>
        <div className="w-100">
          <h4>
            Step 2: Auto Summon Setting
          </h4>
        </div>
        <div className="w-100 mt-4 mb-2" style={{ fontSize: '1.3rem' }}>
          The total number of in-battle ghosts 
          are less than or equal to the to the 
          amount selected below, additional 
          ghosts will be summoned 
          automatically.
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnStyle}>
            {
              summonSetting === 1 ? (
                <img src={BTN_1_ACTIVE} alt="1" className="hover-cursor" />
              ) : (
                <img src={BTN_1_INACTIVE} alt="1" className="hover-cursor" onClick={() => setSummonSetting(1)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              summonSetting === 10 ? (
                <img src={BTN_10_ACTIVE} alt="10" className="hover-cursor" />
              ) : (
                <img src={BTN_10_INACTIVE} alt="10" className="hover-cursor" onClick={() => setSummonSetting(10)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              summonSetting === 50 ? (
                <img src={BTN_50_ACTIVE} alt="50" className="hover-cursor" />
              ) : (
                <img src={BTN_50_INACTIVE} alt="50" className="hover-cursor" onClick={() => setSummonSetting(50)} />
              )
            }
          </div>
        </div>
        <div className="w-100 mt-2 text-right">
          or
          <input
            className={styles.inputStyle}
            type="number"
            min="1"
            max="50"
            value={summonSetting === 0 ? '' : summonSetting}
            onChange={(e) => inputHandler(e)}
          />
        </div>
      </div>
      <div className={styles.btnBack}>
        <img src={BTN_BACK} alt="Back" className="hover-cursor" onClick={() => setStep(1)} />
      </div>
      <div className={styles.btnNext}>
        <img src={BTN_NEXT} alt="Next" className="hover-cursor" onClick={() => proceedToStep3()} />
      </div>
    </div>
  )
}

export default Step2;
