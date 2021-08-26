import React from "react";
import GetMahjongTile from "../Tiles";
import { kong, pass } from "../Assets";
import styles from "./Kong.module.scss";

type Props = {
  onDeclare: () => void;
  onHide: () => void;
  tiles: Array<number>;
};
const Kong = ({ onDeclare, onHide, tiles }: Props) => {
  let TILES: any = [];

  for (let i = 0; i < tiles.length; i++) {
    const imgSrc: any = GetMahjongTile(tiles[i])?.src;
    TILES.push(<img src={imgSrc} className={styles.cardsImg} alt="Tile" />);
  }

  return (
    <div className={styles.container}>
      <div className={styles.cards}>{TILES.map((img) => img)}</div>
      <img
        src={kong}
        className={styles.kongImg}
        alt="Kong"
        onClick={onDeclare}
      />
      <img src={pass} className={styles.passImg} alt="Pass" onClick={onHide} />
    </div>
  );
};

export default Kong;
