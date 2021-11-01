import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { XCircle, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import {
  GetUserAccountById,
  GetUserWalletBalance,
} from "services/api/server/platform";
import {
  multi_currency_sign_in,
  multi_currency_set_token,
} from "services/api/server/multi_currency_api";
import {
  setPlatformAccountSuccess,
  setPlatformAccountFailed,
} from "redux/platform/platform_action";
import { setUserBalance } from "redux/platform/platform_action";
import { translate } from "helpers/translate";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

const SIGN_IN_USER = ({ username, password }) => {
  return multi_currency_sign_in({ username, password });
};

const GET_USER_DATA = (id) => {
  return GetUserAccountById(id);
};

export const GoToAddEmail = (history) => {
  return (
    <span>
      {translate("signup.msg.add.email", {
        span: (content) => (
          <span
            className="text-warning text-bold"
            onClick={() => history.push("/account/settings")}
          >
            {content}
          </span>
        ),
      })}
    </span>
  );
};

type LoginProps = {
  platform: any;
  setTabKey: Function;
  requestResetPassword: Function;
  dispatch: Function;
  setShowModal: Function;
};

const Login = ({
  platform,
  setTabKey,
  requestResetPassword,
  dispatch,
  setShowModal,
}: LoginProps) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const { formatMessage } = useIntl();

  const getBalance = async () => {
    try {
      const { data } = await GetUserWalletBalance();
      if (data) {
        dispatch(setUserBalance(data));
      }
    } catch (e) {
      // do nothing
    }
  };

  const usernameHandler = (e) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setUsername(value);
  };
  const passwordHander = (e) => {
    if (isInvalid) {
      setInvalid(false);
    }
    const { value } = e.target;
    setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { id, token },
      } = await SIGN_IN_USER({ username, password });
      multi_currency_set_token({ CLIENT_TOKEN: token, CLIENT_ID: id });

      const user = await GET_USER_DATA(id);
      getBalance();
      if (user.data) {
        const { username, email, is_verified } = user.data;
        toast.success(
          `${formatMessage({ id: "signup.msg.welcome" })} ${username || email}!`
        );

        if (!email && !is_verified) {
          toast.info(GoToAddEmail(history), { autoClose: false });
        }

        dispatch(setPlatformAccountSuccess(user.data));
        dispatch(setPlatformAccountFailed(null));
        setShowModal(false);
      }
    } catch (e: any) {
      if (
        e?.response?.status === 401 &&
        e?.response?.statusText === "Unauthorized" &&
        (e?.response?.config?.url + "").includes("account") === false
      ) {
        dispatch(
          setPlatformAccountFailed(formatMessage({ id: "login.msg.invalid" }))
        );
        setInvalid(true);
      } else {
        dispatch(
          setPlatformAccountFailed(formatMessage({ id: "login.msg.error" }))
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.tabContainer}>
      <Form onSubmit={handleSubmit}>
        {platform.error && (
          <p className="text-danger text-center w-100">{platform.error}</p>
        )}
        <Form.Group className={styles.formGroup} controlId="formUsername">
          <InputGroup>
            <Form.Control
              required
              placeholder={formatMessage({ id: "login.username" })}
              value={username}
              onChange={usernameHandler}
              isInvalid={isInvalid}
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
        </Form.Group>
        <Form.Group className={styles.formGroup} controlId="formPassword">
          <InputGroup>
            <Form.Control
              required
              value={password}
              placeholder={formatMessage({ id: "login.password" })}
              type={showPass ? "text" : "password"}
              onChange={passwordHander}
              isInvalid={isInvalid}
            />
            {password && (
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
          </InputGroup>
        </Form.Group>
        <Form.Group className={styles.formGroup} controlId="formSubmit">
          <Button className="w-100" type="submit" disabled={loading}>
            {loading
              ? translate("login.loading.button")
              : translate("login.button")}
          </Button>
        </Form.Group>
      </Form>
      <div>
        <p className={styles.blue} onClick={() => requestResetPassword(true)}>
          {translate("login.forgot.password")}
        </p>
        <p>
          {translate("login.create.account", {
            span: (content) => (
              <span className={styles.blue} onClick={() => setTabKey("signup")}>
                {content}
              </span>
            ),
          })}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Login);
