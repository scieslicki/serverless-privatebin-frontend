import {Button, Modal} from "react-bootstrap";
import React from "react";
import { useTranslation } from 'react-i18next';

export default function RemovingModal({
                                        show,
                                        handleShow,
                                        handleClose,
                                        handleRemoving}) {
  const { t } = useTranslation();

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {t("Clear history")}...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Clear history")}?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t("Deleting the note history will clear the list.")}</p>
          <p>{t("Access to the notes, if still valid, will be possible only through their individual url.")}</p>
          <p><strong>{t("They will no longer appear in this list.")}</strong></p>
          <p><strong>{t("Attention")}:</strong> {t("You can't undo this action!")}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t("Close")}</Button>
          <Button variant="primary" className="btn-danger" onClick={handleRemoving}>{t("Delete")}</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}