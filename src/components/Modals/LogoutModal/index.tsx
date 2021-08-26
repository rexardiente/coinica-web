import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import Spinner from 'react-bootstrap/Spinner';
import Modal from "react-bootstrap/Modal";
// import InputGroup from 'react-bootstrap/InputGroup';
// import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
// import { XCircle } from "react-bootstrap-icons";
import { removeLoginHistory } from "redux/scatter/scatter_actions";
import { loggedOut } from "redux/scatter/scatter_actions";
import { logoutPlatformAccount } from "redux/platform/platform_action";
import { multi_currency_sign_out } from "services/api/server/multi_currency_api";
import { translate } from "helpers/translate";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";

type PassSetProps = {
  loggingOut: boolean;
  setLogoutModal: Function;
  handleLogout: Function;
};
const PasswordSet = ({
  loggingOut,
  setLogoutModal,
  handleLogout,
}: PassSetProps) => {
  const handleLogoutSubmit = () => {
    handleLogout();
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <p>{translate("logout.confirmation.title")}</p>
      <div>
        <Button
          variant="outline-secondary"
          className="mr-3 text-white"
          onClick={() => handleLogoutSubmit()}
          disabled={loggingOut}
        >
          {loggingOut
            ? translate("logout.loading.button")
            : translate("logout.title")}
        </Button>
        <Button variant="warning" onClick={() => setLogoutModal(false)}>
          {translate("logout.cancel.button")}
        </Button>
      </div>
    </div>
  );
};

// type PassNotSetProps = {
//   username: string;
//   setLogoutModal: Function;
//   handleLogout: Function;
// }
// const PasswordNotSet = ({ username, setLogoutModal, handleLogout }: PassNotSetProps) => {
//   const [errPassowrd, setErrPassword] = useState(false)
//   const [password, setPassword] = useState('')
//   const [password2, setPassword2] = useState('')
//   const [isChecked, setRemoveAcc] = useState(false)

//   const passwordHander = (e) => {
//     if (errPassowrd) {
//       setErrPassword(false)
//     }
//     const { value } = e.target
//     setPassword(value)
//   }
//   const passwordHander2 = (e) => {
//     if (errPassowrd) {
//       setErrPassword(false)
//     }
//     const { value } = e.target
//     setPassword2(value)
//   }
//   const handleSavePassSubmit = (e) => {
//     e.preventDefault()
//     if (password !== password2) {
//       setErrPassword(true)
//       return
//     }
//     alert('Set pass submit')
//   }
//   const handleLogoutSubmit = (e) => {
//     e.preventDefault()
//     handleLogout()
//   }
//   return (
//     <>
//       <Form onSubmit={handleSavePassSubmit} style={{ padding: '0 20px' }}>
//         <p>
//           {(username || 'Hey there') + '! '}
//           Please <span className={styles.spanLink}>set a password</span> before you logout
//           or your account will be <span className="text-warning">permanently lost!</span>
//         </p>
//         {
//           errPassowrd && (
//             <p className="text-danger">Make sure both passwords are the same</p>
//           )
//         }
//         <Form.Group
//           className={styles.formGroup}
//           controlId="formUsername"
//         >
//           <InputGroup>
//             <Form.Control
//               required
//               value={password}
//               placeholder="Enter password"
//               type="password"
//               onChange={passwordHander}
//               style={errPassowrd ? { border: '2px solid red' } : {}}
//             />
//             {
//               password && (
//                 <InputGroup.Append>
//                   <Button
//                     className="d-flex align-items-center"
//                     variant="outline-secondary"
//                     onClick={() => setPassword('')}
//                   >
//                     <XCircle />
//                   </Button>
//                 </InputGroup.Append>
//               )
//             }
//           </InputGroup>
//         </Form.Group>
//         <Form.Group
//           className={styles.formGroup}
//           controlId="formPassword"
//         >
//           <InputGroup>
//             <Form.Control
//               required
//               value={password2}
//               placeholder="Confirm Password"
//               type="password"
//               onChange={passwordHander2}
//               style={errPassowrd ? { border: '2px solid red' } : {}}
//             />
//             {
//               password2 && (
//                 <InputGroup.Append>
//                   <Button
//                     className="d-flex align-items-center"
//                     variant="outline-secondary"
//                     onClick={() => setPassword2('')}
//                   >
//                     <XCircle />
//                   </Button>
//                 </InputGroup.Append>
//               )
//             }
//           </InputGroup>
//         </Form.Group>
//         <Form.Group
//           className={styles.formGroup}
//           controlId="formSubmit"
//         >
//           <Button className="w-100" type="submit">
//             Save and exit
//           </Button>
//         </Form.Group>
//       </Form>
//       <div className={styles.separator}>or</div>
//       <Form onSubmit={handleLogoutSubmit} style={{ padding: '0 10%' }}>
//         <div className="d-flex flex-column align-items-center">
//           <Form.Group className={`${styles.formGroup} mt-3`}>
//             <Form.Check id="remove_and_logout" type="checkbox">
//               <Form.Check.Input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={() => setRemoveAcc(!isChecked)}
//                 required
//               />
//               <Form.Check.Label>
//                 I AM FULLY AWARE THAT MY ACCOUNT WILL BE {' '}
//                 <span className="text-warning">PERMANENTLY LOST</span> AFTER LOGGING OUT
//               </Form.Check.Label>
//               <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
//             </Form.Check>
//           </Form.Group>
//           <Form.Group className={styles.formGroup}>
//             <div>
//               <Button
//                 className="mr-3 text-white"
//                 disabled={!isChecked}
//                 type="submit"
//                 variant="outline-secondary"
//               >
//                 Log Out
//               </Button>
//               <Button
//                 disabled={!isChecked}
//                 onClick={() => setLogoutModal(false)}
//                 variant="warning"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form.Group>
//         </div>
//       </Form>
//     </>
//   )
// }

type LogoutProps = {
  scatter?: any;
  platform?: any;
  dispatch: Function;
  show: boolean;
  setLogoutModal: Function; // Logout Modal
};
const LogoutWithoutPassword = ({
  scatter,
  platform,
  dispatch,
  show,
  setLogoutModal,
}: LogoutProps) => {
  const { account } = platform;
  const { userAccount } = scatter;
  const [loggingOut, setLogoutLoading] = useState(false);
  const [error, setError] = useState(false);
  const { formatMessage } = useIntl();

  const handleLogout = async () => {
    setLogoutLoading(true);
    if (account) {
      try {
        const LOGOUT_DATA = await multi_currency_sign_out();
        if (
          LOGOUT_DATA?.status === 202 &&
          LOGOUT_DATA?.statusText === "Accepted"
        ) {
          dispatch(logoutPlatformAccount());
          setLogoutModal(false);
        } else {
          throw new Error(formatMessage({ id: "logout.msg.error" }));
        }
      } catch (e) {
        setError(true);
      } finally {
        setLogoutLoading(false);
      }
    } else if (userAccount) {
      const scatterData = scatter?.scatter;
      if (!scatterData) return;
      scatterData.logout().then(() => {
        setLogoutLoading(false);
        setLogoutModal(false);
        if (dispatch) {
          removeLoginHistory();
          dispatch(loggedOut());
          toast.success("Logged out successfully");
        }
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={setLogoutModal}
      backdrop="static"
      keyboard={false}
      contentClassName={styles.modalContent}
    >
      <Modal.Header className={styles.logoutModalHeader}>
        <Modal.Title className="w-100 text-center">{translate("logout.title")}</Modal.Title>
      </Modal.Header>
      <div className={styles.tabContainer}>
        {error && (
          <p className="w-100 text-center text-warning">
            {translate("logout.msg.error")}
          </p>
        )}
        <PasswordSet
          loggingOut={loggingOut}
          setLogoutModal={setLogoutModal}
          handleLogout={handleLogout}
        />
        {/* {
          isPasswordSet ? (
            <PasswordSet
              loggingOut={loggingOut}
              setLogoutModal={setLogoutModal}
              handleLogout={handleLogout}
            />
          ) : (
            <PasswordNotSet
              username={"usertest"}
              setLogoutModal={setLogoutModal}
              handleLogout={handleLogout}
            />
          )
        } */}
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ scatter, platform }) => ({ scatter, platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutWithoutPassword);
