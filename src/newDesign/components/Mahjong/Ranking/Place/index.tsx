import { Avatar } from "@material-ui/core";
import * as assets_url from "../../Assets";
import { translate } from "helpers/translate";
import styles from "./Place.module.scss";

type Props = {
  index: number;
  data: {
    userId: string;
    username: string;
    win_rate: number;
    total_payout: number;
  };
};
const Place = ({ index, data }: Props) => {
  const rank_imgs = [
    assets_url.rank_1st,
    assets_url.rank_2nd,
    assets_url.rank_3rd,
  ];

  const fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(2) : 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.userRankWrapper}>
        <div className={styles.rank}>
          <img
            alt="rank"
            src={rank_imgs[index]}
            width="88"
            height="68"
            className={styles.rankNumber}
          />{" "}
        </div>
        <div className={styles.user}>
          <Avatar variant="square" className={styles.avatarBg} />
          <div className={styles.nameWrapper}>
            <div>{data.username}</div>
            <div className={styles.divider} />
            <div>ID: {data.userId || "---"}</div>
          </div>
        </div>
      </div>
      <div className={styles.winsWrapper}>
        <div className={styles.winRate}>
          <div>{translate("mj.ranking.win_rate")}</div>
          <div>{data.win_rate}%</div>
        </div>
        <div className={styles.maxPayout}>
          <div>{translate("mj.ranking.max_payout")}</div>
          <div>{fixedVal(data.total_payout)}</div>
        </div>
      </div>
    </div>
  );
};

export default Place;
