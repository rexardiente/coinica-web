import React from "react";
import GetMahjongTile from "../../../components/Mahjong/Tiles";
import styles from "./Hand.module.scss";

type Props = {
  tiles: Array<number>;
  onDiscardTile: (idx: number) => void;
};
const Hand = ({ tiles, onDiscardTile }: Props) => {
  const imgTiles =
    (tiles?.length && tiles.map((val) => GetMahjongTile(val))) || [];

  return (
    <div className={styles.container}>
      {imgTiles.length &&
        imgTiles.map((tile, idx) => (
          <img
            key={idx}
            onDoubleClick={() => onDiscardTile(idx)}
            src={tile?.src as string}
            alt="tile"
            height="96"
            width="62"
            className={`img-fluid ${idx === 13 && styles.highlightTile}`}
          />
        ))}
    </div>
  );
};

export default Hand;
