import { useEffect } from "react";
import GradientText from "newDesign/components/GradientText";
import styles from "./PredictionResult.module.scss";

type PredictionResultProps = {
  isWin: boolean;
  showResult: boolean;
  playWin: Function;
  playLose: Function;
};

const PredictionResult = ({
  isWin,
  showResult,
  playWin,
  playLose,
}: PredictionResultProps) => {
  useEffect(() => {
    if (showResult) {
      if (isWin) {
        playWin();
      } else {
        playLose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWin, showResult]);

  const styleBg = isWin ? styles.successBg : styles.failBg;
  console.log("IsWin: win or lose ", isWin);
  return (
    <div className={[styles.container, styleBg].join(" ")}>
      {isWin ? (
        <GradientText
          text="SUCCESS"
          fromColor="#F8E37F"
          toColor="#EA9633"
          className={[styles.statusMessage, "strokeLightBrown5"].join(" ")}
        />
      ) : (
        <GradientText
          text="FAIL"
          fromColor="#DCACF2"
          toColor="#65529D"
          className={[styles.statusMessage, "strokeViolet5"].join(" ")}
        />
      )}
    </div>
  );
};

export default PredictionResult;
