import { Typography } from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.pageTitleWrapper}>
      <Typography variant="h1">
        {translate("news.title")}
      </Typography>
    </div>
  );
};

export default Header;
