import React, { useState, useEffect } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { QrCode } from "components/Modals";
import useCopyToClipboard from "helpers/hooks/useCopyToClipboard";
import styles from "./CopyCode.module.scss";
import { translate } from "helpers/translate";

type Props = {
  code: string;
  copyElemId: string;
  containerClass?: object | string;
  headerTitle?: string | React.ReactNode;
  modalDialogClassQrCode?: string;
  modalContentClassQrCode?: string;
  showQrCode?: boolean;
};

const CopyCode = ({
  code,
  copyElemId,
  containerClass,
  headerTitle,
  modalDialogClassQrCode,
  modalContentClassQrCode,
  showQrCode = true,
}: Props) => {
  const [showModalQrCode, setShowModalQrCode] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const { copy } = useCopyToClipboard();

  const onHideModalQrCode = () => {
    setShowModalQrCode(false);
  };

  const onShowModalQrCode = (code: string) => {
    setShowModalQrCode(true);
    setCodeValue(code);
  };

  const copyToClipboard = (elemId: string) => {
    const isSuccess = copy(elemId);

    if (isSuccess) {
      toast.success(translate("components.copy_code.copied"));
    } else {
      toast.error(translate("components.copy_code.unable_to_copy"));
    }
  };

  useEffect(() => {
    if (code) {
      setCodeValue(code);
    }
  }, [code]);
  return (
    <>
      <QrCode
        codeValue={codeValue}
        show={showModalQrCode}
        onHide={onHideModalQrCode}
        headerTitle={headerTitle}
        modalDialogClass={modalDialogClassQrCode}
        modalContentClass={modalContentClassQrCode}
      />
      <div className={`${styles.container} ${containerClass || ""}`}>
        <p id={copyElemId} className={styles.placeHolder}>
          {codeValue}{" "}
        </p>
        <span className={styles.vl}></span>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="copy-to-clipboard">{translate("components.copy_code.copy_to_clipboard")}</Tooltip>}
        >
          <span
            className={styles.btnIconCopy}
            onClick={() => copyToClipboard(copyElemId)}
          >
            <FontAwesomeIcon icon={faCopy} />
          </span>
        </OverlayTrigger>
      </div>
      {showQrCode && (
        <div className={styles.showQrCode}>
          <Button
            className={styles.btnShowQrCode}
            onClick={() => onShowModalQrCode(codeValue)}
            size="sm"
          >
            {translate("components.copy_code.show_qr_code")}
          </Button>
        </div>
      )}
    </>
  );
};

export default CopyCode;
