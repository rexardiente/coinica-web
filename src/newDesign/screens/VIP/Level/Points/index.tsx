import {
  Grid,
  Divider,
  LinearProgress,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import LinearProgressBar from "newDesign/components/LinearProgressBar";
import { translate } from "helpers/translate";
import styles from "../Level.module.scss";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 15,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: "#191E35",
    },
    bar: {
      borderRadius: 10,
      backgroundColor: "#1785EB",
    },
  })
)(LinearProgress);

type Props = {
  vipPoints: { current: number; max: number };
  totalPayout: { current: number; max: number };
};

const Points = ({ vipPoints, totalPayout }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <div>{translate("vip.metrics.next_level")}</div>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.content}>
        <Grid container>
          <Grid item container direction="column" justifyContent="space-evenly">
            <Grid item>
              <div>{translate("vip.temp_data.progress_values.vip_points")}</div>
            </Grid>
            <Grid item>
              <LinearProgressBar
                currentValue={vipPoints.current}
                maxValue={vipPoints.max}
              />
            </Grid>
          </Grid>
          <Grid item container direction="column" justifyContent="space-evenly">
            <Grid item>
              <div>{translate("vip.temp_data.rank.titles.totalPayout")}</div>
            </Grid>
            <Grid item>
              <LinearProgressBar
                currentValue={vipPoints.current}
                maxValue={vipPoints.max}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Points;
