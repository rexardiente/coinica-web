import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import {
  updateMahjongHiloData,
  MJ_START_GAME,
  MJ_ACTION_END,
  MJ_HISTORY,
  MJ_GET_HILO_WINRATE,
  MJ_GET_MAX_PAYOUT,
  MJ_GET_MONTHLY_RANKING,
  MJ_GET_TOTAL_HILO_PLAYED
} from "services/api/server/mahjong_hilo";
import { logo, bgGirl, sounds } from "./Assets";
import MyGames from "./MyGames";
import { Rules, MyData, Ranking } from "components/Mahjong";
import { translate } from "helpers/translate";
import styles from "./MahjongMain.module.scss";

const MahjongMain = (props) => {
  const { game_data } = props?.mahjong_hilo;
  const { account } = props?.platform;
  const username = account?.username;
  const id: number = account?.user_game_id;
  const userID = account?.id;
  const [mjhistory, setMjhistory] = useState([]);
  const [winRate, setWinRate] = useState(0);
  const [consHiLo, setConsHiLo] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [ranking, setRanking] = useState([]);

  const [showModal, setShowModal] = useState({
    help: false,
    myData: false,
    ranking: false,
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

  const onToggleHelp = () => {
    if (!showModal.help) {
      playOption();
    } else {
      playBack();
    }

    setShowModal((prevState) => ({ ...prevState, help: !prevState.help }));
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

  let history = useHistory();

  const _updateMahjongHiloData = (username) => {
    updateMahjongHiloData(username)
      .then(() => {
        // toast.success('UPDATED MJ REDUX')
        console.log("UPDATED MJ REDUX DATA");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log({ ERROR_UPDATING_MJ_REDUX: err });
      });
  };

  const _MJ_START_GAME = () => {
    if (game_data) {
      // if mahjong hilo has existing data, redirect to game
      // toast.success('game ongoing');
      playStartGame();
      history.push("/game/mahjong/gameplay");
    } else {
      if (!username) {
        toast.error(translate("mj.main.error.login.msg"));
        return;
      }
      // if mahjong hilo has no data, initialize game
      // toast.success('new game');
      MJ_START_GAME()
        .then((result) => {
          updateMahjongHiloData(username);
          toast.success(translate("msg.main.game.init"));
          console.log({ MJ_START_GAME: result });
          history.push("/game/mahjong/gameplay");
        })
        .catch((err) => {
          toast.error(err.message);
          console.log({ MJ_START_GAME_ERR: err });
        });
    }
  };

  const _MJ_END_GAME = () => {
    if (id) {
      MJ_ACTION_END()
        .then((result) => {
          updateMahjongHiloData(username);
          toast.success("GAME END");
          console.log({ MJ_ACTION_END: result });
          history.push("game/mahjong");
        })
        .catch((err) => {
          toast.error(err.message);
          console.log({ MJ_ACTION_END: err });
        });
    }
  };

  const mahjongHistory = () => {
    MJ_HISTORY(userID)
      .then((res) => {
        setMjhistory(res.data);
      })
      .catch((err) => {
        console.log("error fetching history", err);
      });
  };

  useEffect(() => {
    _updateMahjongHiloData(username);
    mahjongHistory();

    MJ_GET_HILO_WINRATE().then(res => setWinRate(res.data));
    MJ_GET_MAX_PAYOUT().then(res => setMaxPayout(res.data));
    MJ_GET_MONTHLY_RANKING().then(res => setRanking(res.data));
    MJ_GET_TOTAL_HILO_PLAYED().then(res => setConsHiLo(res.data));

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

  const myGamesModal = () => {
    return (
      <div
        className="modal fade"
        id="my-games"
        data-backdrop="static"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div
            className="modal-content"
            style={{ border: "none", background: "none" }}
          >
            <div className="modal-body">
              <MyGames show={true} history={mjhistory} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.parent_container}`}>
      {myGamesModal()}
      {showModal.help && <Rules onHide={onToggleHelp} />}
      {showModal.myData && <MyData onHide={onToggleMyData} maxPayout={maxPayout} consecutiveHiLo={consHiLo} winRate={winRate} playerID={id} name={username} />}
      {showModal.ranking && <Ranking onHide={onToggleRanking} ranking={ranking} />}
      <div className={`${styles.background} row`}>
        <div className={`${styles.content} text-center mx-auto`}>
          <img className={`${styles.girlBG}`} src={bgGirl} alt="girl background" />
          <div
            className={`row no-gutters d-flex flex-xl-row-reverse flex-lg-row-reverse`}
          >
            <div className="col-lg-6 col-md-12 mx-auto">
              <div
                className={`${styles.logo_header} d-flex align-items-center`}
              >
                <button
                  className={`${styles.mj_button} ${styles.all_games_button}`}
                  type="button"
                  data-toggle="modal"
                  data-target="#my-games"
                ></button>
                <img src={logo} className={`${styles.logo}`} alt="logo" />
              </div>
              <div className="d-none d-lg-block ">
                <MyGames show={false} history={mjhistory} />
              </div>
              <div>
                <button
                  className={`${styles.mj_button} ${styles.start_game}`}
                  type="button"
                  onClick={_MJ_START_GAME}
                ><span className={`text-stroke-brown ${styles.start_game_label}`}>{translate("mj.main.start_game")}</span></button>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mt-5 mx-auto align-self-end">
              <div className={`ml-auto ${styles.mj_button_container}`}>
                <button
                  className={`${styles.mj_button} ${styles.mj_4_button} ${styles.help}`}
                  style={{ marginLeft: 0 }}
                  type="button"
                  onClick={onToggleHelp}
                ><span className={styles.mj_button_label}>{translate("mj.main.help")}</span></button>
                <button
                  className={`${styles.mj_button} ${styles.mj_4_button} ${styles.ranking}`}
                  type="button"
                  onClick={onToggleRanking}
                ><span className={styles.mj_button_label}>{translate("mj.main.ranking")}</span></button>
                <button
                  className={`${styles.mj_button} ${styles.mj_4_button} ${styles.my_data}`}
                  type="button"
                  onClick={onToggleMyData}
                ><span className={styles.mj_button_label}>{translate("mj.main.my_data")}</span></button>
                <button
                  className={`${styles.mj_button} ${styles.mj_4_button} ${styles.settings}`}
                  type="button"
                ><span className={styles.mj_button_label}>{translate("mj.main.settings")}</span></button>
                {/* <button onClick={_MJ_END_GAME}>
                  end
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ scatter, mahjong_hilo, platform }) => ({
  platform,
  scatter,
  mahjong_hilo,
});
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(MahjongMain);
