import React, { useState, useRef } from "react";
import useResize from "helpers/hooks/useResize";
import GameFlow from "./GameFlow";
import HiLo from "./HiLo";
import Mahjong from "./Mahjong";
import Rewards from "./Rewards";
import { btn_close } from "../Assets";
import { translate } from "helpers/translate";
import styles from "./Rules.module.scss";

type Props = {
  onHide: () => void;
};

const defaultModalWidth = 816;
const defaultModalHeight = 566;

const Rules = ({ onHide }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [modalWidth, setModalWidth] = useState(defaultModalWidth);
  const paddingX = 30;

  useResize(ref, (resizeResponse) => {
    const { width } = resizeResponse;
    if (width < defaultModalWidth) {
      setModalWidth(width - paddingX);
    } else {
      setModalWidth(defaultModalWidth);
    }
  });

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={styles.modal}
        style={{
          maxWidth: `${modalWidth}px`,
          height: `${defaultModalHeight}px`,
        }}
      >
        <button className={styles.close} onClick={onHide}>
          <img alt="close" src={btn_close} width="28" height="28" />
        </button>
        <div className={styles.header}>
          <h1 className="text-stroke-brown">{translate("mj.help.rules.title")}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <GameFlow />
            <HiLo />
            <Mahjong />
            <Rewards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
