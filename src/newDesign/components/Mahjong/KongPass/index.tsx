import GetMahjongTile from "../Tiles";
import { curveBg, girlBgBlue } from "../Assets";
import GradientText from "newDesign/components/GradientText";
import styles from "./Kong.module.scss";

type Props = {
  onDeclare: () => void;
  onHide: () => void;
  tiles: Array<number>;
};
const Kong = ({ onDeclare, onHide, tiles }: Props) => {
  const renderTiles = () => {
    let imgTiles: any = [];
    if (tiles?.length) {
      for (let i = 0; i < tiles.length; i++) {
        const imgSrc: any = GetMahjongTile(tiles[i])?.src;
        imgTiles.push(
          <img
            src={imgSrc}
            className={styles.cardsImg}
            alt="Tile"
            width="75"
            height="110"
          />
        );
      }
    }
    return imgTiles;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tiles}>
          <div className={styles.cards}>{renderTiles()}</div>
          <button type="button" className={styles.btnKong} onClick={onDeclare}>
            <GradientText
              text="Kong"
              fromColor="#6FE5FF"
              toColor="#83B4FF"
              className={[
                styles.btnFont,
                styles.btnKongText,
                "strokeDarkBlue8",
              ].join(" ")}
            />
          </button>

          <button type="button" className={styles.btnPass} onClick={onHide}>
            <GradientText
              text="Pass"
              fromColor="#ECF2FF"
              toColor="#B9C8EB"
              className={[
                styles.btnFont,
                styles.btnPassText,
                "strokeLightBlue8",
              ].join(" ")}
            />
          </button>
        </div>
        <img src={curveBg} alt="background" className={styles.curveBg} />
        <img src={girlBgBlue} alt="girl" className={styles.girlBg} />
      </div>
    </div>
  );
};

export default Kong;
