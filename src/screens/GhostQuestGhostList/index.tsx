import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import useSound from "use-sound";
// import { updateGhostQuestData } from "services/api/server/ghostquest_api";
import Header from "../GhostQuest/Header";
import Summon from "../GhostQuest/Summon";
import useResize from "../../helpers/hooks/useResize";
import GhostRow from "./GhostRow";
import SortModal from "./SortModal";
import {
  CharHistoryByUser,
  GetCharactersByUser
} from "../../services/api/server/ghostquest_api";
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
  const [summonState, showSummon] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [isSummoning, setSummoning] = useState(false)

  const [, { sound }] = useSound(GhostlistBGM, { volume: 0.1 * GQ_VOLUME })
  const [playGQ_Click] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })

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

  /**
   * [battleState]
   * @value (0) => In-Battle
   * @value (1) => Battle-End
   */
  const [battleState, setBattleState] = useState(0)
  const [sortModalState, showSortModal] = useState(false)
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
      props.history.push("/game/ghostquest")
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
    setScale(scaleValue * 0.9)
  });

  const changeSort = (value) => {
    playGQ_Click()
    setSort(value)
    showSortModal(false)
  }

  const _setBattleState = (val) => {
    playGQ_Click()
    setBattleState(val)
  }

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
        <SortModal
          sortModalState={sortModalState}
          showSortModal={showSortModal}
          setSort={changeSort}
          battleState={battleState}
        />
        <Summon
          username={username}
          navigation={props}
          summonState={summonState}
          showSummon={showSummon}
          setSummoning={setSummoning}
        />
        <div className={styles.header}>
          <Header {...props} username={username} showSummon={showSummon} />
        </div>
        <div className={styles.contents}>
          <div className={styles.container_modal}>
            <img src={ModalBackground} alt="" />
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
          <div className={styles.sideNav}>
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
            <div className="my-2 hover-cursor">
              <img
                src={BtnSort}
                alt="Sort"
                onClick={() => {
                  playGQ_Click()
                  showSortModal(true)
                }}
              />
              <div className={styles.sortDetails}>
                { getSelectedSortName[sortSelected] }
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
