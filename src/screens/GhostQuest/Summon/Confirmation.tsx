import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import useSound from "use-sound";
import CustomLoader from "../../../components/Loader/CustomLoader";
import styles from "./Summon.module.scss";
import {
  GQ_INITIALIZE_DATA,
  GQ_SUMMON_GHOST,
  updateGhostQuestData,
} from "../../../services/api/server/ghostquest_api";
import { updateUserWalletBalance } from "../../../services/api/server/platform";
import { translate } from "helpers/translate";

// assets
import {
  BTN_SUMMON,
  BTN_CANCEL,
  confirmSound,
  cancelSound,
} from "../Assets";

type ConfirmationProps = {
  setStep: Function;
  battleLimit: number;
  summonTime: number;
  showSummon: Function;
  ghost_quest: any;
  navigation?: Function;
  setAnimationState: Function;
  setPlayerState: Function;
  platform: any;
}

const confirm1_content = (lang, order, value) => {
  if (order === 1) {
    switch(lang) {
      case 'ja':
        return `過ごしたいですか ${value || 'X'} トークンと召喚 ${value || 'X'} ゴースト`
      default:
        return `Do you wish to spend ${value || 'X'} token and summon ${value || 'X'} ghost(s)?`

    }
  } else if (order === 2) {
    switch(lang) {
      case 'ja':
        return `幽霊は現在制限されています ${value || 'XXX'} キャンペーンごとの戦闘.`
      default:
        return `Ghost/s is/are currently limited to ${value || 'XXX'} battles per campaign.`
    }
  }
}

const Confirmation = ({
  setStep,
  battleLimit,
  summonTime,
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
        quantity: summonTime,
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
            setAnimationState({ isPlaying: true, numOfChar: summonTime })
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

    if (parseFloat(balance) < summonTime) {
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
      <div className="w-100 text-left">
        <div className="mb-4">
          {translate("gq.summon.confirmation")}
        </div>
        <div className="mb-4">
          {/* {`Do you wish to spend ${summonTime || 'X'} token and summon ${summonTime || 'X'} ghost(s)?`} */}
          {confirm1_content(language, 1, summonTime)}
        </div>
        <div className="mb-4">
          {/* {`Ghost/s is/are currently limited to ${battleLimit || 'XXX'} battles per campaign.`} */}
          {confirm1_content(language, 2, battleLimit)}
        </div>
      </div>
      <div className={`mb-4 ${styles.summonConfirm}`}>
        <img
          src={BTN_SUMMON}
          alt="Summon"
          className="hover-cursor"
          style={{ transform: 'scale(0.8)' }}
          onClick={() => _GQ_ACTION_GENERATE_CHAR()}
        />
        <img
          src={BTN_CANCEL}
          alt="Cancel"
          className="hover-cursor"
          style={{ transform: 'scale(0.8)' }}
          onClick={() => {
            playCancel()
            setStep(1)
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
