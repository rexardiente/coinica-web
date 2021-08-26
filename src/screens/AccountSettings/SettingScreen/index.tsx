import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./SettingsScreen.module.scss";
import { Container, Accordion, Card, Form, Button, Modal, Row, Col, Tab, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { translate } from "helpers/translate";

const UserInformation = React.lazy(() =>import("./UserInformationComponent"));
const Security = React.lazy(() =>import("./SecurityComponent"));

type SettingsProps = {
  platform: any;
  dispatch: Function;
};

const SettingsScreen = ({ platform, dispatch }: SettingsProps) => {
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);

  return (
    <div className={styles.accountSettingsContainer}>
        <Row className={`justify-content-center`}>
          <h3 className={`${styles.userInfoHeader} px-3 py-2`}>{translate("account_settings.setting_screen.title")}</h3>
        </Row>
        <div className="pt-5">
          <Row>
            <h3>{translate("account_settings.setting_screen.email_address.title")}</h3>
          </Row>
          <Row>
            <UserInformation showModal={showConfirmEmailModal} setShow={setShowConfirmEmailModal} />
          </Row>
        </div>
        <div className="pt-5">
          <Row>
            <h3>{translate("account_settings.setting_screen.password.title")}</h3>
          </Row>
          <Row>
            <Security />
          </Row>
        </div>
    </div>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
