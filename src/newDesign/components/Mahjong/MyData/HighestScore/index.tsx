import { translate } from "helpers/translate";
import GetMahjongTile from "../../Tiles";
import styles from "./HighestScore.module.scss";

type Props = {
  tiles: Array<number>;
};

const Profile = ({ tiles }: Props) => {
  const renderTile = () => {
    let TILES: any = [];
    if (tiles.length) {
      for (let i = 0; i < tiles.length; i++) {
        const imgSrc: any = GetMahjongTile(tiles[i])?.src;
        TILES.push(
          <img
            src={imgSrc}
            className={styles.cardsImg}
            alt="Tile"
            width="25"
            height="40"
          />
        );
      }
    }
    return TILES;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {translate("mj.my_data.hilo.highest_score")}
      </div>
      <div className={styles.divider} />
      <div className={styles.tiles}>{renderTile()}</div>
      <div className={styles.scoreType}>
        <span>{translate("mj.my_data.hilo.score_type")}</span>
        <span>0 {translate("mj.my_data.hilo.score_points")}</span>
      </div>
    </div>
  );
};

export default Profile;
