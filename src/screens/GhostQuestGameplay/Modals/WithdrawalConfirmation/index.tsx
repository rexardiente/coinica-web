import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import { updateGhostQuestData, GQ_WITHDRAW } from "../../../../services/api/server/ghostquest_api";
import { BtnBackground, BtnYes, BtnNo, ConfirmSound, CancelSound } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type WithdrawalConfirmationProps = {
  username: any;
  charData: any;
  setLoading: Function;
  withdrawalConfirmationState: boolean;
  showWithdrawalConfirmation: Function;
  showWithdrawalSuccessful: Function;
  setTxId: Function;
  ghost_quest: any;
}

const WithdrawalConfirmation = ({
  username,
  charData,
  setLoading,
  withdrawalConfirmationState,
  showWithdrawalConfirmation,
  showWithdrawalSuccessful,
  setTxId,
  ghost_quest,
}:WithdrawalConfirmationProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playConfirmSound] = useSound(ConfirmSound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })
  if (!withdrawalConfirmationState) return null

  let house_edge = 0
  const init_prize = charData?.character_life;

  if (charData?.battle_count < 21) {
    house_edge = init_prize * 0.06;
  } else if (charData?.battle_count > 20 && charData?.battle_count < 41) {
    house_edge = init_prize * 0.07;
  } else if (charData?.battle_count > 40 && charData?.battle_count < 61) {
    house_edge = init_prize * 0.08;
  } else if (charData?.battle_count > 60 && charData?.battle_count < 81) {
    house_edge = init_prize * 0.09;
  } else {
    house_edge = init_prize * 0.1;
  }

  const WithdrawGame = (username, key) => {
    if (init_prize <= 0) {
      toast.error('Sorry, this ghost has been withdrawn or lost already')
      return
    }

    setLoading({ state: true, text: 'Please wait...'})
    GQ_WITHDRAW({ key }).then(({ data }) => {
      if (window.gqWS) {
        const dataWS = JSON.stringify({
          id: username,
          input: { character_created: true }
        })
        window.gqWS.send(dataWS)
      }

      setTxId(data?.transaction_id || "No data")
      setLoading({ state: false, text: ''})
      showWithdrawalConfirmation(false)
      showWithdrawalSuccessful(true)
      updateGhostQuestData(username)
    }).catch(() => {
      setLoading({ state: false, text: ''})
      toast.error(`An error occured in withdrawing. Please try again`)
    })
  }

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Background} alt="" />
        <div className={styles.contentsWithdrawalConfirmation}>
          <div className={styles.textsContainerWithdrawalConfirmation}>
            <h4 className="mb-4">Please confirm</h4>
            <h5>You’re going to quit your quest and withdraw your TOKEN after deducting fees below.</h5>
            <h5>Are you sure?</h5>
            <div className="d-flex justify-content-between">
              <h5>Amount of fees:</h5>
              <h5>{`${house_edge.toFixed(4)} token`}</h5>
            </div>
          </div>

          <div className="position-relative">
            <img src={BtnBackground} alt="" />
            <img
              src={BtnYes}
              alt=""
              className={`${styles.depositBtnYes} hover-cursor`}
              onClick={() => {
                playConfirmSound()
                WithdrawGame(username, charData?.key)
              }}
            />
            <img
              src={BtnNo}
              alt=""
              className={`${styles.depositBtnNo} hover-cursor`}
              onClick={() => {
                playCancel()
                showWithdrawalConfirmation(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(WithdrawalConfirmation);
