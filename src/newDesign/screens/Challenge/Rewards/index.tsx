import { Typography, Grid } from "@material-ui/core";
import { translate } from "helpers/translate";
import { rewardSet } from "./data";
import styles from "./Rewards.module.scss";

const Rewards = () => {
  return (
    <div className={styles.container}>
      <Typography component="h2" variant="h4" className={styles.title}>
        {translate("challenge.payout.title")}
      </Typography>

      <Grid container spacing={2}>
        {rewardSet.map((reward, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className={styles.id}>
              {translate("challenge.payout.reward")} {reward.id}:
            </div>
            <div className={styles.minMax}>
              {" "}
              {reward.min} {reward.max ? "- " + reward.max : ""}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Rewards;
