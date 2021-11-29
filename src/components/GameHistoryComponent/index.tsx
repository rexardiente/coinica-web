import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import TreasurehuntTable from "./Treasurehunt/TreasurehuntTable";
import GhostQuestTable from "./GhostQuest/GhostQuestTable";
import {
  // gameHistoryAllGames,
  gameHistoryWithGameId,
  gameHistoryWithGameIdUserId,
} from "../../services/api/server";
import { setTreasurehuntGameHistory, updateTreasurehuntHistory } from "redux/treasurehunt/treasurehunt_actions";
import { setGhostQuestGameHistory, updateGhostQuestHistory } from "redux/ghost_quest/ghost_quest_actions";
import styles from "./GameHistory.module.scss";

type GameHistoryProps = {
  game?: any;
  userId?: any;
  platform: any;
  treasurehunt: any;
  ghost_quest: any;
  dispatch: Function;
}

const GameHistory = ({
  game,
  userId,
  platform,
  treasurehunt,
  ghost_quest,
  dispatch
} : GameHistoryProps) => {
  const { gameList } = platform;
  const TH_GAME_HISTORY = treasurehunt?.game_history;
  const GQ_GAME_HISTORY = ghost_quest?.game_history;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const getGameData = (game) => {
    if (gameList && Array.isArray(gameList)) {
      const data = gameList.find((list) => {
        return list?.name === game;
      })
      if (data) {
        return data;
      }
      return null;
    }
    return null;
  }

  useEffect(() => {
    if (window.gqWS) {
      window.gqWS.addEventListener("message", function(event) {
        console.log("WS FOR TH HISTORY: ", event)
        let data = event?.data || null
        if (data) {
          data = JSON.parse(data)
          if (data?.id === "OVER_ALL_HISTORY_UPDATE") {
            if (data?.response.length && data?.response[0].game === "treasurehunt") {
              const newData = data.response[0]
              dispatch(updateTreasurehuntHistory({ newData }))
            } else if (data?.response.length && data?.response[0].game === "ghostquest") {
              let resLength = data?.response.length
              for (let i = 0; i < resLength; i ++) {
                const newData = data.response[i]
                dispatch(updateGhostQuestHistory({ newData }))
              }
            }
          }
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.gqWS])

  useEffect(() => {
    if (game && userId) {
      const gameData = getGameData(game);
      if (gameData) {
        const gameId = gameData?.id
        gameHistoryWithGameIdUserId(gameId, userId)
          .then((res) => {
            // console.log({ dataHistory: res.data })
            if (res?.data.length) {
              const sortedData = [...res.data].sort((a, b) => b?.createdAt - a?.createdAt)
              setData(sortedData);
            } else {
              setData([]);
            }
          })
          .catch(() => {
            toast.error("Error fetching game history, please try again");
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }

    } else if (game) {
      const gameData = getGameData(game);
      if (gameData) {
        const gameId = gameData?.id
        gameHistoryWithGameId(gameId)
          .then((res) => {
            console.log({ dataHistory: res.data })
            if (res?.data.length) {
              const sortedData = [...res.data].sort((a, b) => b?.createdAt - a?.createdAt)
              if (game === "treasurehunt") {
                dispatch(setTreasurehuntGameHistory({ game_history: sortedData }))
              }
              if (game === "ghostquest") {
                dispatch(setGhostQuestGameHistory({ game_history: sortedData })) 
              }
              setData(sortedData);
            } else {
              if (game === "treasurehunt") {
                dispatch(setTreasurehuntGameHistory({ game_history: [] }))
              }
              if (game === "ghostquest") {
                dispatch(setGhostQuestGameHistory({ game_history: [] })) 
              }
              setData([]);
            }
          })
          .catch(() => {
            toast.error("Error fetching game history, please try again");
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      // console.log('FETCHING gameHistoryAllGames')
      // gameHistoryAllGames()
      //   .then((res) => {
      //     // console.log({ dataHistory: res.data })
      //     if (res?.data.length) {
      //       const sortedData = [...res.data].sort((a, b) => b?.createdAt - a?.createdAt)
      //       setData(sortedData);
      //     }
      //     setLoading(false);
      //   })
      //   .catch(() => {
      //     toast.error("Error fetching game history, please try again");
      //     setError(true);
      //     setLoading(false);
      //   });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, userId]);

  const GAME_HISTORY_TABLE = () => {
    switch (game) {
      case 'treasurehunt':
        return (
          isLoading
          ? <Spinner animation="grow" />
          : <TreasurehuntTable data={TH_GAME_HISTORY} isError={isError} />
        )
      case 'ghostquest':
        return (
          isLoading
          ? <Spinner animation="grow" />
          : <GhostQuestTable data={GQ_GAME_HISTORY} isError={isError} />
        )
    }
  }

  return (
    <div className={`${styles.gamehistoryContainer} text-center px-5 table-responsive`}>
      { GAME_HISTORY_TABLE() }
    </div>
  );
};

const mapStateToProps = ({ platform, treasurehunt, ghost_quest }) => ({ platform, treasurehunt, ghost_quest });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GameHistory);
