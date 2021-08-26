import React from "react";
import { arrow } from "../../Assets";
import { translate } from "helpers/translate";
import styles from "../Rules.module.scss";

const GameFlow = () => {
  return (
    <>
      <div className={styles.title}>{translate("mj.help.game_flow.title")}</div>
      <div className={styles.paragraph}>
        <p>
          {" "}
          {translate("mj.help.game_flow.p1")}
        </p>

        <p>{translate("mj.help.game_flow.p2")}</p>

        <p>
          {" "}
          {translate("mj.help.game_flow.p3")}
        </p>

        <p>
          {" "}
          {translate("mj.help.game_flow.p4")}
        </p>

        <p>
          {" "}
          {translate("mj.help.game_flow.p5")}
        </p>

        <p>
          {" "}
          {translate("mj.help.game_flow.p6")}
        </p>
      </div>
      <div className={styles.diagramContainer}>
        <div className={styles.box}>{translate("mj.help.game_flow.deposit")}</div>
        <div className={`${styles.arrow} ${styles.arrow1}`}>
          <img alt="arrow" src={arrow} />
        </div>
        <div className={styles.box}>{translate("mj.help.game_flow.hilo")}</div>
        <div className={`${styles.arrow} ${styles.arrow2}`}>
          <img alt="arrow" src={arrow} />
        </div>
        <div className={styles.box}>{translate("mj.help.game_flow.mahjong")}</div>
        <div className={styles.break1}>
          <div className={`${styles.arrow} ${styles.arrow3}`}>
            <img alt="arrow" src={arrow} />
          </div>
          <div className={`${styles.arrow} ${styles.arrow4}`}>
            <img alt="arrow" src={arrow} />
          </div>
          <div className={`${styles.arrow} ${styles.arrow5}`}>
            <img alt="arrow" src={arrow} />
          </div>
        </div>
        <div className={styles.break2}> </div>
        <div className={`${styles.box} ${styles.refresh}`}>
          {translate("mj.help.game_flow.refresh_game")}
        </div>
        <div className={`${styles.box} ${styles.complete}`}>{translate("mj.help.game_flow.complete_hand")}</div>
      </div>
    </>
  );
};

export default GameFlow;
