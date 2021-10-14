import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import Header from "./Header";
import Tutorial from "./Tutorial";
import Rules from "./Rules";
import Settings from "./Settings";
import Summon from "./Summon";
import Autoplay from "./Autoplay";
import NoticeMessage from "./NoticeMessage";
import useResize from "helpers/hooks/useResize";
import { updateGhostQuestData } from "services/api/server/ghostquest_api";
import { BTN_AUTOPLAY, GQ_MAIN_SOUND } from "./Assets";
import styles from "./GhostQuest.module.scss";

// ASSETS
import {
  GQ_Title,
  PlayBtn,
  TutorialBtn,
  RulesBtn,
  BtnSettings,
  BtnSpecialGhost,
  backgroundImage,
  noticeImage
} from "./Assets"

const GQfixedWidth = 1075;
const GQfixedHeight = 750;

const GhostQuest = (props) => {
  const GQ_VOLUME = props?.ghost_quest?.volume
  const { account } = props.platform;
  const account_id = account?.id
  const user_game_id = account?.user_game_id || null
  // const username = account?.username || null
  const ref = useRef<HTMLDivElement | null>(null)

  const [, { sound }] = useSound(GQ_MAIN_SOUND, { volume: (0.1 * GQ_VOLUME) })
  const [tutorialState, showTutorial] = useState(false)
  const [ruleslState, showRules] = useState(false)
  const [settingState, showSettings] = useState(false)
  const [summonState, showSummon] = useState(false)
  const [autoplayState, setAutoplayState] = useState(false)
  const [isSummoning, setSummoning] = useState(false)
  const [noticeState, showNotice] = useState(false)
  const [scale, setScale] = useState(1)

  const updateUserCharDB = () => {
    if (!window.gqWS || window.gqWS?.readyState !== 1) return
    const data = JSON.stringify({
      id: account_id,
      input: { character_created: true }
    })
    window.gqWS.send(data)
  }

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.9)
  });

  useEffect(() => {
    if (isSummoning && sound) {
      sound.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSummoning, sound])

  useEffect(() => {
    if (sound) {
      sound.play();

      sound.on('end', () => {
        sound.play();
      })
    }

    return () => {
      if (sound) {
        sound.stop()
      }
    }
  }, [sound])

  useEffect(() => {
    if (account) {
      updateGhostQuestData({ id: user_game_id })
      updateUserCharDB()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <div className={styles.parent_container} ref={ref}>
      <div
        className={styles.scalable_container}
        style={{
          zoom: scale,
          minWidth: `${GQfixedWidth}px`,
          maxWidth: `${GQfixedWidth}px`,
          height: `${GQfixedHeight}px`,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: `${GQfixedWidth}px ${GQfixedHeight}px`,
          backgroundPositionY: "0px",
        }}
      >
        <NoticeMessage
          noticeState={noticeState}
          showNotice={(bool) => showNotice(bool)}
        />
        <Tutorial
          tutorialState={tutorialState}
          showTutorial={showTutorial}
        />
        <Rules
          ruleslState={ruleslState}
          showRules={showRules}
        />
        <Settings
          settingState={settingState}
          showSettings={showSettings}
        />
        <Summon
          navigation={props}
          summonState={summonState}
          showSummon={showSummon}
          setSummoning={setSummoning}
        />
        <Autoplay
          autoplayState={autoplayState}
          setAutoplayState={setAutoplayState}
        />
        {/* <div className={styles.header}>
          <img className={`${styles.noticeBtn} hover-cursor`} src={noticeImage} alt="Notice" onClick={() => showNotice(true)} />
          <Header {...props} showSummon={showSummon} />
          <img
            src={BtnSpecialGhost}
            alt="Special Ghost"
            className={`hover-cursor-scale ${styles.speacial_ghost_btn} `}
            onClick={() => alert(`Today's special ghost`)}
          />
        </div> */}
        <div className={styles.contents}>
          <img src={GQ_Title} alt="GhostQuest" className={styles.ghostquest_title} />
          <div className={styles.playbtns}>
            <img src={PlayBtn}
              alt="Play"
              className="hover-cursor-scale mr-2"
              onClick={() => {
                // showSummon(true)
                props.history.push("/game/ghostquest/ghostlist")
              }}
            />
            {/* <img src={BTN_AUTOPLAY} alt="Play" className="hover-cursor-scale mr-2" onClick={() => setAutoplayState(true)} /> */}
            {/* <BtnAutoplay className="hover-cursor-scale ml-2" onClick={() => setAutoplayState(true)} /> */}
          </div>
          <div className={styles.secondarybuttons}>
            <img src={TutorialBtn} alt="Tutorial" className="hover-cursor-scale" onClick={() => showTutorial(true)} />
            <img src={RulesBtn} alt="Rules" className="hover-cursor-scale mx-4" onClick={() => showRules(true)} />
            <img src={BtnSettings} alt="Settings" className="hover-cursor-scale" onClick={() => showSettings(true)} />
          </div>
        </div>
        <div className={styles.main_container_btm_overlay} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ scatter, ghost_quest, platform }) => ({ scatter, ghost_quest, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GhostQuest);
