import React from 'react';
import styles from './History.module.scss'
import { SkullImg, CoinsImg } from "../TreasurehuntAutoplayV2/Assets";

const History = ({ data }) => {
  const {
    id,
    user,
    date,
    winnings,
    isWin,
    rivals,
    openedGold,
    openedRivals,
  } = data

  const displayId = id ? `${id.substr(0, 14)}...` : 'Invalid ID'
  const displayDate = date != null ? (
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  ) : (
    'Invalid Date'
  )

  return (
    <div className={styles.history_container}>
      <div className={styles.history_header}>
        <span>
          TreasureHunt
        </span>
        <span>
          Player: {user}
        </span>
        <span>
          {winnings}
        </span>
      </div>
      <div className={styles.history_content}>
        <div className={styles.history_content_result}>
          <small>Result</small>
          <div className={`${isWin ? styles.text_win : styles.text_lose} ${styles.content_container}`}>
            {
              isWin ? 'WIN' : 'LOSE'
            }
          </div>
        </div>
        <div className={styles.history_content_rivals}>
          <small>Rivals</small>
          <div className={styles.content_container}>
            <img src={SkullImg} alt="rivals" />
            <span className={styles.color_red}>
              {`x${rivals}`}
            </span>
          </div>
        </div>
        <div className={styles.history_content_opened}>
          <small>Opened</small>
          <div className={styles.opened_container}>
            <div className={styles.content_container}>
              <img src={CoinsImg} alt="eos-coins" />
              <span>
                {`x${openedGold}`}
              </span>
            </div>
            <div className={styles.content_container}>
              <img src={SkullImg} alt="rivals" />
              <span className={styles.color_red}>
                {`x${openedRivals}`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.history_footer}>
        <div>{displayDate}</div>
        <div>TxID: {displayId}</div>
      </div>
    </div>
  )
}

export default History;
