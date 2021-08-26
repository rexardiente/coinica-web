import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import Summon from "../GhostQuest/Summon";
import Spinner from 'react-bootstrap/Spinner'
import { ServerAPI } from "Config";
import Header from "../GhostQuest/Header";
import { GetTopWinStreakRank, GetTopEarningsRank } from "../../services/api/server/ghostquest_api";
import { updateRankingList } from "redux/ghost_quest/ghost_quest_actions";
import useResize from "../../helpers/hooks/useResize";
import GhostRow from "./GhostRow";
import {
  BtnEarnings,
  BtnWinStreak,
  BtnTips,
  BtnLifetimeInactive,
  BtnLifetimeActive,
  BtnWeeklyInactive,
  BtnWeeklyActive,
  BtnDailyInactive,
  BtnDailyActive,
  GQ_RankingBGM,
  ClickSound
} from "./Assets";
import styles from "./GhostQuestRanking.module.scss";

// assets
const ModalBackground = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/modal_bg.png`;

const GQfixedWidth = 1075
const GQfixedHeight = 750

const BUTTONS_DICT = {
  0: 'earnings-daily',
  1: 'earnings-weekly',
  2: 'earnings-lifetime',
  3: 'win-daily',
  4: 'win-weekly',
  5: 'win-lifetime',
}

const GhostQuestRanking = (props) => {
  const { ghost_quest } = props
  const GQ_VOLUME = ghost_quest?.volume
  const ref = useRef<HTMLDivElement | null>(null)
  const { account } = props.platform
  const username = account?.username

  // sounds
  const [playClick] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })
  const [, { sound }] = useSound(GQ_RankingBGM, { volume: 0.1 * GQ_VOLUME })

  const [isSummoning, setSummoning] = useState(false)
  const [scale, setScale] = useState(1)
  const [summonState, showSummon] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedSort, setSelectedSort] = useState(BUTTONS_DICT[0])

  const rankingData = Array.isArray(ghost_quest[selectedSort]) ? ghost_quest[selectedSort] : []

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.9)
  });

  // SOUNDS
  useEffect(() => {
    if (isSummoning) {
      sound.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSummoning])

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

  const _setSelectedSort = (val) => {
    playClick()
    const sortOption = BUTTONS_DICT[val]
    setSelectedSort(sortOption)
  }

  useEffect(() => {
    if (selectedSort) {
      const isEarningsCategory = selectedSort.substr(0, 8) === 'earnings'
      const isWinCategory = selectedSort.substr(0, 3) === 'win'
      setLoading(true)
      if (isEarningsCategory) {
        const param = selectedSort.substr(9, selectedSort.length)
        GetTopEarningsRank(param).then(res => {
          const { data } = res
          if (data.length) {
            props.dispatch(updateRankingList({ category: selectedSort, data }))
          }
        }).finally(() => {
          setLoading(false)
        })
      } else if (isWinCategory) {
        const param = selectedSort.substr(4, selectedSort.length)
        GetTopWinStreakRank(param).then(res => {
          const { data } = res
          if (data.length) {
            props.dispatch(updateRankingList({ category: selectedSort, data }))
          }
        }).finally(() => {
          setLoading(false)
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort])

  return (
    <div className={styles.parent_container} ref={ref}>
      {/* <CustomLoader visible={loading.state} text={loading.text} /> */}
      <div
        className={styles.scalable_container}
        style={{
          zoom: scale,
          minWidth: `${GQfixedWidth}px`,
          maxWidth: `${GQfixedWidth}px`,
          height: `${GQfixedHeight}px`
        }}
      >
        <Summon
          navigation={props}
          summonState={summonState}
          showSummon={showSummon}
          setSummoning={setSummoning}
        />
        <div className={styles.header}>
          <Header {...props} username={username} showSummon={showSummon} />
        </div>
        <div className={styles.contents}>
          <div className={styles.sideNav}>
            <div className={styles.btnContainer}>
              <div className="d-flex align-items-center w-100">
                <img src={BtnEarnings} alt="Earnings" className={`${styles.btnSvg} hover-cursor`} />
                <img
                  src={BtnTips}
                  alt="?"
                  className={`${styles.btnSvg} hover-cursor`}
                  onClick={() => alert('This will show the list of top ghosts base from Earnings')}
                />
              </div>
              <div className="d-flex flex-wrap w-100">
                {
                  selectedSort === BUTTONS_DICT[0] ? (
                    <img src={BtnDailyActive} alt="Daily" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnDailyInactive} alt="Daily" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(0)} />
                  )
                }
                {
                  selectedSort === BUTTONS_DICT[1] ? (
                    <img src={BtnWeeklyActive} alt="Weekly" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnWeeklyInactive} alt="Weekly" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(1)} />
                  )
                }
                {
                  selectedSort === BUTTONS_DICT[2] ? (
                    <img src={BtnLifetimeActive} alt="Lifetime" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnLifetimeInactive} alt="Lifetime" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(2)} />
                  )
                }
              </div>
              <div className="d-flex align-items-center w-100">
                <img src={BtnWinStreak} alt="WinStreak" className={`${styles.btnSvg} hover-cursor`} />
                <img
                  src={BtnTips}
                  alt="?"
                  className={`${styles.btnSvg} hover-cursor`}
                  onClick={() => alert('This will show the list of top ghosts base from their win streak')}
                />
              </div>
              <div className="d-flex flex-wrap w-100">
                {
                  selectedSort === BUTTONS_DICT[3] ? (
                    <img src={BtnDailyActive} alt="Daily" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnDailyInactive} alt="Daily" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(3)} />
                  )
                }
                {
                  selectedSort === BUTTONS_DICT[4] ? (
                    <img src={BtnWeeklyActive} alt="Weekly" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnWeeklyInactive} alt="Weekly" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(4)} />
                  )
                }
                {
                  selectedSort === BUTTONS_DICT[5] ? (
                    <img src={BtnLifetimeActive} alt="Lifetime" className={`${styles.btnSvg} hover-cursor`} />
                  ) : (
                    <img src={BtnLifetimeInactive} alt="Lifetime" className={`${styles.btnSvg} hover-cursor`} onClick={() => _setSelectedSort(5)} />
                  )
                }
              </div>
            </div>
          </div>
          <div className={styles.container_modal}>
            <img src={ModalBackground} alt="" />
            <div className={styles.contentScrollable}>
              <div className={styles.rulesContent}>
                {
                  loading ? <Spinner animation="grow" style={{ marginTop: '40%', position: 'absolute' }} />  : null
                }
                {
                  rankingData && rankingData.length > 0
                  ? rankingData.map((data, idx) => (
                      <GhostRow
                        selectedSort={selectedSort}
                        key={idx} 
                        place={idx}
                        data={data}
                      />
                    ))
                  : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                        <h3>No data found</h3>
                      </div>
                    )
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
export default connect(mapStateToProps, mapDispatchToProps)(GhostQuestRanking);
