import React from "react";
import { ServerAPI } from "Config";
import styles from "./GhostQuestSummonResult.module.scss";

// assets
const StarIcon = `${ServerAPI.assets_url}/imgs/games/ghost_quest/star.png`;

const GhostRow = ({ data }) => {
  const { key, value } = data
  let stars:any = null

  if (value) {
    stars = Array(value.rarity).fill(null).map((_, idx) => (
      <img
        src={StarIcon}
        alt="*"
        className={styles.starStyle}
        key={idx}
        style={{
          marginLeft: idx !== 0 ? '-30px' : '0px'
        }}
      />
    ))
  }


  return (
    <div key={key} className={styles.ghostRow}>
      {/* <img className={styles.ghostImage} src={value?.avatar || null} alt="Ghost Avatar" /> */}
      <div
        className={styles.ghostImage}
        style={{
          background: `url(${value?.avatar || null})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={styles.ghostResults}>
        <div className={styles.ghostStarsContainer}>
          <div className={styles.ghostRarityText}>
            Ghost Rarity:
          </div>
          <div className={styles.ghostStars}>
            {stars}
          </div>
        </div>
        <div className={styles.ghostResultsLife}>
          <div className={styles.dataLeft}>
            ID: {(key + '').substr(key?.length - 12)}
          </div>
          <div className={styles.dataRight}>
            HP: {value?.hitpoints || 'No data'}
          </div>
        </div>
        <div className={styles.ghostAttr}>
          <div className={styles.dataLeft}>
            ATK: {value?.attack || 'No data'}
          </div>
          <div className={styles.dataRight}>
            DEF: {value?.defense || 'No data'}
          </div>
        </div>
        <div className={styles.ghostAttr}>
          <div className={styles.dataLeft}>
            SPD: {value?.speed || 'No data'}
          </div>
          <div className={styles.dataRight}>
            LUK: {value?.luck || 'No data'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GhostRow;
