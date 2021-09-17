import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import styles from "./Loading.module.scss";

type Props = {
  isLoading: boolean;
  sideBarOpen?: boolean;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      top: "unset",
      right: "unset",
      bottom: "unset",
      left: "unset",
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(0 0 0 / 25%)",
    },
  })
);

const Loading = ({ isLoading, sideBarOpen }: Props) => {
  const classes = useStyles();
  const addPadding = sideBarOpen ? styles.paddingRight : "";
  return (
    <Backdrop
      className={[classes.backdrop, addPadding].join(" ")}
      open={isLoading}
    >
      <div>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default Loading;
