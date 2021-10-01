import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";
import { ResetPassword } from "services/api/server/multi_currency_api";
import { toast } from "react-toastify";
import { translate } from "helpers/translate";


const ResetPasswordModal = ({UserEmail = '', hideModal}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info(translate("account_settings.setting_screen.reset_password_modal.toast.info"));
    hideModal();
    ResetPassword(UserEmail);
  }
  return (
    <div className={`pt-0 ${styles.tabContainer}`}>
      <div className="py-2">
        <h5>{translate("account_settings.setting_screen.reset_password_modal.title")}</h5>
        <p>{translate("account_settings.setting_screen.reset_password_modal.instruction")} ({UserEmail})</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className={styles.formGroup}
          controlId="formSubmit"
        >
          <Button className="w-100" type="submit" onClick={handleSubmit}>
            {translate("account_settings.setting_screen.reset_password_modal.button")}
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ResetPasswordModal;
