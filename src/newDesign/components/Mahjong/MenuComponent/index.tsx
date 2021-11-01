import { Theme, makeStyles } from "@material-ui/core/styles";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import { sounds, modalBgMenu } from "../Assets";
import { translate } from "helpers/translate";
import styles from "./MenuComponent.module.scss";

type Props = {
  show: boolean;
  onHide: () => void;
  onResetGame: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDialog-paper": {
      maxWidth: "300px",
      maxHeight: "295px",
      backgroundImage: `url(${modalBgMenu})`,
    },
    "& .MuiButtonBase-root": {
      right: "-11%",
    },
  },
}));

const MenuComponent = ({ show, onHide, onResetGame }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [playGoHome] = useSound(sounds.home, { volume: 0.5 });

  const handleGoBackHome = () => {
    playGoHome();
    history.push("/game/mahjong");
  };

  return (
    <Modal show={show} onHide={onHide} className={classes.root}>
      <Modal.Title onHide={onHide}>
        {translate("mj.gameplay.menu.title")}
      </Modal.Title>
      <Modal.Content containerClassName={styles.content}>
        <div className={styles.btnContainer}>
          <button className={styles.button} onClick={handleGoBackHome}>
            <div>{translate("mj.gameplay.menu.home")}</div>
          </button>
          <button className={styles.button} onClick={onResetGame}>
            <div>{translate("mj.gameplay.menu.reset")}</div>
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default MenuComponent;
