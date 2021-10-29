import MenuIcon from "@material-ui/icons/Menu";
import styles from "./Btn.module.scss";

type Props = {
  onClick: () => void;
};
const BtnMenu = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.menu} type="button">
      <MenuIcon />
    </button>
  );
};
export default BtnMenu;
