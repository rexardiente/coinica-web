import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Modal, Button } from "react-bootstrap";
import { translate } from "helpers/translate";

type Props = {
  isLoading: boolean;
  show: Boolean;
  onHide: () => void;
  onDepositToken: (amount: number) => void;
  currency: string;
};
const DepositConfirmation = ({
  isLoading,
  show,
  onHide,
  onDepositToken,
  currency
}: Props) => {
  const [amountDeposit, setAmountDeposit] = useState(1);

  const onChangeDeposit = (e: any) => {
    setAmountDeposit(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("mj.gameplay.wallet.deposit")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {translate("mj.gameplay.wallet.deposit")}
        <input
          className="ml-1"
          type="number"
          min={1}
          max={20}
          name="enter-deposit"
          value={amountDeposit}
          onChange={onChangeDeposit}
        />
        {translate("mj.gameplay.wallet.deposit.content", {
          currency: currency.toUpperCase()
        })}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => onDepositToken(amountDeposit)}
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

export default DepositConfirmation;
