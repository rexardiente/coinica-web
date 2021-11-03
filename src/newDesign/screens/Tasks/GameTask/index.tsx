import { Box } from "@material-ui/core";
import LinearProgressBar from "newDesign/components/LinearProgressBar";
import { translate } from "helpers/translate";
import styles from "./GameTask.module.scss";

type Props = {
  gameName: string;
  currentProgress: number;
  maxProgress: number;
  vipPoints: number;
};

const GiftIcon = () => {
  return (
    <svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7649 1.24258C17.4354 0.00865918 15.2798 0.00865918 13.9502 1.24258L12.3453 2.73205C12.2769 2.79553 12.212 2.86105 12.1507 2.92838C12.0893 2.86106 12.0244 2.79556 11.9561 2.73209L10.3512 1.24261C9.02162 0.00869623 6.86602 0.00869623 5.53648 1.24261C4.20694 2.47653 4.20694 4.47711 5.53648 5.71103L6.53359 6.63643H0V12.9557H2.26966V21.3814H22.6966V12.9557H24.9663V6.63643H17.7678L18.7649 5.71099C20.0945 4.47707 20.0945 2.4765 18.7649 1.24258ZM15.5551 5.71099L17.16 4.22152C17.6032 3.81021 17.6032 3.14335 17.16 2.73205C16.7168 2.32074 15.9983 2.32074 15.5551 2.73205L13.9502 4.22152C13.5071 4.63283 13.5071 5.29968 13.9502 5.71099C14.3934 6.1223 15.1119 6.1223 15.5551 5.71099ZM10.3512 4.22156L8.74627 2.73209C8.30309 2.32078 7.58455 2.32078 7.14137 2.73209C6.69819 3.14339 6.69819 3.81025 7.14137 4.22156L8.74627 5.71103C9.18945 6.12233 9.90798 6.12233 10.3512 5.71103C10.7943 5.29972 10.7943 4.63286 10.3512 4.22156ZM22.6966 8.74286V10.8493H2.26966V8.74286H22.6966ZM13.5235 12.9557H20.427V19.275H13.5235V12.9557ZM11.443 12.9557V19.275H4.53933V12.9557H11.443Z"
        fill="#1785EB"
      />
    </svg>
  );
};

const GameTaks = ({
  gameName,
  currentProgress,
  maxProgress,
  vipPoints,
}: Props) => {
  const game_name = gameName.toLowerCase();
  return (
    <Box className={styles.container}>
      <div
        className={[
          styles.gameName,
          styles.textCapitalize,
          styles.fontWeight_700,
        ].join(" ")}
      >
        {game_name}
      </div>

      <div className={styles.progress}>
        <div>
          {translate("task.play")}{" "}
          <span className={styles.textCapitalize}>{game_name}</span>{" "}
          <span className={styles.fontWeight_700}>
            {currentProgress} {translate("task.times")}
          </span>
        </div>
        <LinearProgressBar
          currentValue={currentProgress}
          maxValue={maxProgress}
        />
      </div>

      <div className={[styles.points, styles.fontWeight_700].join(" ")}>
        <GiftIcon />
        {translate("task.get")} {vipPoints} {translate("task.vip.points")}
      </div>
    </Box>
  );
};
export default GameTaks;
