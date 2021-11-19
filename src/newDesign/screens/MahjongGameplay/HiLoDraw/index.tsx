import React from "react";
import { BtnGradient } from "../Btn";
import DrawTile from "./DrawTile";
import * as assets_url from "../Assets";
import { translate } from "helpers/translate";
import styles from "./HiLoDraw.module.scss";
import { PredictionResult } from "newDesign/components/Mahjong";

type Props = {
  betStatus: number;
  oddsPerTile: {
    low: string;
    draw: string;
    high: string;
  };
  standardTile: number;
  predictionTile: number;
  isGameInitialized: boolean;
  isWin: boolean;
  showResult: boolean;
  playWin: Function;
  playLose: Function;
  // onAutoPlay: () => void;
  onPlayHigh: () => void;
  onPlayDraw: () => void;
  onPlayLow: () => void;
};
const HiLoDraw = (props: Props) => {
  const {
    betStatus,
    oddsPerTile: { low, draw, high },
    standardTile,
    predictionTile,
    isGameInitialized,
    isWin,
    showResult,
    playWin,
    playLose,
    // onAutoPlay,
    onPlayHigh,
    onPlayDraw,
    onPlayLow,
  } = props;

  const fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(8) : 0;
  };

  const disableZeroOdds = (odd: number) => {
    return Math.ceil(odd) === 0;
  };

  return (
    <div className={styles.container}>
      {showResult && !isWin && <div className={styles.loseBg} />}
      {showResult ? (
        <PredictionResult
          isWin={isWin}
          showResult={showResult}
          playWin={playWin}
          playLose={playLose}
        />
      ) : null}

      <div className={styles.autoPlayWrapper}>
        <div className={styles.tiles}>
          <DrawTile
            standard={standardTile}
            current={predictionTile}
            isGameInitialized={isGameInitialized}
            betStatus={betStatus}
          />
        </div>

        {/* <div className={styles.btnAutoPlayWrapper}>
          <BtnSolid
            isDisabled={isPlayingHiLo}
            containerClass={styles.btnAutoPlay}
            label="Auto"
            width="103"
            height="36"
            onClick={onAutoPlay}
            labelClass={`${styles.btnAutoPlayLabel} text-stroke-brown`}
          /> 
        </div>*/}
      </div>
      <div className={styles.hiLoDrawWrapper}>
        <BtnGradient
          isDisabled={
            !isGameInitialized ||
            Boolean(betStatus) ||
            disableZeroOdds(Number(high))
          }
          containerClass={styles.btnHigh}
          label={translate("mj.gameplay.high.button") as unknown as string}
          labelSpan={fixedVal(high)}
          title={high}
          imgSrc={assets_url.btn_bg_high}
          leftIconSrc={assets_url.icon_arrow}
          onClick={onPlayHigh}
        />
        <BtnGradient
          isDisabled={
            !isGameInitialized ||
            Boolean(betStatus) ||
            disableZeroOdds(Number(draw))
          }
          containerClass={styles.btnDraw}
          label={translate("mj.gameplay.draw.button") as unknown as string}
          labelSpan={fixedVal(draw)}
          title={draw}
          imgSrc={assets_url.btn_bg_draw}
          leftIconSrc={assets_url.icon_equals}
          onClick={onPlayDraw}
        />
        <BtnGradient
          isDisabled={
            !isGameInitialized ||
            Boolean(betStatus) ||
            disableZeroOdds(Number(low))
          }
          containerClass={styles.btnLow}
          label={translate("mj.gameplay.low.button") as unknown as string}
          labelSpan={fixedVal(low)}
          title={low}
          imgSrc={assets_url.btn_bg_low}
          leftIconSrc={assets_url.icon_arrow}
          onClick={onPlayLow}
        />
      </div>
    </div>
  );
};

export default HiLoDraw;
