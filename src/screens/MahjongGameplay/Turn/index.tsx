import React from "react";
import GetMahjongTile from "components/Mahjong/Tiles";
import { translate } from "helpers/translate";
import styles from "./Turn.module.scss";

type Props = {
  tiles: Array<any>;
};
const Turn = ({ tiles }: Props) => {
  const getTiles = () => {
    let kongTiles: Array<any> = [];

    if (tiles?.length) {
      const tilesLength = Math.ceil(tiles.length / 6);

      //number of tiles per row
      for (let i = 0; i < tilesLength; i++) {
        const tilesPerRowWithReverseOrder = tiles.slice(i * 6, i * 6 + 6).reverse();
        kongTiles.push(tilesPerRowWithReverseOrder);

        for (let j = 0; j < kongTiles[i].length; j++) {
          const imgSrc: string | undefined = GetMahjongTile(kongTiles[i][j])
            ?.src;
          kongTiles[i][j] = imgSrc;
        }
      }
    }
    return kongTiles;
  };

  return (
    <div>
      <div className={`${styles.numberOfTiles} text-stroke-brown`}>
        {translate("mj.gameplay.turn")} <span>{tiles?.length || 0}/33</span>
      </div>
      <div className={styles.tilesWrapper}>
        {Boolean(getTiles().length) &&
          getTiles().map((row) => (
            <div className={styles.rowTiles}>
              {row.map((tile) => (
                <img
                  src={tile}
                  alt="tile"
                  height="60"
                  width="39"
                  className="img-fluid"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Turn;
