import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import useResize from "helpers/hooks/useResize";
import * as assets from "../Assets";
import { translate } from "helpers/translate";
import styles from "./MenuComponent.module.scss";

type Props = {
  onHide: () => void;
  onResetGame: () => void;
};

const ModalWidth = 400;
const ModalHeight = 500;

const MenuComponent = ({ onHide, onResetGame }: Props) => {
  const history = useHistory();
  const [playGoHome] = useSound(assets.sounds.home, { volume: 0.5 });

  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useResize(ref, (resizeResponse) => {
    const { width, height } = resizeResponse;
    const scaleValue = Math.min(width / ModalWidth, height / ModalHeight);
    setScale(scaleValue * 0.9);
  });

  const handleGoBackHome = () => {
    playGoHome();
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
        <div className={styles.menu}>
          <h1 className="text-stroke-brown">{translate("mj.gameplay.menu.title")}</h1>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.rankingsBtn}>
            <div>{translate("mj.gameplay.menu.rankings")}</div>
          </button>
          <button className={styles.homeBtn} onClick={handleGoBackHome}>
            <div>{translate("mj.gameplay.menu.home")}</div>
          </button>
          <button className={styles.resetGame} onClick={onResetGame}>
            <div>{translate("mj.gameplay.menu.reset")}</div>
          </button>
          <button className={styles.closeBtn} onClick={onHide}>
            <div className="text-stroke-brown">{translate("mj.gameplay.menu.close")}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
