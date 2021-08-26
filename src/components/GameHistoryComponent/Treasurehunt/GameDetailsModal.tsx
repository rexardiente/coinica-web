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
          <dt>Game:</dt>
          <dd>Treasurehunt</dd>

          <dt>Game ID:</dt>
          <dd>{selectedGame?.id || 'No data'}</dd>

          <dt>Transaction ID:</dt>
          <dd>{selectedGame?.tx_hash || 'No data'}</dd>

          <dt>Player:</dt>
          <dd>{selectedGame?.info?.user || 'No data'}</dd>

          <dt>Bet amount:</dt>
          <dd>{ `${selectedGame?.info?.bet || 0} Token` }</dd>

          <dt>Profit:</dt>
          <dd>{ `${selectedGame?.info?.amount || 0} Token` }</dd>
        </dl>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.showGameDetailsModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GameDetailsModal;
