import { Avatar } from "@material-ui/core";
import styles from "./Profile.module.scss";

type Props = {
  userId: string;
  username: string;
};

const Profile = ({ userId, username }: Props) => {
  return (
    <div className={styles.container}>
      <Avatar variant="square" className={styles.avatarBg} />
      <div className={styles.playerName}>{username}</div>
      <div className={styles.playerID}>ID: {userId.substring(0, 8)}</div>
    </div>
  );
};

export default Profile;
