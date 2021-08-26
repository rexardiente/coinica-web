import React from "react";
import QRCode from "qrcode.react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import useCopyToClipboard from "helpers/hooks/useCopyToClipboard";
import styles from "./QrCode.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

type Props = {
  codeValue: string;
  show: boolean;
  onHide: Function;
  headerTitle?: string | React.ReactNode;
  modalDialogClass?: string;
  modalContentClass?: string;
};

const QrCode = ({
  codeValue,
  show,
  onHide,
  headerTitle,
  modalDialogClass,
  modalContentClass,
}: Props) => {
  const { copy } = useCopyToClipboard();

  const copyToClipboard = (elemId: string) => {
    const isSuccess = copy(elemId);

    if (isSuccess) {
      toast.success("Copied");
    } else {
      toast.error("Oops, unable to copy");
    }
  };

  const elemIdQrCode = "copy-qr-code";
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop
      keyboard={false}
      dialogClassName={modalDialogClass}
      contentClassName={`${styles.content} ${modalContentClass}`}
      close
    >
      <Modal.Body>
        <>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => onHide()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className={styles.body}>
            {headerTitle && <small>{headerTitle}</small>}
            <div className={styles.qrCodeWrapper}>
              <QRCode value={codeValue} className={styles.qrCode} />
            </div>
            <div className={styles.copyQrCode}>
              <p id={elemIdQrCode} className={styles.placeHolder}>
                {codeValue}{" "}
              </p>
              <span className={styles.vl}></span>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="copy-to-clipboard">Copy to clipboard</Tooltip>
                }
              >
                <span
                  className={styles.btnIconCopy}
                  onClick={() => copyToClipboard(elemIdQrCode)}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default QrCode;
