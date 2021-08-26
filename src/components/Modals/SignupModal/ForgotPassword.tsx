import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import { XCircle } from "react-bootstrap-icons";
import styles from "./styles.module.scss";
import { ResetPassword } from "../../../services/api/server/multi_currency_api";
import { toast } from "react-toastify";
import { translate } from "helpers/translate";
import { useIntl } from "react-intl";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { formatMessage } = useIntl();

  const emailHandler = (e) => {
    const { value } = e.target
    setEmail(value)
  }
  const handleSubmit = (e) => {
    const { value } = e.target;
    e.preventDefault()
    toast.info(translate("forgot.password.email.msg"));
    // ResetPassword(email);
  }
  return (
    <div className={`pt-0 ${styles.tabContainer}`}>
      <div className="py-2">
        <h5>{translate("forgot.password.title")}</h5>
        <p>{translate("forgot.password.instruction")}</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className={styles.formGroup}
          controlId="formUsername"
        >
          <InputGroup>
            <Form.Control
              required
              type="email"
              placeholder={formatMessage({ id: "forgot.password.placeholder.email" })}
              value={email}
              onChange={emailHandler}
            />
            {
              email && (
                <InputGroup.Append>
                  <Button
                    className="d-flex align-items-center"
                    variant="outline-secondary"
                    onClick={() => setEmail('')}
                  >
                    <XCircle />
                  </Button>
                </InputGroup.Append>
              )
            }
          </InputGroup>
        </Form.Group>
        <Form.Group
          className={styles.formGroup}
          controlId="formSubmit"
        >
          <Button className="w-100" type="submit">
            {translate("forgot.password.title")}
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ForgotPassword;
