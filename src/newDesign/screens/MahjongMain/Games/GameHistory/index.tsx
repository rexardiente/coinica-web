import GetMahjongTile from "components/Mahjong/Tiles";
import styles from "./GamesHistory.module.scss";

type GradientColor =
  | {
      colors: Array<string>;
      strokeWidth_2: string;
      strokeWidth_4: string;
    }
  | undefined;

type Props = {
  id: string | number;
  title: string;
  tiles: Array<string | number>;
  txId: string;
  txDate: Date | string | number;
  status: string;
};

const GameHistory = ({ id, title, tiles, txId, txDate, status }: Props) => {
  const renderTiles = () => {
    let TILES: any = [];
    if (tiles.length) {
      for (let i = 0; i < tiles.length; i++) {
        const imgSrc: any = GetMahjongTile(tiles[i])?.src;
        TILES.push(
          <img
            key={i}
            src={imgSrc}
            className={styles.tiles}
            alt="tile"
            width="21"
            height="31"
          />
        );
      }
    }
    return TILES;
  };

  const gradientColor = (): GradientColor => {
    const gameStatus = status;
    if (gameStatus === "win") {
      return {
        colors: ["#6FE5FF", "#4486EB"],
        strokeWidth_2: "strokeBlue2",
        strokeWidth_4: "strokeBlue4",
      };
    } else if (gameStatus === "lose") {
      return {
        colors: ["#E09EFF", "#581FF9"],
        strokeWidth_2: "strokeViolet2",
        strokeWidth_4: "strokeViolet4",
      };
    } else if (gameStatus === "completehand") {
      return {
        colors: ["#F8D734", "#FFF880", "#F8D734", "#DC961C"],
        strokeWidth_2: "strokeDarkYellow2",
        strokeWidth_4: "strokeDarkYellow4",
      };
    } else {
      return {} as any;
    }
  };

  const renderGradientText = (
    text: string,
    className?: string,
    colors?: Array<string>
  ) => {
    return (
      <svg
        xmlns="//www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className={className}
      >
        <defs>
          <linearGradient id={`gradient-${id}`} y1="0" y2="1">
            {colors?.length &&
              colors.map((color, idx) => (
                <stop key={idx} stopColor={color} offset={idx} />
              ))}
          </linearGradient>
        </defs>

        <text fill={`url(#gradient-${id})`} x="1" y="15" strokeLinejoin="round">
          {text}
        </text>
      </svg>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapperTitle}>
        {renderGradientText(
          title,
          gradientColor()?.strokeWidth_4,
          gradientColor()?.colors
        )}
      </div>
      <div className={styles.txDate}>{txDate}</div>
      <div className={styles.wrapperTiles}>{renderTiles()}</div>
      <div className={styles.numberOfCoin}>
        {renderGradientText(
          "+100 EOS",
          gradientColor()?.strokeWidth_2,
          gradientColor()?.colors
        )}
      </div>
      <div className={styles.txId}> TxID: {txId}</div>
    </div>
  );
};

export default GameHistory;
