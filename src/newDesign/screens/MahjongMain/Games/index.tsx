import { Theme, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import GameHistory from "./GameHistory";
import { translate } from "helpers/translate";
import { iconGamesClose } from "../Assets";
import styles from "./Games.module.scss";

type Props = {
  show: boolean;
  onHide: () => void;
};

const DUMMY_GAME_HISTORY: Array<any> = [
  {
    title: "14th SUCCESSFUL HI-LO",
    status: "win",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
  {
    title: "Failed Hi-LO",
    status: "lose",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
  {
    title: "Complete Hand",
    status: "completehand",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
  {
    title: "Complete Hand",
    status: "completehand",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
  {
    title: "Complete Hand",
    status: "completehand",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
  {
    title: "Complete Hand",
    status: "completehand",
    txId: "8273f58b",
    txDate: "9/9 23:59",
    tiles: [1, 2, 45, 36, 89, 29, 4, 7, 10, 23, 67, 100, 78, 34],
  },
];

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

const MyGame = ({ show, onHide }: Props) => {
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
          {DUMMY_GAME_HISTORY.length
            ? DUMMY_GAME_HISTORY.map((history, idx) => (
                <GameHistory
                  key={idx}
                  id={idx}
                  title={history.title}
                  txId={history.txId}
                  txDate={history.txDate}
                  status={history.status}
                  tiles={history.tiles}
                />
              ))
            : "No game data history."}
        </div>
      </MuiDialogContent>
    </Dialog>
  );
};

export default MyGame;
