import { Grid, Divider } from "@material-ui/core";
import { translate } from "helpers/translate";
import * as assets from "../../Assets";
import styles from "../Level.module.scss";

type Props = {
  username: string;
  data: { rank: string; payout: number; points: number; next_rank: string };
};
// TODO: create dynamic component for Rank bronze, silver and gold
const Rank = ({ username, data }: Props) => {
  const fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(6) : 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <div>{username}</div>
        <img src={assets.vipText} width="50" height="28" alt="vip" />
      </div>

      <Divider className={styles.divider} />

      <div className={styles.content}>
        <Grid container>
          <Grid item container>
            <Grid item xs={6}>
              {translate("vip.temp_data.rank.titles.rank")}{" "}
              <span> {translate("vip.temp_data.rank.titles.rank.sub")} </span>
            </Grid>
            <Grid item xs={6} className={styles.text_right}>
              <span>{data.rank || "__"} </span>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              {translate("vip.temp_data.rank.titles.totalPayout")}
              <span> {translate("vip.temp_data.rank.titles.rank.sub")} </span>
            </Grid>
            <Grid item xs={6} className={styles.text_right}>
              <span>{fixedVal(data.payout)}</span>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              {translate("vip.temp_data.rank.titles.total_vip_points")}
              <span> {translate("vip.temp_data.rank.titles.rank.sub")} </span>
            </Grid>
            <Grid item xs={6} className={styles.text_right}>
              <span>{fixedVal(data.points)}</span> Pts
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              {translate("vip.temp_data.rank.titles.estimated_rank")}
              <span> {translate("vip.temp_data.rank.titles.rank.sub")} </span>
            </Grid>
            <Grid item xs={6} className={styles.text_right}>
              <span>{data.next_rank || "__"}</span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Rank;
