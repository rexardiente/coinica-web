import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { UnixMicroToDate } from "../../helpers/date";
import GameDetailsModal from "./GameDetailsModal";
import { GetAllGameHistory } from "../../services/api/server/ghostquest_api";
import styles from "./GameHistory.module.scss";
import { gqGameLogo } from "./Assets";

const GameHistory = ({ platform }) => {
  const UUID = platform.account?.id
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [gameDetailsModal, showGameDetailsModal] = useState(false);

  useEffect(() => {
    if (UUID) {
      GetAllGameHistory()
        .then((res) => {
          if (res?.data?.length) {
            const sortedData = [...res.data].sort((a, b) => b?.time_executed - a?.time_executed)
            setData(sortedData);
          }
          setLoading(false);
        })
        .catch((err) => {
          // console.log({ GetAllGameHistoryByUserErr: err })
          setData([]);
          setError(true);
          setLoading(false);
        });
    }
  }, [UUID]);

  return (
    <div
      className={`${styles.gamehistoryContainer} text-center px-5 table-responsive`}
    >
      <GameDetailsModal
        gameDetailsModal={gameDetailsModal}
        showGameDetailsModal={showGameDetailsModal}
        selectedGame={selectedGame}
      />
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        !isError && (
          <div className={styles.scrollableDiv}>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className={styles.gamehistoryTable}
            >
              <thead>
                <tr className={styles.tableTransparentRow}>
                  <th>GAME</th>
                  <th>GAME ID</th>
                  <th>TIME</th>
                  <th>WINNER</th>
                  <th>LOSER</th>
                  <th>RESULT</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data.length ? (
                  data.map((detail, idx) => {
                    const gameId = (detail?.game_id + "").slice(-9)
                    const enemyId = detail?.winner === UUID ? detail?.loser : detail?.winner
                    const date_executed = UnixMicroToDate(
                      +detail?.time_executed,
                      "MM/DD/YYYY hh:mm:ss A ",
                      1
                    );


                    return (
                      <tr key={idx} className={styles.tableTransparentRow}>
                        <th>
                          <div
                            className="d-flex align-items-center"
                            style={{ maxWidth: "150px" }}
                          >
                            <img
                              className={styles.gameIcon}
                              src={gqGameLogo}
                              alt="Avatar"
                            />
                            GhostQuest
                          </div>
                        </th>
                        <th
                          className={styles.gameIdLink}
                          onClick={() => {
                            setSelectedGame({
                              ...detail,
                              gameId,
                              UUID: (UUID + "").slice(-9),
                              enemyId: (enemyId + "").slice(-9),
                              date_executed,
                            });
                            showGameDetailsModal(true);
                          }}
                        >
                          {gameId}
                        </th>
                        <th>{date_executed}</th>
                        <th>{(detail?.winner + "").slice(-9)}</th>
                        <th>{(detail?.loser + "").slice(-9)}</th>
                        <th
                          style={{
                            color: detail?.winner === UUID ? "yellowgreen" : "red",
                          }}
                        >
                          {detail?.winner === UUID ? "Won" : "Lost"}
                        </th>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <h5>There is no game history found.</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GameHistory);
