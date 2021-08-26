import React from "react";
import { translate } from "helpers/translate";
import styles from "./Btn.module.scss";

type Props = {
  onClick: () => void;
};
const BtnMenu = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.menu} type="button">
      <span className={styles.menuLabel}>{translate("mj.gameplay.menu")}</span>
    </button>
  );
};
export default BtnMenu;
