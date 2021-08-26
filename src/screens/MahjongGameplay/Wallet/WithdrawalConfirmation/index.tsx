import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Modal, Button } from "react-bootstrap";
import { translate } from "helpers/translate";

type Props = {
  isLoading: boolean;
  show: Boolean;
  onHide: () => void;
  onWithdrawToken: () => void;
  amount: number;
};
const WithdrawalConfirmation = ({
  isLoading,
  show,
  onHide,
  onWithdrawToken,
  amount,
}: Props) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("mj.gameplay.wallet.withdraw.confirmation")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {translate("mj.gameplay.wallet.withdraw.content", {
          amount: <strong>{amount}</strong>
        })}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onWithdrawToken}
          disabled={isLoading}
        >
          {!isLoading ? translate("misc.yes") : <Spinner animation="border" size="sm" />}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          {translate("misc.no")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawalConfirmation;
