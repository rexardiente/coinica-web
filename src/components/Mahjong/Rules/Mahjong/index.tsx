import React from "react";
import { translate } from "helpers/translate";
import styles from "../Rules.module.scss";

const Hilo = () => {
  return (
    <>
      <div className={styles.title}>2. {translate("mj.help.mahjong.title")}</div>
      <div className={styles.paragraph}>
        <p>
          {" "}
          {translate("mj.help.mahjong.p1")}
        </p>
        <p>
          {translate("mj.help.mahjong.p2")}
        </p>
        <p>
          {translate("mj.help.mahjong.p3")}
        </p>
        <div className={styles.title}>{translate("mj.help.mahjong.hand.title")}</div>
        <p>
          {translate("mj.help.mahjong.hand.p1")}
        </p>

        <p>
          {translate("mj.help.mahjong.hand.p2")}
        </p>

        <div className={styles.title}>
          {translate("mj.help.mahjong.win_point.title")}
        </div>
        <p> {translate("mj.help.mahjong.win_point.p1")}</p>

        <p>
          {translate("mj.help.mahjong.win_point.p2", {
            span: (content) => <span className={styles.fontWeight_900}>{content}</span>
          })}
        </p>

        <p>
          {translate("mj.help.mahjong.win_point.p3", {
            span: (content) => <span className={styles.fontWeight_900}>{content}</span>
          })}
        </p>

        <p>
          {translate("mj.help.mahjong.win_point.p4", {
            span: (content) => <span className={styles.fontWeight_900}>{content}</span>
          })}
        </p>
      </div>
    </>
  );
};

export default Hilo;
