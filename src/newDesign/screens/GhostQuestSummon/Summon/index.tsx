import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import ReactPlayer from "react-player";
import Settings from "./Settings";
import Confirmation from "./Confirmation";
import GhostDetail from "./GhostDetail";
import { translate } from "helpers/translate";

// assets
import {
  ModalBtnCancel,
  GhostDetailBackground,
  SUMMON_BLUE,
  SUMMON_GOLD,
  SUMMON_RED,
  GQ_SUMMON_SOUND,
  PlaySound,
  cancelSound,
  funcSound,
  GQ_Star1to3,
  GQ_Star4to5,
} from "../Assets";

import GET_GHOST_AVATAR from "helpers/ghostquest/getGhostAvatar";
import styles from "./Summon.module.scss";

// ANIMATION ASSETS
// HALO EFFECT
import GQ_BLUE_MIRROR from "assets/imgs/games/ghost_quest/gacha_animations/GQ_BLUE_MIRROR.m4v";
import GQ_ORANGE_MIRROR from "assets/imgs/games/ghost_quest/gacha_animations/GQ_ORANGE_MIRROR.m4v";
import GQ_YELLOW_MIRROR from "assets/imgs/games/ghost_quest/gacha_animations/GQ_YELLOW_MIRROR.m4v";

type SummonProps = {
  navigation: any;
  summonState: boolean;
  showSummon: Function;
  ghost_quest: any;
  dispatch: Function;
  setSummoning: Function;
  summonCount: number;
}

const Summon = ({
  summonState,
  showSummon,
  navigation,
  ghost_quest,
  setSummoning,
  summonCount,
}:SummonProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [step, setStep] = useState(1)
  const [battleLimit, setBattleLimit] = useState(0)

  const [, { sound }] = useSound(GQ_SUMMON_SOUND, { volume: 0.1 * GQ_VOLUME })
  const [playStartAudio] = useSound(PlaySound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(cancelSound, { volume: 0.5 * GQ_VOLUME })
  const [playFunc] = useSound(funcSound, { volume: 0.5 * GQ_VOLUME })
  const [playGQ_Star1to3] = useSound(GQ_Star1to3, { volume: 0.5 * GQ_VOLUME })
  const [playGQ_Star4to5] = useSound(GQ_Star4to5, { volume: 0.5 * GQ_VOLUME })

  // GACHA ANIMATION
  const [playerState, setPlayerState] = useState(false)
  const [ghostDetailState, showGhostDetail] = useState(false)
  const [animationState, setAnimationState] = useState({ isPlaying: false, numOfChar: 0 })
  const [ghostAvatarState, showGhostAvatar] = useState(false)
  const [allCharSummoned, setAllCharSummoned] = useState<any>([])
  const [charactersSummoned, setCharactersSummoned] = useState<any>([])

  useEffect(() => {
    if (animationState.isPlaying) {
      if (setSummoning) {
        setSummoning(true)
      }
    }

    if (animationState.isPlaying && sound) {
      sound.play()

      sound.on('end', () => {
        sound.play();
      })
    }

    return () => {
      if (sound) {
        sound.stop()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState, sound])

  useEffect(() => {
    if (summonState) {
      playStartAudio()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonState])

  const gotoConfirm = () => {
    if (battleLimit === 0) {
      toast.warn('Please set your battle limit')
      return
    }

    setStep(2)
  }
  
  useEffect(() => {
    const setSummonedData = async({ numOfChar, characters }) => {
      if (characters.length) {
        const newlySummonedChar = characters.sort((a, b) => {
          const aDate = +(a?.value?.created_at)
          const bDate = +(b?.value?.created_at)
          return bDate - aDate
        })
        newlySummonedChar.length = numOfChar
        console.log({ newlySummonedChar })

        for (let i = 0; i < newlySummonedChar.length; i++) {
          const ghost_id = newlySummonedChar[i].value?.ghost_id
          const image = GET_GHOST_AVATAR({ ghost_id })
          newlySummonedChar[i].value.avatar = image
        }

        setAllCharSummoned(newlySummonedChar)
        setCharactersSummoned(newlySummonedChar)
      }
    }

    if (animationState.isPlaying && ghost_quest?.game_data !== null) {
      const numOfChar = animationState?.numOfChar
      const characters  = [...ghost_quest?.game_data?.characters]
      console.log({ PLAYING_WITH_DATA: ghost_quest })

      setSummonedData({ numOfChar, characters })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState])

  useEffect(() => {
    if (charactersSummoned.length) {
      if (charactersSummoned[0]?.value?.rarity <= 3) {
        playGQ_Star1to3()
      } else if (charactersSummoned[0]?.value?.rarity >= 4) {
        playGQ_Star4to5()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersSummoned])


  // CHECH SUMMON MODAL STATE
  if (!summonState) return null

  /**
   * ( MIRROR EFFECT FOR GACHA ANIMATION )
   * MIRROR EFFECT COLOR IS BASED
   * FROM THE HIGHEST GHOST RARITY SUMMONED
   */
  let mirrorEffect = GQ_BLUE_MIRROR
  if (charactersSummoned.length) {
    if (charactersSummoned[0]?.value?.rarity > 2) {
      mirrorEffect = GQ_YELLOW_MIRROR
    } else if (charactersSummoned[0]?.value?.rarity > 4) {
      mirrorEffect = GQ_ORANGE_MIRROR
    }
  }


  /**
   * ( HALO EFFECT FOR GACHA ANIMATION )
   * HALO EFFECT CHANGES ACCORDING
   * TO THE GHOST RARIRTY
   */
  let haloEffect = SUMMON_BLUE
  if (charactersSummoned.length) {
    if (charactersSummoned[0]?.value?.rarity > 2) {
      haloEffect = SUMMON_GOLD
    } else if (charactersSummoned[0]?.value?.rarity > 4) {
      haloEffect = SUMMON_RED
    }
  }

  const skipAnimationHandler = () => {
    navigation.history.push('/game/ghostquest/result', { allCharSummoned })
  }

  return (
    <div className={styles.outer}>
      {
        animationState.isPlaying && (
          <button className={styles.btnSkip} onClick={() => skipAnimationHandler()}>
            Skip
          </button>
        )
      }
      {
        animationState.isPlaying && (
          <div className={styles.animationContainer}>
            {
              playerState && (
                <ReactPlayer
                  url={mirrorEffect}
                  playing={animationState.isPlaying}
                  controls={false}
                  onContextMenu={e => e.preventDefault()}
                  height="100%"
                  width="100%"
                  style={{
                    zIndex: 999,
                    background: '#000'
                  }}
                  onEnded={() => {
                    setTimeout(() => {
                      showGhostAvatar(true)
                      setPlayerState(false)
                    }, 750)
                  }}
                />
              )
            }
            {
              ghostDetailState ? (
                <div
                  key={charactersSummoned.length}
                  className={styles.ghostAnimationContainer}
                  style={{
                    backgroundImage: ghostDetailState ? `url(${GhostDetailBackground})` : '',
                    backgroundColor: ghostDetailState ? `rgba(0, 0, 0, 0.9)` : '',
                  }}
                  onClick={() => {
                    playFunc()

                    const newChaArray = [...charactersSummoned]
                    newChaArray.shift()
                    setCharactersSummoned(newChaArray)
  
                    if (charactersSummoned.length === 1) {
                      showSummon(false)
                      setAnimationState({ isPlaying: false, numOfChar: 0 })
                      showGhostAvatar(false)

                      navigation.history.push('/game/ghostquest/result', { allCharSummoned })
                    }
  
                    if (charactersSummoned.length) {
                      setPlayerState(true) // PLAY MIRROR ANIMATION AGAIN
                    }
                    showGhostDetail(false)
                  }}
                >
                  <GhostDetail details={charactersSummoned[0]} />
                </div>
              ) : ghostAvatarState && charactersSummoned.length && (
                <div
                  //should have unique key to reset the char. animation pop-up
                  key={charactersSummoned.length}
                  className={styles.ghostAnimationContainer}
                >
                  <div className={styles.summonEffect}>
                    <img
                      src={haloEffect}
                      alt=""
                      style={{ width: '480px', height: '480px' }}
                    />
                  </div>
                  <div
                    className={styles.ghostIconAnimation}
                    onClick={() => {
                      showGhostAvatar(false)
                      showGhostDetail(true)
                    }}
                  >
                    <img src={charactersSummoned[0]?.value?.avatar} alt="ghost_icon" />
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      <div
        className={styles.container}
        style={{ display: ghostDetailState ? 'none' : 'block' }}
      >
        <div className={styles.title}>
          {
            step === 1
            ? (
                <span>{translate("gq.summon.battle_limit")}</span>
              )
            : (
                <span>{translate("gq.summon.confirmation")}</span>
              )
          }
        </div>
        <img
          src={ModalBtnCancel}
          alt="Cancel"
          className={`hover-cursor ${styles.closeBtn} `}
          onClick={() => {
            playCancel()
            showSummon(false)
            setStep(1)
          }}
        />
        { step === 1 && (
            <Settings
              gotoConfirm={gotoConfirm}
              battleLimit={battleLimit}
              setBattleLimit={setBattleLimit}
              cancel={() => {
                playCancel()
                showSummon(false)
                setStep(1)
              }}
            />
          )
        }
        { step === 2 && (
            <Confirmation
              navigation={navigation}
              setStep={setStep}
              summonCount={summonCount}
              battleLimit={battleLimit}
              showSummon={showSummon}
              setAnimationState={setAnimationState}
              setPlayerState={setPlayerState}
            />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Summon);
