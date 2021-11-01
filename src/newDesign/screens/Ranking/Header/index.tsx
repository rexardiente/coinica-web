import { MouseEvent } from "react";
import { Typography } from "@material-ui/core";
import { translate } from "helpers/translate";
import ToggleButton from "newDesign/components/ToggleButton";
import styles from "./Header.module.scss";

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
          {translate("ranking.title")}
        </Typography>
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
