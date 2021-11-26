import { Theme, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import GameHistory from "./GameHistory";
import { translate } from "helpers/translate";
import { iconGamesClose } from "../Assets";
import styles from "./Games.module.scss";

type History = {
  game_id: string;
  user: number;
  predictions: any[];
  status: boolean;
  created_at: Date;
};

type Props = {
  data: History[];
  show: boolean;
  onHide: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-container": {
      justifyContent: "flex-end",
    },
    "& .MuiBackdrop-root": {
      position: "absolute",
    },
    "& .MuiDialog-paperScrollPaper": {
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      maxHeight: "100%",
      borderRadius: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: 0,
  },
}));

const MyGame = ({ data, show, onHide }: Props) => {
  const classes = useStyles();
  return (
    <Dialog
      disablePortal
      open={show}
      onClose={onHide}
      className={`${classes.root} ${styles.dialog}`}
    >
      <MuiDialogTitle className={styles.dialogTitle}>
        <span className={`${styles.gamesText} ${styles.strokeBlue2}`}>
          {translate("mj.main.games")}
        </span>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onHide}
        >
          <img src={iconGamesClose} alt="icon" width="58" height="58" />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent className={styles.dialogContent}>
        <div className={styles.historyList}>
          {data.length
            ? data.map((history, idx) =>
                history.predictions.map((tiles, idx) => (
                  <GameHistory
                    key={idx}
                    id={idx}
                    title={tiles[0] === tiles[1] ? "WIN" : "LOSE"}
                    txId={history.game_id.substring(0, 8)}
                    txDate={moment(history.created_at).format(
                      "DD/MM/YYYY H:HH"
                    )}
                    status={tiles[0] === tiles[1] ? "win" : "lose"}
                    tiles={tiles}
                  />
                ))
              )
            : "No game data history."}
        </div>
      </MuiDialogContent>
    </Dialog>
  );
};

export default MyGame;
