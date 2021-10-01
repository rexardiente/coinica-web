import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";
import { ResetPassword } from "services/api/server/multi_currency_api";
import { toast } from "react-toastify";


const ResetPasswordModal = ({UserEmail = '', hideModal}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Password Reset email sent! Please check your inbox or spam folder");
    hideModal();
    ResetPassword(UserEmail);
  }
  return (
    <div className={`pt-0 ${styles.tabContainer}`}>
      <div className="py-2">
        <h5>Request password reset</h5>
        <p>Click the button below to send a password reset link to your email ({UserEmail})</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className={styles.formGroup}
          controlId="formSubmit"
        >
          <Button className="w-100" type="submit" onClick={handleSubmit}>
            Request password reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ResetPasswordModal;
