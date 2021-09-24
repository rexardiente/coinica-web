import Place from "./Place";
import styles from "./TopThree.module.scss";

type Players = { playerName: string; vipPoints: number };
type Props = {
  data: Players[];
};
const TopThree = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.length &&
        data.map(({ playerName, vipPoints }: Players, index) => (
          <Place playerName={playerName} vipPoints={vipPoints} index={index} />
        ))}
    </div>
  );
};

export default TopThree;
