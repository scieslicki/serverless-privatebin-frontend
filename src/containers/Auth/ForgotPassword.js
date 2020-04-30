import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {FormGroup, FormControl, ControlLabel, HelpBlock} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./ForgotPassword.css";
import {useTranslation} from 'react-i18next';
import { useHistory } from "react-router-dom";

export default function Forgot() {
  const { t } = useTranslation();

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const history = useHistory();
  const [forgotCodeSend, setForgotCodeSend] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateFormEmail() {
    return fields.email.length > 0 ;
  }

  function validateFormChangePassword() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword &&
      fields.confirmationCode.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPassword(fields.email);
      setForgotCodeSend(true);

      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(fields.email, fields.confirmationCode, fields.password);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>{t("Confirmation Code")}</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>{t("Please check your email for the code")}.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>{t("New Password")}</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>{t("Confirm Password")}</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateFormChangePassword()}
        >
          {t("Verify")}
        </LoaderButton>
      </form>
    );
  }

  function renderFormEmail() {
    return (
      <div className="ForgotPassword">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>{t("Email")}</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateFormEmail()}
          >
            {t("Send")}
          </LoaderButton>
        </form>
      </div>
    );
  }

  return (
    <div className="ForgotPassword">
      { !forgotCodeSend ? renderFormEmail() : renderConfirmationForm() }
    </div>
  );
}