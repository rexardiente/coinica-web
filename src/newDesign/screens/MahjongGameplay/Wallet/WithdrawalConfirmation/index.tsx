import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { translate } from "helpers/translate";

type Props = {
  isLoading: boolean;
  show: boolean;
  onHide: () => void;
  onWithdrawToken: () => void;
  amount: number;
};

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute !important" as "absolute",
    "& .MuiPaper-root": {
      backgroundColor: "#363859",
      color: "#fff",
    },
    "& .MuiDialogContentText-root": {
      color: "#efeff1db",
    },
    "& .MuiTypography-h6": {
      fontWeight: "700",
    },
    "& .MuiBackdrop-root": {
      position: "absolute",
    },
  },
}));

const WithdrawalConfirmation = ({
  isLoading,
  show,
  onHide,
  onWithdrawToken,
  amount,
}: Props) => {
  const classes = useStyles();

  return (
    <Dialog open={show} onClose={onHide} className={classes.root} disablePortal>
      <DialogTitle>
        {translate("mj.gameplay.wallet.withdraw.confirmation")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate("mj.gameplay.wallet.withdraw.content", {
            amount: <strong>{amount}</strong>,
          })}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onWithdrawToken} color="primary" disabled={isLoading}>
          {!isLoading ? (
            translate("misc.yes")
          ) : (
            <CircularProgress size="20px" />
          )}
        </Button>
        <Button onClick={onHide} color="primary" autoFocus>
          {translate("misc.no")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawalConfirmation;
