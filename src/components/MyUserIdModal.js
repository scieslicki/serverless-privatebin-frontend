import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import React from "react";
import { useTranslation } from 'react-i18next';

export default function MyUserIdModal({
                                        show,
                                        handleShow,
                                        handleClose,
                                        userId}) {
  const { t } = useTranslation();

  const url = window.location.href + 'user/' + userId;


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {t("Link to my history")}...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Link to my history")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <FormControl type="text" readOnly={true} value={url}>
            </FormControl>
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t("Close")}</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}