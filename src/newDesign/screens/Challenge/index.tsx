import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import {
  GetChallengeRankToday,
  GetChallengeRankYesterday,
} from "services/api/server/platform";
import { translate } from "helpers/translate";
import Header from "./Header";
import TopThree from "./TopThree";
import LeaderBoardTable from "./LeaderBoardTable";
import Rewards from "./Rewards";
import styles from "./Challenge.module.scss";

const toggleOpts = [
  {
    value: "yesterday",
    label: translate("challenge.yesterday.button") as unknown as string,
  },
  {
    value: "today",
    label: translate("challenge.today.button") as unknown as string,
  },
];

type ReduxState = {
  platform: any;
};

type ChallengeData = {
  username: string;
  bets: number;
  wagered: number;
  ratio: number;
  points: number;
};

const Challenge = () => {
  const { account } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  const [challengeData, setChallengeData] = useState<ChallengeData[]>([]);
  const [selectedToggle, setSelectedToggle] = useState("yesterday");
  const [error, setError] = useState("");

  const getChallengeRank = async (val: string) => {
    dispatch(setPageLoading(true));
    try {
      const res = await (val === "yesterday"
        ? GetChallengeRankYesterday
        : GetChallengeRankToday)();

      setChallengeData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  const topThree = () => {
    if(challengeData){
      if (challengeData.length) {
        let top = challengeData.slice(0, 3);
        return top.length < 3
          ? [...top, ...new Array(3 - top.length).fill({})]
          : top;
      }
    }
    return new Array(3).fill({});
  };

  const handleToggle = (e, value: any) => {
    setSelectedToggle(value);
  };

  useEffect(() => {
    if (selectedToggle) {
      getChallengeRank(selectedToggle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToggle]);

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
          <TopThree data={topThree()} />
        </Grid>
        <Grid item xs={12}>
          <LeaderBoardTable data={challengeData} />
        </Grid>
        <Grid item xs={12}>
          <Rewards />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Challenge;
