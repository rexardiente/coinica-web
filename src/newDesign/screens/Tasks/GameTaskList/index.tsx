import GameTasks from "../GameTask";
import styles from "./GameTaskList.module.scss";

type Tasks = {
  game: any;
  count: number;
  points: number;
  progress:number;
};
type Props = { data: Tasks[] };

const GameTask = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.map((task: Tasks) => (
        <GameTasks
          gameName={task.game.name}
          currentProgress={task.progress? task.progress : 0}
          maxProgress={task.count}
          vipPoints={task.points}
        />
      ))}
    </div>
  );
};

export default GameTask;
