import React from "react";
import { connect } from "react-redux";
import { toast }from "react-toastify";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import { updateGhostQuestData, GQ_ADD_LIFE } from "services/api/server/ghostquest_api";
import { updateUserWalletBalance } from "services/api/server/platform";
import { BtnBackground, BtnYes, BtnNo, ConfirmSound, CancelSound, ErrorSound } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type DepositConfirmationProps = {
  props: any;
  setLoading: Function;
  depositConfirmationState: boolean;
  showDepositConfirmation: Function;
  showDepositSuccessful: Function;
  charData: any;
  showModalError: Function;
  setTxId: Function;
  ghost_quest: any;
}

const DepositConfirmation = ({
  props,
  setLoading,
  depositConfirmationState,
  showDepositConfirmation,
  showDepositSuccessful,
  charData,
  showModalError,
  setTxId,
  ghost_quest
} : DepositConfirmationProps) => {
  // SOUNDS
  const GQ_VOLUME = ghost_quest?.volume
  const [playConfirmSound] = useSound(ConfirmSound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })
  const [playError] = useSound(ErrorSound, { volume: 0.5 * GQ_VOLUME })


  if (!depositConfirmationState) return null
  
  const { account, accountBalance, selectedCurrency } = props.platform
  const user_game_id = account?.user_game_id
  const balance = accountBalance[selectedCurrency]?.amount || 0
  

  const AddCharacterLife = ({ id, key }) => {
    playConfirmSound()

    if (balance < 1) {
      playError()
      showModalError(true)
      showDepositConfirmation(false)
      return
    }

    setLoading({ state: true, text: 'Please wait...'})
    GQ_ADD_LIFE({ key }).then(({ data }) => {
      setTxId(data)
      setLoading({ state: false, text: ''})
      showDepositConfirmation(false)
      showDepositSuccessful(true)
      updateGhostQuestData({ id })
      updateUserWalletBalance()
    }).catch(() => {
      setLoading({ state: false, text: ''})
      showDepositConfirmation(false)
      toast.error(`An error occured while adding you character's life`)
    })
  }

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Background} alt="" />
        <div className={styles.contentsError}>
          <div className={styles.textsContainerDeposit}>
            <h4 className="mb-4">Please confirm</h4>
            <h4>You’re going to deposit 1 token. Are you sure?</h4>
          </div>

          <div className="position-relative">
            <img src={BtnBackground} alt="" />
            <img
              src={BtnYes}
              alt=""
              className={`${styles.depositBtnYes} hover-cursor`}
              onClick={() => AddCharacterLife({ id: user_game_id, key: charData?.key })}
            />
            <img
              src={BtnNo}
              alt=""
              className={`${styles.depositBtnNo} hover-cursor`}
              onClick={() => {
                playCancel()
                showDepositConfirmation(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
export default connect(mapStateToProps)(DepositConfirmation);
