import React from "react";
import { connect } from "react-redux";
import styles from "./Summon.module.scss";
import useSound from "use-sound";
import { translate } from "helpers/translate";
import {
  BTN_1_ACTIVE,
  BTN_1_INACTIVE,
  BTN_10_ACTIVE,
  BTN_10_INACTIVE,
  BTN_50_ACTIVE,
  BTN_50_INACTIVE,
  BTN_100_ACTIVE,
  BTN_100_INACTIVE,
  BTN_CONFIRM,
  selectSound,
  inputSound,
  confirmSound,
} from "../Assets";

type SettingsProps = {
  gotoConfirm: Function;
  summonTime: number;
  setSummonTime: Function;
  battleLimit: number;
  setBattleLimit: Function;
  ghost_quest: any;
}

const Settings = ({
  gotoConfirm,
  summonTime,
  setSummonTime,
  battleLimit,
  setBattleLimit,
  ghost_quest
}:SettingsProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playSelect] = useSound(selectSound, { volume: 0.5 * GQ_VOLUME })
  const [playInput] = useSound(inputSound, { volume: 0.5 * GQ_VOLUME })
  const [playConfirm] = useSound(confirmSound, { volume: 0.5 * GQ_VOLUME })

  const inputHandler = (e) => {
    playInput()
    const inputVal = +e.target.value

    if (inputVal <= 0) {
      setSummonTime(0)
      return
    }

    if (inputVal > 50) {
      setSummonTime(50)
      return
    }

    setSummonTime(inputVal)
  }

  const _setSummonTime = (val) => {
    playSelect()
    setSummonTime(val)
  }

  const _setBattleLimit = (val) => {
    playSelect()
    setBattleLimit(val)
  }

  return (
    <div className={styles.settingContent}>
      <div className={`my-4 ${styles.summonTime}`}>
        <div className="w-100">
          {translate("gq.summon.times")}
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnStyle}>
            {
              summonTime === 1 ? (
                <img src={BTN_1_ACTIVE} alt="1-summon" className="hover-cursor" />
              ) : (
                <img src={BTN_1_INACTIVE} alt="1-summon" className="hover-cursor" onClick={() => _setSummonTime(1)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              summonTime === 10 ? (
                <img src={BTN_10_ACTIVE} alt="10-summon" className="hover-cursor" />
              ) : (
                <img src={BTN_10_INACTIVE} alt="10-summon" className="hover-cursor" onClick={() => _setSummonTime(10)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              summonTime === 50 ? (
                <img src={BTN_50_ACTIVE} alt="50-summon" className="hover-cursor" />
              ) : (
                <img src={BTN_50_INACTIVE} alt="50-summon" className="hover-cursor" onClick={() => _setSummonTime(50)} />
              )
            }
          </div>
        </div>
        <div className="w-100 mt-2 text-right">
          {translate("gq.summon.custom")}
          <input
            className={styles.inputStyle}
            type="number"
            min="1"
            max="50"
            value={summonTime === 0 ? '' : summonTime}
            onChange={(e) => inputHandler(e)}
          />
        </div>
      </div>
      <div className={`my-4 ${styles.summonLimit}`}>
        <div className="w-100">
          {translate("gq.summon.battle_limit")}
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnStyle}>
            {
              battleLimit === 10 ? (
                <img src={BTN_10_ACTIVE} alt="10-battle-limit" className="hover-cursor" />
              ) : (
                <img src={BTN_10_INACTIVE} alt="10-battle-limit" className="hover-cursor" onClick={() => _setBattleLimit(10)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              battleLimit === 50 ? (
                <img src={BTN_50_ACTIVE} alt="50-battle-limit" className="hover-cursor" />
              ) : (
                <img src={BTN_50_INACTIVE} alt="50-battle-limit" className="hover-cursor" onClick={() => _setBattleLimit(50)} />
              )
            }
          </div>
          <div className={styles.btnStyle}>
            {
              battleLimit === 100 ? (
                <img src={BTN_100_ACTIVE} alt="100-battle-limit" className="hover-cursor" />
              ) : (
                <img src={BTN_100_INACTIVE} alt="100-battle-limit" className="hover-cursor" onClick={() => _setBattleLimit(100)} />
              )
            }
          </div>
        </div>
      </div>
      <div className={`my-4 ${styles.summonConfirm}`}>
        <img
          src={BTN_CONFIRM}
          alt="Confirm"
          className="hover-cursor"
          onClick={() => {
            playConfirm()
            gotoConfirm(2)
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(Settings);
