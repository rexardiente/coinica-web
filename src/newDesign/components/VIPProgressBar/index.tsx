import {
  createStyles,
  LinearProgress,
  Theme,
  withStyles,
} from "@material-ui/core";

import styles from "./LinearProgressBar.module.scss";

type Props = { currentValue: number; label?: string };

const BorderLinearProgressBar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: "#191E35",
    },
    bar: {
      borderRadius: 10,
      backgroundColor: "#1785EB",
    },
  })
)(LinearProgress);

const VIPprogressBar = ({ currentValue }: Props) => {
  return (
    <div className={styles.container}>
      <BorderLinearProgressBar
        value={currentValue? Number(currentValue) : 0}
        variant="determinate"
        className={styles.barHeight}
      />
      <div className={styles.barLabel}>
        {currentValue
          ? currentValue == 100
            ? currentValue
            : Number(currentValue).toFixed(2)
          : 0
          }
        %
      </div>
    </div>
  );
};
export default VIPprogressBar;
