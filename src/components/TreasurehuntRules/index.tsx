import React from 'react';
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { ServerAPI } from "Config";
import { gameflowRules, oddsCalculation, randomness } from "./content";
import { translate } from "helpers/translate";
import './TreasurehuntRules.scss';

const IMAGE = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/cumulative_ods.jpg`;

type RulesProps = {
  state: Boolean;
  setState: Function;
  platform: any;
}

const Rules = ({ platform, state, setState }: RulesProps) => {
  const { language } = platform;
  return (
    <Modal
      dialogClassName="treasurehunt-rules-modal"
      size="lg"
      show={state}
      onHide={() => setState(false)}
      aria-labelledby="treasurehunt-tutorial"
    >
      <Modal.Header closeButton>
        <Modal.Title id="treasurehunt-tutorial">
          {translate("th.rules")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-content">
          <h2>{translate("th.rules.gameflow")}</h2>
          {gameflowRules(language)}
          <h2>{translate("th.rules.cummulative_odds")}</h2>
          {oddsCalculation(language)}
          <span>{translate("th.rules.cummulative_odds")}</span>
          <img
            className="d-block w-100 mb-2 hover-cursor"
            src={IMAGE}
            onClick={() => window.open(IMAGE, 'Image')}
            alt="Cumulative Ods Sample"
          />
          <h2>{translate("th.rules.randomness")}</h2>
          {randomness(language)}
        </div>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = ({ platform }) => ({ platform });
export default connect(mapStateToProps)(Rules);
