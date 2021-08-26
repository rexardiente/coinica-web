import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GameDetailsModal = (props) => {
  const { selectedGame } = props;
  return (
    <Modal
      show={props.gameDetailsModal}
      onHide={() => props.showGameDetailsModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <h4>Details</h4>
        <dl>
          <dt>Game Name</dt>
          <dd>Ghost Quest</dd>
          <dt>Game ID</dt>
          <dd>{ selectedGame?.game_id }</dd>
          <dt>Transaction ID:</dt>
          <dd>{ selectedGame?.tx_hash }</dd>
          <dt>Player</dt>
          <dd>{ selectedGame?.info?.user }</dd>
          {/* <dt>Enemy</dt>
          <dd>{ selectedGame?.enemyId }</dd> */}
          <dt>Time Executed</dt>
          <dd>{ selectedGame?.date_executed }</dd>
          {/* <dt className="mb-2">Gameplay Logs</dt>
          {
            selectedGame?.gameplay_log?.length ? 
            selectedGame.gameplay_log.map((log, idx) => {
              const { round, defender, damage, attacker } = log
              return (
                <dd key={idx}>
                  {`Round ${round} : Character of ${(defender+"").slice(-9)} took ${damage} from character of ${(attacker+"").slice(-9)}`}
                </dd>
              )
            })
            : null
          } */}
        </dl>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.showGameDetailsModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GameDetailsModal;
