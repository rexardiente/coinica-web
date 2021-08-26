import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
import { Network, ServerAPI } from "../../Config";
import trunccate from "helpers/numbers/truncate";
import "./TreasurehuntResult.scss";

const ResultLost = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/gameplay/results/result_lost.jpg`;
const ResultWon = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/gameplay/results/result_won.jpg`;
const ResultWithdraw = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/gameplay/results/result_withdraw.jpg`;

type ResultWinProps = {
  eosWon?: number;
  setState: Function;
}

const ResultWin = ({ eosWon, setState }: ResultWinProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={ResultWithdraw} alt="" onClick={() => setState(false)} />
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '178px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: 'red', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          {eosWon ? trunccate(+eosWon, 4) : 0}
        </h3>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: '55px',
        }}
      >
        <div
          style={{
            width: '137px',
            paddingLeft: '3px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <FacebookShareButton
            url={`${Network.protocol}://${Network.host}/game/treasurehunt/gameplay`}
            quote={`I just won ${eosWon} EOS in Treasurehunt Game!`}
          >
            <FacebookIcon size={50} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`${Network.protocol}://${Network.host}/game/treasurehunt/gameplay`}
            title={`I just won ${eosWon} EOS in Treasurehunt Game!`}
          >
            <TwitterIcon size={50} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

type ModalBodyProps = {
  state: Boolean;
  isWin: boolean,
  eosWon?: any;
  withdraw?: boolean;
  setState: Function
}

const modalBody = ({ state, isWin, eosWon, withdraw, setState }: ModalBodyProps) => {
  if (!state) return
  return (
    <Modal.Body>
      <div className="body-content">
        {isWin ? (
          withdraw ? <ResultWin eosWon={eosWon} setState={setState} /> : (
            <div>
              <img src={ResultWon} alt="" onClick={() => setState(false)} />
            </div>
          )
        ) : (
          <div onClick={() => setState(false)}>
            <img src={ResultLost} alt="" />
          </div>
        )}
      </div>
    </Modal.Body>
  );
};

type ResultProps = {
  state: Boolean;
  setState: Function;
  isWin: boolean;
  withdraw?: boolean;
  eosWon?: any;
};

const Result = ({ state, setState, isWin, eosWon, withdraw }: ResultProps) => (
  <Modal
    dialogClassName="treasurehunt-result-modal"
    size="sm"
    show={state}
    onHide={() => setState(false)}
    aria-labelledby="treasurehunt-tutorial"
  >
    {modalBody({ state, isWin, eosWon, withdraw, setState })}
  </Modal>
);

export default Result;
