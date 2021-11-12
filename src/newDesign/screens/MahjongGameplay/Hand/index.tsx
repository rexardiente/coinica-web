import GetMahjongTile from "newDesign/components/Mahjong/Tiles";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./Hand.module.scss";

type Props = {
  winTiles: { index: number; tileswin: { suit: number; value: number }[] }[];
  tiles: number[];
  onDiscardTile: (idx: number) => void;
};

const Hand = ({ winTiles, tiles, onDiscardTile }: Props) => {
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
    (tiles?.length && tiles.map((val) => GetMahjongTile(val))) || [];

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
                  onDoubleClick={() => onDiscardTile(idx)}
                  src={tile?.src}
                  alt="tile"
                  height="96"
                  width="62"
                  className={`img-fluid ${idx === 13 && styles.highlightTile}`}
                />
              </Tooltip>
            </div>
          ))
        : null}
    </div>
  );
};

export default Hand;
