import GradientText from "newDesign/components/GradientText";
import GetMahjongTile from "newDesign/components/Mahjong/Tiles";
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
        const tilesPerRowWithReverseOrder = tiles
          .slice(i * 6, i * 6 + 6)
          .reverse();
        kongTiles.push(tilesPerRowWithReverseOrder);

        for (let j = 0; j < kongTiles[i].length; j++) {
          const imgSrc: string | undefined = GetMahjongTile(
            kongTiles[i][j]
          )?.src;
          kongTiles[i][j] = imgSrc;
        }
      }
    }
    return kongTiles;
  };

  const turnText = (tiles: number[]) => {
    return (
      <>
        {translate("mj.gameplay.turn", {
          span: (content) => (
            <>
              {tiles?.length || 0}
              {content}
            </>
          ),
        })}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <GradientText
        text={turnText(tiles)}
        textAnchor="end"
        fromColor="#F8E37F"
        toColor="#EA9633"
        width="259px"
        height="1em"
        className={[styles.turnText, "strokeBrown5"].join(" ")}
      />

      <div className={styles.tilesWrapper}>
        {tiles?.length
          ? getTiles().map((row) => (
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
            ))
          : null}
      </div>
    </div>
  );
};

export default Turn;
