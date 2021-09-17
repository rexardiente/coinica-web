import { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import useCopyToClipboard from "helpers/hooks/useCopyToClipboard";
import { ServerAPI as api } from "Config";
import styles from "../ReferralCode.module.scss";
import { translate } from "helpers/translate";

type Props = {
  referralCode: string;
};

const Copy = ({ referralCode }: Props) => {
  const { copy } = useCopyToClipboard();

  const copyToClipboard = (text: string) => {
    const isSuccess = copy(text);

    if (isSuccess) {
      toast.success(translate("components.copy_code.copied"));
    } else {
      toast.error(translate("components.copy_code.unable_to_copy"));
    }
  };

  const shareLink = () => {
    let baseUrl = "";
    if (referralCode) {
      const { hostname, port } = window.location;
      baseUrl =
        hostname === "localhost"
          ? `localhost:${port}`
          : `${api.protocol}://${hostname}`;
    }
    return `${baseUrl}/referral?referral_code=${referralCode}`;
  };

  return (
    <Fragment>
      <Grid item xs={8}>
        <div
          id="referral-code"
          className={[styles.inputBase, styles.labelCopy].join(" ")}
        >
          {referralCode}
        </div>
      </Grid>
      <Grid item container xs={4} className={styles.buttonContainer}>
        <Grid item className={styles.buttonWrapper}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={styles.button}
            onClick={() => copyToClipboard(referralCode)}
          >
            {translate("referral.copy.button")}
          </Button>
        </Grid>

        <Grid item className={styles.buttonWrapper}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={() => copyToClipboard(shareLink())}
          >
            {translate("referral.share.button")}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Copy;
