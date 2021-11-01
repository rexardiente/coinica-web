import { Grid } from "@material-ui/core";
import { translate } from "helpers/translate";
import truncateNumber from "helpers/numbers/truncate";
import styles from "../Tabs.module.scss";

type Props = {
  shortestRound: number;
  avgWinScore: number;
  avgWinRound: number;
};

const HiLoWins = ({ shortestRound, avgWinScore, avgWinRound }: Props) => {
  return (
    <Grid container className={styles.winsContainer}>
      <Grid item container xs={6} justifyContent="center" alignItems="center">
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.shortest_round")}</span>
          <span>{truncateNumber(shortestRound, 4)}</span>
        </Grid>
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.average_score")}</span>
          <span>{truncateNumber(avgWinScore, 4)}</span>
        </Grid>
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.average_round")}</span>
          <span>{truncateNumber(avgWinRound, 4)}</span>
        </Grid>
      </Grid>
      <Grid item container xs={6} justifyContent="center" alignItems="center">
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.win_rate")}</span>
          <span>0</span>
        </Grid>
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.wins")}</span>
          <span>0</span>
        </Grid>

        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.hilo.game_played")}</span>
          <span>0</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HiLoWins;
