import React from "react";
import { GetWindTile } from "components/Mahjong/Tiles";
import { translate } from "helpers/translate";
import styles from "./TileCategory.module.scss";

type Props = {
  tiles: Array<number>;
};
const TileCategory = ({ tiles }: Props) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.category} text-stroke-brown`}>{translate("mj.gameplay.wind")}</div>
      <div className={styles.tiles}>
        {tiles.length &&
          tiles.map((tile, idx) => (
            <img
              key={idx}
              src={GetWindTile(tile) as string}
              alt="tile"
              height="60"
              width="40"
            />
          ))}
      </div>
    </div>
  );
};

export default TileCategory;
