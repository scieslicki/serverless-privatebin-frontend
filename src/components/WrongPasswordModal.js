import {Button, Modal} from "react-bootstrap";
import React from "react";

export default function WrongPasswordModal({
                                        show,
                                        handleClose}) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wprowadzono złe hasło?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Sprawdź czy dobrze przepisałeś podane hasło.</p>
          <p>Jeśli to nie pomogło skontaktuj się z nadawcą...</p>
          <p><strong>Uwaga:</strong> Wiadomość jest szyfrowana w przeglądarce, jeszcze przed wysłaniem jej na serwer, w przypadku braku hasła nie możliwości jej odzyskania.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Zamknij</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}