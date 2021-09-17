import { Grid, Box } from "@material-ui/core";
import * as assets from "../../Assets";
import { translate } from "helpers/translate";
import styles from "./Rate.module.scss";

type Props = {
  rate: number;
  bonus: number;
};

const RateDetails = ({ rate, bonus }: Props) => {
  return (
    <Box className={styles.container}>
      <Grid item xs={12} sm={6} className={styles.infoWrapper}>
        <img src={assets.userAdd} width="75" height="70" alt="user add" />
        <div className={styles.infoPercentage}>
          <div>{translate("referral.rate")}</div>
          <div>{rate || 0}%</div>
        </div>
      </Grid>
      <div className={styles.divider}></div>
      <Grid item xs={12} sm={6} className={styles.infoWrapper}>
        <img src={assets.coin} width="75" height="70" alt="coin" />
        <div className={styles.infoPercentage}>
          <div>{translate("referral.bonus")}</div>
          <div>{bonus || 0}</div>
        </div>
      </Grid>
    </Box>
  );
};

export default RateDetails;
