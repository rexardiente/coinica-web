import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import styles from "../Modal.module.scss";

type Props = {
  show: boolean;
  onClose: Function;
  applyReferralCode: string;
  onApplyReferralLink: Function;
};
const CheckReferral = ({
  show,
  onClose,
  applyReferralCode,
  onApplyReferralLink,
}: Props) => {
  return (
    <Modal
      open={show}
      onClose={() => onClose()}
      className={styles.modal}
      aria-labelledby="apply-code"
      aria-describedby="check-if-code-valid"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box className={styles.dialog}>
          <Typography component="h2" variant="h5">
            Apply Referral Code
          </Typography>
          <div className={styles.body}>
            <p className={styles.referralCode}>{applyReferralCode}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onApplyReferralLink()}
            >
              Apply
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CheckReferral;
