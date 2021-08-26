import React from "react";
import GetMahjongTile from "../../Tiles";
import { translate } from "helpers/translate";
import styles from "./WinningDetails.module.scss";

type Props = {
  tiles: Array<number>;
};

const HiLoWins = ({ tiles }: Props) => {
  const renderTile = () => {
    let TILES: any = [];
    if (tiles.length) {
      for (let i = 0; i < tiles.length; i++) {
        const imgSrc: any = GetMahjongTile(tiles[i])?.src;
        TILES.push(
          <img
            src={imgSrc}
            className={styles.cardsImg}
            alt="Tile"
            width="21"
            height="34"
          />
        );
      }
    }
    return TILES;
  };

  return (
    <div className={`${styles.container} ${styles.hiloBg}`}>
      <div className={styles.highest}>
        <div className={styles.title}>{translate("mj.my_data.hilo.highest_score")}</div>
        <div className={styles.tiles}>{renderTile()}</div>
        <div className={styles.scoreType}>
          <span>{translate("mj.my_data.hilo.score_type")}</span>
          <span>0 {translate("mj.my_data.hilo.score_points")}</span>
        </div>
      </div>

      <div className={`${styles.winsContainer} ${styles.hiLoWins}`}>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.game_played")}</span>
          <span>0</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.win_rate")}</span>
          <span>0</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.wins")}</span>
          <span>0</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.average_score")}</span>
          <span>0</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.average_round")}</span>
          <span>0</span>
        </div>
        <div className={styles.wins}>
          <span>{translate("mj.my_data.hilo.shortest_round")}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default HiLoWins;
