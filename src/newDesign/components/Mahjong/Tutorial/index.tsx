import Modal from "../Modal";
import GameFlow from "./GameFlow";
import HiLo from "./HiLo";
import Mahjong from "./Mahjong";
import Rewards from "./Rewards";
import { translate } from "helpers/translate";
import styles from "./Tutorial.module.scss";

type Props = {
  show: boolean;
  onHide: () => void;
};

const Tutorial = ({ show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title onHide={onHide}>{translate("mj.main.tutorial")}</Modal.Title>
      <Modal.Content innerClassName={styles.scrollContentWidth}>
        <div className={styles.wrapper}>
          <GameFlow />
          <HiLo />
          <Mahjong />
          <Rewards />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default Tutorial;
