import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from "assets/imgs/logo.svg";
import "./AlertModal.scss";
import { translate } from "helpers/translate";

type Props = {
  txId: string;
  isDeposit: boolean;
  isError: boolean;
  show: boolean;
  setShow: Function;
  txExplorerUrl: string;
}

const AlertModal = (props: Props) => {
  const { txId, isDeposit, isError, show, setShow, txExplorerUrl } = props
  // if (isDeposit !== true) {
  //   // CODE FOR WITHDRAW ALERT
  //   return null
  // }
  const TX_TYPE = isDeposit ? translate("account_settings.balance_screen.alert_modal.deposit") : translate("account_settings.balance_screen.alert_modal.withdraw")

  const successContent = (
    <>
      <div className="mt-1 mb-4">
        <h4 className="text-success">
          {TX_TYPE} {translate("account_settings.balance_screen.alert_modal.complete.title")}
        </h4>
        <p>
          {TX_TYPE} {translate("account_settings.balance_screen.alert_modal.complete.message")}
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <Button
          style={{ width: '145px', marginRight: '1rem' }}
          onClick={() => {
            const url = `${txExplorerUrl}/${txId}`;
            window.open(url, '_blank')?.focus();
          }}
        >
          {translate("account_settings.balance_screen.alert_modal.view_etherscan.button")}
        </Button>
        <Button
          variant="light"
          style={{ width: '145px' }}
          onClick={() => {
            if (setShow) {
              setShow(false)
            }
          }}
        >
          {translate("account_settings.balance_screen.alert_modal.close.button")}
        </Button>
      </div>
    </>
  )

  const failContent = (
    <>
      <div className="mt-1 mb-4">
        <h4 className="text-warning">{TX_TYPE} {translate("account_settings.balance_screen.alert_modal.fail_content.title")}</h4>
        <p>
          {`${TX_TYPE}`} {translate("account_settings.balance_screen.alert_modal.fail_content.message")}
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <Button
          variant="light"
          style={{ width: '145px' }}
          onClick={() => {
            if (setShow) {
              setShow(false)
            }
          }}
        >
          {translate("account_settings.balance_screen.alert_modal.close.button")}
        </Button>
      </div>
    </>
  )

  return (
    <Modal
      id="balance-alert-modal"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body
        className="text-center text-white"
        style={{
          padding: '4rem 3rem',
          backgroundColor: `var(--bg-less-dark-color)`,
          borderRadius: '10px'
        }}
      >
        <Logo width={100} height={100} />
        {
          isError ? (
            failContent
          ) : (
            successContent
          )
        }
      </Modal.Body>
    </Modal>
  )
}

export default AlertModal;
