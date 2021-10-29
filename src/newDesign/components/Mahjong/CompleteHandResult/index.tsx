import { useHistory } from "react-router-dom";
import GetMahjongTile from "../Tiles";
import { translate } from "helpers/translate";
import { girlBgGold, completeHandText } from "../Assets";
import styles from "./CompleteHandResult.module.scss";
import GradientText from "newDesign/components/GradientText";

type CompleteHandModalProps = {
  tiles: Array<number>;
  isWin: boolean;
  scoreType: Array<any>;
  finalScore: number;
  playAgain: () => void;
};

const CompleteHandResultModal = ({
  tiles,
  isWin,
  scoreType,
  finalScore,
  playAgain,
}: CompleteHandModalProps) => {
  const history = useHistory();

  const renderTiles = () => {
    let imgTiles: any = [];
    if (tiles?.length) {
      for (let i = 0; i < tiles.length; i++) {
        const imgSrc: any = GetMahjongTile(tiles[i])?.src;
        imgTiles.push(<img src={imgSrc} alt="Tile" width="39" height="59" />);
      }
    }
    return imgTiles;
  };

  const handleGoBackHome = () => {
    history.push("/game/mahjong");
  };

  const pluralPtsWord = (points: number) => {
    if (points > 1) {
      return "PTS";
    }
    return "PT";
  };

  const finalScoreText = (score: number) => {
    return (
      <>
        {score || "0"} {pluralPtsWord(score)}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.resultDetails}>
          <img
            src={completeHandText}
            alt="complete hand"
            width="553"
            height="63"
          />

          <div className={styles.tilesWrapper}>{renderTiles()}</div>

          <div className={styles.divider} />

          <div className={styles.scoresContainer}>
            <div className={styles.totalPointsWrapper}>
              <div className={styles.totalPointsText}>
                {" "}
                <GradientText
                  text="Total Points"
                  fromColor="#EB9058"
                  toColor="#EB6756"
                  textAnchor="start"
                  x="0"
                />
              </div>
              <div className={styles.scoreText}>
                <GradientText
                  text={finalScoreText(finalScore)}
                  fromColor="#F7B820"
                  toColor="#FDE51F"
                  textAnchor="start"
                  width="auto"
                  height="1.2em"
                  x="0"
                />
              </div>
            </div>

            <div className={styles.scoreTypesWrapper}>
              {scoreType?.length
                ? scoreType.map((row) => (
                    <div className={styles.score}>
                      <span>
                        +{row.value ? `${row.value}` : "0"}{" "}
                        {pluralPtsWord(row.value)}{" "}
                      </span>
                      <span>
                        {row.score_name ||
                          translate("mj.gameplay.complete_hand_result.no_data")}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <div className={styles.btnDiv}>
            <button className={styles.rankingsBtn}>
              {translate("mj.gameplay.complete_hand_result.rankings")}
            </button>
            <button className={styles.homeBtn} onClick={handleGoBackHome}>
              {translate("mj.gameplay.complete_hand_result.home")}
            </button>
          </div>
          <button className={styles.playAgainBtn} onClick={playAgain}>
            {translate("mj.gameplay.complete_hand_result.play_again")}
          </button>
        </div>
        <img src={girlBgGold} alt="girl" className={styles.girlBg} />
      </div>
    </div>
  );
};

export default CompleteHandResultModal;
