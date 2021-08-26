import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useResize from "helpers/hooks/useResize";
import { translate } from "helpers/translate";
import { lose, complete_hand } from "../Assets";
import styles from "./CompleteHandResult.module.scss";

const ModalWidth = 700;
const ModalHeight = 500;

type CompleteHandModalProps = {
  isWin: boolean;
  scoreType: Array<any>;
  finalScore: number;
  playAgain: () => void;
};

const CompleteHandModal = ({
  isWin,
  scoreType,
  finalScore,
  playAgain,
}: CompleteHandModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const history = useHistory();

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse;
    const scaleValue = Math.min(width / ModalWidth, height / ModalHeight);
    setScale(scaleValue * 0.9);
  });

  const handleGoBackHome = () => {
    history.push("/game/mahjong");
  };

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={styles.modal}
        style={{
          zoom: scale > 1 ? 1 : scale,
          minWidth: `${ModalWidth}px`,
          maxWidth: `${ModalWidth}px`,
          height: `${ModalHeight}px`,
        }}
      >
        {isWin ? (
          <>
            <img src={complete_hand} alt="Complete Hand" />

            <div className={styles.col}>
              {Boolean(scoreType?.length) &&
                scoreType.map((row) => (
                  <div className={`${styles.row} my-2`}>
                    <span className={styles.name}>
                      {row.score_name || translate("mj.gameplay.complete_hand_result.no_data")}
                    </span>
                    <span className={styles.value}>
                      {row.value ? `${row.value} pt` : "0 pt"}
                    </span>
                  </div>
                ))}
              <div className={`${styles.row} my-2`}>
                <span className={styles.total}>{translate("mj.gameplay.complete_hand_result.total_score")}</span>
                <span className={styles.value}>
                  {finalScore ? `${finalScore} pt` : "0 pt"}
                </span>
              </div>
            </div>
          </>
        ) : (
          <img src={lose} alt="Complete Hand" />
        )}
        <div className={styles.btnContainer}>
          <div className={styles.btnDiv}>
            <button className={styles.rankingsBtn}>
              <div>{translate("mj.gameplay.complete_hand_result.rankings")}</div>
            </button>
            <button className={styles.homeBtn} onClick={handleGoBackHome}>
              <div>{translate("mj.gameplay.complete_hand_result.home")}</div>
            </button>
          </div>
          <button className={styles.playAgain} onClick={playAgain}>
            <div className="text-stroke-brown"> {translate("mj.gameplay.complete_hand_result.play_again")}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteHandModal;
