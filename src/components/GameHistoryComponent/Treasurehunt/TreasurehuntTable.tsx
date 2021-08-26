import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import GameDetailsModal from "./GameDetailsModal";
import { UnixMicroToDate } from "helpers/date";
import truncate from "helpers/numbers/truncate";
import styles from "../GameHistory.module.scss";
import { translate } from "helpers/translate";
import { thTableGameLogo } from "../Assets";

const TreasurehuntTable = ({ data, isError }) => {
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
            <th>{translate("th.gamehistory.game")}</th>
            <th>{translate("th.gamehistory.id")}</th>
            <th>{translate("th.gamehistory.time")}</th>
            <th>{translate("th.gamehistory.player")}</th>
            <th>{translate("th.gamehistory.bet")}</th>
            <th>{translate("th.gamehistory.result")}</th>
            <th>{translate("th.gamehistory.profit")}</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          { isError ? (
              <tr>
                <td colSpan={7}>
                  <h5>There is something wrong in fetching history data</h5>
                </td>
              </tr>
            ) : data.length ? (data.map((detail, idx) => (
                  <tr key={idx} className={styles.tableTransparentRow}>
                    <th>
                      <div
                        className="d-flex align-items-center"
                        style={{ maxWidth: "150px" }}
                      > 
                        <img
                          className={styles.gameIcon}
                          src={thTableGameLogo}
                          alt="Avatar"
                        />
                        Treasurehunt
                      </div>
                    </th>
                    <th
                      className={styles.gameIdLink}
                      onClick={() => {
                        setSelectedGame(detail);
                        showGameDetailsModal(true);
                      }}
                    >
                      {(detail?.id + "").slice(-12)}
                    </th>
                    <th>
                      {
                        detail?.created_at ? UnixMicroToDate(detail?.created_at, null, 1) : ''
                      }
                    </th>
                    <th>
                      {
                        detail?.info?.user || "..."
                      }
                    </th>
                    <th>
                      {`${detail?.info?.bet || 0}`}
                    </th>
                    <th style={{ color: detail?.info?.amount > 0 ? 'yellowgreen' : 'red' }}>
                      {
                        detail?.info?.amount > 0 ? 'Win' : 'Lose'
                      }
                    </th>
                    <th>
                      {
                        `${truncate(detail?.info?.amount, 4) || 0}`
                      }
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
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

export default TreasurehuntTable;
