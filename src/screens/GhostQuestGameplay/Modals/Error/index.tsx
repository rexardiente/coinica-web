import React from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import { ServerAPI } from "Config";
import { BtnOkay, CancelSound } from "../../Assets";
import styles from "../ModalStyles.module.scss";

// assets
const Background = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;

type ModalErrorProps = {
  modalErrorState: boolean;
  showModalError: Function;
  isDeposit: boolean;
  ghost_quest: any;
}

const ModalError = ({ modalErrorState, showModalError, isDeposit, ghost_quest }:ModalErrorProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })

  if (!modalErrorState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Background} alt="" />
        <div className={styles.contentsError}>
          <div className={styles.textsContainerError}>
            <h4>Error</h4>
            <h4>
              Your {isDeposit ? ` deposit ` : ` withdrawal `} request
              failed because of insuffiecient funds.
            </h4>
          </div>

          <img
            src={BtnOkay}
            alt=""
            className="hover-cursor"
            onClick={() => {
              playCancel()
              showModalError(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(ModalError);
