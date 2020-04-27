import {Button, Modal} from "react-bootstrap";
import React from "react";
import { useTranslation } from 'react-i18next';

export default function WrongPasswordModal({
                                        show,
                                        handleClose}) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Entered wrong password?")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t("Check if you have typed your password correctly.")}</p>
          <p>{t("If that didn't help, contact the sender...")}</p>
          <p><strong>{t("Attention")}:</strong> {t("The message is encrypted in the browser, before it is sent to the server, if there is no password, it cannot be recovered.")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>{t("Close")}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}