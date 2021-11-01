import React from "react";
import { translate } from "helpers/translate";
import styles from "../Tutorial.module.scss";

const Rewards = () => {
  return (
    <>
      <div className={styles.title}>
        {translate("mj.tutorial.rewards.title")}
      </div>
      <div className={styles.paragraph}>
        <p className={styles.fontWeight_900}>
          {translate("mj.tutorial.rewards.daily.title")}:
        </p>

        <ul className={styles.rankingList}>
          <li>{translate("mj.tutorial.rewards.daily.p1")}</li>
          <li>{translate("mj.tutorial.rewards.daily.p2")}</li>
          <li>{translate("mj.tutorial.rewards.daily.p3")}</li>
        </ul>

        <p className={styles.fontWeight_900}>
          {translate("mj.tutorial.rewards.weekly.title")}:
        </p>
        <ul className={styles.rankingList}>
          <li>{translate("mj.tutorial.rewards.weekly.p1")}</li>
          <li>{translate("mj.tutorial.rewards.weekly.p2")}</li>
        </ul>

        <p className={styles.fontWeight_900}>
          {translate("mj.tutorial.rewards.monthly.title")}:
        </p>
        <ul className={styles.rankingList}>
          <li>{translate("mj.tutorial.rewards.monthly.p1")}</li>
          <li>{translate("mj.tutorial.rewards.monthly.p2")}</li>
        </ul>

        <p>
          {translate("mj.tutorial.rewards.time.daily", {
            span: (content) => (
              <span className={styles.fontWeight_900}>{content}</span>
            ),
          })}
        </p>

        <p>
          {translate("mj.tutorial.rewards.time.weekly", {
            span: (content) => (
              <span className={styles.fontWeight_900}>{content}</span>
            ),
          })}
        </p>

        <p>
          {translate("mj.tutorial.rewards.time.monthly", {
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
