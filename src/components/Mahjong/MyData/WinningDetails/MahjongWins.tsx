import React from "react";
import { translate } from "helpers/translate";
import styles from "./WinningDetails.module.scss";

type Props = {
  onHide?: () => void;
  maxPayout: number;
  winRate: number;
  consHiLo: number;
};

const MahjongWins = ({ maxPayout, winRate, consHiLo }: Props) => {
  return (
    <div className={`${styles.container} ${styles.mahjongBg}`}>
      <div className={`${styles.winsContainer} ${styles.mahjongWins}`}>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.mahjong.win_rate")}</span>
          <span>{winRate}</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.mahjong.max_payout")}</span>
          <span>{maxPayout}</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.mahjong.consecutive")}</span>
          <span>{consHiLo}%</span>
        </div>
      </div>
    </div>
  );
};

export default MahjongWins;
