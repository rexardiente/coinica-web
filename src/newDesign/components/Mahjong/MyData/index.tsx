import Modal from "../Modal";
import Profile from "./Profile";
import HighestScore from "./HighestScore";
import Tabs from "./Tabs";
import { translate } from "helpers/translate";
import styles from "./MyData.module.scss";

type TabsData = {
  hiloWinRate: number;
  maxPayout: number;
  consHilo: number;
  shortestRound: number;
  avgWinScore: number;
  avgWinRound: number;
};

type Props = {
  userId: string;
  username: string;
  show: boolean;
  data: TabsData;
  onHide: () => void;
};

const Tutorial = ({ userId, username, show, data, onHide }: Props) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title onHide={onHide}>{translate("mj.main.my_data")}</Modal.Title>
      <Modal.Content innerClassName={styles.scrollContentWidth}>
        <div className={styles.profileWrapper}>
          <Profile userId={userId} username={username} />
          <HighestScore
            tiles={[1, 14, 56, 23, 136, 1, 14, 54, 23, 136, 44, 78, 99, 2]}
          />
        </div>
        <Tabs data={data} />
      </Modal.Content>
    </Modal>
  );
};

export default Tutorial;
