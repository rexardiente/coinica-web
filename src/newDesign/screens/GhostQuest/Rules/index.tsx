import React, { useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import {
  ModalBtnCancel,
  Rules_BG,
  Rules_StatusImg,
  Rules_RarityImg,
  Rules_HouseEdgeImg,
  funcSound,
  cancelSound,
} from "../Assets";
import {
  gameflowSummonRules,
  ghostLifeAndQuitRules,
  specialCharacterRules,
  houseEdgeRules,
  earningRankingRules,
  winstreakRankingRules,
  autplayRules,
} from "./content";
import { translate } from "helpers/translate";
import styles from "./Rules.module.scss";

type RulesProps = {
  platform: any;
  ruleslState: boolean;
  showRules: Function;
  ghost_quest: any;
}

const Rules = ({ platform, ruleslState, showRules, ghost_quest }:RulesProps) => {
  const language = platform?.language
  const GQ_VOLUME = ghost_quest?.volume
  const [playFuncSound] = useSound(funcSound, { volume: 0.5  * GQ_VOLUME })
  const [playCancel] = useSound(cancelSound, { volume: 0.5 * GQ_VOLUME })

  useEffect(() => {
    if (ruleslState) {
      playFuncSound()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleslState])

  if (!ruleslState) return null

  const openImage = (id) => {
    const image:any = document.getElementById(id);
    const url = image.getAttribute('src');
    window.open(url, 'Image');
  }

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <img src={Rules_BG} alt="Background" />
        <img
          src={ModalBtnCancel}
          alt="Cancel"
          className={`hover-cursor ${styles.closeBtn} `}
          onClick={() => {
            playCancel()
            showRules(false)
          }}
        />
        <div className={styles.contentScrollable}>
          <div className={styles.rulesContent}>
            <h2>{translate("gq.rules.gameflow")}</h2>
            <strong>{translate("gq.rules.gameflow.summon")}</strong>
            {gameflowSummonRules(language)}
            <img
              id="gq-status-table"
              className="hover-cursor"
              src={Rules_StatusImg}
              alt="status-table"
              style={{ width: '280px'}}
              onClick={() => openImage("gq-status-table")}
            />
            <img
              id="gq-rarity-table"
              className="hover-cursor my-2"
              src={Rules_RarityImg}
              alt="status-table"
              style={{ width: '280px'}}
              onClick={() => openImage("gq-rarity-table")}
            />

            <strong>{translate("gq.rules.life_and_quit")}</strong>
            {ghostLifeAndQuitRules(language)}

            <strong>{translate("gq.rules.special_char")}</strong>
            {specialCharacterRules(language)}

            <strong>{translate("house_edge")}</strong>
            {houseEdgeRules(language)}
            <img
              id="gq-house-edge-table"
              className="hover-cursor mb-2"
              src={Rules_HouseEdgeImg}
              alt="house-edge-table"
              style={{ width: '280px'}}
              onClick={() => openImage("gq-house-edge-table")}
            />

            <strong>{translate("gq.rules.earning_ranking")}</strong>
            {earningRankingRules(language)}

            <strong>{translate("gq.rules.winstreak_ranking")}</strong>
            {winstreakRankingRules(language)}

            <strong>{translate("gq.rules.autoplay")}</strong>
            {autplayRules(language)}

          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ platform, ghost_quest }) => ({ platform, ghost_quest });
export default connect(mapStateToProps)(Rules);
