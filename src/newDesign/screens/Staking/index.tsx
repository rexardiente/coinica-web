import React from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { CoinicaStakingIcon, StakingIcon, RewardsIcon } from "./Assets";
import styles from "./Staking.module.scss";

const Staking = () => {

  return (
    <Grid container className={styles.container}>
      <Box className={styles.mainheaderContainer}>
        <Grid container className={styles.mainheader}>
          <Grid item xs={12} md={5} className={styles.main_icon}>
            <img src={CoinicaStakingIcon} alt="" />
          </Grid>
          <Grid item xs={12} md={7} className={styles.main_desc}>
            <h2>Coinica Staking</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliqu
            </p>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.stakeRewardContainer}>
        <Box className={styles.stake_reward}>
          <Box className={styles.stake}>
            <Box textAlign="center">
              <img src={StakingIcon} alt="" />
              <h3>Staking</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipi elit,  sed do eiusmod tempor incididunt ut labor.</p>
              <Button variant="contained" color="primary">
                Stake Coin
              </Button>
            </Box>
          </Box>
          <Box className={styles.reward}>
            <Box textAlign="center">
              <img src={RewardsIcon} alt="" />
              <h3>Rewards</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipi elit,  sed do eiusmod tempor incididunt ut labor.</p>
              <Button variant="contained" color="primary">
                View Rewards
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Staking;
