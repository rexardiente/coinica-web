import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import { Rank, Points } from "./Level";
import HowItWorks from "newDesign/components/HowItWorks";
import Benefits from "./Benefits";
import { GetVIP } from "services/api/server/platform";
import { translate } from "helpers/translate";
import * as assets from "./Assets";
import styles from "./VIP.module.scss";

type ReduxState = {
  platform: any;
};

const INSTRUCTION_LIST = [
  translate("vip.how_it_works.list.item.first"),
  translate("vip.how_it_works.list.item.second"),
  translate("vip.how_it_works.list.item.third"),
  translate("vip.how_it_works.list.item.fourth"),
];

const VIP = () => {
  const { account } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  const [data, setData] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<any>();

  const getVip = async () => {
    dispatch(setPageLoading(true));
    try {
      const res = await GetVIP(account?.id);
      setData({ ...res.data });
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  useEffect(() => {
    if (account?.id) {
      getVip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id]);

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  const { rank, points, payout, next_rank } = data;
  const DUMMY_PROGRESS_VALUE = { current: 50, max: 100 };
  return (
    <Fragment>
      <Grid container>
        <Grid item className={styles.bannerWrapper} xs={12}>
          <img alt="banner" src={assets.banner} width="984" height="340" />
        </Grid>
        <Grid item container xs={12} justifyContent="space-between">
          <Grid item className={styles.levelWrapper} xs={12}>
            <Rank
              username="John Doe"
              data={{ rank, points, payout, next_rank }}
            />
          </Grid>
          <Grid item className={styles.levelWrapper} xs={12}>
            <Points
              vipPoints={DUMMY_PROGRESS_VALUE}
              totalPayout={DUMMY_PROGRESS_VALUE}
            />
          </Grid>
        </Grid>
        <Grid item className={styles.howItWorksWrapper} xs={12}>
          <HowItWorks instruction={INSTRUCTION_LIST} />
        </Grid>
        <Grid item xs={12}>
          <Benefits />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default VIP;
