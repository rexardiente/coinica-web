import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import useSound from "use-sound";
// import { updateGhostQuestData } from "services/api/server/ghostquest_api";
import Header from "../GhostQuest/Header";
import useResize from "helpers/hooks/useResize";
import GhostRow from "./GhostRowV2";
import {
  CharHistoryByUser,
  GetCharactersByUser
} from "services/api/server/ghostquest_api";
import {
  updateInBattleList,
  updateBattleEndList,
} from "redux/ghost_quest/ghost_quest_actions";
import {
  ModalBackground,
  InBattleActive,
  InBattleInactive,
  BattleEndActive,
  BattleEndInactive,
  BtnSort,
  GhostlistBGM,
  ClickSound,
} from "./Assets";
import { GhostListModalBg } from "../GhostQuest/Assets";
import { backgroundImage, polygon } from "../GhostQuest/Assets/index";
import styles from "./GhostList.module.scss";

const GQfixedWidth = 1075
const GQfixedHeight = 750

const getSelectedSortName = {
  0: 'Oldest',
  1: 'Newest',
  2: 'Battle Limit: Low to High',
  3: 'Battle Limit: High to Low',
  4: 'Star: Low to High',
  5: 'Star: High to Low',
  6: 'Life: Low to High',
  7: 'Life: High to Low',
}

const sortData = (data, sort) => {
  /**
   * PLEASE REFER TO (getSelectedSortName) FUNCTION
   * FOR THE SORT DICT.
   */
  if (data != null && Array.isArray(data)) {
    switch (sort) {
      case 0:
        return [...data].sort((a, b) => a[0]?.value?.created_at - b[0]?.value?.created_at)
      case 1:
        return [...data].sort((a, b) => b[0]?.value?.created_at - a[0]?.value?.created_at)
      case 2:
        return [...data].sort((a, b) => a[0]?.value?.battle_limit - b[0]?.value?.battle_limit)
      case 3:
        return [...data].sort((a, b) => b[0]?.value?.battle_limit - a[0]?.value?.battle_limit)
      case 4:
        return [...data].sort((a, b) => a[0]?.value?.rarity - b[0]?.value?.rarity)
      case 5:
        return [...data].sort((a, b) => b[0]?.value?.rarity - a[0]?.value?.rarity)
      case 6:
        return [...data].sort((a, b) => a[0]?.value?.character_life - b[0]?.value?.character_life)
      case 7:
        return [...data].sort((a, b) => b[0]?.value?.character_life - a[0]?.value?.character_life)
      default:
        return data
    }
  } else {
    return data
  }
}

const GhostQuestGhostList = (props) => {
  const GQ_VOLUME = props?.ghost_quest?.volume
  const username = props.platform?.account?.username || null
  const user_game_id = props.platform?.account?.user_game_id || null
  // const UUID = props.platform.account?.id
  const isFromBattleEndScreen = props?.location?.state?.isFromBattleEndScreen
  const ref = useRef<HTMLDivElement | null>(null)
  const [initialized, setInitialized] = useState(false)

  const [, { sound }] = useSound(GhostlistBGM, { volume: 0.1 * GQ_VOLUME })
  const [playGQ_Click] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })

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

  /**
   * [battleState]
   * @value (0) => In-Battle
   * @value (1) => Battle-End
   */
  const [battleState, setBattleState] = useState(0)
  const [sortSelected, setSort] = useState(1)
  const [scale, setScale] = useState(1)

  const [loading, setLoading] = useState(true)

  const InBattleCharacters = props?.ghost_quest?.in_battle_list
  const BattleEndCharacters = props?.ghost_quest?.battle_end_list

  useEffect(() => {
    if (isFromBattleEndScreen && !battleState) {
      setBattleState(1) // SET BATTLE-END LIST
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFromBattleEndScreen])

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

  useEffect(() => {
    // const updateGQdata = async() => {
    //   await updateGhostQuestData({ id: user_game_id })
    //   props.dispatch(updateBattleGhostList())
    // }

    // if (initialized) {
    //   updateGQdata()
    // }

    if (initialized) {
      setLoading(true)
      if (battleState) {
        CharHistoryByUser().then(res => {
          const { data } = res
          const sortedData = sortData(data, sortSelected)
          props.dispatch(updateBattleEndList({ ghost_list: sortedData }))
        }).catch(() => {
          toast.error('Error fetching history characters, please try again')
        }).finally(() => {
          setLoading(false)
        })
      } else {
        GetCharactersByUser().then(res => {
          const { data } = res
          const sortedData = sortData(data, sortSelected)
          console.log({ data, sortedData })
          props.dispatch(updateInBattleList({ ghost_list: sortedData }))
        }).catch(() => {
          toast.error('Error fetching characters, please try again')
        }).finally(() => {
          setLoading(false)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, battleState])

  useEffect(() => {
    if (battleState) {
      const sortedData = sortData(BattleEndCharacters, sortSelected)
      props.dispatch(updateBattleEndList({ ghost_list: sortedData }))
    } else {
      const sortedData = sortData(InBattleCharacters, sortSelected)
      props.dispatch(updateInBattleList({ ghost_list: sortedData }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortSelected])

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse
    const scaleValue = Math.min(width / GQfixedWidth, height / GQfixedHeight)
    setScale(scaleValue * 0.8)
  });

  const _setBattleState = (val) => {
    playGQ_Click()
    setBattleState(val)
  }

  const _gotoSummon = () => {
    props.history.push("/game/ghostquest/summon");
  }

  const filterBtnHandler = (val) => {
    // 0: 'Oldest',
    // 1: 'Newest',
    // 2: 'Battle Limit: Low to High',
    // 3: 'Battle Limit: High to Low',
    // 4: 'Star: Low to High',
    // 5: 'Star: High to Low',
    // 6: 'Life: Low to High',
    // 7: 'Life: High to Low',
    switch (val) {
      case "newest":
        if (sortSelected === 0) {
          setSort(1)
        } else if (sortSelected === 1) {
          setSort(0)
        } else {
          setSort(1)
        }
        break;
      case "battle-limit":
        if (sortSelected === 2) {
          setSort(3)
        } else if (sortSelected === 3) {
          setSort(2)
        } else {
          setSort(3)
        }
        break;
      case "star":
        if (sortSelected === 4) {
          setSort(5)
        } else if (sortSelected === 5) {
          setSort(4)
        } else {
          setSort(5)
        }
        break;
      case "life":
        if (sortSelected === 6) {
          setSort(7)
        } else if (sortSelected === 7) {
          setSort(6)
        } else {
          setSort(7)
        }
        break;
      default:
        break;
    }
  }

  const isActiveFilter = (val) => {
    switch (val) {
      case "newest":
        if (sortSelected === 0 || sortSelected === 1) {
          return true;
        } else {
          return false;
        }
      case "battle-limit":
        if (sortSelected === 2 || sortSelected === 3) {
          return true;
        } else {
          return false;
        }
      case "star":
        if (sortSelected === 4 || sortSelected === 5) {
          return true;
        } else {
          return false;
        }
      case "life":
        if (sortSelected === 6 || sortSelected === 7) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  console.log({ sortSelected })

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
        <div className={styles.header}>
          <Header {...props} username={username} showSummon={_gotoSummon} />
        </div>
        <div className={styles.contents}>
          <div className={styles.container_modal}>
            <img src={GhostListModalBg} alt="" />
            <div className={styles.container_title}>Ghosts</div>
            <div className={styles.contentScrollable}>
              <div className={styles.rulesContent}>
                {
                  battleState === 0
                    ? (
                      InBattleCharacters.length
                        ? InBattleCharacters.map((data, idx) => (
                          <GhostRow username={username} inBattle={true} key={idx} dataProps={data} navigation={props} />
                        ))
                        : loading ? (
                          <div className="h-100 d-flex justify-content-center align-items-center">
                            <Spinner animation="grow" />
                          </div>
                        )
                          : (
                            <div className="h-100 d-flex justify-content-center align-items-center">
                              <h2>No characters found</h2>
                            </div>
                          )
                    )
                    : (
                      BattleEndCharacters.length
                        ? BattleEndCharacters.map((data, idx) => (
                          <GhostRow username={username} inBattle={false} key={idx} dataProps={data} navigation={props} />
                        ))
                        : loading ? (
                          <div className="h-100 d-flex justify-content-center align-items-center">
                            <Spinner animation="grow" />
                          </div>
                        )
                          : (
                            <div className="h-100 d-flex justify-content-center align-items-center">
                              <h2>No characters found</h2>
                            </div>
                          )
                    )
                }
              </div>
            </div>
          </div>
          <div className={styles.leftSideNav}>
            <div className="my-2 hover-cursor">
              {
                battleState === 0 ? (
                  <img src={InBattleActive} alt="In-Battle" />
                ) : (
                  <img src={InBattleInactive} alt="In-Battle" onClick={() => _setBattleState(0)} />
                )
              }
            </div>
            <div className="my-2 hover-cursor">
              {
                battleState === 1 ? (
                  <img src={BattleEndActive} alt="Battle-End" />
                ) : (
                  <img src={BattleEndInactive} alt="Battle-End" onClick={() => _setBattleState(1)} />
                )
              }
            </div>
          </div>
          <div className={styles.rightSideNav}>
            <div className="my-2">
              <img src={BtnSort} alt="Sort" />
              {/* <div className={styles.sortDetails}>
                {getSelectedSortName[sortSelected]}
              </div> */}
              <div
                className={`${styles.filterBtn} ${isActiveFilter("newest") ? styles.activeFilter : ""}`}
                onClick={() => filterBtnHandler("newest")}
              >
                <span>
                  {isActiveFilter("newest") ? getSelectedSortName[sortSelected] : "Newest"}
                </span>
                <img
                  src={polygon} alt=""
                  style={{ 
                    transform: sortSelected === 1 ? "scale(0.9)  rotate(180deg)" : "scale(0.9)"
                  }}
                />
              </div>
              <div
                className={`${styles.filterBtn} ${isActiveFilter("life") ? styles.activeFilter : ""}`}
                onClick={() => filterBtnHandler("life")}
              >
                <span>
                  {isActiveFilter("life") ? getSelectedSortName[sortSelected] : "Life"}
                </span>
                <img
                  src={polygon} alt=""
                  style={{ 
                    transform: sortSelected === 7 ? "scale(0.9)  rotate(180deg)" : "scale(0.9)"
                  }}
                />
              </div>
              <div
                className={`${styles.filterBtn} ${isActiveFilter("star") ? styles.activeFilter : ""}`}
                onClick={() => filterBtnHandler("star")}
              >
                <span>
                  {isActiveFilter("star") ? getSelectedSortName[sortSelected] : "Star"}
                </span>
                <img
                  src={polygon} alt=""
                  style={{ 
                    transform: sortSelected === 5 ? "scale(0.9)  rotate(180deg)" : "scale(0.9)"
                  }}
                />
              </div>
              <div
                className={`${styles.filterBtn} ${isActiveFilter("battle-limit") ? styles.activeFilter : ""}`}
                onClick={() => filterBtnHandler("battle-limit")}
              >
                <span>
                  {isActiveFilter("battle-limit") ? getSelectedSortName[sortSelected] : "Battle Limit"}
                </span>
                <img
                  src={polygon} alt=""
                  style={{ 
                    transform: sortSelected === 3 ? "scale(0.9)  rotate(180deg)" : "scale(0.9)"
                  }}
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

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GhostQuestGhostList);
