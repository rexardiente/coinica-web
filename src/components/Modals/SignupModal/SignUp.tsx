import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { XCircle, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { GoToAddEmail } from "./Login";
import {
  setPlatformAccountSuccess,
  setPlatformAccountFailed,
  setUserBalance,
} from "redux/platform/platform_action";
import {
  GetUserAccountById,
  GetUserWalletBalance,
} from "services/api/server/platform";
import {
  multi_currency_sign_up,
  multi_currency_sign_in,
  multi_currency_set_token,
} from "services/api/server/multi_currency_api";
import { translate } from "helpers/translate";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

const randomUser = () => {
  const length = 7;
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

type SignUpProps = {
  setTabKey: Function;
  platform: any;
  dispatch: Function;
  setShowModal: Function;
};

const SignUp = ({
  setTabKey,
  platform,
  dispatch,
  setShowModal,
}: SignUpProps) => {
  const history = useHistory();
  const [username, setUsername] = useState(randomUser());
  const [code, setCode] = useState("");
  const [passObj, setPassword] = useState({
    password: "",
    password2: "",
  });
  const [terms, setTerms] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setSigningIn] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [err, setErr] = useState(false);
  const { formatMessage } = useIntl();

  const updateWalletBalance = async () => {
    try {
      const { data } = await GetUserWalletBalance();
      dispatch(setUserBalance(data));
    } catch (error) {
      console.error(error);
    }
  };

  const usernameHandler = (e) => {
    const { value } = e.target;
    setUsername(value);
    if (submitErr) {
      setSubmitErr("");
    }
    if (submitSuccess) {
      setSubmitSuccess("");
    }
  };
  const passwordHander = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passObj,
      [name]: value,
    });
    if (err) {
      setErr(false);
    }
  };
  const validateForm = () => {
    if (passObj.password !== passObj.password2) {
      setErr(true);
      return false;
    }
    return true;
  };
  const automaticSignInUser = async ({ username, password }) => {
    try {
      setSigningIn(true);
      const {
        data: { id, token },
      } = await multi_currency_sign_in({ username, password });
      multi_currency_set_token({ CLIENT_TOKEN: token, CLIENT_ID: id });
      await updateWalletBalance();

      const user = await GetUserAccountById(id);
      if (user.data) {
        const { username, email, is_verified } = user.data;
        toast.success(`${formatMessage({ id: "signup.msg.welcome" })} ${username || email}!`);

        if (!email && !is_verified) {
          toast.info(GoToAddEmail(history), { autoClose: false });
        }

        dispatch(setPlatformAccountSuccess(user.data));
        dispatch(setPlatformAccountFailed(null));
        setShowModal(false);
      }
    } finally {
      setLoading(false);
      setSigningIn(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const parameters = { username, password: passObj.password } as any;
        if (code !== "") {
          parameters.referred_by = code;
        }
        const data = await multi_currency_sign_up(parameters);
        if (data?.status === 201 && data?.statusText === "Created") {
          setSubmitErr("");
          setSubmitSuccess(formatMessage({ id: "signup.msg.success" }));
          setUsername("");
          setCode("");
          setPassword({
            password: "",
            password2: "",
          });
          automaticSignInUser({ username, password: passObj.password });
        } else {
          throw new Error(formatMessage({ id: "signup.msg.error" }));
        }
      } catch (e: any) {
        setSubmitSuccess("");
        if (
          e?.response?.status === 409 &&
          e?.response?.statusText === "Conflict"
        ) {
          setSubmitErr(formatMessage({ id: "signup.msg.username.exist" }));
        } else {
          setSubmitErr(formatMessage({ id: "signup.msg.server.error" }));
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={`${styles.tabContainer} pt-0`}>
      <Form onSubmit={handleSignUp}>
        {submitErr && (
          <p className="w-100 text-center text-danger">{submitErr}</p>
        )}
        {submitSuccess && (
          <p className="w-100 text-center text-success">{submitSuccess}</p>
        )}
        <Form.Group className={styles.formGroup}>
          <Form.Label>{translate("signup.username")}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              name="username"
              value={username}
              onChange={usernameHandler}
              placeholder={formatMessage({ id: "signup.placeholder.username" })}
            />
            {username && (
              <InputGroup.Append>
                <Button
                  className="d-flex align-items-center text-white"
                  variant="outline-secondary"
                  onClick={() => setUsername("")}
                >
                  <XCircle />
                </Button>
              </InputGroup.Append>
            )}
          </InputGroup>
          <Form.Label className={styles.label}>
            {translate("signup.password")}
          </Form.Label>
          <InputGroup>
            <Form.Control
              required
              name="password"
              value={passObj.password}
              placeholder={formatMessage({ id: "signup.placeholder.password" })}
              type={showPass ? "text" : "password"}
              onChange={passwordHander}
              isInvalid={err}
            />
            {passObj.password && (
              <InputGroup.Append>
                <Button
                  className="d-flex align-items-center text-white"
                  variant="outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeFill /> : <EyeSlashFill />}
                </Button>
              </InputGroup.Append>
            )}
            <Form.Control.Feedback type="invalid">
              {translate("signup.msg.password.not_match")}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              {translate("signup.msg.password.valid")}
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Label className={styles.label}>
            {translate("signup.confirm.password")}
          </Form.Label>
          <InputGroup>
            <Form.Control
              required
              name="password2"
              value={passObj.password2}
              placeholder={formatMessage({ id: "signup.placeholder.confirm" })}
              type={showPass ? "text" : "password"}
              onChange={passwordHander}
              isInvalid={err}
            />
            {passObj.password2 && (
              <InputGroup.Append>
                <Button
                  className="d-flex align-items-center text-white"
                  variant="outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeFill /> : <EyeSlashFill />}
                </Button>
              </InputGroup.Append>
            )}
            <Form.Control.Feedback type="invalid">
              {translate("signup.msg.password.not_match")}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              {translate("signup.msg.password.valid")}
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Label className={styles.label}>
            {translate("signup.referral")}
          </Form.Label>
          <InputGroup>
            <Form.Control
              name="referral_code"
              value={code}
              placeholder={formatMessage({ id: "signup.placeholder.referral" })}
              onChange={(e) => setCode(e?.target?.value)}
            />
            {code && (
              <InputGroup.Append>
                <Button
                  className="d-flex align-items-center text-white"
                  variant="outline-secondary"
                  onClick={() => setCode("")}
                >
                  <XCircle />
                </Button>
              </InputGroup.Append>
            )}
          </InputGroup>
          <Form.Text className="text-warning mt-4">
            {translate("signup.important", {
              strong: content => <strong>{content}</strong>
            })}
          </Form.Text>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Check
            required
            checked={terms}
            id="terms_and_conditions"
            label={translate("signup.agreement")}
            onChange={() => setTerms(!terms)}
            feedbackTooltip
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Button className="w-100" type="submit" disabled={loading}>
            {isSigningIn
              ? translate("signup.signing.in")
              : loading
                ? translate("signup.creating.account")
                : translate("signup.create.account")}
          </Button>
        </Form.Group>
      </Form>
      <div>
        <p>
          {translate("signup.exist.account")}{" "}
          <span className={styles.blue} onClick={() => setTabKey("login")}>
            {translate("signup.login.now")}
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
