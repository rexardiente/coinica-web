import React from "react";
import GetMahjongTile from "components/Mahjong/Tiles";
import { translate } from "helpers/translate";
import styles from "./Kong.module.scss";

type Props = {
  tiles: Array<any>;
};
const Kong = ({ tiles }: Props) => {
  const getTiles = () => {
    let kongTiles: Array<any> = [];

    if (tiles?.length) {
      const tilesLength = Math.ceil(tiles.length / 4);

      //number of tiles per row
      for (let i = 0; i < tilesLength; i++) {
        kongTiles.push(tiles.slice(i * 4, i * 4 + 4));

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
      <div className={`${styles.numberOfTiles} text-stroke-brown`}>{translate("mj.gameplay.kong")}</div>
      <div className={styles.tilesWrapper}>
        {Boolean(getTiles().length) &&
          getTiles().map((row) => (
            <div className={styles.rowTiles}>
              {row.map((tile) => (
                <img
                  src={tile}
                  alt="tile"
                  height="43"
                  width="28"
                  className="img-fluid"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Kong;
