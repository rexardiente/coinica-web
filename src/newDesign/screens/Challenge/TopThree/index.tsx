import Place from "./Place";
import styles from "./TopThree.module.scss";

type Players = { username: string; points: number };
type Props = {
  data: Players[];
};
const TopThree = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.length &&
        data.map(({ username, points }: Players, index) => (
          <Place playerName={username} points={points} index={index} />
        ))}
    </div>
  );
};

export default TopThree;
