import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import {
  GetDailyRanking,
  GetMonthlyRanking,
} from "services/api/server/platform";
import { translate } from "helpers/translate";
import Header from "./Header";
import TabRanking from "./TabRanking";
import styles from "./Challenge.module.scss";

const toggleOpts = [
  {
    value: "history",
    label: translate("ranking.history.button") as unknown as string,
  },
  {
    value: "24",
    label: translate("ranking.hours.button") as unknown as string,
  },
];

const initialRankData = {
  profits: [],
  payouts: [],
  wagered: [],
  multipliers: [],
};

type ReduxState = {
  platform: any;
};
type RankData = typeof initialRankData;
type ToggleOpts = "24" | "history";
type Tabs = "profits" | "payout" | "wagered" | "multiplier";

const Ranking = () => {
  const { account } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  const [rankData, setRankData] = useState<RankData>(initialRankData);
  const [selectedToggle, setSelectedToggle] = useState<ToggleOpts>("24");
  const [selectedTab, setSelectedTab] = useState<Tabs>("profits");

  const [error, setError] = useState("");

  const getRanking = async (filter: string) => {
    dispatch(setPageLoading(true));
    try {
      const {
        data: { profits, payouts, wagered, multipliers },
      } = await (filter === "24" ? GetDailyRanking : GetMonthlyRanking)();

      setRankData({
        profits,
        payouts,
        wagered,
        multipliers,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  const handleToggle = (e, value: any) => {
    setSelectedToggle(value);
  };

  const handleChangeTab = (event, tabValue) => {
    setSelectedTab(tabValue);
  };

  useEffect(() => {
    if (account && selectedToggle) {
      getRanking(selectedToggle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, selectedToggle]);

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Fragment>
      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Header
            value={selectedToggle}
            toggleOptions={toggleOpts}
            onChange={handleToggle}
          />
        </Grid>
        <Grid item xs={12}>
          <TabRanking
            data={rankData}
            onChangeTab={handleChangeTab}
            selectedTab={selectedTab}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Ranking;
