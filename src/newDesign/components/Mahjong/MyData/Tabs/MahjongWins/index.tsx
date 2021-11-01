import { Grid } from "@material-ui/core";
import truncateNumber from "helpers/numbers/truncate";
import { translate } from "helpers/translate";
import styles from "../Tabs.module.scss";

type Props = {
  hiloWinRate: number;
  maxPayout: number;
  consHilo: number;
};

const MahjongWins = ({ hiloWinRate, maxPayout, consHilo }: Props) => {
  return (
    <Grid container className={styles.winsContainer}>
      <Grid item container xs={6} justifyContent="center" alignItems="center">
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.mahjong.win_rate")}</span>
          <span>{truncateNumber(hiloWinRate, 4)}</span>
        </Grid>
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.mahjong.max_payout")}</span>
          <span>{truncateNumber(maxPayout, 4)}</span>
        </Grid>
        <Grid item className={styles.details} xs={10}>
          <span>{translate("mj.my_data.mahjong.consecutive")}</span>
          <span>{truncateNumber(consHilo, 4)}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MahjongWins;
