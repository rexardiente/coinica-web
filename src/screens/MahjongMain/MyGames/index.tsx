import React from "react";
import styles from "./MahjongMyGames.module.scss";
import { X, CaretRightFill } from "react-bootstrap-icons";
import Tile from "components/Mahjong/Tiles";
import { UnixMicroToDate } from "helpers/date";
import { translate } from "helpers/translate";

const MyGames = (props) => {
  const history = props.history as Array<any>;

  const GameDetails = (data) => {

    const isWin = data.info.prediction === data.info.result ? true : false;
    const historyDate = UnixMicroToDate(data.created_at, null, 1);
    const hash = data.tx_hash.slice(0, 5);
    // console.log('historyDate', historyDate);
    // console.log('historyDetails', data);

    const fixedVal = (token: number | string) => {
      return token ? Number(token).toFixed(4) : 0;
    };


    return (
      <div key={data.id} className={`${styles.game_details} rounded p-2 mb-2`}>
        <div className={`${styles.game_result} text-left`}>
          {/* <span className={styles.game_index}>14</span> */}
          <span className={isWin ? styles.game_success : styles.game_fail}>{isWin ? translate("mj.main.win") : translate("mj.main.lose")}</span>
        </div>
        <div className={`${styles.game_hand} text-center`}>
          {/* current tile */}
          <img alt="tile" className={styles.game_tile} src={Tile(data.info.more_info.current_tile)?.src} />
          <CaretRightFill />
          <img alt="tile" className={styles.game_tile} src={Tile(data.info.more_info.standard_tile)?.src} />
          {/* standard tile */}
        </div>
        <div className={`${styles.game_reward} row mt-2`}>
          <div
            className={`${styles.game_bet} col-6 text-left align-self-end`}
          >
            {isWin ?
              <span>{translate("mj.main.amount")} : {fixedVal(data.info.amount)}</span>
              :
              <span>{translate("mj.main.bet")} : {fixedVal(data.info.bet)}</span>
            }
          </div>
          <div className="col-6">
            <div className="pl-auto">
              <div className="row no-gutters d-flex justify-content-end">
                <small>{historyDate}</small>
              </div>
              <div className="row no-gutters d-flex justify-content-end">
                <small>{translate("mj.main.tx_id")}: {hash}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`mx-auto ${styles.my_games_container}`} id="my-games">
      {props.show ? (
        <button
          type="button"
          className={`${styles.exit_button} close text-dark`}
          data-dismiss="modal"
          aria-label="Close"
        >
          <X />
        </button>
      ) : (
        ""
      )}
      <div className={`${styles.my_games_header} d-flex`}>
        <span className={`${styles.my_games_title} text-stroke-brown`}>{translate("mj.main.my_games")}</span>
        <button
          className={`ml-auto ${styles.all_games}`}
          type="button"
        ><span className={styles.all_games_label}>{translate("mj.main.all_games")}</span></button>
      </div>
      <hr className={styles.my_games_hr} />
      <div className={`${styles.my_games}`}>
        {history
          ? history.map((details) => {
            return GameDetails(details);
          })
          : ""}
      </div>
    </div>
  );
};

export default MyGames;
