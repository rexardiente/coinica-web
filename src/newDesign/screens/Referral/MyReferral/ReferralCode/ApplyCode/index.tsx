import { ChangeEvent, Fragment } from "react";
import { Grid, Button, InputBase } from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "../ReferralCode.module.scss";

type Props = {
  code: string;
  onChangeReferralCode: (e: ChangeEvent<HTMLInputElement>) => void;
  onApplyReferralLink: Function;
};

const ApplyCode = ({
  code,
  onChangeReferralCode,
  onApplyReferralLink,
}: Props) => {
  return (
    <Fragment>
      <Grid item xs={8}>
        <InputBase
          className={styles.inputBase}
          placeholder="102qwertxxxxxx"
          value={code}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeReferralCode(e)
          }
        />
      </Grid>
      <Grid item container xs={4} className={styles.buttonContainer}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={() => onApplyReferralLink()}
          >
            {translate("referral.applyReferral.button")}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ApplyCode;
