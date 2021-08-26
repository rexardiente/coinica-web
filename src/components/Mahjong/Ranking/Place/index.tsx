import React from "react";
import * as assets_url from "../../Assets";
import { translate } from "helpers/translate";
import styles from "../Ranking.module.scss";

type Props = {
  index: number;
  data: any;
};
const Place = ({ index, data }: Props) => {
  const rank_imgs = [
    assets_url.rank_1st,
    assets_url.rank_2nd,
    assets_url.rank_3rd,
  ];

  const fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(4) : 0;
  };

  return (
    <div className={styles.placeContainer}>
      <div className={styles.order}>
        <img alt="rank" src={rank_imgs[index]} />{" "}
      </div>
      <div className={styles.user}>
        <div className={styles.pic}></div>
        <div className={styles.nameContainer}>
          <div>{data.username}</div>
        </div>
      </div>
      <div className={styles.winsWrapper}>
        <div className={styles.winRate}>
          <span>{translate("mj.ranking.win_rate")}</span>
          <span>{data.win_rate}%</span>
        </div>
        <div className={styles.maxPayout}>
          <span>{translate("mj.ranking.max_payout")}</span>
          <span>{fixedVal(data.total_payout)}</span>
        </div>
      </div>
    </div>
  );
};

export default Place;
