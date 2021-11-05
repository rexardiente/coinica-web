import { useState } from "react";
import GetMahjongTile from "newDesign/components/Mahjong/Tiles";
import styles from "./Hand.module.scss";
import Popover from "@material-ui/core/Popover";

type Props = {
  winTiles: { index: number; tileswin: { suit: number; value: number }[] }[];
  tiles: number[];
  onDiscardTile: (idx: number) => void;
};

const Hand = ({ winTiles, tiles, onDiscardTile }: Props) => {
  const [suitTileIdx, setSuitTileIdx] = useState(-1);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [prevent, setPrevent] = useState(false);
  let timer;

  const handleClose = () => {
    setSuitTileIdx(-1);
    setAnchorEl(null);
  };

  const handleOpen = (
    event: React.MouseEvent<HTMLImageElement>,
    idx: number
  ) => {
    setSuitTileIdx(idx);
    setAnchorEl(event.target as HTMLImageElement);
  };

  const handleOnClick = (
    event: React.MouseEvent<HTMLImageElement>,
    idx: number
  ) => {
    timer = setTimeout(() => {
      if (!prevent) {
        handleOpen(event, idx);
      }
      setPrevent(false);
    }, 200);
  };

  const handleOnDoubleClick = (idx: number) => {
    clearTimeout(timer);
    setPrevent(true);
    onDiscardTile(idx);
  };

  const renderSuitTile = (idx: number) => {
    if (winTiles?.length) {
      const filteredWinTiles = winTiles.filter((obj) => obj.index === idx);

      if (filteredWinTiles.length) {
        return filteredWinTiles[0].tileswin.map((tile) => (
          <img
            src={GetMahjongTile(tile.suit)?.src as unknown as string}
            width="82"
            height="116"
            alt=""
          />
        ));
      }
    }
    return <div style={{ width: 82, height: 116 }}>No tiles</div>;
  };

  const imgTiles =
    (tiles?.length && tiles.map((val) => GetMahjongTile(val))) || [];

  const isOpen = Boolean(anchorEl);
  return (
    <div className={styles.container}>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <div style={{ padding: 5 }}>
          <p style={{ textAlign: "center" }}>Suit</p>
          {renderSuitTile(suitTileIdx)}
        </div>
      </Popover>

      {imgTiles.length
        ? imgTiles.map((tile, idx) => (
            <img
              key={idx}
              onDoubleClick={() => handleOnDoubleClick(idx)}
              onClick={(e) => handleOnClick(e, idx)}
              src={tile?.src}
              alt="tile"
              height="96"
              width="62"
              className={`img-fluid ${idx === 13 && styles.highlightTile}`}
            />
          ))
        : null}
    </div>
  );
};

export default Hand;
