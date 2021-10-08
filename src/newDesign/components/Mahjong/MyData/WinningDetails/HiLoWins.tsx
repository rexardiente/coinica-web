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
    <div className={styles.container}>
      <div className={styles.hiloBg}>
        <div className={styles.highest}>
          <div className={styles.title}>Highest Score</div>
          <div className={styles.tiles}>{renderTile()}</div>
          <div className={styles.scoreType}>
            <span>Score type</span>
            <span>0 pts</span>
          </div>
        </div>

        <div className={`${styles.winsContainer} ${styles.hiLoWins}`}>
          <div className={styles.wins}>
            <span>Mahjong Games Played</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Win rate</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Wins</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Average Win Score</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Average Win Round</span>
            <span>0</span>
          </div>
          <div className={styles.wins}>
            <span>Shortest Win Round</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiLoWins;
