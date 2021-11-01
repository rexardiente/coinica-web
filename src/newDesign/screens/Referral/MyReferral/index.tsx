import { ChangeEvent } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Copy, ApplyCode } from "./ReferralCode";
import RateDetails from "./RateDetails";
import { CheckReferralModal, ErrorReferralModal } from "./Modal";
import { translate } from "helpers/translate";
import styles from "./MyReferral.module.scss";
import stylesMain from "../Referral.module.scss";

type Props = {
  data: {
    myReferralCode: string;
    rate: number;
    bonus: number;
  };
  applyReferralCode: string;
  showCheckReferral: boolean;
  showErrorReferral: boolean;
  onCloseCheckReferral: Function;
  onCloseErrorReferral: Function;
  onChangeReferralCode: (e: ChangeEvent<HTMLInputElement>) => void;
  onApplyReferralLink: Function;
};

const MyReferral = ({
  data,
  showCheckReferral,
  showErrorReferral,
  onCloseCheckReferral,
  onCloseErrorReferral,
  onChangeReferralCode,
  applyReferralCode,
  onApplyReferralLink,
}: Props) => {
  const { myReferralCode, rate, bonus } = data;

  return (
    <div>
      <CheckReferralModal
        show={showCheckReferral}
        onClose={onCloseCheckReferral}
        applyReferralCode={applyReferralCode}
        onApplyReferralLink={onApplyReferralLink}
      />
      <ErrorReferralModal
        show={showErrorReferral}
        onClose={onCloseErrorReferral}
      />
      <Typography component="h2" className={stylesMain.heading}>
        {translate("referral.title")}
      </Typography>

      <Grid container xs className={styles.container}>
        <Grid item container>
          <Copy referralCode={myReferralCode} />
        </Grid>
        <Grid item container>
          <RateDetails rate={rate} bonus={bonus} />
        </Grid>
        <Grid item container>
          <ApplyCode
            onChangeReferralCode={onChangeReferralCode}
            onApplyReferralLink={onApplyReferralLink}
            code={applyReferralCode}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MyReferral;
