import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import useResize from "../../helpers/hooks/useResize";
import Summon from "../GhostQuest/Summon";
import GhostRow from "./GhostRow";
import Header from "../GhostQuest/Header";
import styles from "./GhostQuestSummonResult.module.scss";

// assets
const ModalBackground = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/modal_bg.png`;

const BGMSound = `${ServerAPI.assets_url}/audio/games/ghostquest/GQ_Summon.mp3`;

const GQfixedWidth = 1075
const GQfixedHeight = 750

const GhostQuestSummonResult = (props) => {
  const GQ_VOLUME = props?.ghost_quest?.volume
  const ref = useRef<HTMLDivElement | null>(null)
  const allCharSummoned: any[] = props?.location?.state?.allCharSummoned
  console.log({ allCharSummoned, locationState: props?.location?.state })

  const [summonState, showSummon] = useState(false)
  const [scale, setScale] = useState(1)
  const [, { sound }] = useSound(BGMSound, { volume: 0.1 * GQ_VOLUME })

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

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.9)
  });

  useEffect(() => {
    if (allCharSummoned == null) {
      props.history.push("/game/ghostquest")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCharSummoned])

  // useEffect(() => {
  //   if (userAccount && username) {
  //     if (window.gqWS) {
  //       const data = JSON.stringify({
  //         id: username,
  //         input: { character_created: true }
  //       })
  //       window.gqWS.send(data)
  //     }
  //   } else {
  //     props.history.push("/game/ghostquest")
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userAccount])

  return (
    <div className={styles.parent_container} ref={ref}>
      <div
        className={styles.scalable_container}
        style={{
          zoom: scale,
          minWidth: `${GQfixedWidth}px`,
          maxWidth: `${GQfixedWidth}px`,
          height: `${GQfixedHeight}px`
        }}
      >

        {/* @ts-ignore:next-line */}
        <Summon
          navigation={props}
          summonState={summonState}
          showSummon={showSummon}
        />
        <div className={styles.header}>
          <Header {...props} showSummon={showSummon} />
        </div>
        <div className={styles.contents}>
          <div className={styles.container_modal}>
            <img src={ModalBackground} alt="" />
            <div className={styles.contentScrollable}>
              <div className={styles.rulesContent}>
                {
                  Array.isArray(allCharSummoned) && allCharSummoned.length ? (
                    allCharSummoned.map((data, idx) => (
                      <GhostRow key={idx} data={data} />
                    ))
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_container_btm_overlay} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ platform, ghost_quest }) => ({ platform, ghost_quest });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GhostQuestSummonResult);
