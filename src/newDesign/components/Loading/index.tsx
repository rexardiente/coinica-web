import { Backdrop, CircularProgress } from "@material-ui/core";
import styles from "./Loading.module.scss";

type Props = {
  isLoading: boolean;
  sideBarOpen?: boolean;
};

const Loading = ({ isLoading, sideBarOpen }: Props) => {
  const addPadding = sideBarOpen ? styles.paddingRight : "";
  return (
    <Backdrop
      className={[styles.container, addPadding].join(" ")}
      open={isLoading}
    >
      <div>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default Loading;
