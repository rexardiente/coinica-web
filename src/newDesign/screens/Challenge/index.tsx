import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import {
  GetChallengeRankToday,
  GetChallengeRankYesterday,
  GetUsernameAccountById,
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
  user: string;
  playerName: string;
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

  const getUsername = async (data: ChallengeData[]) => {
    try {
      if (data.length) {
        return await Promise.all(
          data.map(async (account: ChallengeData) => {
            const res = await GetUsernameAccountById(account.user);

            return { ...account, playerName: res.data[1] };
          })
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  const getChallengeRank = async (val: string) => {
    dispatch(setPageLoading(true));
    try {
      const res = await (val === "yesterday"
        ? GetChallengeRankYesterday
        : GetChallengeRankToday)();

      const data = val === "yesterday" ? res.data.rank_users : res.data;
      const formattedChallengeData = await getUsername(data);

      setChallengeData(formattedChallengeData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  const topThree = () => {
    if (challengeData.length) {
      let top = challengeData.slice(0, 3);
      return top.length < 3
        ? [...top, ...new Array(3 - top.length).fill({})]
        : top;
    }
    return new Array(3).fill({});
  };

  const handleToggle = (e, value: any) => {
    setSelectedToggle(value);
    getChallengeRank(value);
  };

  useEffect(() => {
    if (account) {
      handleToggle(null, "today");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Fragment>
      <Grid container xs className={styles.container}>
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
