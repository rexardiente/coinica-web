import { useState } from "react";
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
  onDepositToken: (amount: number) => void;
  currency: string;
};

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute !important" as "absolute",
    zIndex: "1200 !important" as any,
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

const DepositConfirmation = ({
  isLoading,
  show,
  onHide,
  onDepositToken,
  currency,
}: Props) => {
  const classes = useStyles();
  const [amountDeposit, setAmountDeposit] = useState(1);

  const onChangeDeposit = (e: any) => {
    setAmountDeposit(e.target.value);
  };

  return (
    <Dialog open={show} onClose={onHide} className={classes.root} disablePortal>
      <DialogTitle>{translate("mj.gameplay.wallet.deposit")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate("mj.gameplay.wallet.deposit")}{" "}
          <input
            className="ml-1"
            type="number"
            min={1}
            max={20}
            name="enter-deposit"
            value={amountDeposit}
            onChange={onChangeDeposit}
          />{" "}
          {translate("mj.gameplay.wallet.deposit.content", {
            currency: currency.toUpperCase(),
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onDepositToken(amountDeposit)}
          color="primary"
          disabled={isLoading}
        >
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

export default DepositConfirmation;
