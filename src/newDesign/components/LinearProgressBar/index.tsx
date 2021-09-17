import {
  createStyles,
  LinearProgress,
  Theme,
  withStyles,
} from "@material-ui/core";

import styles from "./LinearProgressBar.module.scss";

type Props = { currentValue: number; maxValue: number; label?: string };

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

const LinearProgressBar = ({ currentValue, maxValue }: Props) => {
  return (
    <div className={styles.container}>
      <BorderLinearProgressBar
        value={currentValue}
        variant="determinate"
        className={styles.barHeight}
      />
      <div className={styles.barLabel}>
        {currentValue}/{maxValue}
      </div>
    </div>
  );
};
export default LinearProgressBar;
