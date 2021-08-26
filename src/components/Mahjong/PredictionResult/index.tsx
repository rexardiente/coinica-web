import React, { useEffect } from "react";
import * as assets from "../Assets";
import styles from "./PredictionResult.module.scss";

type PredictionResultProps = {
  isWin: boolean;
  isPlaySound: boolean;
  playWin: Function;
  playLose: Function;
};

const PredictionResult = ({
  isWin,
  isPlaySound,
  playWin,
  playLose,
}: PredictionResultProps) => {
  useEffect(() => {
    if (isPlaySound) {
      if (isWin) {
        playWin();
      } else {
        playLose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWin, isPlaySound]);

  return (
    <div className={styles.container}>
      {isWin ? (
        <img src={assets.prediction_success} alt="Prediction Fail" />
      ) : (
        <img src={assets.prediction_fail} alt="Prediction Success" />
      )}
    </div>
  );
};

export default PredictionResult;
