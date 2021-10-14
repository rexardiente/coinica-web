import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import useSound from "use-sound";
import Button from "@material-ui/core/Button";
import CustomLoader from "components/Loader/CustomLoader";
import styles from "./Summon.module.scss";
import {
  GQ_INITIALIZE_DATA,
  GQ_SUMMON_GHOST,
  updateGhostQuestData,
} from "services/api/server/ghostquest_api";
import { updateUserWalletBalance } from "services/api/server/platform";

// assets
import {
  confirmSound,
  cancelSound,
} from "../Assets";

type ConfirmationProps = {
  setStep: Function;
  battleLimit: number;
  summonCount: number;
  showSummon: Function;
  ghost_quest: any;
  navigation?: Function;
  setAnimationState: Function;
  setPlayerState: Function;
  platform: any;
}

const Confirmation = ({
  setStep,
  battleLimit,
  summonCount,
  showSummon,
  ghost_quest,
  navigation,
  setAnimationState,
  setPlayerState,
  platform,
}:ConfirmationProps) => {
  const { account, accountBalance, selectedCurrency, language } = platform;
  const user_game_id = account?.user_game_id || null
  const username = account?.username || null
  const balance = accountBalance[selectedCurrency] ? accountBalance[selectedCurrency]?.amount : 0
  const GQ_VOLUME = ghost_quest?.volume
  const [loading, setLoading] = useState({ state: false, text: '' })
  const [playConfirm] = useSound(confirmSound, { volume: 0.5 * GQ_VOLUME })
  const [playCancel] = useSound(cancelSound, { volume: 0.5 * GQ_VOLUME })

  const _SUMMON_GHOST = async() => {
    try {
      await updateGhostQuestData({ id: user_game_id })
      if (ghost_quest?.game_data == null) {
        await GQ_INITIALIZE_DATA({ id: user_game_id, username })
      }

      GQ_SUMMON_GHOST({
        id: user_game_id,
        currency: (selectedCurrency + "").toUpperCase(),
        quantity: summonCount,
        limit: battleLimit
      }).then(() => {
        updateUserWalletBalance()
        // if (window.gqWS) {
        //   const data = JSON.stringify({
        //     id: username,
        //     input: { character_created: true }
        //   })
        //   window.gqWS.send(data)
        // }

        // adding delay
        setTimeout(() => {
          updateGhostQuestData({ id: user_game_id })
          .then(() => {
            toast.success('Ghost summoned successfully')
            setAnimationState({ isPlaying: true, numOfChar: summonCount })
            setPlayerState(true)
          })
          .catch(() => {
            toast.warning('Error updating character list');
          })
          .finally(() => {
            setLoading({ state: false, text: '' })
            setStep(1)
          })
        }, 2000)
      })
    } catch (e) {
      toast.error('Sorry, an error occured in summoning ghost. Please try again')
      showSummon(false)
      setLoading({ state: false, text: '' })
      setStep(1)
    }
  }

  const _GQ_ACTION_GENERATE_CHAR = () => {
    playConfirm()

    if (user_game_id === null) {
      toast.error('You need to login first')
      return
    }

    if (parseFloat(balance) < summonCount) {
      toast.error(`Sorry, you do not have enough balance to summon ghost`)
      return
    }

    setLoading({ state: true, text: 'Summoning ghost/s...'})
    _SUMMON_GHOST()
  }
  
  return (
    <div className={styles.settingContent}>
      <CustomLoader
        visible={loading.state}
        text={loading.text}
        style={{
          marginLeft: '0px',
          height: '50%',
          width: '100%',
          top: '107px',
          background: 'black',
          borderRadius: '10px',
        }}
      />
      <div className={styles.confirmationNote}>
        <p>
          Summon {summonCount} Ghosts with {battleLimit} battle limit?
        </p>
        <small>
          The battle limit appplies to all ghosts used in autoplay
        </small>
      </div>
      <div className={styles.divider} />
      <div className={styles.summonConfirm}>
        <Button
          className={styles.buttonStyle}
          variant="contained"
          onClick={() => {
            playCancel()
            setStep(1)
          }}
        >
          Cancel
        </Button>
        <Button
          className={styles.buttonStyle}
          variant="contained"
          onClick={() => _GQ_ACTION_GENERATE_CHAR()}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
