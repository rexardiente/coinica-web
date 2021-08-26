import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { XCircle } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { GetUserAccount } from "services/api/server/platform";
import { setPlatformAccountSuccess, setPlatformAccountFailed } from "redux/platform/platform_action";
import { Eos, Network } from "Config";
import { updateTokenBalance } from "redux/scatter/scatter_actions";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  setLoginHistory,
  logInSuccess,
  loginError
} from "redux/scatter/scatter_actions";
import { translate } from "helpers/translate";
import styles from "./styles.module.scss";

const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

type LoginFormProps = {
  scatter: any;
  platform: any;
  dispatch: Function;
  showModal: boolean;
  setShowModal: Function;
}

const LoginForm = ({ platform, scatter, dispatch, showModal, setShowModal }: LoginFormProps) => {
  const [resetPassword, requestResetPassword] = useState(false)
  const [tabKey, setTabKey] = useState<any>('signup')
  const scatterData = scatter?.scatter

  /**
   * THIS LOGIN MODULE IS FOR
   * MANUALLY LOGGING USER IN
   * (AUTOMATIC LOG-IN) IS FOUND
   * IN 'src/App.tsx'
   */
  const loginUser = () => {
    if (scatterData == null) {
      toast.error("Scatter not found, open scatter desktop and try again");
      return
    }
    const requiredFields = { accounts: [Network] };
    scatterData.login(requiredFields).then(response => {
      dispatch(logInSuccess(response))
      setLoginHistory()
      Eos.rpc.get_currency_balance('eosio.token', response.accounts[0].name, 'EOS').then(res => {
        dispatch(updateTokenBalance(res[0]))
      })

      //Platform user account
      GetUserAccount(response.accounts[0].name).then((res) => {
        dispatch(setPlatformAccountSuccess(res.data))
      }).catch(error => {
        dispatch(setPlatformAccountFailed(error));
      });

      toast.success(`Welcome ${response.accounts[0].name || response.name}!`);
      setShowModal(false)
    }).catch(() => {
      dispatch(loginError());
      toast.error("Error logging in");
    })
  };

  return (
    <Modal show={showModal} backdrop="static">
      <Modal.Body style={{ padding: 0 }}>
        <div>
          <div>
            <div
              className="modal-header text-white bg-dark justify-content-center"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.2)` }}
            >
              <h6
                className="modal-title modal-title-center"
                id="loginModalLabel"
              >
              </h6>
              <button
                onClick={() => {
                  requestResetPassword(false)
                  setTabKey('signup')
                  setShowModal(false)
                }}
                type="button"
                className="close text-white ml-auto"
                data-dismiss="modal"
                aria-label="Close"
              >
                <XCircle />
              </button>
            </div>
            <div className={`${styles.modalContent} modal-body`}>
              {
                resetPassword ? (
                  <ForgotPassword />
                ) : (
                  <>
                    <Tabs
                      id="login-form-tabs"
                      className="justify-content-center my-3"
                      variant="pills"
                      unmountOnExit={true}
                      activeKey={tabKey}
                      onSelect={(tabKey) => setTabKey(tabKey)}
                    >
                      <Tab eventKey="signup" title={translate("header.signup")}>
                        <SignUp
                          setTabKey={setTabKey}
                          setShowModal={setShowModal}
                        />
                      </Tab>
                      <Tab eventKey="login" title={translate("header.login")}>
                        <Login
                          setShowModal={setShowModal}
                          setTabKey={setTabKey}
                          requestResetPassword={requestResetPassword}
                        />
                      </Tab>
                    </Tabs>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = ({ scatter, platform }) => ({ scatter, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
