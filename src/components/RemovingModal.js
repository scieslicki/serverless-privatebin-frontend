import {Button, Modal} from "react-bootstrap";
import React from "react";

export default function RemovingModal({
                                        show,
                                        handleShow,
                                        handleClose,
                                        handleRemoving}) {

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Wyczyść historię...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usunąć historię?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Usunięcie historii notek, spowoduje wyczyszczenie listy.</p>
          <p>Dostęp do notek, jeśli będą jeszcze ważne, będzie możliwy tylko przez ich indywidualny adres url</p>
          <p><strong>Nie będą już więcej wyświetlane na tej liście.</strong></p>
          <p><strong>Uwaga:</strong> Nie będzie można cofnąć tej akcji!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Zamknij</Button>
          <Button variant="primary" onClick={handleRemoving}>Usuń</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}