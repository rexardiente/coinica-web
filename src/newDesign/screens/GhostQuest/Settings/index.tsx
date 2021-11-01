import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setGhostQuestVolume } from "redux/ghost_quest/ghost_quest_actions";
import useSound from "use-sound";
import {
  ModalBtnCancel,
  Settings_BG,
  Settings_ToggleOn,
  Settings_ToggleOff,
  funcSound,
  selectSound,
  cancelSound,
} from "../Assets";
import { translate } from "helpers/translate";
import styles from "./Settings.module.scss";

type SettingsProps = {
  settingState: boolean;
  showSettings: Function;
  ghost_quest: any;
  dispatch: Function;
}

const Settings = ({ settingState, showSettings, ghost_quest, dispatch }:SettingsProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [dispResult, setDispResult] = useState(false)

  const [playFuncSound] = useSound(funcSound, { volume: 0.5 * GQ_VOLUME })
  const [playSelect] = useSound(selectSound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(cancelSound, { volume: 0.5 * GQ_VOLUME })

  useEffect(() => {
    if (settingState) {
      playFuncSound()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingState])

  if (!settingState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Settings_BG} alt="Background" />
        <img src={ModalBtnCancel} alt="Cancel" className={`hover-cursor ${styles.closeBtn} `}
          onClick={() => {
            playCancel()
            showSettings(false)
          }}
        />
        <div className={styles.soundFx}>
          <div className="text-left mb-3">
            {translate("gq.settings.soundFx")}
          </div>
          <div className="text-right">
            {
              +(GQ_VOLUME) ? (
                <img src={Settings_ToggleOn} alt="On" className={`hover-cursor ${styles.switchOn} `}
                  onClick={() => {
                    playSelect()
                    dispatch(setGhostQuestVolume({ volume: 0 }))
                  }}
                />
              ) : (
                <img src={Settings_ToggleOff} alt="Off" className={`hover-cursor ${styles.switchOff} `}
                  onClick={() => {
                    playSelect()
                    dispatch(setGhostQuestVolume({ volume: 1 }))
                  }}
                />
              )
            }
          </div>
        </div>
        <div className={styles.dispResult}>
          <div className="text-left mb-3">
            {translate("gq.settings.display_result")}
          </div>
          <div className="text-right">
            {
              dispResult ? (
                <img src={Settings_ToggleOn} alt="On" className={`hover-cursor ${styles.switchOn} `}
                  onClick={() => {
                    playSelect()
                    setDispResult(false)
                  }}
                />
              ) : (
                <img src={Settings_ToggleOff} alt="Off" className={`hover-cursor ${styles.switchOff} `}
                  onClick={() => {
                    playSelect()
                    setDispResult(true)
                  }}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
