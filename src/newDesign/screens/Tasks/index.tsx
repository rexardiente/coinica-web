import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import HowItWorks from "newDesign/components/HowItWorks";
import { DailyTask, MonthlyTask, GameList } from "services/api/server/platform";
import { translate } from "helpers/translate";
import styles from "./Tasks.module.scss";
import GameTaskList from "./GameTaskList";
import { AxiosResponse } from "axios";

const defaultTaskObj = {
  gameName: "",
  currentProgress: 0,
  maxProgress: 0,
  vipPoints: 0,
};

type ReduxState = {
  platform: any;
};

type Task = typeof defaultTaskObj;
type StateTaskData = {
  dailyTaskData: Task[];
  monthlyTaskData: Task[];
};

const INSTRUCTION_LIST = [
  translate("task.instruction.one"),
  translate("task.instruction.two"),
  translate("task.instruction.three"),
];

const Tasks = () => {
  const { account } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState<StateTaskData>({
    dailyTaskData: [],
    monthlyTaskData: [],
  });
  const [error, setError] = useState("");

  const getTaskData = async (
    gameList: any[],
    cbFetchTasks: (
      userId: string,
      gameId: string
    ) => Promise<AxiosResponse<any>>
  ) => {
    if (gameList.length) {
      const taskDataArr = await Promise.all(
        gameList.map(async (game) => {
          let newTaskObj = { ...defaultTaskObj };
          const { data: taskData } = await cbFetchTasks(account.id, game.id);

          if (taskData) {
            newTaskObj.gameName = game.name;
            newTaskObj.currentProgress = taskData.game_count;
            newTaskObj.maxProgress = 10;
            newTaskObj.vipPoints = 1;
          } else {
            newTaskObj.gameName = game.name;
          }

          return newTaskObj;
        })
      );

      return taskDataArr;
    }
  };

  const getGameList = async () => {
    dispatch(setPageLoading(true));
    try {
      const { data } = await GameList();
      const daily = await getTaskData(data, DailyTask);
      const monthly = await getTaskData(data, MonthlyTask);

      setTaskData({
        dailyTaskData: daily as Task[],
        monthlyTaskData: monthly as Task[],
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  useEffect(() => {
    if (account) {
      getGameList();
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
      <Grid container xs>
        <Grid item xs={12}>
          <HowItWorks
            className={styles.howItWorks}
            instruction={INSTRUCTION_LIST}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6} md={12}>
            <GameTaskList data={taskData.dailyTaskData} />
          </Grid>
          <Grid item xs={6} md={12}>
            <GameTaskList data={taskData.monthlyTaskData} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Tasks;
