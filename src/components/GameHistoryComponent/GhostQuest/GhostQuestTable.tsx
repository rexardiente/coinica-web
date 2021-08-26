import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import GameDetailsModal from "./GameDetailsModal";
import { UnixMicroToDate } from "helpers/date";
import styles from "./gqStyles.module.scss";
import { gqGameLogo } from "../Assets";

const GhostQuestTable = ({ data, isError }) => {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [gameDetailsModal, showGameDetailsModal] = useState(false);

  return (
    <>
      <GameDetailsModal
        gameDetailsModal={gameDetailsModal}
        showGameDetailsModal={showGameDetailsModal}
        selectedGame={selectedGame}
      />
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
            <th>PLAYER</th>
            <th>RESULT</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          { isError ? (
              <tr>
                <td colSpan={7}>
                  <h5>There is something wrong in fetching history data</h5>
                </td>
              </tr>
            ) : data.length ? (data.map((detail, idx) => {
                  const _gameId = (detail?.game_id + "").slice(-9)
                  const date_executed = UnixMicroToDate(
                    +detail?.created_at,
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
                            date_executed,
                          });
                          showGameDetailsModal(true);
                        }}
                      >
                        {_gameId}
                      </th>
                      <th>{date_executed}</th>
                      <th>{(detail?.info?.user + "")}</th>
                      <th
                        style={{
                          color: detail?.info?.result ? "yellowgreen" : "red",
                        }}
                      >
                        {detail?.info?.result ?  "Won" : "Lost"}
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
              )
          }
        </tbody>
      </Table>
    </>
  )
}

export default GhostQuestTable;
