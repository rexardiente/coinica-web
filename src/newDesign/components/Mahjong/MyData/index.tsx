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
  tiles: number[];
  onHide: () => void;
};

const MyData = ({ userId, username, show, data, tiles, onHide }: Props) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title onHide={onHide}>{translate("mj.main.my_data")}</Modal.Title>
      <Modal.Content innerClassName={styles.scrollContentWidth}>
        <div className={styles.profileWrapper}>
          <Profile userId={userId} username={username} />
          <HighestScore tiles={tiles} />
        </div>
        <Tabs data={data} />
      </Modal.Content>
    </Modal>
  );
};

export default MyData;
