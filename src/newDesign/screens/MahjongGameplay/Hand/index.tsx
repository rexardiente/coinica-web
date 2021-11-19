import clsx from "clsx";
import GetMahjongTile from "newDesign/components/Mahjong/Tiles";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./Hand.module.scss";

type Props = {
  winTiles: { index: number; tileswin: { suit: number; value: number }[] }[];
  tiles: number[];
  riichiStatus: number;
  onDiscardTile: (idx: number) => void;
};

const Hand = ({ winTiles, tiles, riichiStatus, onDiscardTile }: Props) => {
  const tilesLength = tiles?.length;

  const filteredWinTiles = (idx: number) => {
    return winTiles.filter((obj) => obj.index === idx) || [];
  };

  const renderSuitTile = (idx: number) => {
    if (winTiles?.length) {
      const _filteredWinTiles = filteredWinTiles(idx);

      if (_filteredWinTiles.length) {
        return _filteredWinTiles[0].tileswin.map((tile) => (
          <img
            src={GetMahjongTile(tile.suit)?.src as unknown as string}
            width="64"
            height="80"
            alt=""
          />
        ));
      }
    }
    return <div style={{ width: 64, height: 80 }}>No tiles</div>;
  };

  const imgTiles =
    (tilesLength && tiles.map((val) => GetMahjongTile(val))) || [];

  //If riichiStatus === 3, only the last tile can discard
  const disableTilesExceptLast = (idx: number) => {
    const lastIdx = tilesLength - 1;

    if (riichiStatus === 3 && lastIdx !== idx) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      {imgTiles.length
        ? imgTiles.map((tile, idx) => (
            <div className={styles.tile} key={idx}>
              <Tooltip
                arrow
                disableFocusListener
                title={<>{renderSuitTile(idx)}</>}
              >
                <img
                  key={idx}
                  onDoubleClick={() => {
                    !disableTilesExceptLast(idx) && onDiscardTile(idx);
                  }}
                  src={tile?.src}
                  alt="tile"
                  height="96"
                  width="62"
                  className={clsx({
                    [styles.highlightTile]: idx === 13,
                    [styles.disableTile]: disableTilesExceptLast(idx),
                  })}
                />
              </Tooltip>
            </div>
          ))
        : null}
    </div>
  );
};

export default Hand;
