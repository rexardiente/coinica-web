import Modal from "../Modal";
import Place from "./Place";
import { translate } from "helpers/translate";
import styles from "./Ranking.module.scss";

type Props = {
  show: boolean;
  onHide: () => void;
  data: any[];
};

const Ranking = ({ show, onHide, data }: Props) => {
  return (
    <Modal show={show} onHide={onHide} className={styles.container}>
      <Modal.Title onHide={onHide}>{translate("mj.ranking.title")}</Modal.Title>
      <Modal.Content>
        <div className={styles.content}>
          {data && data.length > 0
            ? data.map((rank, index) => {
                return <Place data={rank} index={index} />;
              })
            : translate("misc.noAvailableData")}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default Ranking;
