import { Avatar } from "@material-ui/core";
import styles from "./Place.module.scss";
import * as assets from "../../Assets";

const trophies = [
  assets.trophy_gold,
  assets.trophy_silver,
  assets.trophy_bronze,
];

type Props = {
  index: number;
  playerName: string;
  points: number;
};

const Place = ({ playerName, points, index }: Props) => {
  return (
    <div className={styles.container}>
      <Avatar variant="square" className={styles.avatarBg} />
      <div className={styles.playerPoints}>
        <div>{playerName || "---"}</div>
      </div>
      <img className={styles.trophy} alt="trophy" src={trophies[index]} />
    </div>
  );
};

export default Place;
