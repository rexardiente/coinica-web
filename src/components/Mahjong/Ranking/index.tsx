import React, { useState, useRef } from "react";
import useResize from "helpers/hooks/useResize";
import { btn_close } from "../Assets";
import Place from "./Place";
import { translate } from "helpers/translate";
import styles from "./Ranking.module.scss";

type Props = {
  onHide: () => void;
  ranking: Array<any>;
};

const ModalWidth = 490;
const ModalHeight = 566;

const Ranking = ({ onHide, ranking }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse;
    const scaleValue = Math.min(width / ModalWidth, height / ModalHeight);
    setScale(scaleValue * 0.9);
  });

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
        <div className={styles.header}>
          <h1 className="text-stroke-brown">{translate("mj.ranking.title")}</h1>
        </div>
        <div className={styles.content}>
          {ranking.length > 0 ?
            ranking.map((rank, index) => {
              return (
                <Place data={rank} index={index} />
              )
            })
            :
            translate("misc.noAvailableData")
          }
        </div>
      </div>
    </div>
  );
};

export default Ranking;
