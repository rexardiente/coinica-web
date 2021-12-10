import { MouseEvent } from "react";
import { Typography } from "@material-ui/core";
import { translate } from "helpers/translate";
import ToggleButton from "newDesign/components/ToggleButton";
import styles from "./Header.module.scss";
import CountdownTimer from "./CoundownTimer";

const ClockIcon = () => {
  return (
    <svg
      width="38"
      height="32"
      viewBox="0 0 38 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.09844 0.333252L0.666992 7.02456L2.89743 9.50171L10.3289 2.8104L8.09844 0.333252Z"
        fill="#4671F1"
      />
      <path
        d="M17.3337 10.3333H20.667V16.9999H25.667V20.3333H17.3337V10.3333Z"
        fill="#4671F1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.00033 16.9999C4.00033 8.71565 10.7161 1.99992 19.0003 1.99992C27.2846 1.99992 34.0003 8.71565 34.0003 16.9999C34.0003 25.2842 27.2846 31.9999 19.0003 31.9999C10.7161 31.9999 4.00033 25.2842 4.00033 16.9999ZM7.33366 16.9999C7.33366 10.5566 12.557 5.33325 19.0003 5.33325C25.4436 5.33325 30.667 10.5566 30.667 16.9999C30.667 23.4432 25.4436 28.6666 19.0003 28.6666C12.557 28.6666 7.33366 23.4432 7.33366 16.9999Z"
        fill="#4671F1"
      />
      <path
        d="M29.9022 0.333252L37.3337 7.02456L35.1032 9.50171L27.6718 2.8104L29.9022 0.333252Z"
        fill="#4671F1"
      />
    </svg>
  );
};

type Option = { label: string; value: string };
type Props = {
  value: string;
  toggleOptions: Option[];
  onChange: (e: MouseEvent<HTMLElement>, value: any) => void;
};

const Header = ({ value, toggleOptions, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitleWrapper}>
        <Typography component="h1" variant="h4">
          {translate("challenge.title")}
        </Typography>
        <div className={styles.icon}>
          <ClockIcon />
          <div className={styles.timer}><CountdownTimer /></div>
        </div>
      </div>
      <ToggleButton
        className={styles.toggle}
        value={value}
        options={toggleOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default Header;
