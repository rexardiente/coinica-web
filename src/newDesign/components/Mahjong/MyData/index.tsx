import React, { useState, useRef } from "react";
import useResize from "helpers/hooks/useResize";
import { btn_close } from "../Assets";
import HiLoWins from "./WinningDetails/HiLoWins";
import MahjongWins from "./WinningDetails/MahjongWins";
import styles from "./MyData.module.scss";
import { translate } from "helpers/translate";

type Props = {
  onHide: () => void;
  playerID?: number;
  winRate?: number;
  maxPayout?: number;
  consecutiveHiLo?: number;
  name?: string;
};

const ModalWidth = 640;
const ModalHeight = 680;

// const initialModalSize = { width: 640, height: 680 };

const MyData = ({
  onHide,
  playerID,
  winRate,
  maxPayout,
  consecutiveHiLo,
  name,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // const [modalSize, setModalSize] = useState(initialModalSize);
  const [scale, setScale] = useState(1);
  const [showDetails, setShowDetails] = useState({
    mahjong: true,
    hilo: false,
  });
  // const paddingX = 30;

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse;
    // if (width < ModalWidth) {
    // const responsive = width - paddingX;
    ////To prevent image distortation set width and height the same
    // setModalSize({ width: responsive, height: responsive });
    const scaleValue = Math.min(width / ModalWidth, height / ModalHeight);
    setScale(scaleValue * 0.9);
    // }
    // else {
    //   setModalSize(initialModalSize);
    // }
  });

  const onToggleHilo = () => {
    setShowDetails((prevState) => ({
      ...prevState,
      hilo: !prevState.hilo,
    }));
  };

  const onToggleMahjong = () => {
    setShowDetails((prevState) => ({
      ...prevState,
      mahjong: !prevState.mahjong,
    }));
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
        <button className={styles.close} onClick={onHide}>
          <img alt="close" src={btn_close} width="28" height="28" />
        </button>
        <div className={styles.content}>
          <div className={styles.profilePicContainer}>
            <div className={styles.pic}></div>
            <div className={styles.nameContainer}>
              <div>{name}</div>
              <div>
                {translate("mj.my_data.id")}: {playerID}
              </div>
            </div>
          </div>

          <div className={styles.btnWrapper}>
            {showDetails.mahjong && (
              <MahjongWins
                maxPayout={maxPayout}
                consHiLo={consecutiveHiLo}
                winRate={winRate}
              />
            )}
            {showDetails.hilo && (
              <HiLoWins
                tiles={[1, 14, 56, 23, 136, 1, 14, 54, 23, 136, 44, 78, 99, 2]}
              />
            )}
            <button
              className={styles.btn}
              onClick={onToggleMahjong}
              disabled={showDetails.hilo}
            >
              Mahjong
            </button>
            <button
              className={styles.btn}
              onClick={onToggleHilo}
              disabled={showDetails.mahjong}
            >
              Hi Lo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyData;
