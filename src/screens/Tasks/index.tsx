import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";
import Daily from "./Daily";
// import Weekly from "./Weekly";
import Monthly from "./Monthly";
import { TaskInstructions } from "components/ContentInstructions";
import "./Tasks.scss";
import { DailyTask, MonthlyTask, GameList } from "services/api/server/platform";

const defaultTasksObj = {
  game_name: "",
  currentProgress: 0,
  maxProgress: 0,
  vipPoints: 0,
  isCompleted: false,
};

type Task = typeof defaultTasksObj;

type Props = {
  name: string;
  id: string;
};

type State = {
  gameListData: Array<any>;
  dailyTaskData: Array<Task>;
  monthlyTaskData: Array<Task>;
  isLoading: Boolean;
  error: any;
};

class Tasks extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      gameListData: [],
      dailyTaskData: [],
      monthlyTaskData: [],
      isLoading: true,
      error: null,
    };
  }

  async getTasks(
    gameList: any[],
    cbFetchTasks: (
      userId: string,
      gameId: string
    ) => Promise<AxiosResponse<any>>
  ) {
    let tasksList: Array<Task> = [];

    if (gameList.length > 0) {
      for (const game of gameList) {
        let newTasksObj = { ...defaultTasksObj };
        if (this.props.id && game.id) {
          const task: any = await cbFetchTasks(this.props.id, game.id);

          if (task.data) {
            newTasksObj.game_name = game.name;
            newTasksObj.currentProgress = task.data.game_count;
            newTasksObj.maxProgress = 10;
            newTasksObj.vipPoints = 1;
            newTasksObj.isCompleted = task.data.game_count >= 10;
          } else {
            newTasksObj.game_name = game.name;
          }
        } else {
          newTasksObj.game_name = game.name;
        }

        tasksList.push(newTasksObj);
      }
    }

    return tasksList;
  }

  getGameList = async () => {
    const gameList: any = await GameList()
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log("error getting game list", error);
      });

      if(gameList){
        if (gameList.length > 0) {
          const dailyTasks: any = await this.getTasks(gameList, DailyTask);
          const monthlyTasks: any = await this.getTasks(gameList, MonthlyTask);
    
          this.setState({
            gameListData: gameList,
            dailyTaskData: dailyTasks,
            monthlyTaskData: monthlyTasks,
          });
        }
      }
  };

  async getMonthlyTaskList(gameId) {
    try {
      const res = await MonthlyTask(this.props.id, gameId);
      return res.data;
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error,
      });
      console.log("error getting monthly tasks", error);
    }
  }

  componentDidMount() {
    this.getGameList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getGameList();
    }
  }

  render() {
    const { dailyTaskData, monthlyTaskData } = this.state;

    return (
      <div id="tasks-container" className="p-5">
        <div className="daily-task">
          <Daily data={dailyTaskData} />
        </div>

        <div className="row mt-2">
          {/* <div className="col-md-6">
            <Weekly data={singleRate} />
          </div> */}
          <div className="col-12">
            <Monthly data={monthlyTaskData} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 col-xl-9">
            <TaskInstructions />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ platform }) => {
  const { account } = platform;
  return {
    name: account?.name,
    id: account?.id
  };
};

export default connect(mapStateToProps)(Tasks);
