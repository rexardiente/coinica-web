import React, { useState, useEffect } from "react";
import GetMahjongTile from "components/Mahjong/Tiles";
import { ura } from "../../Assets";

type Props = {
  betStatus: number;
  standard: number;
  current: number;
  isGameInitialized: Boolean;
};

const DrawTile = ({
  standard,
  current,
  isGameInitialized,
  betStatus,
}: Props) => {
  const [standardTile, setStandard] = useState<number | string | null>(null);
  const [currentTile, setCurrent] = useState<number | string | null>(null);

  //Render tile
  useEffect(() => {
    if (isGameInitialized && !standard && current) {
      setStandard(current);
      setCurrent(null);
    } else if (isGameInitialized && standard && current) {
      setStandard(standard);
      setCurrent(Boolean(betStatus) ? current : null);
    } else {
      setStandard(null);
      setCurrent(null);
    }
  }, [isGameInitialized, standard, current, betStatus]);

  return (
    <>
      <img
        src={(standardTile ? GetMahjongTile(standardTile)?.src : ura) as string}
        alt="standard"
        width="90"
        height="135"
      />
      <img
        src={(currentTile ? GetMahjongTile(currentTile)?.src : ura) as string}
        alt="prediction"
        width="90"
        height="135"
      />
    </>
  );
};

export default DrawTile;
