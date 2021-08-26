import React from "react";
import { translate } from "helpers/translate";
import styles from "../Rules.module.scss";

const Rewards = () => {
  return (
    <>
      <div className={styles.title}>{translate("mj.help.rewards.title")}</div>
      <div className={styles.paragraph}>
        <p className={styles.fontWeight_900}>
          {translate("mj.help.rewards.daily.title")}:
        </p>

        <ul className={styles.rankingList}>
          <li>{translate("mj.help.rewards.daily.p1")}</li>
          <li>{translate("mj.help.rewards.daily.p2")}</li>
          <li>{translate("mj.help.rewards.daily.p3")}</li>
        </ul>

        <p className={styles.fontWeight_900}>
          {translate("mj.help.rewards.weekly.title")}:
        </p>
        <ul className={styles.rankingList}>
          <li>{translate("mj.help.rewards.weekly.p1")}</li>
          <li>{translate("mj.help.rewards.weekly.p2")}</li>
        </ul>

        <p className={styles.fontWeight_900}>
          {translate("mj.help.rewards.monthly.title")}:
        </p>
        <ul className={styles.rankingList}>
          <li>{translate("mj.help.rewards.monthly.p1")}</li>
          <li>{translate("mj.help.rewards.monthly.p2")}</li>
        </ul>

        <p>
          {translate("mj.help.rewards.time.daily", {
            span: (content) => (
              <span className={styles.fontWeight_900}>{content}</span>
            ),
          })}
        </p>

        <p>
          {translate("mj.help.rewards.time.weekly", {
            span: (content) => (
              <span className={styles.fontWeight_900}>{content}</span>
            ),
          })}
        </p>

        <p>
          {translate("mj.help.rewards.time.monthly", {
            span: (content) => (
              <span className={styles.fontWeight_900}>{content}</span>
            ),
          })}
        </p>
      </div>
    </>
  );
};

export default Rewards;
