import React from "react";
import getGhostDescription from "helpers/ghostquest/getGhostDescription";
import {
  SUMMON_STAR,
  GhostBackground,
  ModalBackground,
} from "../Assets"
import styles from "./Summon.module.scss";

const GEN_STARS = (number) => {
  let stars:any = []
  for (let i = 0; i < number; i++) {
    stars.push(
      <img
        src={SUMMON_STAR}
        alt="*" key={i+'uniq_key'}
        style={{ right: `${i*20}px` }}
        className={styles.ghostRarity}
      />
    )
  }
  return stars;
}

const GhostDetail = ({ details }) => {
  if (details) {
    const { key } = details
    const {
      ghost_id,
      ghost_name,
      rarity, 
      hitpoints,
      attack,
      defense,
      speed,
      luck,
      avatar
    } = details?.value


    const description = getGhostDescription({ ghost_id })
    const ghostStarRarity:any = rarity ? GEN_STARS(rarity) : []

    return (
      <div className={styles.ghostDetailContainer}>
        <img src={ModalBackground} alt="" />
        <div className={styles.ghostDetails}>
          <div className={styles.ghostImage}>
            <img style={{ position: 'absolute', zIndex: 10 }} src={avatar} alt="Ghost Avatar" />
            <img src={GhostBackground} alt="" className={styles.ghostBackground} />
          </div>
          <div className={styles.ghostDescription}>
            {
              key && (
                <small className={styles.ghostId}>
                  ID: {(key + '').substr(key?.length - 12)}
                </small>
              )
            }
            <h3 className={styles.ghostName}>{ ghost_name }</h3>
            <p className={styles.ghostDescText}>{ description }</p>
          </div>
          <div className={styles.ghostAttributes}>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>Rarity</span>
                <div className={styles.rarityStarContainer}>
                  {ghostStarRarity.length && ghostStarRarity.map(stars => stars)}
                </div>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>HP</span>
                <span>{hitpoints || 'No data'}</span>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>ATTACK</span>
                <span>{attack || 'No data'}</span>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>DEFENSE</span>
                <span>{defense || 'No data'}</span>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>SPEED</span>
                <span>{speed || 'No data'}</span>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className={styles.leftAttrib}>
                <span>LUCK</span>
                <span>{luck || 'No data'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }

}

export default GhostDetail;
