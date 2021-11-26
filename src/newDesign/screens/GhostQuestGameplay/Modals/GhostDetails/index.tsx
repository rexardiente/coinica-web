import React from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import { ModalBtnCancel, CancelSound } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type GhostDetailsProps = {
  ghostDetailsModalState: boolean;
  showGhostDetails: Function;
  ghost_quest?: any;
  charData?: any;
  enemyCharData?: any;
}

const getCharLife = (data) => {
  if (data) {
    if (data?.character_life > 1) {
      return `${data?.character_life} Lives remaining`
    }
    else {
      return `${data?.character_life} Life remaining`
    }
  }
}

const CharAttrs = ['HP', 'Attack', 'Defense', 'Speed', 'Luck'];

const getCharAttr = (data) => {
  const getAttrVal = (attr) => {
    if (attr === "HP") {
      return data['hitpoints']
    } else {
      return data[(attr + '').toLocaleLowerCase()]
    }
  }
  return (
    <>
      {CharAttrs.map((attr) => (
        <div className={styles.attribute}>
          <div className={styles.label}>
            {attr}
          </div>
          <div className={styles.value}>
            {getAttrVal(attr)}
          </div>
        </div>
      ))}
    </>
  )
}

const GhostDetails = ({
  ghostDetailsModalState,
  showGhostDetails,
  ghost_quest,
  charData,
  enemyCharData
}:GhostDetailsProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })
  console.log({ charData, enemyCharData })

  if (!ghostDetailsModalState || charData === null || enemyCharData === null) return null
  return (
    <div className={styles.outer} style={{ zIndex: 999 }}>
      <div
        className={styles.container}
        style={{
          marginBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.ghostDetailsContent}>
          <div className={styles.title}>
            <span className={styles.yellowTxt}>
              Ghost Details
            </span>
          </div>
          <div className={styles.ghostAttributes}>
            <div className={styles.ghostAttributesLeft}>
              <img src={charData?.charAvatar} alt="" width="100px" height="100px" />
              <div className={styles.ghostIdentifierUser}>
                My Ghost
              </div>
              <div className={styles.ghostLife}>
                {getCharLife(charData)}
              </div>
              {getCharAttr(charData)}
            </div>
            <div className={styles.ghostAttributesRight}>
              <img src={enemyCharData?.enemyGhostAvatar} alt="" width="100px" height="100px" />
              <div className={styles.ghostIdentifierEnemy}>
                Enemy Ghost
              </div>
              <div className={styles.ghostLife}>
                {getCharLife(enemyCharData)}
              </div>
              {getCharAttr(enemyCharData)}
            </div>
          </div>
          <img
            src={ModalBtnCancel}
            alt=""
            className={`${styles.ghostDetailsCloseBtn} hover-cursor`}
            onClick={() => {
              playCancel()
              showGhostDetails(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(GhostDetails);
