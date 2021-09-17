import GameTasks from "../GameTask";
import styles from "./GameTaskList.module.scss";

type Tasks = {
  gameName: string;
  currentProgress: number;
  maxProgress: number;
  vipPoints: number;
};
type Props = { data: Tasks[] };

const GameTask = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.map((task: Tasks) => (
        <GameTasks
          gameName={task.gameName}
          currentProgress={task.currentProgress}
          maxProgress={task.maxProgress}
          vipPoints={task.vipPoints}
        />
      ))}
    </div>
  );
};

export default GameTask;
