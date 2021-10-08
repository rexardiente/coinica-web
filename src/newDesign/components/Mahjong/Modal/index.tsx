import { Theme, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { closeBg, modalBg } from "./Assets";
import styles from "./Modal.module.scss";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  className?: string;
  children: React.ReactNode;
};

type ModalHeaderProps = {
  children: React.ReactNode;
  onHide: () => void;
  className?: string;
};
type ModalContentProps = {
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      width: "977px",
      maxWidth: "100%",
      height: "743px",
      backgroundImage: `url(${modalBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 99%",
      backgroundColor: "transparent",
      backgroundPosition: "center",
      padding: "0",
      margin: "0",
      boxShadow: "none",
      overflow: "unset",
      position: "relative",
    },
    "& .MuiBackdrop-root": {
      position: "absolute",
    },
  },
  closeButton: {
    position: "absolute",
    top: "-1%",
    right: "-3%",
    padding: 0,
  },
}));

const Modal = ({ show, onHide, children }: ModalProps) => {
  const classes = useStyles();

  return (
    <Dialog
      disablePortal
      open={show}
      onClose={onHide}
      className={`${classes.root} ${styles.dialog}`}
    >
      {children}
    </Dialog>
  );
};

const ModalHeader = ({ className, children, onHide }: ModalHeaderProps) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle className={[className, styles.dialogTitle].join(" ")}>
      <span className={`${styles.title} strokeBlue2`}>{children}</span>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onHide}
      >
        <img src={closeBg} alt="icon" width="70" height="70" />
      </IconButton>
    </MuiDialogTitle>
  );
};

const ModalContent = ({
  containerClassName,
  innerClassName,
  children,
}: ModalContentProps) => {
  return (
    <MuiDialogContent
      className={[containerClassName, styles.dialogContent].join(" ")}
    >
      <div className={[innerClassName, styles.innerScrollable].join(" ")}>
        {children}
      </div>
    </MuiDialogContent>
  );
};

Modal.Title = ModalHeader;
Modal.Content = ModalContent;

export default Modal;
