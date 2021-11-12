import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import {
  updateMahjongHiloData,
  MJ_START_GAME,
  MJ_HISTORY,
  MJ_GET_HILO_WINRATE,
  MJ_GET_MAX_PAYOUT,
  MJ_GET_MONTHLY_RANKING,
  MJ_GET_CONSECUTIVE_HILO,
  MJ_GET_SHORTEST_ROUND,
  MJ_GET_AVG_WIN_ROUND,
  MJ_GET_AVG_WIN_SCORE,
} from "services/api/server/mahjong_hilo";
import {
  logo,
  bgGirl,
  sounds,
  iconTutorial,
  iconMyData,
  iconSettings,
} from "./Assets";
import MyGames from "./Games";
import { Ranking, Tutorial, MyData } from "newDesign/components/Mahjong";
import { translate } from "helpers/translate";
import styles from "./MahjongMain.module.scss";
import GradientText from "newDesign/components/GradientText";

type MyDataState = {
  hiloWinRate: number;
  maxPayout: number;
  consHilo: number;
  shortestRound: number;
  avgWinScore: number;
  avgWinRound: number;
};

type ReduxState = {
  platform: any;
  mahjong_hilo: any;
};

const MahjongMain = () => {
  let history = useHistory();
  const reduxState = useSelector((state: ReduxState) => state);
  const { game_data } = reduxState?.mahjong_hilo;
  const { account } = reduxState?.platform;
  const username = account?.username;
  const userID = account?.id;
  const [gamePlayHistory, setGamePlayHistory] = useState([]);
  const [myDataTabs, setMyDataTabs] = useState<MyDataState>({
    hiloWinRate: 0,
    consHilo: 0,
    maxPayout: 0,
    shortestRound: 0,
    avgWinScore: 0,
    avgWinRound: 0,
  });
  const [rankingData, setRanking] = useState<any[]>([]);

  const [showModal, setShowModal] = useState({
    tutorial: false,
    myData: false,
    ranking: false,
    myGames: false,
  });
  const [isLoadedMainBgSound, setIsLoadedMainBgSound] = useState(false);

  const sound_opts = { volume: 0.5 };
  const [, { sound: soundMjHome }] = useSound(sounds.mjHomeMainBg, {
    volume: 0.4,
    loop: true,
    onload: () => {
      setIsLoadedMainBgSound(true);
    },
  });
  const [playStartGame] = useSound(sounds.startGame, sound_opts);
  const [playOption] = useSound(sounds.option, sound_opts);
  const [playBack] = useSound(sounds.back, sound_opts);

  const onToggleTutorial = () => {
    if (!showModal.tutorial) {
      playOption();
    } else {
      playBack();
    }

    setShowModal((prevState) => ({
      ...prevState,
      tutorial: !prevState.tutorial,
    }));
  };

  const onToggleMyData = () => {
    if (!showModal.myData) {
      playOption();
    } else {
      playBack();
    }
    setShowModal((prevState) => ({ ...prevState, myData: !prevState.myData }));
  };

  const onToggleRanking = () => {
    if (!showModal.ranking) {
      playOption();
    } else {
      playBack();
    }
    setShowModal((prevState) => ({
      ...prevState,
      ranking: !prevState.ranking,
    }));
  };

  const onToggleMyGames = () => {
    if (!showModal.myGames) {
      playOption();
    } else {
      playBack();
    }
    setShowModal((prevState) => ({
      ...prevState,
      myGames: !prevState.myGames,
    }));
  };

  const onStartGame = async () => {
    // if mahjong hilo has existing data, redirect to game
    if (game_data) {
      playStartGame();
      history.push("/game/mahjong/gameplay");
    } else {
      if (!username) {
        toast.error(translate("mj.main.error.login.msg"));
        return;
      }

      // if mahjong hilo has no data, initialize game
      try {
        await MJ_START_GAME();
        await updateMahjongHiloData(username);
        toast.success(translate("mj.main.game.init"));
        history.push("/game/mahjong/gameplay");
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const getRanking = async () => {
    try {
      const res = await MJ_GET_MONTHLY_RANKING();
      setRanking(res.data);
    } catch (err: any) {
      console.log("error fetching ranking", err);
    }
  };
  const getGameHistory = async () => {
    try {
      const res = await MJ_HISTORY(userID);
      setGamePlayHistory(res.data);
    } catch (err: any) {
      console.log("error fetching history", err);
    }
  };

  const getMyData = async () => {
    try {
      const hiloWinRate = await (await MJ_GET_HILO_WINRATE()).data;
      const maxPayout = await (await MJ_GET_MAX_PAYOUT()).data;
      const consHilo = await (await MJ_GET_CONSECUTIVE_HILO()).data;
      const shortestRound = await (await MJ_GET_SHORTEST_ROUND()).data;
      const avgWinScore = await (await MJ_GET_AVG_WIN_SCORE()).data;
      const avgWinRound = await (await MJ_GET_AVG_WIN_ROUND()).data;

      setMyDataTabs({
        hiloWinRate,
        maxPayout,
        consHilo,
        shortestRound,
        avgWinScore,
        avgWinRound,
      });
    } catch (err: any) {
      console.log("error fetching my data", err);
    }
  };

  useEffect(() => {
    if (account) {
      updateMahjongHiloData(username);
      getGameHistory();
      getMyData();
      getRanking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // Play main bg sound
  useEffect(() => {
    if (soundMjHome && isLoadedMainBgSound) {
      soundMjHome.play();
    }

    return () => {
      if (soundMjHome) {
        soundMjHome.stop();
      }
    };
  }, [soundMjHome, isLoadedMainBgSound]);

  return (
    <div className={styles.container}>
      <MyData
        show={showModal.myData}
        userId={userID}
        username={username}
        data={myDataTabs}
        tiles={[]}
        onHide={onToggleMyData}
      />
      <Tutorial show={showModal.tutorial} onHide={onToggleTutorial} />
      <Ranking
        data={rankingData}
        show={showModal.ranking}
        onHide={onToggleRanking}
      />
      <MyGames show={showModal.myGames} onHide={onToggleMyGames} />

      <div className={styles.coverBg}>
        <img className={styles.girlBg} src={bgGirl} alt="girl background" />

        <div className={styles.content}>
          <div className={styles.topButtonsWrapper}>
            <button
              className={`${styles.bgDiamondShape} ${styles.btnGames}`}
              onClick={onToggleMyGames}
            >
              {translate("mj.main.games")}
            </button>
            <button className={styles.bgDiamondShape} onClick={onToggleRanking}>
              {translate("mj.main.rank")}
            </button>
          </div>
          <div className={styles.startGameWrapper}>
            <div>
              <img src={logo} className={`${styles.logo}`} alt="logo" />

              <div className={styles.startGameBtnWrapper}>
                <button
                  className={`${styles.mj_button} ${styles.startGameBtn}`}
                  type="button"
                  onClick={onStartGame}
                >
                  <GradientText
                    id="start-game"
                    text={translate("mj.main.start_game") as unknown as string}
                    fromColor="#F7B820"
                    toColor="#FDE51F"
                    className={styles.startGameText}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.bottomButtonsWrapper}>
            <button
              className={`${styles.mj_button} ${styles.mj_3_button}`}
              type="button"
              onClick={onToggleMyData}
            >
              <img src={iconMyData} alt="icon" width="20" height="26" />
              {translate("mj.main.my_data")}
            </button>
            {/* <button
              className={`${styles.mj_button} ${styles.mj_3_button} ${styles.settings}`}
              type="button"
            >
              <img src={iconSettings} alt="icon" width="26" height="26" />
              {translate("mj.main.settings")}
            </button> */}
            <button
              className={`${styles.mj_button} ${styles.mj_3_button}`}
              type="button"
              onClick={onToggleTutorial}
            >
              <img src={iconTutorial} alt="icon" width="17" height="26" />
              {translate("mj.main.tutorial")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahjongMain;
