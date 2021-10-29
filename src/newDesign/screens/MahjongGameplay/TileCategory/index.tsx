import { GetWindTile } from "newDesign/components/Mahjong/Tiles";
import { translate } from "helpers/translate";
import GradientText from "newDesign/components/GradientText";
import styles from "./TileCategory.module.scss";

type Props = {
  tiles: Array<number>;
};
const TileCategory = ({ tiles }: Props) => {
  return (
    <div className={styles.container}>
      <GradientText
        text={translate("mj.gameplay.winds")}
        fromColor="#F8E37F"
        toColor="#EA9633"
        className={[styles.category, "strokeBrown5"].join(" ")}
      />
      <div className={styles.tiles}>
        {tiles.length &&
          tiles.map((tile, idx) => (
            <img
              key={idx}
              src={GetWindTile(tile) as string}
              alt="tile"
              height="60"
              width="40"
            />
          ))}
      </div>
    </div>
  );
};

export default TileCategory;
