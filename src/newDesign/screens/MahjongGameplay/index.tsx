/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import useSound from "use-sound";
import { BtnMenu } from "./Btn";
import TileCategory from "./TileCategory";
import HiLoDraw from "./HiLoDraw";
import Turn from "./Turn";
import Kong from "./Kong";
import Wallet from "./Wallet";
import Hand from "./Hand";
import {
  MenuComponent,
  KongPass,
  CompleteHandPass,
  CompleteHandResult,
} from "newDesign/components/Mahjong";
import {
  updateMahjongHiloData,
  MJ_PLAY_HILO,
  MJ_WITHDRAW_TOKEN,
  MJ_DISCARD_TILE,
  MJ_RIICHI_DISCARD,
  MJ_DCLR_WIN_HAND,
  MJ_DECLARE_KONG,
  MJ_BET_TOKEN,
  MJ_ADD_BET,
  MJ_TRANSFER_TOKEN,
  MJ_RESET_BET,
  MJ_ACTION_END,
  MJ_START_GAME,
} from "services/api/server/mahjong_hilo";
import GetMahjongTile from "newDesign/components/Mahjong/Tiles";
import styles from "./MahjongGameplay.module.scss";
import { GetUserWalletBalance } from "services/api/server/platform";
import { setUserBalance } from "redux/platform/platform_action";
import { translate } from "helpers/translate";
import { sounds } from "./Assets";

type ReduxState = {
  platform: any;
  mahjong_hilo: any;
};

const MahjongGameplay = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reduxState = useSelector((state: ReduxState) => state);
  const { game_data } = reduxState?.mahjong_hilo;
  const { selectedCurrency, account } = reduxState?.platform;
  const username = account?.username;
  const id: number = account?.user_game_id;
  const oddsPerTile = {
    low: game_data?.low_odds,
    draw: game_data?.draw_odds,
    high: game_data?.high_odds,
  };

  const windsTiles = game_data
    ? [game_data.prevalent_wind, game_data.seat_wind]
    : new Array(2).fill(null);

  // INIT STATES
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [shoWithdrawConfirmation, setShowWithdrawConfirmation] =
    useState(false);
  const [isStopMainBgSound, setStopMainBgSound] = useState(false);
  const [showDepositConfirmation, setShowDepositConfirmation] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [predictionResult, setPredictionResult] = useState({
    show: false,
    updatedAt: 0,
  });

  const [resetBetTimestamp, setResetBetTimestamp] = useState(0);

  const [handKong, setHandKong] = useState<{
    show: Boolean;
    tiles: { key: number[]; value: number[] };
    updatedAt: number;
  }>({ show: false, tiles: { key: [], value: [] }, updatedAt: 0 });

  const [winHand, setWinHand] = useState({
    showCompleteHand: false,
    showCompleteHandResult: false,
  });
  const [isLoadedMainBgSound, setIsLoadedMainBgSound] = useState(false);

  const sound_opts = { volume: 0.5 };
  const [, { sound: soundMjGame }] = useSound(sounds.mjGameMainBg_1, {
    volume: 0.4,
    // loop: true,
    onload: () => {
      setIsLoadedMainBgSound(true);
    },
  });
  const [, { sound: soundMjGamePlayAgain }] = useSound(sounds.mjPlayAgainBg, {
    volume: 0.4,
    // loop: true,
  });
  const [playError] = useSound(sounds.error, sound_opts);
  const [playDeposit] = useSound(sounds.deposit, sound_opts);
  const [playWithdraw] = useSound(sounds.withdraw, sound_opts);
  const [playTransfer] = useSound(sounds.transfer, sound_opts);
  const [playHilo] = useSound(sounds.playHilo, sound_opts);
  const [playHigh] = useSound(sounds.high, sound_opts);
  const [playDraw] = useSound(sounds.draw, sound_opts);
  const [playLow] = useSound(sounds.low, sound_opts);
  const [playWin] = useSound(sounds.win, sound_opts);
  const [playLose] = useSound(sounds.lose, sound_opts);
  const [playAgain] = useSound(sounds.playAgain, sound_opts);
  const [playCompleteHand] = useSound(sounds.playAgain, sound_opts);
  const [playKong] = useSound(sounds.playAgain, sound_opts);
  const [playPass] = useSound(sounds.playPass, sound_opts);

  const toggleModalWithdraw = () =>
    setShowWithdrawConfirmation((prevstate) => !prevstate);

  const toggleModalDeposit = () =>
    setShowDepositConfirmation((prevstate) => !prevstate);

  const toggleMenu = () => {
    setShowMenu((prevstate) => !prevstate);
  };

  const toggleCompleteHand = () => {
    setWinHand((prevstate) => ({
      ...prevstate,
      showCompleteHand: !prevstate.showCompleteHand,
    }));
  };

  const toggleCompleteHandResult = () => {
    setWinHand((prevstate) => ({
      ...prevstate,
      showCompleteHandResult: !prevstate.showCompleteHandResult,
    }));
  };

  const togglePredictionResult = () => {
    setPredictionResult((prevState) => ({
      ...prevState,
      show: !prevState.show,
      updatedAt: Date.now(),
    }));
  };

  const toggleKong = (
    tiles: { key: number[]; value: number[] } = { key: [], value: [] }
  ) => {
    setHandKong((prevState) => ({
      ...prevState,
      show: !prevState.show,
      tiles,
      updatedAt: Date.now(),
    }));
  };

  // INITIALIZING GAME DATA
  useEffect(() => {
    if (account && username) {
      if (initialized) return;

      updateMahjongHiloData(username)
        .then(() => {
          setInitialized(true);
        })
        .catch((err) => {
          toast.error(
            err?.message || translate("mj.gameplay.error.fetching_data")
          );
          history.push("/game/mahjong");
        });
    } else {
      // toast.error(translate("mj.gameplay.error.login_first"));
      history.push("/game/mahjong");
    }
  }, [account]);

  // IF INITIALIZED
  useEffect(() => {
    if (initialized) {
      // checking if 'game_data' in redux is not null
      if (game_data) {
        // if username and game_data are valid
        /**
         * some things to initialized here later on
         * esp. when loading an existing game...
         */
      } else {
        // toast.error(translate("mj.gameplay.error.no_game_data"));
        history.push("/game/mahjong");
      }
    }
  }, [initialized]);

  // Play main bg sound
  useEffect(() => {
    if (soundMjGame && isLoadedMainBgSound) {
      soundMjGame.play();
    }

    return () => {
      if (soundMjGame) {
        soundMjGame.stop();
      }
      if (soundMjGamePlayAgain) {
        soundMjGamePlayAgain.stop();
      }
    };
  }, [soundMjGame, soundMjGamePlayAgain, isLoadedMainBgSound]);

  // Stop main bg sound when user start to interact in the game
  useEffect(() => {
    if (isStopMainBgSound && soundMjGame && soundMjGame.playing()) {
      soundMjGame.stop();
    }
    if (
      isStopMainBgSound &&
      soundMjGamePlayAgain &&
      soundMjGamePlayAgain.playing()
    ) {
      soundMjGamePlayAgain.stop();
    }
  }, [soundMjGame, soundMjGamePlayAgain, isStopMainBgSound]);

  //Hide modal Prediction WIN or LOSE automatically after 2 or 4 seconds respectively.
  let modalInterval: any = null;
  useEffect(() => {
    if (initialized) {
      clearTimeout(modalInterval);

      if (predictionResult.show && predictionResult.updatedAt) {
        const delaySec = game_data?.hi_lo_result === 2 ? 2 : 4;
        modalInterval = setTimeout(() => {
          togglePredictionResult();
        }, 1000 * delaySec);
        return;
      }

      if (
        !predictionResult.show &&
        predictionResult.updatedAt &&
        game_data?.status === 1
      ) {
        checkKongOrCompleteHand();
        return;
      }

      if (
        !predictionResult.show &&
        predictionResult.updatedAt &&
        game_data?.status >= 2
      ) {
        toggleCompleteHandResult();
        return;
      }
    }
  }, [predictionResult]);

  //Initial render check if game status is WIN or LOSE
  //then show modal
  useEffect(() => {
    if (initialized) {
      if (
        !predictionResult.show &&
        !predictionResult.updatedAt &&
        game_data?.status === 1
      ) {
        checkKongOrCompleteHand();
        return;
      }

      if (
        !predictionResult.show &&
        !predictionResult.updatedAt &&
        game_data?.status >= 2
      ) {
        toggleCompleteHandResult();
        return;
      }
    }
  }, [initialized]);

  //Call Reset bet if the hi_lo_result === 3 LOSE
  useEffect(() => {
    if (
      resetBetTimestamp &&
      game_data?.bet_status === 1 &&
      game_data?.hi_lo_result === 3
    ) {
      MJ_RESET_BET();
    }
  }, [game_data, resetBetTimestamp]);

  const playSoundDrawHilo = (option: number) => {
    switch (option) {
      case 1:
        playLow();
        break;
      case 2:
        playDraw();
        break;
      case 3:
        playHigh();
        break;

      default:
        playError();
        break;
    }
  };

  const playSoundAgainBg = () => {
    if (soundMjGame.playing()) {
      soundMjGame.stop();
    }
    setTimeout(() => {
      soundMjGamePlayAgain.play();
    }, 1000);
  };

  const toastMsgDepositWithdraw = (
    type: "error" | "success",
    tag: "transfer" | "withdrawal" | "deposit"
  ) => {
    if (type === "success") {
      toast.success(translate(`mj.gameplay.success.${tag}`));
    } else {
      toast.error(translate(`mj.gameplay.error.${tag}`));
    }
  };

  const toastLoader = (msg: React.ReactNode, toastId?: string) => {
    return toast.info(
      <>
        {msg} <CircularProgress size="20px" />
      </>,
      {
        autoClose: false,
        toastId,
      }
    );
  };

  const handlePlayHilo = () => {
    let hiloLoading = toastLoader(
      translate("mj.gameplay.loading.play_hilo"),
      "hilo"
    );
    setStopMainBgSound(true);
    playHilo();

    MJ_BET_TOKEN()
      .then(async (result) => {
        await updateMahjongHiloData(username);
        toast.success(translate("mj.gameplay.success.play_hilo.can_play"));
        toast.dismiss(hiloLoading);
      })
      .catch((err) => {
        playError();
        toast.dismiss(hiloLoading);

        if (game_data?.riichi_status === 1) {
          toast.error(translate("mj.gameplay.error.play_hilo.discard_tile"), {
            autoClose: false,
          });
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleResetGame = () => {
    let resetLoading = toastLoader(
      translate("mj.gameplay.loading.reset_game"),
      "reset"
    );
    playAgain();

    MJ_ACTION_END()
      .then(async (result) => {
        await MJ_START_GAME();
        await updateMahjongHiloData(username);
        toggleMenu();
        toast.success(translate("mj.gameplay.success.reset_game"));
        toast.dismiss(resetLoading);
      })
      .catch((err) => {
        toast.error(translate("mj.gameplay.error.reset_game"));
        toast.dismiss(resetLoading);
      });
  };

  const handleDrawHiLo = (option: 1 | 2 | 3) => {
    let hiloLoading = toastLoader(
      translate("mj.gameplay.loading.draw_hilo"),
      "play-hilo"
    );
    setStopMainBgSound(true);
    playSoundDrawHilo(option);

    MJ_PLAY_HILO({ option })
      .then((result) => {
        updateMahjongHiloData(username);
        setResetBetTimestamp(Date.now());

        toast.dismiss(hiloLoading);
        setTimeout(() => {
          togglePredictionResult();
        }, 1500);
      })
      .catch((err) => {
        playError();
        toast.dismiss(hiloLoading);
        toast.error(err.message);
      });
  };

  const handleWithdrawToken = () => {
    setLoading(true);
    setStopMainBgSound(true);
    playWithdraw();

    MJ_WITHDRAW_TOKEN()
      .then(() => {
        toggleModalWithdraw();
        updateMahjongHiloData(username);
        updateWalletBalance();
        setLoading(false);
        toastMsgDepositWithdraw("success", "withdrawal");
      })
      .catch(() => {
        playError();
        toggleModalWithdraw();
        setLoading(false);
        toastMsgDepositWithdraw("error", "withdrawal");
      });
  };

  const handleDepositToken = (amount: number) => {
    setLoading(true);
    setStopMainBgSound(true);
    playDeposit();

    MJ_ADD_BET({ currency: selectedCurrency.toUpperCase(), quantity: amount })
      .then(() => {
        toggleModalDeposit();
        updateMahjongHiloData(username);
        updateWalletBalance();
        setLoading(false);
        toastMsgDepositWithdraw("success", "deposit");
      })
      .catch(() => {
        playError();
        toggleModalDeposit();
        setLoading(false);
        toastMsgDepositWithdraw("error", "deposit");
      });
  };

  const handleTransferToken = () => {
    setStopMainBgSound(true);
    playTransfer();

    MJ_TRANSFER_TOKEN()
      .then(() => {
        updateMahjongHiloData(username);
        toastMsgDepositWithdraw("success", "transfer");
      })
      .catch(() => {
        playError();
        toastMsgDepositWithdraw("error", "transfer");
      });
  };

  const handleDiscardTile = (idx: number) => {
    let discardLoading = toastLoader(
      translate("mj.gameplay.loading.discard"),
      "discard"
    );
    setStopMainBgSound(true);

    if (game_data?.riichi_status === 2) {
      MJ_RIICHI_DISCARD()
        .then(() => {
          updateMahjongHiloData(username);
          toast.dismiss(discardLoading);
        })
        .catch((err) => {
          toast.dismiss(discardLoading);
          toast.error(err.message);
        });
      return;
    }

    MJ_DISCARD_TILE({ idx })
      .then(() => {
        updateMahjongHiloData(username);
        toast.dismiss(discardLoading);
      })
      .catch((err) => {
        toast.dismiss(discardLoading);
        toast.error(err.message);
      });
  };

  const handleDeclareKong = () => {
    let kongLoading = toastLoader(
      translate("mj.gameplay.loading.declare_kong"),
      "declare-kong"
    );
    setStopMainBgSound(true);
    playKong();

    MJ_DECLARE_KONG({ array_idx: handKong.tiles.key })
      .then(() => {
        updateMahjongHiloData(username);
        toggleKong();
        toggleCompleteHandResult();
        toast.dismiss(kongLoading);
      })
      .catch((err) => {
        playError();
        toast.dismiss(kongLoading);
        toast.error(err.message);
      });
  };

  const handleDeclareWinHand = () => {
    let winHandLoading = toastLoader(
      translate("mj.gameplay.loading.declare_complete_hand"),
      "declare-complete"
    );
    setStopMainBgSound(true);
    playCompleteHand();

    MJ_DCLR_WIN_HAND({ id })
      .then(() => {
        updateMahjongHiloData(username);
        toggleCompleteHandResult();
        toast.dismiss(winHandLoading);
      })
      .catch((err) => {
        playError();
        toast.dismiss(winHandLoading);
        toast.error(err.message);
      });
  };

  const groupHandTiles = (tiles: Array<number>) => {
    return tiles.reduce((acc, current) => {
      const tiles = GetMahjongTile(current);
      if (tiles) {
        acc[tiles.category] = acc[tiles.category]
          ? [...acc[tiles.category], current]
          : [current];
      }
      return acc;
    }, {});
  };

  const getKongTiles = (
    tiles: Array<number>
  ): { key: number[]; value: number[] } => {
    let kongList: { key: number[]; value: number[] } = { key: [], value: [] };

    if (tiles?.length) {
      const groupTiles = groupHandTiles(tiles);

      //Only get one kong but can store multiple kong
      //by defining array let kongList= []
      if (Object.keys(groupTiles).length) {
        for (const [key, value] of Object.entries(groupTiles)) {
          if ((value as Array<any>).length === 4) {
            kongList.key.push(
              ...groupTiles[key].map((val) => tiles.indexOf(val))
            );
            kongList.value.push(...groupTiles[key]);
            break;
          }
        }
      }
    }
    return kongList;
  };

  const checkKongOrCompleteHand = () => {
    const handTiles = game_data?.hand_player;

    if (handTiles?.length >= 2) {
      const kong = getKongTiles(handTiles);

      if (kong.value.length) {
        toggleKong(kong);
      } else if (game_data?.riichi_status === 1) {
        toggleCompleteHand();
      }
    }
  };

  const handlePassKong = () => {
    setStopMainBgSound(true);
    playPass();
    toggleKong({ key: [], value: [] });
    toggleCompleteHand();
  };

  const handlePassCompleteHand = () => {
    setStopMainBgSound(true);
    playPass();
    toggleCompleteHand();
  };

  const handlePlayAgain = () => {
    let againLoading = toastLoader(
      translate("mj.gameplay.loading.reset_game"),
      "reset"
    );
    playAgain();
    playSoundAgainBg();

    MJ_ACTION_END()
      .then(async (result) => {
        await MJ_START_GAME();
        await updateMahjongHiloData(username);
        toast.success(translate("mj.gameplay.success.reset_game"));
        toast.dismiss(againLoading);
      })
      .catch((err) => {
        toast.error(err.message);
        toast.dismiss(againLoading);
      });
  };

  const updateWalletBalance = async () => {
    try {
      const { data } = await GetUserWalletBalance();
      dispatch(setUserBalance(data));
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.itemMenu}>
          <BtnMenu onClick={toggleMenu} />
        </div>
        <div className={styles.itemCategory}>
          <TileCategory tiles={windsTiles} />
        </div>
        <div className={styles.itemActions}>
          <HiLoDraw
            betStatus={game_data?.bet_status}
            standardTile={game_data?.standard_tile}
            predictionTile={game_data?.current_tile}
            oddsPerTile={oddsPerTile}
            isGameInitialized={initialized}
            isWin={game_data?.hi_lo_result === 2}
            showResult={predictionResult.show}
            playWin={playWin}
            playLose={playLose}
            onPlayLow={() => handleDrawHiLo(1)}
            onPlayDraw={() => handleDrawHiLo(2)}
            onPlayHigh={() => handleDrawHiLo(3)}
          />
        </div>
        <div className={styles.itemTurn}>
          <Turn tiles={game_data?.discarded_tiles} />
        </div>
        <div className={styles.itemKong}>
          <Kong tiles={game_data?.reveal_kong} />
        </div>
        <div className={styles.itemWallet}>
          <Wallet
            isGameInitialized={initialized}
            isLoading={isLoading}
            betStatus={game_data?.bet_status}
            onHilo={handlePlayHilo}
            onTransfer={handleTransferToken}
            stake={game_data?.hi_lo_stake}
            balance={game_data?.hi_lo_balance}
            onWithdraw={handleWithdrawToken}
            onDeposit={handleDepositToken}
            showWithdrawConfirmation={shoWithdrawConfirmation}
            toggleWithdrawConfirmation={toggleModalWithdraw}
            showDepositConfirmation={showDepositConfirmation}
            toggleDepositConfirmation={toggleModalDeposit}
            currency={selectedCurrency}
            hiLoResult={game_data?.hi_lo_result}
          />
        </div>
        <div className={styles.itemHand}>
          <Hand
            winTiles={game_data?.wintiles}
            tiles={game_data?.hand_player}
            riichiStatus={game_data?.riichi_status}
            onDiscardTile={handleDiscardTile}
          />
        </div>

        <MenuComponent
          show={showMenu}
          onHide={toggleMenu}
          onResetGame={handleResetGame}
        />

        {handKong.show && game_data?.status === 1 && (
          <KongPass
            tiles={handKong.tiles.value}
            onHide={handlePassKong}
            onDeclare={handleDeclareKong}
          />
        )}
        {/* 
          riichi_status 
          1 = can discard from hand tiles and declare win hand
          2 = cannot discard from hand tiles and tiles will disable
        */}
        {winHand.showCompleteHand &&
          game_data?.status === 1 &&
          game_data?.riichi_status === 1 && (
            <CompleteHandPass
              tiles={game_data?.hand_player}
              onHide={handlePassCompleteHand}
              onDeclare={handleDeclareWinHand}
            />
          )}
        {winHand.showCompleteHandResult && game_data?.status >= 2 && (
          <CompleteHandResult
            tiles={game_data?.hand_player}
            isWin={game_data?.status === 2}
            scoreType={game_data?.score_type}
            finalScore={game_data?.final_score}
            playAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
};

export default MahjongGameplay;
