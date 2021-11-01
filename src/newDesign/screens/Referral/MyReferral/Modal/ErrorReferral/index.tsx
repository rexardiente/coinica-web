import { Modal, Backdrop, Fade, Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { translate } from "helpers/translate";
import styles from "../Modal.module.scss";

type Props = {
  show: boolean;
  onClose: Function;
};

const ErrorReferral = ({ show, onClose }: Props) => {
  return (
    <Modal
      open={show}
      onClose={() => onClose()}
      className={styles.modal}
      aria-labelledby="invalid-code"
      aria-describedby="invalid-referral-code"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box className={styles.alertError}>
          <Alert severity="error">
            <AlertTitle>
              <h4>{translate("referral.code.error.header")}</h4>
            </AlertTitle>

            <span>{translate("referral.code.error.subHeader")}</span>
            <ol>
              <li>{translate("referral.code.error.reason.one")}</li>
              <li>{translate("referral.code.error.reason.two")}</li>
              <li>{translate("referral.code.error.reason.three")}</li>
            </ol>
          </Alert>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ErrorReferral;
