import React, { Fragment, useState, useEffect } from "react";
import { injectIntl } from 'react-intl';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import useSound from 'use-sound';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResultModal from "components/TreasurehuntResult";
import CustomLoader from "components/Loader/CustomLoader";
import RulesModal from "components/TreasurehuntRules";
import { Network } from "Config";
import {
  TH_ACTION_INITIALIZE_GAME,
  TH_ACTION_OPEN_TILE,
  TH_ACTION_WITHDRAW_GAME,
  TH_ACTION_REMOVE_EXISTING_GAME,
  updateTreasurehuntData,
} from "services/api/server/treasurehunt_api.js";
import { updateUserWalletBalance } from "services/api/server/platform";
import { setTreasurehuntData } from "redux/treasurehunt/treasurehunt_actions";
import { translate } from "helpers/translate";
import { RulesBtn, GameStartBtn, WithdrawBtn } from "./Assets/SvgAssets";
import "./TreasurehuntGameplayV2.scss";

//======= ASSTETS =========
import {
  SF_1EOS,
  SF_10EOS,
  SF_20EOS,
  SF_1EOS_ACTIVE,
  SF_10EOS_ACTIVE, 
  SF_20EOS_ACTIVE, 
  ONE_RIVAL,
  FIVE_RIVALS,
  TEN_RIVALS,
  ONE_RIVAL_ACTIVE,
  FIVE_RIVALS_ACTIVE,
  TEN_RIVALS_ACTIVE,
  // GameStart,
  // GameActive,
  // WithdrawBtn,
  // WithdrawGrayBtn,
  MapA_Image,
  MapB_Image,
  MapC_Image,
  TreasureIcon,
  PirateIcon,
  thGameLogo,
  // ======= AUDIO ==========
  AudioDestinationA,
  AudioDestinationB,
  AudioDestinationC,
  AudioTHsys1,
  AudioTHerror,
  AudioSetSail,
  AudioSelect,
  AudioTHhome1,
  // AudioHit_1,
  AudioHit_2,
  AudioHit_3,
  AudioMiss,
  AudioOpen,
} from "./Assets";

interface MapOptions {
  id?: string;
  pattern?: any[];
  pirate_flag?: any[];
  treasure?: any[];
}

const MAP_A: MapOptions = {
  id: "MAP_A",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0,   0 ],
    ["C", "D",  0,   0 ],
    ["E", "F", "G", "H"],
    [ 0 , "I", "J",  0 ],
    [ 0 , "K", "L", "M"],
    ["N", "O", "P",  0 ],
  ],
};

const MAP_B: MapOptions = {
  id: "MAP_B",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0 ,  0 ],
    ["C",  0 ,  0 ,  0 ],
    ["D", "E", "F", "G"],
    ["H", "I", "J",  0 ],
    ["K", "L", "M", "N"],
    [ 0 , "O", "P",  0 ],
  ],
};

const MAP_C: MapOptions = {
  id: "MAP_C",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0 ,  0 ],
    ["C", "D",  0 ,  0 ],
    ["E", "F", "G",  0 ],
    [ 0 , "H", "I",  0 ],
    ["J", "K", "L", "M"],
    ["N", "O", "P",  0 ],
  ]
};

const MAP_OPTIONS = [MAP_A, MAP_B, MAP_C];

const LetterToIndex = (letter) => {
  const isCapital = true
  return letter.charCodeAt(0) - (isCapital ? 65 : 97);
}

type TileProps = {
  userId: any;
  username: string | undefined;
  treasurehuntData?: any;
  param: string | number;
  gameStarted: boolean;
  panels: any;
  isOpeningTile: boolean;
  setIsOpeningTile: Function;
  setOpenedPanel: Function;
  remainingTreasure: number;
  setPopupModal: Function;
  playOpeningTile: Function;
  playError: Function;
};

const Tile = ({
  userId,
  username,
  treasurehuntData,
  param,
  gameStarted,
  panels,
  isOpeningTile,
  setIsOpeningTile,
  setOpenedPanel,
  remainingTreasure,
  setPopupModal,
  playOpeningTile,
  playError,
}: TileProps) => {
  const [selected, setSelected]: any = useState(null);
  const [loading, setLoading] = useState(false);

  let content: any = null;
  let style: any = {};

  const panel_obj = param ? panels.find(obj => obj.key === LetterToIndex(param)) : null

  if (loading && selected === param) { // IF TILE IS OPENING
    content = (
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    if (param) {
      if (panel_obj != null && panel_obj.isopen) {
        style = { background: "rgba(78,42,26,0.6)" };

        if (panel_obj.iswin) {
          content = <img src={TreasureIcon} alt="T" className="position-absolute" />
        } else {
          content = <img src={PirateIcon} alt="P" className="position-absolute" />
        }

      } else {
        if (!gameStarted) {
          style = { background: "rgba(78,42,26,0.6)" };
        }
        content = <h1>{param}</h1>;
      }
    }
  }

  const openTile = (param) => {
    if (!param) return;
    if (isOpeningTile) return;
    if (panel_obj != null && panel_obj.isopen) return;
    if (remainingTreasure <= 0) {
      setPopupModal({ state: true, type: "NO_REMAINING_TILE" })
      return
    };
    if (gameStarted) {
      setSelected(param);
      setLoading(true);
      setIsOpeningTile(true);
      playOpeningTile()

      TH_ACTION_OPEN_TILE({ id: userId, username, index: LetterToIndex(param) }).then(async(result) => {
        const updatedData = {...result?.data}
        if (updatedData) {
          setOpenedPanel({
            tile: param,
            data: updatedData
          })
        } else {
          setOpenedPanel({ tile: null, data: null })
          toast.error('Error opening tiles, please try again')
        }
      }).catch((err) => {
        console.log({ TH_OPEN_TILE_ERR: err })
        playError()
        setOpenedPanel({ tile: null, data: null })
        toast.error('Error opening tiles, please try again')
      }).finally(() => {
        setLoading(false);
        setIsOpeningTile(false);
      })
    }
  };

  return (
    <Col
      id={`tiles-${param ? 1 : 0}`}
      className={gameStarted === false ? "tile-disabled" : ""}
      style={{
        border: param ? "3px solid #4e2a1a" : "",
        ...style,
      }}
      xs={3}
      onClick={() => openTile(param)}
    >
      {content}
    </Col>
  );
};

const initResult = {
  isShown: false,
  isWin: false,
  withdraw: false,
  eosWon: 0,
};

const TEMP_PANEL_SET = [
  Object.freeze({ key: 0, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 1, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 2, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 3, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 4, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 5, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 6, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 7, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 8, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 9, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 10, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 11, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 12, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 13, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 14, isopen: 0, iswin: 0 }),
  Object.freeze({ key: 15, isopen: 0, iswin: 0 }),
]

const getErrorMessage = (type, intl) => {
  let message = ""
  switch(type) {
    case "NO_DATA":
      message = intl.formatMessage({ id: "th.gameplay.error_gamedata", defaultMessage: 'Error loading game data'})
      return message;
    case "NO_REMAINING_TILE":
      message = intl.formatMessage({ id: "th.gameplay.game_won", defaultMessage: 'You have won the game!'})
      return message;
    default: return message
  }
}

const TreasurehuntGameplayV2 = (props) => {
  const { selectedCurrency, language } = props.platform
  const { user_game_id, username } = props.platform.account
  const treasurehuntData = props.treasurehunt

  const [loadedPrevGame, setLoadedPrevGame] = useState(false)
  const [openedPanel, setOpenedPanel] = useState<any>({ tile: null, data: null })
  const [initialized, setInitialized] = useState(false)
  const [isWithdrawn, setWithdrawn] = useState(false)
  const [hasEnded, setGameEnd] = useState(false)
  const [popupModal, setPopupModal] = useState({ state: false, type: "" })
  const [rulesHoverState, setRulesHoverState] = useState(false);

  // LEFT PANEL
  const [showRules, setShowRules] = useState(false)
  const [startingFunds, setStartingFunds] = useState(0)
  const [numOfRivals, setNumOfRivals] = useState<string | number>('')
  const [gameStarted, setGameStarted] = useState(false)

  // RIGHT PANEL
  const [maximumWin, setMaximumWin] = useState(0)
  const [currentWinnings, setCurrentWinnings] = useState(0)
  const [nextPrize, setNextPrize] = useState(0)
  const [odds, setOdds] = useState(0)
  const [remainingTreasure, setRemainingTreasure] = useState(0)

  const [loading, setLoading] = useState({ state: false, text: '' });
  const [selected_map, setSelectedMap] = useState(0);
  const [panels, setPanels]: any = useState([]);
  const [result, setResult] = useState(initResult);
  const [isOpeningTile, setIsOpeningTile] = useState(false);

  // sound hooks
  const [playTHsys1] = useSound(AudioTHsys1, { volume: 0.5 })
  const [playError] = useSound(AudioTHerror, { volume: 0.5 })
  const [playSelect] = useSound(AudioSelect, { volume: 0.5 })
  const [playSetSail] = useSound(AudioSetSail, { volume: 0.5 })
  const [playHome] = useSound(AudioTHhome1, { volume: 0.5 })
  const [playHit2] = useSound(AudioHit_2, { volume: 0.5 })
  const [playHit3] = useSound(AudioHit_3, { volume: 0.5 })
  const [playMiss] = useSound(AudioMiss, { volume: 0.5 })
  const [playDestinationA] = useSound(AudioDestinationA, { volume: 0.5 })
  const [playDestinationB] = useSound(AudioDestinationB, { volume: 0.5 })
  const [playDestinationC] = useSound(AudioDestinationC, { volume: 0.5 })
  // sound for tiles
  const [playOpeningTile] = useSound(AudioOpen, { volume: 0.5 })

  const MAP_SELECTED = MAP_OPTIONS[selected_map];

  useEffect(() => {
    const { selectedDestination } = props.location.state || {}    
    if (selectedDestination) {
      setStartingFunds(selectedDestination)
    } else {
      setStartingFunds(10)
    }
    setNumOfRivals(5)
    setPanels([...TEMP_PANEL_SET])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user_game_id && username) {
      updateTreasurehuntData(user_game_id).then(() => {
        setLoading({ state: false, text: '' })
        setInitialized(true)
      })
    } else {
      alert("Please login your account first")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_game_id])

// ================= CHECKING IF THERE IS AN EXISTING GAME =================
  useEffect(() => {
    const { game_data } = treasurehuntData
    const removeGame = async() => {
      const id = user_game_id
      await TH_ACTION_REMOVE_EXISTING_GAME({ id, username })
      props.dispatch(setTreasurehuntData({
        game_data: null,
        id: null,
      }))
      setLoading({ state: false, text: '' })
    }

    if (initialized && game_data !== null) {
      console.log('GAME IS INITIALIZED WITH GAME DATA: ', game_data)
      // check if the game is initialized but incomplete data OR  game is already ended
      // if (game_data.status === 0 || game_data.status === 2) {
      if (game_data.status === 2) {
        setLoading({ state: true, text: '' })
        removeGame()
      } else {
        if (game_data.status === 0) {
          removeGame()
          return
        }
        setLoadedPrevGame(true)
        setStartingFunds(game_data.destination)
        setNumOfRivals(game_data.enemy_count)
        setPanels(game_data.panel_set)
        setRemainingTreasure(game_data.unopentile - game_data.enemy_count)
        setMaximumWin(game_data.maxprize)
        setCurrentWinnings(game_data.prize)
        setNextPrize(game_data.nextprize)
        setOdds(game_data.odds)
        setGameStarted(true)
        playSetSail()
        toast.success('Previous game loaded')
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])
  
  // ================= IF GAME START CLICKED =================
  useEffect(() => {
    const { game_data } = treasurehuntData
    if (gameStarted) {
      if (game_data !== null) {
        if (loadedPrevGame === false) {
          setPanels([...TEMP_PANEL_SET])
        }
        playSetSail()
        setRemainingTreasure(game_data.unopentile - game_data.enemy_count)
        setMaximumWin(game_data.maxprize)
        setCurrentWinnings(game_data.prize)
        setNextPrize(game_data.nextprize)
        setOdds(game_data.odds)
      } else {
        setPopupModal({ state: true, type: "NO_DATA" })
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted])

  // ================= CHANGING MAP =================
  useEffect(() => {
    let map = 0
    switch (startingFunds) {
      case  1: map = 0; break;
      case 10: map = 1; break;
      case 20: map = 2; break;
      default: break
    }

    if (isWithdrawn) { // refresh tiles on map change after withdrawing
      setPanels([...TEMP_PANEL_SET])
      setWithdrawn(false)
    }
    
    if (hasEnded) { // refresh tiles on map change after game is ended
      setPanels([...TEMP_PANEL_SET])
      setGameEnd(false)
    }

    setSelectedMap(map)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingFunds])

  // ================= CHECKING IF A PANEL IS OPENED =================
  useEffect(() => {    
    console.log({ openedPanel })
  
    const endGame = async() => {
      await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username })
      props.dispatch(setTreasurehuntData({
        game_data: null,
        id: null
      }))
    }
  
    if (gameStarted && openedPanel.tile !== null && openedPanel.data !== null) {
      const tile = openedPanel?.tile || null;
      const data = openedPanel?.data || null;
      props.dispatch(setTreasurehuntData({
        id: data?.game_id,
        game_data: data,
      }))

      try {
        const openedPanelData = data.panel_set.find(obj => obj.key === LetterToIndex(tile))
        const treasuresLeft = data.unopentile - data.enemy_count

        setPanels(data.panel_set)
        setCurrentWinnings(data.prize)
        setNextPrize(data.nextprize)
        setRemainingTreasure(treasuresLeft)
        setOdds(data.odds)
        
        if (data.status === 2 && openedPanelData && openedPanelData.iswin === 1) { // IF GAME IS WON
          playHit3()
          endGame()
          _resetData()
          setGameEnd(true)
          setResult({
            isShown: true,
            isWin: true,
            withdraw: true,
            eosWon: data.prize,
          })
        }
        else if (data.status === 2 && openedPanelData && openedPanelData.iswin === 0) { // IF PIRATE PANEL IS OPENED
          playMiss()
          endGame()
          _resetData()
          setGameEnd(true)
          setResult({
            isShown: true,
            isWin: false,
            withdraw: false,
            eosWon: 0,
          })
        }
        else if (data.status === 1 && openedPanelData && openedPanelData.iswin === 1) { // IF TREASURE PANEL IS OPENED
          if (treasuresLeft === 0) {
            setPopupModal({ state: true, type: "NO_REMAINING_TILE" })
          }
          playHit2()
          setResult({
            isShown: true,
            isWin: true,
            withdraw: false,
            eosWon: 0,
          })
        }
      } catch(e) {
        setPopupModal({ state: true, type: "NO_DATA" })
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedPanel])

  useEffect(() => {
    const endGame = async() => {
      const { game_data } = treasurehuntData
      setPanels(game_data.panel_set)
      await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username })
      props.dispatch(setTreasurehuntData({
        game_data: null,
        id: null
      }))
    }

    if (isWithdrawn) {
      endGame()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWithdrawn])

  const _getMapImage = (selected) => {
    if (selected === 0) return MapA_Image;
    if (selected === 1) return MapB_Image;
    if (selected === 2) return MapC_Image;
  };

  const _setStartingFunds = (value) => {
    if (gameStarted) return

    playSelect()
    setStartingFunds(value)
  }

  const _setNumberOfRivals = (value) => {
    if (gameStarted) return

    playSelect()
    setNumOfRivals(value)
  }

  const _setCustomNumberOfRivals = (event) => {
    if (gameStarted) return

    const value = +event.target.value
    playSelect()

    if (value <= 0) {
      setNumOfRivals('')
      playError()
      toast.warn('Please input a number from 1 to 15')
      return
    }

    if (value > 15) {
      setNumOfRivals(15)
      playError()
      toast.warn('Please input a number from 1 to 15')
      return
    }

    setNumOfRivals(value)
  }

  const _startGame = async () => {
    if (gameStarted) return

    setLoadedPrevGame(false)
    playSelect()

    if (startingFunds === 0) {
      toast.warn('Please select destination')
      playError()
      return
    }

    if (numOfRivals === 0 || numOfRivals === '') {
      toast.warn('Please input number of rivals')
      playError()
      return
    }

    if (username != null) {
      if (treasurehuntData.game_data === null) {
        const { intl } = props
        const initializingText = intl.formatMessage({ id: "th.gameplay.initializing", defaultMessage: 'Initializing...'})
        const id = user_game_id

        setLoading({ state: true, text: `${initializingText}...` })
        switch (startingFunds) {
          case  1: playDestinationA(); break
          case 10: playDestinationB(); break
          case 20: playDestinationC(); break
          default: break
        }
        try {
          await TH_ACTION_INITIALIZE_GAME({
            id, 
            destination: startingFunds, 
            enemy_count: numOfRivals, 
            quantity: startingFunds,
            currency: selectedCurrency
          })
          await updateTreasurehuntData(id)
          updateUserWalletBalance()
          setWithdrawn(false)
          setGameStarted(true)
        } catch (err) {
          console.log({ TH_INIT_ERR: err })
          setGameStarted(false)
          await TH_ACTION_REMOVE_EXISTING_GAME({ id, username })
          toast.warn('Sorry, there is an error occurred. Please try again')
        } finally {
          setLoading({ state: false, text: '' })
        }
      } else {
        // development only
        toast.error('Has existing game! please finish the game first')
      }
    } else {
      playError()
      toast.warn('Please log in your account first.')
    }
  }

  const _withdrawRewards = () => {
    // only active when game is started
    if (!gameStarted) return
    
    const { game_data } = treasurehuntData

    playSelect()
    if (gameStarted && game_data.win_count !== 0) {
      const { intl } = props
      const withdrawingText = intl.formatMessage({ id: "th.gameplay.withdraw", defaultMessage: 'Initializing...'})

      setLoading({ state: true, text: `${withdrawingText}...` })
      TH_ACTION_WITHDRAW_GAME({ id: user_game_id }).then(async(response) => {
        updateUserWalletBalance()
        await updateTreasurehuntData(user_game_id)
        setLoading({ state: false, text: '' })
        setWithdrawn(true)
        _resetData()
        playHit3()
        setResult({
          isShown: true,
          isWin: true,
          withdraw: true,
          eosWon: currentWinnings,
        })
      }).catch(() => {
        setLoading({ state: false, text: '' })
        toast.error('Error withdrawing game, please try again')
      })
    } else {
      playError()
      toast.warn('You need to win at least 1 treasure to withdraw')
    }
  }

  // ================= CLEAR DATA ON LOCAL STATE =================
  const _resetData = () => {
    setGameStarted(false)
    setOpenedPanel({ tile: null, data: null })
    setMaximumWin(0)
    setCurrentWinnings(0)
    setNextPrize(0)
    setOdds(0)
    setRemainingTreasure(0)
  }

  let remainingTreasureData = '0 of 0'
  if (gameStarted) {
    remainingTreasureData = `${remainingTreasure} of ${16 - (+numOfRivals)}`
  }

  return (
    <Fragment>
      <Helmet>
        <title>Treasurehunt Game</title>
        <meta property="og:title" content="Treasurehunt Game" />
        <meta property="og:type" content="game" />
        <meta property="og:url" content={`${Network.protocol}://${Network.host}/game/treasurehunt/gameplay`} />
        <meta property="og:description" content="Coinica - Treasurehunt" />
        <meta property="og:image" content={thGameLogo} />
        <meta property="og:image:secure_url" content={thGameLogo} />

        <meta name="twitter:card" content="game" />
        <meta name="twitter:title" content="Treasurehunt Game" />
        <meta name="twitter:description" content="Coinica - Treasurehunt" />
        <meta name="twitter:url" content={`${Network.protocol}://${Network.host}/game/treasurehunt/gameplay`} />
        <meta name="twitter:image" content={thGameLogo} />
      </Helmet>
      <CustomLoader visible={loading.state} text={loading.text} />
      <ResultModal
        state={result.isShown}
        setState={() => setResult(initResult)}
        isWin={result.isWin}
        withdraw={result.withdraw}
        eosWon={(result.eosWon + '').replace("EOS", "").trim()}
      />
      <RulesModal
        state={showRules}
        setState={(bool) => setShowRules(bool)}
      />
      <Modal
        dialogClassName="TreasurehuntAutoplayGameplay-Error-Modal"
        show={popupModal.state}
        onHide={() => setPopupModal({ state: false, type: "" })}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: '0 auto' }}>
            {getErrorMessage(popupModal.type, props.intl)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '20px' }}>
          {
            popupModal.type === "NO_REMAINING_TILE" ? (
              <div>
                {translate("th.gameplay.found_all_treasure")}
              </div>
            ) : (
               <>
                <div>
                  {translate("th.gameplay.something_went_wrong")}
                </div>
                <div>
                  {translate("th.gameplay.reload_page_message")}
                </div>
              </>
            )
          }
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          {
            popupModal.type === "NO_REMAINING_TILE" ? (
              <Button
                variant="primary"
                onClick={() => {
                  _withdrawRewards()
                  setPopupModal({ state: false, type: "" })
                }}
              >
                {translate("th.gameplay.withdraw")}
              </Button>
            ) : (
              <Button variant="primary" onClick={() => window.location.reload()}>
                {translate("th.gameplay.retry")}
              </Button>
            )
          }
        </Modal.Footer>
      </Modal>
      <div
        className="gameplay-container row"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        <div className="left-container col-md-3">
          <div className="left_wrapper">
            <div className="left_nav_parent">
              <div className="left_nav">
                <div>
                  <div style={{ marginBottom: '10px', fontSize: '2rem', lineHeight: '30px' }}>
                    <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}>
                      {translate("th.gameplay.step1")}
                    </span>
                    <br />
                    <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}>
                      {translate("th.gameplay.step1.text")}
                    </span>
                  </div>
                  <div className="options_container">
                    {
                      startingFunds === 1 ? (
                        <img src={SF_1EOS_ACTIVE} alt="1EOS" className="hover-cursor" />
                      ) : (
                        <img
                          src={SF_1EOS} alt="1EOS"
                          className={startingFunds !== 1 && gameStarted ? "hover-disable" : "hover-cursor"}
                          onClick={() => _setStartingFunds(1)}
                          style={{
                            opacity: startingFunds !== 1 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                    {
                      startingFunds === 10 ? (
                        <img src={SF_10EOS_ACTIVE} alt="10EOS" className="hover-cursor" style={{ margin: '0 5px' }} />
                      ) : (
                        <img src={SF_10EOS} alt="10EOS"
                          className={startingFunds !== 10 && gameStarted ? "hover-disable" : "hover-cursor"}
                          onClick={() => _setStartingFunds(10)}
                          style={{
                            margin: '0 5px',
                            opacity: startingFunds !== 10 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                    {
                      startingFunds === 20 ? (
                        <img src={SF_20EOS_ACTIVE} alt="20EOS" className="hover-cursor" />
                      ) : (
                        <img src={SF_20EOS} alt="20EOS"
                          className={startingFunds !== 20 && gameStarted ? "hover-disable" : "hover-cursor"}
                          onClick={() => _setStartingFunds(20)}
                          style={{
                            opacity: startingFunds !== 20 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                  </div>
                </div>
                <div>
                  <div style={{ margin: '10px 0px', fontSize: '2rem', lineHeight: '30px' }}>
                    <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}>
                      {translate("th.gameplay.step2")}
                    </span>
                    <br />
                    <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}>
                      {translate("th.gameplay.step2.text")}
                    </span>
                  </div>
                  <div className="options_container">
                    {
                      numOfRivals === 1 ? (
                        <img
                          src={ONE_RIVAL_ACTIVE}
                          alt="1"
                          className="hover-cursor step2_option"
                        />
                      ) : (
                        <img
                          src={ONE_RIVAL}
                          alt="1"
                          className={`${numOfRivals !== 1 && gameStarted ? "hover-disable" : "hover-cursor"} step2_option`}
                          onClick={() => _setNumberOfRivals(1)}
                          style={{
                            opacity: numOfRivals !== 1 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                    {
                      numOfRivals === 5 ? (
                        <img
                          src={FIVE_RIVALS_ACTIVE}
                          alt="5"
                          className="hover-cursor step2_option"
                          style={{ margin: '0 5px' }}
                        />
                      ) : (
                        <img src={FIVE_RIVALS} alt="5"
                          className={`${numOfRivals !== 5 && gameStarted ? "hover-disable" : "hover-cursor"} step2_option`}
                          onClick={() => _setNumberOfRivals(5)}
                          style={{
                            margin: '0 5px',
                            opacity: numOfRivals !== 5 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                    {
                      numOfRivals === 10 ? (
                        <img
                          src={TEN_RIVALS_ACTIVE}
                          alt="10"
                          className="hover-cursor step2_option"
                        />
                      ) : (
                        <img
                          src={TEN_RIVALS}
                          alt="10"
                          className={`${numOfRivals !== 10 && gameStarted ? "hover-disable" : "hover-cursor"} step2_option`}
                          onClick={() => _setNumberOfRivals(10)}
                          style={{
                            opacity: numOfRivals !== 10 && gameStarted ? 0.5 : 1
                          }}
                        />
                      )
                    }
                  </div>
                </div>
                <div>
                  <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}>
                    {translate("th.gameplay.step3.text")}
                  </span>
                  <input
                    className={gameStarted ? "hover-disable" : ""}
                    type="number"
                    style={{
                      margin: '15px 0px',
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid #D8A764',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                    disabled={gameStarted}
                    value={numOfRivals}
                    onChange={(e) => _setCustomNumberOfRivals(e)}
                  />
                </div>
                <div className={gameStarted ? "hover-cursor" : "game_start_btn"} onClick={() => _startGame()} >
                  <GameStartBtn language={language} isStarted={gameStarted} />
                </div>
              </div>
              <div className="left_buttons">
                <Link to="/game/treasurehunt" onClick={() => playHome()}>
                  <div className="img-fluid home_btn" />
                </Link>
                <div
                  className="hover-cursor"
                  onMouseEnter={() => setRulesHoverState(true)}
                  onMouseLeave={() => setRulesHoverState(false)}
                  onClick={() => { 
                    playTHsys1()
                    setShowRules(true)
                  }}
                >
                  <RulesBtn language={language} isHovered={rulesHoverState} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map-container col-md-6">
          <div id="map-image-container">
            <Container
              id="tiles-container"
              className="container-fluid"
              style={{
                zIndex: 100,
                position: "absolute",
                top: 50,
                left: 50,
                width: "80%",
                height: "90%",
              }}
            >
              {MAP_SELECTED?.pattern?.map((row, idx) => (
                <Row id="tiles-row" key={idx} style={{ height: "15.5%" }}>
                  {row.map((col, idx) => (
                    <Tile
                      key={MAP_SELECTED?.id + idx}
                      userId={user_game_id}
                      username={username}
                      treasurehuntData={treasurehuntData}
                      param={col}
                      gameStarted={gameStarted}
                      panels={panels}
                      isOpeningTile={isOpeningTile}
                      setIsOpeningTile={(bool) => setIsOpeningTile(bool)}
                      remainingTreasure={remainingTreasure}
                      setOpenedPanel={(result) => setOpenedPanel(result)}
                      setPopupModal={setPopupModal}
                      playOpeningTile={playOpeningTile}
                      playError={playError}
                    />
                  ))}
                </Row>
              ))}
            </Container>
            <img
              className="h-100 img-fluid"
              src={_getMapImage(selected_map)}
              alt=""
            />
          </div>
        </div>
        <div className="right-container col-md-3">
          <div className="right_wrapper">
            <div className="right_details">
              <div style={{ borderBottom: '1px solid #D8A764', paddingBottom: '5px' }}>
                <span className={language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary max_win"}>
                  {translate("th.gameplay.maximum_win")}
                </span>
                <div className="value_wrapper">
                  <span className="value red">{`${(+maximumWin).toFixed(4)}`}</span>
                </div>
              </div>
              <div className="winnings_detail">
                <div style={{ padding: '10px 0px' }}>
                  <div>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.current_winnings")}
                    </span>
                    <div className="value_wrapper">
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>
                        {`${(+currentWinnings).toFixed(4)}`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.next_win")}
                    </span>
                    <div className="value_wrapper">
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>
                        {`${(+nextPrize).toFixed(4)}`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.odds")}
                    </span>
                    <div className="value_wrapper">
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>
                        {`x${(+odds).toFixed(4)}`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.remaining_treasure")}
                    </span>
                    <div className="value_wrapper">
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>
                      {remainingTreasureData}
                    </span>
                    </div>
                  </div>
                </div>
                <div className={gameStarted ? `withdraw_btn` : `withdraw_btn_disabled`} onClick={() => _withdrawRewards()}>
                  <WithdrawBtn language={language} disabled={!gameStarted} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ treasurehunt, platform }) => ({ treasurehunt, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TreasurehuntGameplayV2));
