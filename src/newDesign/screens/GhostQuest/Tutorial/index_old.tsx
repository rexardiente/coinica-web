import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import {
  Tutorial_BG,
  Tutorial_BackBtn,
  Tutorial_NextBtn,
  ModalBtnCancel,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  funcSound,
  ClickSound,
  cancelSound,
} from "../Assets";
import { translate } from "helpers/translate";
import styles from "./Tutorial.module.scss";

const slideText = [
  translate("gq.tutorial.1"),
  translate("gq.tutorial.2"),
  translate("gq.tutorial.3"),
  translate("gq.tutorial.4"),
]

type TutorialProps = {
  tutorialState: boolean;
  showTutorial: Function;
  ghost_quest: any;
}

const Tutorial = ({ tutorialState, showTutorial, ghost_quest }:TutorialProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playFuncSound] = useSound(funcSound, { volume: 0.5 * GQ_VOLUME })
  const [playClick] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(cancelSound, { volume: 0.5 * GQ_VOLUME })
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (tutorialState) {
      playFuncSound()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorialState])

  const slideHandler = (num) => {
    playClick()
    if (num > 3) return
    if (num < 0) return
    setSlide(num)
  }

  if (!tutorialState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img
          src={Tutorial_BackBtn}
          alt="Back" className={`hover-cursor ${styles.backbtn} `}
          onClick={() => slideHandler(slide - 1)}
        />
        <img src={Tutorial_BG} alt="Background" />
        <div className={styles.contentScrollable}>
          <div className={styles.tutorialContent}>
            <p>{ slideText[slide] }</p>
            {
              slide === 0 && (
                <img src={Slide1} alt="Summon setting modal" />
              )
            }
            {
              slide === 1 && (
                <img src={Slide2} alt="Summon confirmation modal" />
              )
            }
            {
              slide === 2 && (
                <img src={Slide3} alt="Ghostlist table" />
              )
            }
            {
              slide === 3 && (
                <img src={Slide4} alt="Gameplay history" />
              )
            }
          </div>
        </div>
        <img
          src={Tutorial_NextBtn}
          alt="Next" className={`hover-cursor ${styles.nextbtn} `}
          onClick={() => slideHandler(slide + 1)}
        />
        <img
          src={ModalBtnCancel} alt="Cancel"
          className={`hover-cursor ${styles.closeBtn} `}
          onClick={() => {
            playCancel()
            showTutorial(false)
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(Tutorial);
