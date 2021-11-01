import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import styles from "./Summon.module.scss";
import useSound from "use-sound";
import {
  BTN_10_ACTIVE,
  BTN_10_INACTIVE,
  BTN_50_ACTIVE,
  BTN_50_INACTIVE,
  BTN_100_ACTIVE,
  BTN_100_INACTIVE,
  selectSound,
  confirmSound,
} from "../Assets";

type SettingsProps = {
  gotoConfirm: Function;
  battleLimit: number;
  setBattleLimit: Function;
  ghost_quest: any;
  cancel: Function;
}

const Settings = ({
  gotoConfirm,
  battleLimit,
  setBattleLimit,
  ghost_quest,
  cancel
}:SettingsProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playSelect] = useSound(selectSound, { volume: 0.5 * GQ_VOLUME })
  const [playConfirm] = useSound(confirmSound, { volume: 0.5 * GQ_VOLUME })

  const _setBattleLimit = (val) => {
    playSelect()
    setBattleLimit(val)
  }

  return (
    <div className={styles.settingContent}>
      <div className={styles.summonLimit}>
        <div className={styles.settingsNote}>
          <p>
            If players retreat the battle earlier than the battle limit set, 
            30% of house edge will be imposed and player will receive 70% of remaining earrings.
          </p>
          <small>
            The battle limit appplies to all ghosts used in autoplay
          </small>
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
      <div className={styles.divider} />
      <div className={styles.summonConfirm}>
        <Button
          className={styles.buttonStyle}
          variant="contained"
          onClick={() => {
            if (cancel && typeof(cancel) === "function") {
              cancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          className={styles.buttonStyle}
          variant="contained"
          onClick={() => {
            playConfirm();
            gotoConfirm(2);
            console.log('goto confirm')
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(Settings);
