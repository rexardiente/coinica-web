import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import Header from "../GhostQuest/Header";
import Summon from "./Summon";
import useResize from "helpers/hooks/useResize";
import {
  // temp
  SummonBackground,
  SummonGhostText,
  IceQueen,
  Orochi,
  Tenko,
  SummonDefaultBtn,
  SummonHoveredtBtn,
  GhostlistBGM,
  ClickSound,
} from "./Assets";
import { backgroundImage } from "../GhostQuest/Assets/index";
import styles from "./GhostSummon.module.scss";

const GQfixedWidth = 1075
const GQfixedHeight = 750

const GhostQuestSummon = (props) => {
  const GQ_VOLUME = props?.ghost_quest?.volume
  const username = props.platform?.account?.username || null
  const user_game_id = props.platform?.account?.user_game_id || null
  // const UUID = props.platform.account?.id
  const ref = useRef<HTMLDivElement | null>(null)
  const [summonState, showSummon] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [isSummoning, setSummoning] = useState(false)
  const [summonCount, setSummonCount] = useState(0);
  const [hoveredQuantity, setHoveredQuantity] = useState(0);

  const [, { sound }] = useSound(GhostlistBGM, { volume: 0.1 * GQ_VOLUME })

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

  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (user_game_id && username) {
      if (!initialized) {
        setInitialized(true)
      }
    } else {
      toast.error('Please login first')
      // props.history.push("/game/ghostquest")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_game_id])

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.9)
  });

  const _gotoSummon = () => {
    props.history.push("/game/ghostquest/summon");
  }

  const summonHandler = (quantity) => {
    setSummonCount(quantity);
    showSummon(true);
  }

  console.log('rendered')
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
        <Summon
          //@ts-ignore
          username={username}
          navigation={props}
          summonState={summonState}
          showSummon={showSummon}
          setSummoning={setSummoning}
          summonCount={summonCount}
        />
        <div className={styles.header}>
          <Header {...props} username={username} showSummon={_gotoSummon} />
        </div>
        <div className={styles.contents}>
          <div className={styles.summon_container}>
            <img src={SummonBackground} alt="" />
            <div className={styles.borderShadow} />

            <div className={styles.ghostBanner}>
              <img className={styles.IceQueen} src={IceQueen} alt="" />
              <img className={styles.Orochi} src={Orochi} alt="" />
              <img className={styles.Tenko} src={Tenko} alt="" />
            </div>

            <div className={styles.summon_ghosts}>
              <img className={styles.summon_ghosts_text} src={SummonGhostText} alt="" />
              <div className={styles.summon_details}>
                <p>After summoning, Ghosts will be sent to battle and fight against other Ghosts automatically.</p>
              </div>
              <div className={styles.summon_options}>
                <div
                  className={styles.summonBtn}
                  onClick={() => summonHandler(1)}
                  onMouseEnter={() => setHoveredQuantity(1)}
                  onMouseLeave={() => setHoveredQuantity(0)}
                >
                  <img src={hoveredQuantity === 1 ? SummonHoveredtBtn : SummonDefaultBtn} alt=""/>
                  <div className={styles.summonBtnText}>
                    <h4>1x</h4>
                    <h5>summon</h5>
                  </div>
                </div>
                <div
                  className={styles.summonBtn}
                  onClick={() => summonHandler(10)}
                  onMouseEnter={() => setHoveredQuantity(10)}
                  onMouseLeave={() => setHoveredQuantity(0)}
                >
                  <img src={hoveredQuantity === 10 ? SummonHoveredtBtn : SummonDefaultBtn} alt="" />
                  <div className={styles.summonBtnText}>
                    <h4>10x</h4>
                    <h5>summon</h5>
                  </div>
                </div>
                <div
                  className={styles.summonBtn}
                  onClick={() => summonHandler(50)}
                  onMouseEnter={() => setHoveredQuantity(50)}
                  onMouseLeave={() => setHoveredQuantity(0)}
                >
                  <img src={hoveredQuantity === 50 ? SummonHoveredtBtn : SummonDefaultBtn} alt="" />
                  <div className={styles.summonBtnText}>
                    <h4>50x</h4>
                    <h5>summon</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_container_btm_overlay} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GhostQuestSummon);
