import React from "react";
import { translate } from "helpers/translate";
import styles from "./WinningDetails.module.scss";

type Props = {
  onHide?: () => void;
  maxPayout?: number;
  winRate?: number;
  consHiLo?: number;
};

const MahjongWins = ({ maxPayout, winRate, consHiLo }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.mahjongBg}>
        <div className={`${styles.winsContainer} ${styles.mahjongWins}`}>
          <div className={styles.wins}>
            <span>Hi-Lo Win Rate</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Max Payout</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Consecutive Hi-Lo</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahjongWins;
