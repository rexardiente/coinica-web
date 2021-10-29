import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useSound from 'use-sound';
import CustomLoader from "components/Loader/CustomLoader";
import History from "./History";
import {
  TH_ACTION_INITIALIZE_GAME,
  TH_ACTION_REMOVE_EXISTING_GAME,
  TH_ACTION_AUTOPLAY_OPT,
  updateTreasurehuntData,
  updateTreasurehuntDataAutoplay
} from "services/api/server/treasurehunt_api.js";
import { setTreasurehuntData } from "redux/treasurehunt/treasurehunt_actions"
import { updateUserWalletBalance } from "services/api/server/platform";
import { translate } from "helpers/translate";
import "./TreasurehuntAutoplayGameplay.scss";

//======= ASSTETS =========
import { StopBtn } from "./Assets/SvgAssets";
import {
  MapA_Image,
  MapB_Image,
  MapC_Image,
  PirateFlagIcon,
  // StopBtn,
  // StoppedBtn,
} from "../TreasurehuntGameplayV2/Assets"

// Audio
import {
  AudioTHsys1,
  AudioSetSail,
  AudioSelect,
  AudioTHhome1,
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
  if (!letter) return
  const isCapital = true
  return letter.charCodeAt(0) - (isCapital ? 65 : 97);
}

type TileProps = {
  param: string | number;
  isOpeningTile: boolean;
  orderOfPanelsToOpen: number[]
  isGameEnd: boolean
};

const Tile = ({
  param,
  isOpeningTile,
  orderOfPanelsToOpen,
  isGameEnd
}: TileProps) => {
  let content: any = null;
  let style: any = {};
  let isIncluded = param ? orderOfPanelsToOpen.find(idx => idx === LetterToIndex(param)) : null
  if (isIncluded === 0) isIncluded = 1 // if index 0 found, set to true in order to be read by the next line

  if (isGameEnd && param) {
    style = { background: "rgba(78,42,26,0.6)" }
    if (isIncluded) {
      content = <img src={PirateFlagIcon} alt="P" className="position-absolute" />
    } else {
      content = <h1>{param}</h1>
    }
  } else {
    if (param) {
      if (isOpeningTile && isIncluded) {
        content = (
          <Spinner animation="grow" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        );
      } else if (isOpeningTile && !isIncluded) {
        content = <h1>{param}</h1>
      } else if (!isOpeningTile && isIncluded) {
        content = <img src={PirateFlagIcon} alt="P" className="position-absolute" />
      }
    }
  }

  return (
    <Col
      id={`tiles-${param ? 1 : 0}`}
      className={isGameEnd === false ? "tile-disabled" : ""}
      style={{
        border: param ? "3px solid #4e2a1a" : "",
        ...style,
      }}
      xs={3}
    >
      {content}
    </Col>
  );
};

const TreasurehuntAutoplayGameplay = (props) => {
  const { account, accountBalance, selectedCurrency, language  } = props.platform
  const treasurehuntData = props.treasurehunt
  const username = account?.username
  const user_game_id = account?.user_game_id

  // AUTOPLAY PARAMETERS
  const [stopParameters, setStopParameters] = useState({
    numOfGames: false,
    minBalance: false,
    maxBalance: false
  })
  const [startingFunds, setStartingFunds] = useState(0)
  const [numOfRivals, setNumOfRivals] = useState<string | number>('')
  /**
   * gameStarted => start of each game not the overall autoplay mode
   */
  const [gameStarted, setGameStarted] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [remainingGames, setRemainingGames] = useState<number>(0)
  const [maxBalance, setMaxBalance] = useState<number>(0)
  const [minBalance, setMinBalance] = useState<number>(0)
  const [orderOfPanelsToOpen, setOrderOfPanelsToOpen] = useState([])
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0)

  const [startBalance, setStartBalance] = useState<string | null>('')
  const [isAutoplayStarted, setAutoplayStart] = useState(false)
  const [isGameEnd, setGameEnd] = useState(false)
  const [autoplayModal, setModal] = useState<any>({
    state: false,
    title: '',
    subTitle: '',
    message: '',
    payload: ''
  })


  // RIGHT PANEL
  const [gameHistory, setGameHistory] = useState<any[]>([])
  const [currentWinnings, setCurrentWinnings] = useState(0)
  const [nextPrize, setNextPrize] = useState(0)
  const [remainingTreasure, setRemainingTreasure] = useState(0)

  const [loading, setLoading] = useState({ state: false, text: '' });
  const [selected_map, setSelectedMap] = useState(0);

  // sound hooks
  const [playTHsys1] = useSound(AudioTHsys1, { volume: 0.5 })
  const [playSelect] = useSound(AudioSelect, { volume: 0.5 })
  const [playSetSail] = useSound(AudioSetSail, { volume: 0.5 })
  const [playHome] = useSound(AudioTHhome1, { volume: 0.5 })

  const MAP_SELECTED = MAP_OPTIONS[selected_map];

  useEffect(() => {
    const { autoplayParameters } = props.location.state || {}
    if (autoplayParameters) {
      const {
        firstScreenState: {
          destination,
          rivals
        },
        secondScreenState: {
          numOfPanelsToOpen,
          orderOfPanelsToOpen,
        },
        thirdScreenState: {
          gamesPlayed,
          maxBalance,
          minBalance
        }
      } = autoplayParameters

      setStartingFunds(destination)
      setNumOfRivals(rivals)
      setOrderOfPanelsToOpen(orderOfPanelsToOpen)
      setRemainingTreasure(16 - rivals - numOfPanelsToOpen)

      let stopParams = { numOfGames: false, minBalance: false, maxBalance: false }
      if (gamesPlayed.selected && gamesPlayed.value !== '') {
        setRemainingGames(gamesPlayed.value)
        stopParams.numOfGames = true
      }
      if (maxBalance.selected && maxBalance.value !== '') {
        setMaxBalance(maxBalance.value)
        stopParams.maxBalance = true
      }
      if (minBalance.selected && minBalance.value !== '') {
        setMinBalance(minBalance.value)
        stopParams.minBalance = true
      }
      setStopParameters(stopParams)

      let map = 0
      switch (destination) {
        case  1: map = 0; break;
        case 10: map = 1; break;
        case 20: map = 2; break;
        default: break
      }
      setSelectedMap(map)
    } else {
      props.history.push('/game/treasurehunt/autoplay')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (account && user_game_id && accountBalance[selectedCurrency] != null) {
      setLoading({ state: true, text: '' })
      updateTreasurehuntData(user_game_id).then(() => {
        setStartBalance(`${accountBalance[selectedCurrency]?.amount} token`)
        setLoading({ state: false, text: '' })
        setInitialized(true)
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  
  const removeExistingGameAndStartAutoplay = async() => {
    await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username }).then(() => {
      props.dispatch(setTreasurehuntData({
        game_data: null,
        game_id: null,
        total_win: 0,
        username: null
      }))
      setLoading({ state: false, text: '' })
      setAutoplayStart(true)
      playSetSail()
    }).catch(() => {
      toast.error('Error encountered, try refreshing the page')
      setLoading({ state: false, text: '' })
      setGameEnd(true)
    })
  }

// ================= CHECKING IF THERE IS AN EXISTING GAME =================
  useEffect(() => {
    const { game_data } = treasurehuntData
    // check if the game is initialized and has existing game
    if (initialized) {
      // check if there is an existing game
      if (game_data !== null) {
        const bool = window.confirm('You have an existing game. Do you wish to continue?')
        if (bool) {
          setLoading({ state: true, text: '' })
          removeExistingGameAndStartAutoplay()
        } else {
          props.history.push('/game/treasurehunt')
        }
      } else {
        // start autoplay right ahead
        setAutoplayStart(true)
        playSetSail()
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [initialized])


  const resetGameAndPlay = async(username) => {
    await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username }).catch((err) => {
      setModal({
        state: true,
        title: translate("th.autoplay.modal.error"),
        subTitle: translate("th.autoplay.modal.sub_title"),
        message: translate("th.autoplay.modal.message"),
        payload: 'error'
      })
      setGameEnd(true)
    })

    setGameStarted(true)
    playGame(username)
  }

  const playGame = async(username) => {
    try {
      let history:any = {
        id: null,
        user: username,
        date: new Date(),
        winnings: '',
        isWin: null,
        rivals: numOfRivals,
        openedGold: 0,
        openedRivals: 0
      }
      await TH_ACTION_INITIALIZE_GAME({
        id: user_game_id,
        destination: startingFunds,
        enemy_count: numOfRivals,
        quantity: startingFunds,
        currency: selectedCurrency
      })
      await TH_ACTION_AUTOPLAY_OPT({ id: user_game_id, username, panelset: orderOfPanelsToOpen })
      await updateTreasurehuntDataAutoplay(user_game_id).then(res => {
        let prize = `-${startingFunds}.0000 Token`
        if (res.isWin && res.prize != null) {
          const tempPrize = res.prize || 0
          const profit = (+(tempPrize) - startingFunds).toFixed(4)
          prize = `+${profit} Token`

          // SET [NEXT WIN] DATA IN RIGHT PANEL
          if (nextPrize === 0) {
            setNextPrize(+profit)
          }
        }

        history.id = res?.gameId
        history.openedRivals = res?.loseCount
        history.openedGold = res?.winCount
        history.winnings = prize
        history.isWin = res?.isWin
      })
      await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username })
      await updateTreasurehuntData(user_game_id)
      await updateUserWalletBalance()

      setGameStarted(false)
      setRemainingGames(prev => prev - 1)
      setTotalGamesPlayed(prev => prev + 1)
      setGameHistory(prevHistory => [...prevHistory, history])
      playTHsys1()
    } catch (err) {
      await TH_ACTION_REMOVE_EXISTING_GAME({ id: user_game_id, username }).catch(() => {
        // if ERROR occured in removing existing game, alert user
        // this will fix the bug for not alerting user if an error occured
        // when this request fails
        toast.warn('Sorry, there is an error occurred. Please try again')
        setModal({
          state: true,
          title: translate("th.autoplay.modal.error"),
          subTitle: translate("th.autoplay.modal.sub_title"),
          message: translate("th.autoplay.modal.message"),
          payload: 'error'
        })
        setGameEnd(true)
        setGameStarted(false)
      })

      // if the request above fails, this code block won't be reached
      // solution is to put another block of code inside the request catch callback
      toast.warn('Sorry, there is an error occurred. Please try again')
      setModal({
        state: true,
        title: translate("th.autoplay.modal.error"),
        subTitle: translate("th.autoplay.modal.sub_title"),
        message: translate("th.autoplay.modal.message"),
        payload: 'error'
      })
      setGameEnd(true)
      setGameStarted(false)
    } finally {
      setLoading({ state: false, text: '' })
    }
  }

  const getStopParametersMessage = (parameter) => {
    let data:any = {
      state: true,
      title: translate("th.autoplay.ended"),
      subTitle: translate("th.autoplay.ended.sub.stop_params"),
      message: '',
      payload: 'stop_parameter'
    }

    switch (parameter) {
      case 'numOfGames':
        data.message = translate("th.autoplay.ended.num_of_games")
        break;
      case 'minBalance':
        data.message = translate("th.autoplay.ended.min_bal")
        break;
      case 'maxBalance':
        data.message = translate("th.autoplay.ended.max_bal")
        break;
      case 'insufficientBalance':
        data.subTitle = translate("th.autoplay.ended.sub.no_balance")
        data.message = translate("th.autoplay.ended.no_bal")
        break;
    }

    setModal(data)
  }

  const checkStopParameters = () => {
    const balanceNumber = (accountBalance[selectedCurrency])?.amount

    if (balanceNumber < startingFunds || balanceNumber == null) {
      return {
        stopFlag: true,
        stopParameter: 'insufficientBalance'
      }
    }
    
    if (stopParameters.numOfGames) {
      if (remainingGames === 0) {
        return {
          stopFlag: true,
          stopParameter: 'numOfGames'
        }
      }
    }

    if (stopParameters.minBalance) {
      if (balanceNumber <= minBalance) {
        return {
          stopFlag: true,
          stopParameter: 'minBalance'
        }
      }
    }
    
    if (stopParameters.maxBalance) {
      if (balanceNumber >= maxBalance) {
        return {
          stopFlag: true,
          stopParameter: 'maxBalance'
        }
      }
    }

    return {
      stopFlag: false,
      stopParameter: ''  
    }
  }
  
  useEffect(() => {
    const { game_data } = treasurehuntData
    const { account } = props.platform
    const username = account?.username

    if (isAutoplayStarted) {
      const checkParams = checkStopParameters()

      if (checkParams.stopFlag === false) {
        if (game_data !== null) {
          resetGameAndPlay(username)
        } else {
          setGameStarted(true)
          playGame(username)
        }
      } else {
        getStopParametersMessage(checkParams.stopParameter)
        setGameEnd(true)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAutoplayStarted, totalGamesPlayed])

  useEffect(() => {
    if (gameHistory.length) {
      let winnings = 0
      for (const history of gameHistory) {
        const winningsNumber = +(history.winnings + '').replace(' Token', '')
        winnings += +winningsNumber
      }
      setCurrentWinnings(winnings)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameHistory])
  
  const _stopAutoplayGame = async() => {
    playSelect()
    setAutoplayStart(false)
    setGameEnd(true)
    toast.info('Ending treasurehunt autoplay mode. If there is an in-game progress please wait the game to be finished.', {
      autoClose: false
    })
  }

  const _getMapImage = (selected) => {
    if (selected === 0) return MapA_Image;
    if (selected === 1) return MapB_Image;
    if (selected === 2) return MapC_Image;
  };

  const closeError = () => {
    setModal({
      state: false,
      title: '',
      subTitle: '',
      message: '',
      payload: ''
    })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Treasurehunt - Autoplay Mode</title>
      </Helmet>
      <CustomLoader visible={loading.state} text={loading.text} />
      <Modal
        dialogClassName="TreasurehuntAutoplayGameplay-Error-Modal"
        show={autoplayModal.state}
        onHide={() => closeError()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: '0 auto' }}>
            {autoplayModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '20px' }}>
          <div>
            {autoplayModal.subTitle}
          </div>
          <div>
            {autoplayModal.message}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          {
            autoplayModal.payload === 'error' ? (
              <>
                <Button variant="secondary" onClick={() => closeError()}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => closeError()}>
                Close
              </Button>
            )
          }
        </Modal.Footer>
      </Modal>
      <div className="gameplay-container row" style={{ maxWidth: "1400px", margin: "0 auto" , position: 'relative'}}>
        <h2
          className="text_th_primary title"
          style={{
            position: 'absolute',
            backgroundImage: 'linear-gradient(180deg, #d8091d, #e86370)',
            zIndex: 10,
            left: isGameEnd ? '32%' : '37%',
            top: '43%',
            fontSize: '4rem'
          }}
        >
          {
            isGameEnd ? 'AUTOPLAY MODE ENDED' : 'AUTOPLAY MODE'
          }
        </h2>
        <div className="left-container col-md-3">
          <div className="left_wrapper">
            <div className="left_nav_parent">
              <div className="left_nav">
                <div style={{ borderBottom: '1px solid #D8A764' }}>
                  <div style={{ marginBottom: '10px', fontSize: '2rem', lineHeight: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                      <div>
                        <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}>
                          {translate("th.selected_dest")}
                        </span>
                      </div>
                      <div style={{ textAlign: 'end' }}>
                        <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}>
                          {`${startingFunds} Token`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin: '10px 0px', fontSize: '2rem', lineHeight: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                      <div>
                        <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}>
                          {translate("th.selected_rivals")}
                        </span>
                      </div>
                      <div style={{ textAlign: 'end' }}>
                        <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}>
                          { numOfRivals }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin: '10px 0px', fontSize: '2rem', lineHeight: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`} style={{ fontSize: '1.4rem' }}>
                       {translate("th.starting_bal")}: {' '}
                      </span>
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`} style={{ fontSize: '1.4rem' }}>
                        { startBalance || '...' }
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}>
                    {translate("th.recent_history")}
                  </div>
                  <div className="recent-history">
                    {
                      gameHistory.length ? gameHistory.map((data, indx) => (
                        <History key={indx} data={data} />
                      )) : (
                        gameStarted === false && (
                          <div
                            className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}
                            style={{
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <h2>No records</h2>
                          </div>
                        )
                      )
                    }
                    {
                      gameStarted && (
                        <div className="recent_game_item_spinner">
                          <Spinner animation="border" role="status" style={{ color: "#D7A764" }}>
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="left_buttons">
                <Link to="/game/treasurehunt" onClick={() => playHome()}>
                  <div className="img-fluid home_btn" />
                </Link>
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
                      param={col}
                      isOpeningTile={isAutoplayStarted}
                      orderOfPanelsToOpen={orderOfPanelsToOpen}
                      isGameEnd={isGameEnd}
                    />
                  ))}
                </Row>
              ))}
            </Container>
            <img
              className="h-100 img-fluid"
              src={_getMapImage(selected_map)}
              alt="Selected Map"
            />
          </div>
        </div>
        <div className="right-container col-md-3">
          <div className="right_wrapper">
            <div className="right_details">
              <div style={{ borderBottom: '1px solid #D8A764', paddingBottom: '25px' }}>
                <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} stop_param_title`}>
                  {translate("th.remaining_games")}
                </span>
                <div className="stop_param_wrapper">
                  <span
                    className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}
                    style={
                      !stopParameters.numOfGames ? {
                        backgroundImage: 'linear-gradient(180deg, #715133, #543a21)'
                      } : {}
                    }
                  >
                    { stopParameters.numOfGames ? remainingGames : 'Not set' }
                  </span>
                </div>
                <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} stop_param_title`}>
                  {translate("th.reach_max_bal")}
                </span>
                <div className="stop_param_wrapper">
                  <span
                    className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}
                    style={
                      !stopParameters.maxBalance ? {
                        backgroundImage: 'linear-gradient(180deg, #715133, #543a21)'
                      } : {}
                    }
                  >
                    { stopParameters.maxBalance ? `${maxBalance} Token` : 'Not set' }
                  </span>
                </div>
                <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} stop_param_title`}>
                  {translate("th.reach_min_bal")}
                </span>
                <div className="stop_param_wrapper">
                  <span
                    className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"}`}
                    style={
                      !stopParameters.minBalance ? {
                        backgroundImage: 'linear-gradient(180deg, #715133, #543a21)'
                      } : {}
                    }
                  >
                    { stopParameters.minBalance ? `${minBalance} Token` : 'Not set' }
                  </span>
                </div>
              </div>
              <div className="winnings_detail">
                <div style={{ padding: '10px 0px' }}>
                  <div style={{ maxHeight: '85px' }}>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.current_winnings")}
                    </span>
                    <div className="value_wrapper">
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>{ currentWinnings.toFixed(4) }</span>
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value_unit`}>Token</span>
                    </div>
                  </div>
                  <div style={{ maxHeight: '85px' }}>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.next_win")}
                    </span>
                    <div className="value_wrapper">
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>{ nextPrize.toFixed(4) }</span>
                      <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value_unit`}>Token</span>
                    </div>
                  </div>
                  <div style={{ maxHeight: '85px' }}>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.odds")}
                    </span>
                    <div className="value_wrapper">
                      <span
                        className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}
                        style={{ backgroundImage: 'linear-gradient(rgb(113, 81, 51), rgb(84, 58, 33))' }}
                      >
                        {/* {`x${(+odds).toFixed(4)}` */}
                        {translate("th.autoplaymode")}
                      </span>
                    </div>
                  </div>
                  <div style={{ maxHeight: '85px' }}>
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} title`}>
                      {translate("th.gameplay.remaining_treasure")}
                    </span>
                    <div className="value_wrapper">
                    <span className={`${language === 'ja' || 'chinese' ? "text_th_primary_jap" : "text_th_primary"} value`}>{remainingTreasure}</span>
                    </div>
                  </div>
                </div>
                <div className="stop_btn_wrapper">
                  {
                    !isAutoplayStarted ? (
                      // <img src={StoppedBtn} alt="Stop" className="hover-disable" />
                      <div className="hover-disable" >
                        <StopBtn language={language} disabled={true} />
                      </div>
                    ) :
                    isGameEnd && isAutoplayStarted ? (
                      // <img src={StoppedBtn} alt="Stop" className="hover-disable" />
                      <div className="hover-disable" >
                        <StopBtn language={language} disabled={true} />
                      </div>
                    ) : (
                      // <img src={StopBtn} alt="Stop" className="hover-cursor" onClick={() => _stopAutoplayGame()} />
                      <div className="hover-cursor" onClick={() => _stopAutoplayGame()}>
                        <StopBtn language={language} disabled={false} />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ platform, treasurehunt }) => ({ platform, treasurehunt });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TreasurehuntAutoplayGameplay);
