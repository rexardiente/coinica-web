import { Fragment, useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { parse } from "query-string";
import { Grid, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import HowItWorks from "newDesign/components/HowItWorks";
import MyReferral from "./MyReferral";
import IncomeHistory from "./IncomeHistory";
import {
  ApplyReferral,
  GetUserAccountById,
  ReferralHistory,
} from "services/api/server/platform";
import { setPlatformAccountSuccess } from "redux/platform/platform_action";
import { translate } from "helpers/translate";
import styles from "./Referral.module.scss";

type ReduxState = {
  platform: any;
};

type Income = {
  created_at: Date | number;
  applied_by: string;
};

type StateIncomeHistory = Income[];

const INSTRUCTION_TITLE = translate("referral.instruction");
const INSTRUCTION_LIST = [
  translate("referral.instruction.one"),
  translate("referral.instruction.two"),
  translate("referral.instruction.three"),
];

const initialStateModalShow = {
  checkReferral: false,
  errorReferral: false,
};

const Referral = () => {
  const { account } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();
  const history = useHistory<History>();

  const [incomeHistoryData, setIncomeHistoryData] =
    useState<StateIncomeHistory>([]);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(initialStateModalShow);
  const [applyReferralCode, setApplyReferralCode] = useState("");

  const getReferralIncomeHistory = async () => {
    dispatch(setPageLoading(true));
    try {
      const res = await ReferralHistory(account?.referral_code);
      setIncomeHistoryData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  const handleApplyReferralLink = async () => {
    const { id } = account;
    try {
      await ApplyReferral(applyReferralCode, id);
      const resAccountById = await GetUserAccountById(id);

      dispatch(setPlatformAccountSuccess(resAccountById.data));
      setModalShow(initialStateModalShow);
      toast.success(translate("referral.code.apply"));
    } catch (e) {
      setModalShow({ errorReferral: true, checkReferral: false });
    }
  };

  const handleChangeReferralCode = (e: ChangeEvent<HTMLInputElement>) => {
    setApplyReferralCode(e.target.value);
  };

  const handleCloseCheckReferralModal = () => {
    setModalShow((prevState) => ({ ...prevState, checkReferral: false }));
  };

  const handleCloseErrorReferralModal = () => {
    setModalShow((prevState) => ({ ...prevState, errorReferral: false }));
  };

  useEffect(() => {
    if (account) {
      getReferralIncomeHistory();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // Show modal apply code when user use the referral link;
  // And validate the url referral code must not equal to user referal code
  useEffect(() => {
    const { search } = history.location;
    if (account && search) {
      const { referral_code } = parse(search);

      if (referral_code && account.referral_code !== referral_code) {
        setModalShow((prevState) => ({
          ...prevState,
          checkReferral: true,
        }));
        setApplyReferralCode(referral_code as string);
      }
    }
  }, [history.location, account]);

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  const referralData = {
    myReferralCode: account?.referral_code,
    rate: account?.referral_rate,
    bonus: account?.referral,
    otherReferralCode: applyReferralCode,
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item className={styles.howItWorksWrapper} xs={12}>
          <HowItWorks
            title={INSTRUCTION_TITLE}
            instruction={INSTRUCTION_LIST}
          />
        </Grid>
        <Grid item xs={12}>
          <MyReferral
            data={referralData}
            showCheckReferral={modalShow.checkReferral}
            showErrorReferral={modalShow.errorReferral}
            applyReferralCode={applyReferralCode}
            onChangeReferralCode={handleChangeReferralCode}
            onCloseCheckReferral={handleCloseCheckReferralModal}
            onCloseErrorReferral={handleCloseErrorReferralModal}
            onApplyReferralLink={handleApplyReferralLink}
          />
        </Grid>
        <Grid item xs={12}>
          <IncomeHistory data={incomeHistoryData} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Referral;
