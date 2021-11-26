import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import Spinner from 'react-bootstrap/Spinner'
import { ServerAPI } from "Config";
import Header from "../GhostQuest/Header";
import { GetTopWinStreakRank, GetTopEarningsRank } from "services/api/server/ghostquest_api";
import { updateRankingList } from "redux/ghost_quest/ghost_quest_actions";
import useResize from "helpers/hooks/useResize";
import GhostRow from "./GhostRow";
import {
  BtnEarnings,
  BtnWinStreak,
  BtnLifetimeInactive,
  BtnLifetimeActive,
  BtnWeeklyInactive,
  BtnWeeklyActive,
  BtnDailyInactive,
  BtnDailyActive,
  GQ_RankingBGM,
  ClickSound,
  BtnSort
} from "./Assets";
import { GhostListModalBg } from "../GhostQuest/Assets";
import styles from "./GhostQuestRanking.module.scss";

// assets
const ModalBackground = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/modal_bg.png`;

const GQfixedWidth = 1075
const GQfixedHeight = 750

const BUTTONS_DICT = {
  0: 'daily',
  1: 'weekly',
  2: 'lifetime',
}

const GhostQuestRanking = (props) => {
  const { ghost_quest } = props;
  const GQ_VOLUME = ghost_quest?.volume;
  const ref = useRef<HTMLDivElement | null>(null);
  const { account } = props.platform;
  const username = account?.username;

  // sounds
  const [playClick] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME });
  const [, { sound }] = useSound(GQ_RankingBGM, { volume: 0.1 * GQ_VOLUME });

  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortCategory, setSortCategory] = useState(0); // 0 => earnings; 1 => winstreak
  const [selectedSort, setSelectedSort] = useState(0);

  const rankingData = Array.isArray(ghost_quest[selectedSort]) ? ghost_quest[selectedSort] : [];

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.8)
  });

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

  const _gotoSummon = () => {
    props.history.push("/game/ghostquest/summon");
  }

  const _setSelectedSort = (val) => {
    playClick()
    setSelectedSort(val)
  }

  useEffect(() => {
    setLoading(true)
    if (sortCategory === 0) { // if EARNINGS
      const param = BUTTONS_DICT[selectedSort]
      GetTopEarningsRank(param).then(res => {
        const { data } = res
        if (data.length) {
          props.dispatch(updateRankingList({ category: selectedSort, data }))
        }
      }).finally(() => {
        setLoading(false)
      })
    } else if (sortCategory === 1) { // if WINSTREAK
      const param = BUTTONS_DICT[selectedSort]
      GetTopWinStreakRank(param).then(res => {
        const { data } = res
        if (data.length) {
          props.dispatch(updateRankingList({ category: selectedSort, data }))
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCategory, selectedSort])

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
        <div className={styles.header}>
          <Header {...props} username={username} showSummon={_gotoSummon} />
        </div>
        <div className={styles.contents}>
          {/* <div className={styles.sideNav}>
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
          </div> */}
          <div className={styles.leftSideNav}>
            <div className="my-2 hover-cursor">
              <img
                className={`${sortCategory === 0 ? styles.activeCategory : ""} hover-cursor`}
                src={BtnEarnings} alt="Earnings"
                onClick={() => setSortCategory(0)}
              />
            </div>
            <div className="my-2 hover-cursor">
              <img
                className={`${sortCategory === 1 ? styles.activeCategory : ""} hover-cursor`}
                src={BtnWinStreak} alt="WinStreak"
                onClick={() => setSortCategory(1)}
              />
            </div>
          </div>
          <div className={styles.container_modal}>
            <img src={GhostListModalBg} alt="" />
            <div className={styles.container_title}>Ranking</div>
            <div className={styles.contentScrollable}>
              <div className={styles.rulesContent}>
                {
                  loading
                  ? (
                      <Spinner animation="grow" style={{ marginTop: '40%', position: 'absolute' }} />
                    )
                  : (
                    rankingData && rankingData.length > 0
                    ? rankingData.map((data, idx) => (
                        <GhostRow
                          sortCategory={sortCategory}
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
                    )
                }
              </div>
            </div>
          </div>
          <div className={styles.rightSideNav}>
            <div className={styles.rightSideNavContent}>
              <div className={styles.sortBtn}>
                <img src={BtnSort} alt="Sort" />
              </div>
              <div className={styles.filterBtns}>
                <img
                  src={selectedSort === 0 ? BtnDailyActive : BtnDailyInactive} alt="Daily"
                  className={`${styles.btnSvg} hover-cursor`}
                  onClick={() => _setSelectedSort(0)}
                />
                <img
                  src={selectedSort === 1 ? BtnWeeklyActive : BtnWeeklyInactive} alt="Daily"
                  className={`${styles.btnSvg} hover-cursor`}
                  onClick={() => _setSelectedSort(1)}
                />
                <img
                  src={selectedSort === 2 ? BtnLifetimeActive : BtnLifetimeInactive} alt="Daily"
                  className={`${styles.btnSvg} hover-cursor`}
                  onClick={() => _setSelectedSort(2)}
                />
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
