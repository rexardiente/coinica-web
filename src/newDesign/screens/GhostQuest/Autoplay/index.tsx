import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import {
  ModalBtnCancel,
  AUTOPLAY_BG,
  AutoPlaySound,
} from "../Assets";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirmation from "./Confirmation";
import styles from "./Autoplay.module.scss";

type AutoplayProps = {
  autoplayState: boolean;
  setAutoplayState: Function;
  ghost_quest: any;
}

const Autoplay = ({ autoplayState, setAutoplayState, ghost_quest }:AutoplayProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [PlayAutoSound] = useSound(AutoPlaySound, { volume: 0.5 * GQ_VOLUME })
  const [step, setStep] = useState(1)
  const [battleLimit, setBattleLimit] = useState(0)
  const [summonSetting, setSummonSetting] = useState(0)
  const [stopParameters, setStopParameters] = useState({
    max_number_of_ghosts: { isSelected: false, value: 0 },
    reach_max_balance: { isSelected: false, value: 0 },
    reach_min_balance: { isSelected: false, value: 0 },
  })

  useEffect(() => {
    if (autoplayState) {
      PlayAutoSound()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayState])

  if (!autoplayState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={AUTOPLAY_BG} alt="" />
        <img src={ModalBtnCancel} alt="Cancel" className={`hover-cursor ${styles.closeBtn} `} onClick={() => setAutoplayState(false)} />
        {
          step === 1 && (
            <Step1
              setStep={setStep}
              battleLimit={battleLimit}
              setBattleLimit={setBattleLimit}
            />
          )
        }
        {
          step === 2 && (
            <Step2
              setStep={setStep}
              summonSetting={summonSetting}
              setSummonSetting={setSummonSetting}
            />
          )
        }
        {
          step === 3 && (
            <Step3
              setStep={setStep}
              stopParameters={stopParameters}
              setStopParameters={setStopParameters}
            />
          )
        }
        {
          step === 4 && (
            <Confirmation
              setStep={setStep}
              battleLimit={battleLimit}
              summonSetting={summonSetting}
              stopParameters={stopParameters}
            />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(Autoplay);